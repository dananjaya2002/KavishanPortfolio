import Reveal from "./Reveal.jsx";
import SectionHeader from "./SectionHeader.jsx";

function About({ about }) {
  return (
    <section id="about" className="section">
      <SectionHeader eyebrow="Background" title={about.title} />
      <div className="about-layout">
        <Reveal className="about-copy">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
        <Reveal className="profile-stack" delay={120}>
          <div className="profile-card glass-card">
            <div className="profile-avatar">DK</div>
            <h3>Profile Snapshot</h3>
            <p>Curious builder, AI explorer, and mobile/web developer based in Sri Lanka.</p>
          </div>
          <div className="highlight-list glass-card">
            {about.highlights.map((item) => (
              <div className="highlight-item" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <Reveal className="about-extra" delay={180}>
        <div className="glass-card">
          <h3>Technologies I enjoy</h3>
          <div className="tag-list">
            {about.techInterests.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
        <div className="glass-card">
          <h3>Interesting facts</h3>
          <ul>
            {about.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

export default About;
