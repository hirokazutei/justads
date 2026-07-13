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

      <AdSlot />

      <article>
        <h2>Placeholder Article One</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </article>

      <AdSlot />

      <article>
        <h2>Placeholder Article Two</h2>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </article>

      <AdSlot />
    </>
  )
}
