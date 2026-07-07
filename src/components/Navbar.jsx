import { useEffect, useState } from "react";
import { Icon } from "../iconMap.jsx";

function Navbar({ brand, nav, theme, onThemeToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState(nav[0]?.href || "#home");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = nav.map((item) => document.querySelector(item.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveHref(`#${visibleEntry.target.id}`);
        }
      },
      { threshold: [0.25, 0.45, 0.65], rootMargin: "-18% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [nav]);

  return (
    <header className={`navbar ${isScrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href="#home" onClick={() => setIsOpen(false)}>
        <span className="brand-mark">
          <Icon name="Code2" size={18} />
        </span>
        {brand}
      </a>
      <button
        className="icon-button menu-button"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        <Icon name={isOpen ? "X" : "Menu"} />
      </button>
      <nav className={`nav-links ${isOpen ? "is-open" : ""}`} aria-label="Primary navigation">
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={activeHref === item.href ? "is-active" : ""}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <button
          className="icon-button theme-button"
          type="button"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          onClick={onThemeToggle}
        >
          <Icon name={theme === "dark" ? "Sun" : "Moon"} />
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
