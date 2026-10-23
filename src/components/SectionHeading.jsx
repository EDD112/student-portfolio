export default function SectionHeading({ id, number, eyebrow, title, intro }) {
  return (
    <header className="section-heading">
      <p className="eyebrow">
        <span className="eyebrow__num" aria-hidden="true">
          {number}
        </span>
        {eyebrow}
      </p>
      <h2 id={id} className="section-heading__title">
        {title}
      </h2>
      {intro && <p className="section-heading__intro">{intro}</p>}
    </header>
  )
}
