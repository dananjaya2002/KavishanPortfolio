import { Icon } from "../iconMap.jsx";
import DeveloperVisual from "./DeveloperVisual.jsx";
import Reveal from "./Reveal.jsx";
import { HeadlineText, useStudioPointer } from "./StudioEffects.jsx";

function Hero({ profile, engineeringMode, onEngineeringModeChange, onResumeOpen }) {
  const spotlightRef = useStudioPointer();
  return (
    <section ref={spotlightRef} id="home" className="hero section">
      <div className="hero-layout">
        <Reveal className="hero-copy">
          <p className="hero-identity">{profile.hero.identity}</p>
          <h1 aria-label={profile.name}><span aria-hidden="true"><HeadlineText text={profile.name} /></span></h1>
          <p className="hero-headline">{profile.hero.headline}</p>
          <p className="hero-summary">{profile.hero.summary}</p>
          <div className="hero-actions">
            <a className="button primary" href="#projects"><Icon name="ArrowDown" />Explore Work</a>
            <button className="button secondary" type="button" onClick={onResumeOpen}><Icon name="FileText" />View Resume</button>
          </div>
          <div className="social-links hero-socials" aria-label="Social profiles">
            {profile.socials.map((social) => (
              <a key={social.href} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}><Icon name={social.icon} size={18} /></a>
            ))}
          </div>
        </Reveal>
        <Reveal className="hero-visual" delay={120}>
          <DeveloperVisual engineeringMode={engineeringMode} onEngineeringModeChange={onEngineeringModeChange} />
        </Reveal>
      </div>
    </section>
  );
}

export default Hero;
