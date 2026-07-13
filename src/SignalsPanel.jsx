import { useBrowserSignals } from './signals.js'

// The rows shown in the "what every ad just learned about you" panel,
// in the order they read on screen.
const FIELDS = [
  ['ip', 'Public IP'],
  ['geo', 'Location (from IP)'],
  ['isp', 'Internet provider'],
  ['os', 'Operating system'],
  ['browser', 'Browser'],
  ['architecture', 'CPU'],
  ['timezone', 'Timezone'],
  ['language', 'Language'],
  ['screen', 'Screen'],
  ['referrer', 'Came from'],
  ['cookies', 'Cookies'],
]

export default function SignalsPanel() {
  const signals = useBrowserSignals()

  return (
    <section className="signals">
      <h2>What every ad on this page just learned about you</h2>
      <p className="signals__note">
        None of this was typed in. It's read live from your browser the moment
        the page loads — the same signals each ad network below collects.
      </p>
      <dl className="signals__grid">
        {FIELDS.map(([key, label]) => (
          <div className="signals__row" key={key}>
            <dt>{label}</dt>
            <dd>{signals[key]}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
