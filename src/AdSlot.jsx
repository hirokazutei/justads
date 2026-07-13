// AdSlot: renders a network ad unit inside a sandboxed iframe.
//
// Pass the raw markup your ad network gives you (the <script>/<ins> block)
// as the `tag` prop. Rendering it inside an iframe isolates the ad's script
// from your React DOM and supports document.write-based tags, which most
// low-barrier networks (Adsterra, PropellerAds, etc.) still use.
//
// With no `tag`, it falls back to the dashed placeholder.
export default function AdSlot({
  tag,
  width = '100%',
  height = 250,
  label = '[ ad unit goes here ]',
}) {
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

  return (
    <iframe
      className="ad-slot"
      title="advertisement"
      srcDoc={srcDoc}
      style={{ width, height, display: 'block' }}
      // allow-scripts: run the ad's JS. allow-popups(+escape): let popunder
      // formats open. allow-same-origin: many tags need it to load resources.
      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
    />
  )
}
