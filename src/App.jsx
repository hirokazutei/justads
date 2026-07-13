import AdSlot from './AdSlot.jsx'

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

      {/*
        Each AdSlot below is sized to one Adsterra unit you created.
        To go live, paste that unit's tag markup into its `tag` prop:
          <AdSlot width={728} height={90} tag={`<script ...></script>`} />
        Leaving `tag` off renders the sized dashed placeholder.
        (Social Bar is an overlay — its script lives in index.html, not here.)
      */}

      {/* Banner — 728x90 leaderboard */}
      <AdSlot width={728} height={90} label="[ banner 728×90 ]" />

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
      <AdSlot width={300} height={250} label="[ banner 300×250 ]" />

      <article>
        <h2>Placeholder Article Two</h2>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </article>

      {/* Banner — 160x600 skyscraper */}
      <AdSlot width={160} height={600} label="[ banner 160×600 ]" />

      <article>
        <h2>Placeholder Article Three</h2>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
          veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
      </article>

      {/* Native Banner — blends with content; sized loosely, it flows to fit */}
      <AdSlot height={250} label="[ native banner ]" />
    </>
  )
}
