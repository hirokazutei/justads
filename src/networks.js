// Ad-network registry. Each entry describes one network you've signed up for:
// what it tracks, what it serves back, and the live ad units it renders.
//
// To add a network: sign up, create units, then append an object here with its
// tags. The table + rows on the page are generated from this array — no other
// file needs to change.

const adsterra = {
  id: 'adsterra',
  name: 'Adsterra',
  site: 'adsterra.com',
  approval: 'Near-instant, no traffic minimum',
  // Base domains known to belong to this network, used to attribute observed
  // third-party requests once more than one network is on the page.
  matchHosts: [
    'highperformanceformat.com',
    'effectivecpmnetwork.com',
    'show-sb.com',
    'storageimagedisplay.com',
  ],
  // Verified by decoding this network's real requests + impression beacon.
  tracks: [
    'Persistent UUID (cross-site identity)',
    'Device fingerprint hash',
    'Public IP → country / city / ISP',
    'Full User-Agent string',
    'Client Hints: CPU arch, exact browser + OS version',
    'Timezone',
    'Referrer URL',
    'Page keywords (scraped from your content)',
  ],
  provides: [
    'RTB display ads: banner, native, overlay',
    'Auto-rotating creatives per impression',
    'No domain-origin enforcement (tag serves anywhere)',
  ],
  // Observed by watching each unit's traffic over time after render.
  behavior:
    'All data exchange is front-loaded at render — no continuous beaconing was observed over an 18-second window. Creatives rotate per page load, not passively. The Native Banner is by far the heaviest unit (~11 requests across 3 tracker domains vs 3–4 for standard banners), and every slot contacts its own separate randomly-named tracking domain.',
  units: [
    {
      format: 'Banner 728×90',
      width: 728,
      height: 90,
      tag: `
<script type="text/javascript">
  atOptions = { 'key':'ef6791bb7b8d023daa545099abcca74d','format':'iframe','height':90,'width':728,'params':{} };
</script>
<script src="https://www.highperformanceformat.com/ef6791bb7b8d023daa545099abcca74d/invoke.js"></script>`,
    },
    {
      format: 'Banner 300×250',
      width: 300,
      height: 250,
      tag: `
<script type="text/javascript">
  atOptions = { 'key':'3958139816910cb89665d522622292bc','format':'iframe','height':250,'width':300,'params':{} };
</script>
<script src="https://www.highperformanceformat.com/3958139816910cb89665d522622292bc/invoke.js"></script>`,
    },
    {
      format: 'Banner 160×600',
      width: 160,
      height: 600,
      tag: `
<script type="text/javascript">
  atOptions = { 'key':'df3f76c1a21533004f9970f91ae61e62','format':'iframe','height':600,'width':160,'params':{} };
</script>
<script src="https://www.highperformanceformat.com/df3f76c1a21533004f9970f91ae61e62/invoke.js"></script>`,
    },
    {
      format: 'Native Banner',
      height: 300,
      tag: `
<script async="async" data-cfasync="false" src="https://pl30342350.effectivecpmnetwork.com/ffc93e0712ad660ba58d1dae1be64bda/invoke.js"></script>
<div id="container-ffc93e0712ad660ba58d1dae1be64bda"></div>`,
    },
    {
      format: 'Banner 160×300',
      width: 160,
      height: 300,
      tag: `
<script type="text/javascript">
  atOptions = { 'key':'cfbf85ec45e374fb8b102e9ce91b7851','format':'iframe','height':300,'width':160,'params':{} };
</script>
<script src="https://www.highperformanceformat.com/cfbf85ec45e374fb8b102e9ce91b7851/invoke.js"></script>`,
    },
    {
      format: 'Banner 468×60',
      width: 468,
      height: 60,
      tag: `
<script type="text/javascript">
  atOptions = { 'key':'57bcfa127e19ad1f524827b8a2ef3681','format':'iframe','height':60,'width':468,'params':{} };
</script>
<script src="https://www.highperformanceformat.com/57bcfa127e19ad1f524827b8a2ef3681/invoke.js"></script>`,
    },
    {
      format: 'Banner 320×50',
      width: 320,
      height: 50,
      tag: `
<script type="text/javascript">
  atOptions = { 'key':'29bf1932a6457263856353d62e03870a','format':'iframe','height':50,'width':320,'params':{} };
</script>
<script src="https://www.highperformanceformat.com/29bf1932a6457263856353d62e03870a/invoke.js"></script>`,
    },
  ],
}

export const networks = [adsterra]
