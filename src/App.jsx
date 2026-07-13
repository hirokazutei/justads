import AdSlot from './AdSlot.jsx'

// --- Adsterra ad-unit tags -------------------------------------------------
// Each string is the raw markup Adsterra generated for one unit. They render
// inside AdSlot's sandboxed iframe. Real ads only serve once justads.click is
// approved and live — expect these to be blank on localhost.

const banner728x90 = `
<script type="text/javascript">
  atOptions = {
    'key' : 'ef6791bb7b8d023daa545099abcca74d',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highperformanceformat.com/ef6791bb7b8d023daa545099abcca74d/invoke.js"></script>`

const banner300x250 = `
<script type="text/javascript">
  atOptions = {
    'key' : '3958139816910cb89665d522622292bc',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script src="https://www.highperformanceformat.com/3958139816910cb89665d522622292bc/invoke.js"></script>`

const nativeBanner = `
<script async="async" data-cfasync="false" src="https://pl30342350.effectivecpmnetwork.com/ffc93e0712ad660ba58d1dae1be64bda/invoke.js"></script>
<div id="container-ffc93e0712ad660ba58d1dae1be64bda"></div>`

export default function App() {
  return (
    <>
      <h1>justads</h1>
      <p>
        <em>
          Sandbox site for studying how a low-barrier ad network's units render,
          load, and behave. Not for real traffic.
        </em>
      </p>

      {/* Banner — 728x90 leaderboard */}
      <AdSlot width={728} height={90} tag={banner728x90} label="[ banner 728×90 ]" />

      <article>
        <h2>Placeholder Article One</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </article>

      {/* Banner — 300x250 medium rectangle */}
      <AdSlot width={300} height={250} tag={banner300x250} label="[ banner 300×250 ]" />

      <article>
        <h2>Placeholder Article Two</h2>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </article>

      {/* Banner — 160x600 skyscraper (no tag yet) */}
      <AdSlot width={160} height={600} label="[ banner 160×600 ]" />

      <article>
        <h2>Placeholder Article Three</h2>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
          veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
      </article>

      {/* Native Banner — blends with content */}
      <AdSlot height={300} tag={nativeBanner} label="[ native banner ]" />
    </>
  )
}
