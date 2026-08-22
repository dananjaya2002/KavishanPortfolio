import { Icon } from "../iconMap.jsx";
import CodeEditorCard from "./CodeEditorCard.jsx";
import Reveal from "./Reveal.jsx";

function Hero({ profile, onResumeOpen }) {
  return (
    <section id="home" className="hero section">
      <Reveal className="hero-copy">
        <h1>{profile.name}</h1>
        <p className="hero-title">{profile.role}</p>
        <p className="hero-summary">{profile.summary}</p>
        <div className="hero-actions">
          <a className="button primary" href="#projects">
            <Icon name="ArrowDown" />
            View projects
          </a>
          <button className="button secondary" type="button" onClick={onResumeOpen}>
            <Icon name="FileText" />
            View resume
          </button>
        </div>
        <div className="social-links hero-socials">
          {profile.socials.map((social) => (
            <a key={social.href} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
              <Icon name={social.icon} />
            </a>
          ))}
        </div>
      </Reveal>
      <Reveal className="hero-editor" delay={120}>
        <CodeEditorCard />
      </Reveal>
    </section>
  );
}

export default Hero;
