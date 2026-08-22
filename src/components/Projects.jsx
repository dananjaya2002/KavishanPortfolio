import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "../iconMap.jsx";
import ProjectCard from "./ProjectCard.jsx";
import ProjectDetailsModal from "./ProjectDetailsModal.jsx";
import SectionHeader from "./SectionHeader.jsx";

function projectUrl(slug) {
  const url = new URL(window.location.href);
  url.searchParams.set("project", slug);
  url.hash = "projects";
  return url;
}

function Projects({ projects }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const openedInternallyRef = useRef(false);
  const orderedProjects = useMemo(
    () => [...projects.items].sort((a, b) => (a.homepageOrder ?? 99) - (b.homepageOrder ?? 99)),
    [projects.items],
  );
  const homepageProjects = orderedProjects.filter((project) => project.homepageOrder).slice(0, 3);
  const filteredProjects = activeFilter === "all"
    ? orderedProjects
    : orderedProjects.filter((project) => project.filter === activeFilter);
  const visibleProjects = showAll ? filteredProjects : homepageProjects;
  const selectedIndex = selectedProject
    ? orderedProjects.findIndex((project) => project.slug === selectedProject.slug)
    : -1;
  const previousProject = selectedIndex > 0 ? orderedProjects[selectedIndex - 1] : null;
  const nextProject = selectedIndex >= 0 && selectedIndex < orderedProjects.length - 1
    ? orderedProjects[selectedIndex + 1]
    : null;

  useEffect(() => {
    const syncFromUrl = () => {
      const url = new URL(window.location.href);
      const slug = url.searchParams.get("project");
      const match = slug ? orderedProjects.find((project) => project.slug === slug) : null;
      if (slug && !match) {
        url.searchParams.delete("project");
        window.history.replaceState(window.history.state, "", url);
      }
      openedInternallyRef.current = Boolean(window.history.state?.projectModal);
      setSelectedProject(match || null);
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [orderedProjects]);

  const openProject = useCallback((project) => {
    const url = projectUrl(project.slug);
    window.history.pushState({ ...window.history.state, projectModal: true }, "", url);
    openedInternallyRef.current = true;
    setSelectedProject(project);
  }, []);

  const navigateProject = useCallback((project) => {
    if (!project) return;
    const url = projectUrl(project.slug);
    window.history.replaceState({ ...window.history.state, projectModal: openedInternallyRef.current }, "", url);
    setSelectedProject(project);
  }, []);

  const closeProject = useCallback(() => {
    if (openedInternallyRef.current && window.history.state?.projectModal) {
      window.history.back();
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.delete("project");
    window.history.replaceState(window.history.state, "", url);
    setSelectedProject(null);
  }, []);

  const toggleAll = () => {
    setShowAll((current) => !current);
    setActiveFilter("all");
  };

  return (
    <section id="projects" className="section">
      <SectionHeader eyebrow="Selected work" title={projects.title} intro="Selected products and experiments across applied AI, mobile development and connected systems.">
        {showAll && (
          <div className="filter-group" aria-label="Project filters">
            {projects.filters.map((filter) => (
              <button className={activeFilter === filter.value ? "is-active" : ""} key={filter.value} type="button" onClick={() => setActiveFilter(filter.value)}>
                {filter.label}
              </button>
            ))}
          </div>
        )}
      </SectionHeader>

      <div className="projects-grid" id="projects-grid">
        {visibleProjects.map((project, index) => {
          const variant = project.homepageOrder === 1 ? "primary" : project.homepageOrder <= 3 ? "featured" : "standard";
          return <ProjectCard project={project} index={index} variant={variant} onOpen={openProject} key={project.slug} />;
        })}
      </div>

      {projects.items.length > 3 && (
        <div className="projects-toggle-wrap">
          <button className="button secondary" type="button" aria-expanded={showAll} aria-controls="projects-grid" onClick={toggleAll}>
            {showAll ? "Show selected projects" : "View all projects"}
            <Icon name={showAll ? "ArrowUp" : "ArrowDown"} size={18} />
          </button>
        </div>
      )}

      <ProjectDetailsModal
        project={selectedProject}
        previousProject={previousProject}
        nextProject={nextProject}
        shareUrl={selectedProject ? projectUrl(selectedProject.slug).toString() : ""}
        onNavigate={navigateProject}
        onClose={closeProject}
      />
    </section>
  );
}

export default Projects;
