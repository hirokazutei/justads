import { useEffect, useRef, useState } from 'react'

// AdSlot: renders a network ad unit inside a sandboxed iframe.
//
// Pass the raw markup your ad network gives you (the <script>/<ins> block)
// as the `tag` prop. Rendering it inside an iframe isolates the ad's script
// from your React DOM and supports document.write-based tags, which most
// low-barrier networks (Adsterra, PropellerAds, etc.) still use.
//
// Because the iframe uses srcDoc it inherits our origin, so we can read its
// own performance timeline and report how many requests / tracker domains the
// unit pulled in. With no `tag`, it falls back to the dashed placeholder.
export default function AdSlot({
  tag,
  width = '100%',
  height = 250,
  label = '[ ad unit goes here ]',
  showStats = false,
}) {
  const frameRef = useRef(null)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    if (!tag) return
    // Measure after subresources have had time to load (they trickle in
    // after the srcDoc itself finishes).
    const id = setTimeout(() => {
      const f = frameRef.current
      if (!f) return
      try {
        const res = f.contentWindow.performance.getEntriesByType('resource')
        const hosts = new Set(
          res
            .map((r) => {
              try {
                return new URL(r.name).hostname
              } catch {
                return null
              }
            })
            .filter((h) => h && !/localhost/.test(h)),
        )
        setStats({ reqs: res.length, hosts: hosts.size })
      } catch {
        /* cross-origin nested frame — not measurable */
      }
    }, 3000)
    return () => clearTimeout(id)
  }, [tag])

  if (!tag) {
    // Size the placeholder to the real ad footprint so the layout
    // matches what the live unit will occupy.
    const isFixed = typeof width === 'number'
    return (
      <div
        className="ad-slot"
        style={
          isFixed
            ? { width, height, maxWidth: '100%', margin: '24px auto', boxSizing: 'border-box' }
            : undefined
        }
      >
        {label}
      </div>
    )
  }

  const srcDoc = `<!DOCTYPE html><html><head><meta charset="utf-8">
    <style>html,body{margin:0;display:flex;justify-content:center;align-items:center;height:100%}</style>
    </head><body>${tag}</body></html>`

  // The iframe renders the ad at its exact width/height with no padding, so
  // the footprint matches the real unit. A thin border just marks the bounds.
  return (
    <>
      <iframe
        ref={frameRef}
        title="advertisement"
        srcDoc={srcDoc}
        style={{
          width,
          height,
          maxWidth: '100%',
          display: 'block',
          margin: '0 auto',
          border: '1px solid #ddd',
        }}
        // allow-scripts: run the ad's JS. allow-popups(+escape): let popunder
        // formats open. allow-same-origin: many tags need it to load resources.
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      />
      {showStats && stats && (
        <div className="ad-slot__stats">
          {stats.reqs} requests · {stats.hosts} tracker {stats.hosts === 1 ? 'domain' : 'domains'}
        </div>
      )}
    </>
  )
}
