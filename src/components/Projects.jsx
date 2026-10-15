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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [page, setPage] = useState(1);
  const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 768px)").matches);
  const [hoverReady, setHoverReady] = useState(false);
  const [presentation, setPresentation] = useState({ key: "", items: [], phase: "idle" });
  const directionRef = useRef(1);
  const openedInternallyRef = useRef(false);
  const orderedProjects = useMemo(
    () => [...projects.items].sort((a, b) => (a.homepageOrder ?? 99) - (b.homepageOrder ?? 99)),
    [projects.items],
  );
  const homepageProjects = orderedProjects.filter((project) => project.homepageOrder).slice(0, 4);
  const categoryProjects = activeFilter === "all"
    ? orderedProjects
    : orderedProjects.filter((project) => project.filters.includes(activeFilter));
  const query = searchTerm.trim().toLowerCase();
  const filteredProjects = categoryProjects.filter((project) => !query ||
    [project.title, project.description, ...project.tags].join(" ").toLowerCase().includes(query));
  const collection = showAll || query ? filteredProjects : homepageProjects;
  const pageSize = mobile ? 2 : 4;
  const pageCount = Math.max(1, Math.ceil(collection.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * pageSize;
  const targetProjects = collection.slice(start, start + pageSize);
  const presentationKey = `${pageSize}:${targetProjects.map((project) => project.slug).join(",")}`;
  const visibleProjects = presentation.items;
  const rows = Array.from({ length: Math.ceil(visibleProjects.length / 2) }, (_, row) => visibleProjects.slice(row * 2, row * 2 + 2));

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const resize = () => { setMobile(media.matches); setPage(1); };
    media.addEventListener("change", resize);
    return () => media.removeEventListener("change", resize);
  }, []);

  useEffect(() => {
    const items = collection.slice(start, start + pageSize);
    setHoverReady(false);
    if (!presentation.key || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPresentation({ key: presentationKey, items, phase: "idle" });
      return;
    }
    setPresentation((current) => ({ ...current, phase: "exit" }));
    const swap = window.setTimeout(() => setPresentation({ key: presentationKey, items, phase: "enter" }), 150);
    const finish = window.setTimeout(() => setPresentation((current) => ({ ...current, phase: "idle" })), 330);
    return () => { window.clearTimeout(swap); window.clearTimeout(finish); };
    // The key encodes the complete rendered slice, including responsive page size.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presentationKey]);

  const changePage = (next) => {
    directionRef.current = next > currentPage ? 1 : -1;
    setPage(next);
  };
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
    setPage(1);
    setShowAll((current) => !current);
    setActiveFilter("all");
    setSearchTerm("");
  };

  const selectFilter = (value) => {
    setPage(1);
    setActiveFilter(value);
    setShowAll(true);
  };

  return (
    <section id="projects" className="section">
      <SectionHeader number="01" eyebrow="Selected work" title={projects.title} intro="Products, platforms, and experiments. Each one, a problem worth solving." />
      <label className="project-search">
        <span>Search the collection</span>
        <input type="search" placeholder="Project, technology, or idea…" value={searchTerm} onChange={(event) => { setSearchTerm(event.target.value); setPage(1); setShowAll(true); }} />
        <Icon name="ArrowUpRight" size={17} />
      </label>
      <div className="filter-group" aria-label="Project filters">
        {projects.filters.map((filter) => (
          <button
            className={activeFilter === filter.value ? "is-active" : ""}
            key={filter.value}
            type="button"
            aria-pressed={activeFilter === filter.value}
            onClick={() => selectFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="project-showcase" data-hover-ready={hoverReady}>
      <div className={`projects-grid page-${presentation.phase}`} id="projects-grid" aria-busy={presentation.phase !== "idle"} inert={presentation.phase === "exit" ? "" : undefined} style={{ "--page-direction": directionRef.current }} onPointerMove={() => setHoverReady(true)} onPointerLeave={() => setHoverReady(false)}>
        {rows.map((row) => (
          <div className="spotlight-row" key={row.map((project) => project.slug).join("-")}>
            {row.map((project) => (
              <ProjectCard project={project} index={orderedProjects.indexOf(project)} variant={project.homepageOrder <= 4 ? "featured" : "standard"} onOpen={openProject} key={project.slug} reveal={false} />
            ))}
          </div>
        ))}
      </div>
      {visibleProjects.length === 0 && <p className="projects-empty" role="status">No projects match this search. Try another technology or category.</p>}
      </div>

      <div className="project-pagination">
        <p className="collection-count" role="status" aria-live="polite" aria-atomic="true">
          {collection.length ? `Showing ${start + 1}–${Math.min(start + pageSize, collection.length)} of ${collection.length} projects` : "No matching projects"}
        </p>
        <div className="pagination-slot">
        {pageCount > 1 && <nav className="pagination-buttons" aria-label="Project pages">
          <button type="button" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)} aria-controls="projects-grid">Previous</button>
          <span className="page-numbers">{Array.from({ length: pageCount }, (_, index) => <button type="button" key={index} aria-label={`Project page ${index + 1}`} aria-current={currentPage === index + 1 ? "page" : undefined} onClick={() => changePage(index + 1)} aria-controls="projects-grid">{index + 1}</button>)}</span>
          <button type="button" disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)} aria-controls="projects-grid">Next</button>
        </nav>}
        </div>
          <button className="button secondary" type="button" aria-expanded={showAll} aria-controls="projects-grid" onClick={toggleAll}>
            {showAll ? "Return to Featured Projects" : "Browse All Projects"}
            <Icon name={showAll ? "ArrowUp" : "ArrowDown"} size={18} />
          </button>
      </div>

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
