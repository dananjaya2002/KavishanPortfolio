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
        <Reveal className="about-profile" delay={120}>
          <img
            className="about-portrait"
            src="/images/profile image.jpg"
            alt="Danidu Kavishan"
            width={1024}
            height={1536}
            loading="lazy"
            decoding="async"
          />
          <div className="highlight-list">
            {about.highlights.map((item) => (
              <div className="highlight-item" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default About;
