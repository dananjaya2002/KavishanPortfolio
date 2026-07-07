import { useEffect, useState } from "react";
import { Icon } from "../iconMap.jsx";
import Reveal from "./Reveal.jsx";

function Hero({ profile, onResumeOpen }) {
  const [activeText, setActiveText] = useState(profile.title);

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index = (index + 1) % profile.typingText.length;
      setActiveText(profile.typingText[index]);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [profile.typingText]);

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
        <p className="hero-title">{activeText}</p>
        <p className="hero-role">{profile.role}</p>
        <p className="hero-summary">{profile.summary}</p>
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
              <Icon name={social.icon} />
            </a>
          ))}
        </div>
      </Reveal>
      <Reveal className="hero-panel glass-card" delay={120}>
        <div className="avatar-card">
          <span>DK</span>
          <p>Developer profile</p>
        </div>
        {profile.stats.map((stat) => (
          <div key={stat.label}>
            <span className="panel-label">{stat.label}</span>
            <strong>{stat.value}</strong>
          </div>
        ))}
        <div className="hero-metric">
          <strong>4</strong>
          <span>Featured projects</span>
        </div>
      </Reveal>
    </section>
  );
}

export default Hero;
