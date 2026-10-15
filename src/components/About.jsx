import Reveal from "./Reveal.jsx";
import SectionHeader from "./SectionHeader.jsx";
import { Icon } from "../iconMap.jsx";

function About({ about, profile, onResumeOpen }) {
  return (
    <section id="about" className="section section-toned">
      <div className="about-layout">
        <Reveal className="about-profile">
          <img
            className="about-portrait"
            src={profile.portrait}
            alt={profile.name}
            width={1024}
            height={1536}
            loading="lazy"
            decoding="async"
          />
          <div className="portrait-caption">
            <span>{profile.name}</span>
            <span>{profile.location} <Icon name="ArrowUpRight" size={14} /></span>
          </div>
        </Reveal>
        <div className="about-copy">
          <SectionHeader number="02" eyebrow="Behind the code" title={about.title} />
          <Reveal>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <button className="text-link" type="button" onClick={onResumeOpen}>
              Read my resume <Icon name="ArrowUpRight" size={17} />
            </button>
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
      </div>
    </section>
  );
}

export default About;
