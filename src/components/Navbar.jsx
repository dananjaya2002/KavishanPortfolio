import { useEffect, useState } from "react";
import { Icon } from "../iconMap.jsx";

function Navbar({ brand, nav, theme, onThemeToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href="#home" onClick={() => setIsOpen(false)}>
        <Icon name="Code2" size={22} />
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
          <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
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
