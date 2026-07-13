import { useEffect, useState } from 'react'

// useBrowserSignals: reads the same client-side signals the ad networks
// harvest, so the page can show the visitor exactly what it's leaking.
// Some values (high-entropy client hints, IP/geo) resolve asynchronously.
export function useBrowserSignals() {
  const [signals, setSignals] = useState(baseSignals)

  useEffect(() => {
    let cancelled = false
    async function enrich() {
      const extra = {}

      if (navigator.userAgentData?.getHighEntropyValues) {
        try {
          const h = await navigator.userAgentData.getHighEntropyValues([
            'architecture', 'bitness', 'platformVersion', 'fullVersionList', 'model',
          ])
          extra.architecture = `${h.architecture} · ${h.bitness}-bit`
          extra.os = `${h.platform} ${h.platformVersion}`
          const main = h.fullVersionList?.find((b) => b.brand === 'Chromium') || h.fullVersionList?.[0]
          if (main) extra.browser = `${main.brand} ${main.version}`
        } catch {
          /* client hints unavailable */
        }
      }

      // Public IP + geo — JS can't read your own IP, so we ask a lookup service
      // (the same thing the ad network does server-side from your connection).
      try {
        const r = await fetch('https://ipapi.co/json/')
        if (r.ok) {
          const j = await r.json()
          extra.ip = j.ip
          extra.geo = [j.city, j.region, j.country_name].filter(Boolean).join(', ')
          extra.isp = j.org
        }
      } catch {
        /* offline or rate-limited */
      }

      if (!cancelled) setSignals((s) => ({ ...s, ...extra }))
    }
    enrich()
    return () => {
      cancelled = true
    }
  }, [])

  return signals
}

function baseSignals() {
  return {
    ip: '…',
    geo: '…',
    isp: '…',
    os: navigator.userAgentData?.platform || navigator.platform || '…',
    browser: '…',
    architecture: '…',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    screen: `${screen.width}×${screen.height} @${window.devicePixelRatio}×`,
    referrer: document.referrer || '(none)',
    cookies: navigator.cookieEnabled ? 'enabled' : 'disabled',
  }
}

// useContainerHosts: polls the ad iframes WITHIN a given container element and
// returns the third-party hosts they contacted. Because each network row is a
// separate container, this attributes the tracker chain to the right network
// by which iframes actually loaded it — no guessing by domain name. The ad
// units render in srcDoc iframes, so we read each child frame's own timeline
// (readable because srcDoc inherits our origin). Polls because trackers fire
// late.
export function useContainerHosts(ref) {
  const [hosts, setHosts] = useState([])

  useEffect(() => {
    const self = location.hostname
    // ipapi.co is our own geo lookup, not an ad tracker — exclude it.
    const ignore = ['localhost', 'gstatic', 'googleapis', '127.0.0.1', 'ipapi.co']
    const scan = (perf, into) => {
      try {
        for (const r of perf.getEntriesByType('resource')) {
          try {
            const h = new URL(r.name).hostname
            if (h && h !== self && !ignore.some((i) => h.includes(i))) into.add(h)
          } catch {
            /* non-URL entry */
          }
        }
      } catch {
        /* timeline unreadable */
      }
    }
    const collect = () => {
      const el = ref.current
      if (!el) return
      const found = new Set()
      for (const f of el.querySelectorAll('iframe[title="advertisement"]')) {
        try {
          scan(f.contentWindow.performance, found)
        } catch {
          /* cross-origin frame */
        }
      }
      setHosts([...found].sort())
    }
    collect()
    const poll = setInterval(collect, 2000)
    const stop = setTimeout(() => clearInterval(poll), 14000)
    return () => {
      clearInterval(poll)
      clearTimeout(stop)
    }
  }, [ref])

  return hosts
}
