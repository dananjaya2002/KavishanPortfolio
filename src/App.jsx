import { useEffect, useState } from "react";
import profile from "./data/profile.json";
import about from "./data/about.json";
import skills from "./data/skills.json";
import experience from "./data/experience.json";
import projects from "./data/projects.json";
import contact from "./data/contact.json";
import engineeringModes from "./data/engineeringModes.json";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ResumeModal from "./components/ResumeModal.jsx";
import { BootIntro } from "./components/StudioEffects.jsx";

function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("theme") === "light" ? "light" : "dark"; }
    catch { return "dark"; }
  });
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [engineeringMode, setEngineeringMode] = useState(() => {
    try {
      const saved = localStorage.getItem("engineering-mode");
      return engineeringModes.some((mode) => mode.id === saved) ? saved : engineeringModes[0].id;
    } catch { return engineeringModes[0].id; }
  });

  useEffect(() => {
    document.documentElement.dataset.engineeringMode = engineeringMode;
    try { localStorage.setItem("engineering-mode", engineeringMode); } catch { /* Selection still works without storage. */ }
  }, [engineeringMode]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#060C18" : "#f2f8fc");
    try { localStorage.setItem("theme", theme); } catch { /* Theme still works when browser storage is unavailable. */ }
  }, [theme]);

  return (
    <>
      <BootIntro />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar
        brand={profile.brand}
        nav={profile.nav}
        theme={theme}
        onThemeToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
        onResumeOpen={() => setIsResumeOpen(true)}
      />
      <main id="main-content" tabIndex={-1}>
        <Hero profile={profile} engineeringMode={engineeringMode} onEngineeringModeChange={setEngineeringMode} onResumeOpen={() => setIsResumeOpen(true)} />
        <Projects projects={projects} />
        <About about={about} profile={profile} onResumeOpen={() => setIsResumeOpen(true)} />
        <Experience experience={experience} />
        <Skills skills={skills} />
        <Contact contact={contact} />
      </main>
      <Footer profile={profile} />
      <ResumeModal
        resume={profile.resume}
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </>
  );
}

export default App;
