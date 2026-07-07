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
        <p className="eyebrow">Software Developer / Portfolio</p>
        <h1>{profile.name}</h1>
        <p className="hero-title">{profile.title}</p>
        <p className="hero-role">{profile.role}</p>
        <p className="hero-summary">{profile.summary}</p>
        <div className="hero-focus" aria-label="Main focus areas">
          {profile.focus.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="hero-actions">
          {profile.cta.map((item) => (
            <a key={item.href} className={`button ${item.variant}`} href={item.href}>
              <Icon name={item.icon} />
              {item.label}
            </a>
          ))}
          <button className="button secondary" type="button" onClick={onResumeOpen}>
            <Icon name="FileText" />
            {profile.resume.label}
          </button>
        </div>
        <div className="social-links hero-socials">
          {profile.socials.map((social) => (
            <a key={social.href} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
              {social.badge ? (
                <img className="social-badge" src={social.badge} alt={social.label} loading="lazy" />
              ) : (
                <Icon name={social.icon} />
              )}
            </a>
          ))}
        </div>
      </Reveal>
      <Reveal className="hero-panel compact glass-card" delay={120}>
        <span>DK</span>
        <strong>Clean software, practical systems, focused delivery.</strong>
      </Reveal>
    </section>
  );
}

export default Hero;
