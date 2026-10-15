import { Icon } from "../iconMap.jsx";
import DeveloperVisual from "./DeveloperVisual.jsx";
import Reveal from "./Reveal.jsx";

function Hero({ profile, onResumeOpen }) {
  return (
    <section id="home" className="hero section">
      <div className="hero-topline">
        <span><span className="status-dot" /> {profile.title}</span>
        <a href="#contact">{profile.location} <Icon name="ArrowUpRight" size={14} /></a>
      </div>
      <div className="hero-layout">
        <Reveal className="hero-copy">
          <p className="hero-intro">Hello, I’m {profile.name}.</p>
          <h1>
            {profile.hero.headline}<br />
            {profile.hero.subheading} <span>{profile.hero.emphasis}<span className="accent-period">.</span></span>
          </h1>
          <p className="hero-summary">{profile.summary}</p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">
              <Icon name="ArrowDown" />
              Explore my work
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
          <p className="hero-stack"><span>Built with intent.</span> {profile.hero.stack.join(" / ")}</p>
        </Reveal>
        <Reveal className="hero-visual" delay={120}>
          <DeveloperVisual />
        </Reveal>
      </div>
      <div className="hero-foot">
        <span>Engineering with curiosity. Designing with purpose.</span>
        <a href="#projects">Scroll to explore <Icon name="ArrowDown" size={15} /></a>
      </div>
    </section>
  );
}

export default Hero;
