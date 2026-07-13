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

// useThirdPartyHosts: polls the Resource Timing API for a few seconds and
// returns every third-party host the page contacted — i.e. the tracker chain
// the ads pulled in. Polls because many trackers fire late.
export function useThirdPartyHosts() {
  const [hosts, setHosts] = useState([])

  useEffect(() => {
    const self = location.hostname
    // ipapi.co is our own geo lookup, not an ad tracker — exclude it.
    const ignore = ['localhost', 'gstatic', 'googleapis', '127.0.0.1', 'ipapi.co']
    const collect = () => {
      const found = performance
        .getEntriesByType('resource')
        .map((r) => {
          try {
            return new URL(r.name).hostname
          } catch {
            return null
          }
        })
        .filter((h) => h && h !== self && !ignore.some((i) => h.includes(i)))
      setHosts([...new Set(found)].sort())
    }
    collect()
    const poll = setInterval(collect, 2000)
    const stop = setTimeout(() => clearInterval(poll), 12000)
    return () => {
      clearInterval(poll)
      clearTimeout(stop)
    }
  }, [])

  return hosts
}
