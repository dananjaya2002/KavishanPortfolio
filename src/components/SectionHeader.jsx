import Reveal from "./Reveal.jsx";

function SectionHeader({ eyebrow, title, intro, align = "left", children }) {
  return (
    <Reveal className={`section-heading ${align === "center" ? "is-centered" : ""}`}>
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {intro && <p className="section-intro">{intro}</p>}
      </div>
      {children}
    </Reveal>
  );
}

export default SectionHeader;
