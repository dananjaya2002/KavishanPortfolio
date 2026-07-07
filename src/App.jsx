import { useEffect, useState } from "react";
import profile from "./data/profile.json";
import about from "./data/about.json";
import skills from "./data/skills.json";
import projects from "./data/projects.json";
import contact from "./data/contact.json";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import ResumeModal from "./components/ResumeModal.jsx";

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <Navbar
        brand={profile.brand}
        nav={profile.nav}
        theme={theme}
        onThemeToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <main>
        <Hero profile={profile} onResumeOpen={() => setIsResumeOpen(true)} />
        <About about={about} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Contact contact={contact} />
      </main>
      <footer className="site-footer">
        <span>{profile.name}</span>
        <span>Built with React, Vite, and JSON-managed content.</span>
      </footer>
      <ResumeModal
        resume={profile.resume}
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </>
  );
}

export default App;
