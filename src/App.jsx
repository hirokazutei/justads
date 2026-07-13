import { useEffect } from 'react'
import { networks } from './networks.js'
import { useThirdPartyHosts } from './signals.js'
import SignalsPanel from './SignalsPanel.jsx'
import NetworkRow from './NetworkRow.jsx'

export default function App() {
  const observedHosts = useThirdPartyHosts()

  // Some ad formats rewrite document.title as clickbait. Keep the tab pinned
  // to the site's own title as a defensive measure.
  useEffect(() => {
    const title = 'just ads'
    document.title = title
    const el = document.querySelector('title')
    if (!el) return
    const obs = new MutationObserver(() => {
      if (document.title !== title) document.title = title
    })
    obs.observe(el, { childList: true })
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <header className="site-head">
        <h1>just ads</h1>
        <p>
          A page that shows you exactly what online ads extract from you — using
          the live ads on this very page as the evidence.
        </p>
      </header>

      <SignalsPanel />

      <section className="networks">
        <h2>The networks</h2>
        <p className="networks__note">
          One row per ad network serving here. Each shows what it tracks, what it
          serves back, the tracker domains it fired, and its live ad units.
        </p>
        {networks.map((n) => (
          <NetworkRow
            key={n.id}
            network={n}
            observedHosts={observedHosts}
            attributeAll={networks.length === 1}
          />
        ))}
      </section>

      <footer className="site-foot">
        <p>
          Educational sandbox. Ads are real and served live; creatives rotate and
          may include high-risk offers typical of low-barrier ad networks.
        </p>
      </footer>
    </>
  )
}
