// AdSlot: drop-in placeholder for a network ad unit.
// Once you have an approved account, render the network's tag here
// (e.g. inject the <script>/<ins> markup) instead of the placeholder.
export default function AdSlot({ label = '[ ad unit goes here ]' }) {
  return <div className="ad-slot">{label}</div>
}
