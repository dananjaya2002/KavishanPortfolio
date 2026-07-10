import { useEffect, useState } from "react";
import profile from "./data/profile.json";
import about from "./data/about.json";
import skills from "./data/skills.json";
import experience from "./data/experience.json";
import projects from "./data/projects.json";
import contact from "./data/contact.json";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
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
        <Projects projects={projects} />
        <Skills skills={skills} />
        <Experience experience={experience} />
        <About about={about} onResumeOpen={() => setIsResumeOpen(true)} />
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
