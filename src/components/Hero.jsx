import { Icon } from "../iconMap.jsx";
import Reveal from "./Reveal.jsx";

function Hero({ profile, onResumeOpen }) {
  return (
    <section id="home" className="hero section">
      <div className="hero-orbits" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <Reveal className="hero-copy">
        <p className="availability"><span aria-hidden="true" /> Open to graduate roles and collaborations</p>
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
      <Reveal className="hero-visual" delay={120} aria-hidden="true">
        <div className="hero-monogram">DK</div>
        <div className="hero-visual-copy">
          <span>Based in Colombo, Sri Lanka</span>
          <strong>Building useful software across AI, mobile and web.</strong>
        </div>
      </Reveal>
    </section>
  );
}

export default Hero;
