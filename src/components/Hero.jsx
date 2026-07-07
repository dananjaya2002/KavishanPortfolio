import { useEffect, useState } from "react";
import { Icon } from "../iconMap.jsx";

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
      <div className="hero-copy">
        <p className="eyebrow">Portfolio / Computer Science</p>
        <h1>{profile.name}</h1>
        <p className="hero-title">{activeText}</p>
        <p className="hero-summary">
          Building practical software across AI, mobile apps, and web systems with a focus on
          clear user experiences and real-world problem solving.
        </p>
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
      </div>
      <div className="hero-panel" aria-label="Portfolio highlights">
        <div>
          <span className="panel-label">Current focus</span>
          <strong>Machine Learning + Mobile Experiences</strong>
        </div>
        <div>
          <span className="panel-label">Project stack</span>
          <strong>Python / Flutter / Firebase / React</strong>
        </div>
        <div className="hero-metric">
          <strong>4</strong>
          <span>Featured projects</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
