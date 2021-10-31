import SbEditable from "storyblok-react";

const Page = ({ blok }) => (
  <main>
    {blok.body
      ? blok.body.map((blok) => (
          <DynamicComponent blok={blok} key={blok._uid} />
        ))
      : null}
  </main>
);

const Teaser = ({ blok }) => {
  return <h2>{blok.headline}</h2>;
};

const Grid = ({ blok }) => {
  return (
    <div className="grid">
      {blok.columns.map((blok) => (
        <DynamicComponent blok={blok} key={blok._uid} />
      ))}
    </div>
  );
};

const Feature = ({ blok }) => <div className="column feature">{blok.name}</div>;

// resolve Storyblok components to Next.js components
const Components = {
  teaser: Teaser,
  grid: Grid,
  feature: Feature,
  page: Page,
};

export default function DynamicComponent({ blok }) {
  // check if component is defined above
  if (typeof Components[blok.component] !== "undefined") {
    const Component = Components[blok.component];
    // wrap with SbEditable for visual editing
    return (
      <SbEditable content={blok}>
        <Component blok={blok} />
      </SbEditable>
    );
  }

  // fallback if the component doesn't exist
  return (
    <p>
      The component <strong>{blok.component}</strong> has not been created yet.
    </p>
  );
}
