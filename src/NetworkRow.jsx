import AdSlot from './AdSlot.jsx'

// One network's row: what it tracks, what it serves, the trackers it fired,
// and its live ad units rendered as evidence.
export default function NetworkRow({ network, observedHosts, attributeAll }) {
  // Attribute observed third-party hosts to this network by its known base
  // domains. These networks also fire many randomly-named tracking domains that
  // no static list can catch, so when this is the only network on the page we
  // attribute every third-party host to it (they're all part of its chain).
  const matched = observedHosts.filter((h) =>
    network.matchHosts.some((base) => h.includes(base)),
  )
  const hosts = attributeAll ? observedHosts : matched

  return (
    <section className="network">
      <header className="network__head">
        <div>
          <h3>{network.name}</h3>
          <span className="network__site">{network.site}</span>
        </div>
        <span className="network__meta">
          {network.units.length} formats · {hosts.length} trackers fired ·{' '}
          {network.tracks.length} data points
        </span>
      </header>

      <p className="network__approval">Approval bar: {network.approval}</p>

      <div className="network__cols">
        <div>
          <h4>What it tracks</h4>
          <ul>
            {network.tracks.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>What it provides</h4>
          <ul>
            {network.provides.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>

      <details className="network__trackers">
        <summary>Tracker domains observed this page load ({hosts.length})</summary>
        <ul>
          {hosts.length ? (
            hosts.map((h) => <li key={h}><code>{h}</code></li>)
          ) : (
            <li>None observed yet — reload to capture the tracker chain.</li>
          )}
        </ul>
      </details>

      <div className="network__ads">
        <h4>Live units</h4>
        <div className="network__adgrid">
          {network.units.map((u) => (
            <figure className="network__ad" key={u.format}>
              <AdSlot width={u.width} height={u.height} tag={u.tag} label={`[ ${u.format} ]`} />
              <figcaption>{u.format}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
