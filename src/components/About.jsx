import Reveal from "./Reveal.jsx";
import SectionHeader from "./SectionHeader.jsx";

import { Icon } from "../iconMap.jsx";

function About({ about, onResumeOpen }) {
  return (
    <section id="about" className="section section-toned">
      <SectionHeader eyebrow="About" title={about.title} />
      <div className="about-layout">
        <Reveal className="about-copy">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <button className="text-link" type="button" onClick={onResumeOpen}>
            Read my resume <Icon name="ArrowUpRight" size={17} />
          </button>
        </Reveal>
        <Reveal className="highlight-list" delay={120}>
            {about.highlights.map((item) => (
              <div className="highlight-item" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
        </Reveal>
      </div>
    </section>
  );
}

export default About;
