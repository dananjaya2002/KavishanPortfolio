import Reveal from "./Reveal.jsx";

function SectionHeader({ number, eyebrow, title, intro, align = "left", children }) {
  return (
    <Reveal className={`section-heading ${align === "center" ? "is-centered" : ""}`}>
      <div>
        {eyebrow && <p className="eyebrow">{number && <span className="section-number">{number} /</span>}{eyebrow}</p>}
        <h2>{title}</h2>
        {intro && <p className="section-intro">{intro}</p>}
      </div>
      {children}
    </Reveal>
  );
}

export default SectionHeader;
