import { useEffect, useState } from "react";
import { Icon } from "../iconMap.jsx";

function Footer({ profile }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 700);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="site-footer">
      <div>
        <strong>{profile.name}</strong>
        <span>Built with React, Vite, JSON, and a healthy respect for clean UI.</span>
      </div>
      <div className="footer-actions">
        <div className="social-links compact">
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
        <button
          className={`back-to-top ${isVisible ? "is-visible" : ""}`}
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Icon name="ArrowUpRight" />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
