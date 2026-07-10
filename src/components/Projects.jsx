import { useState } from "react";
import { Icon } from "../iconMap.jsx";
import Reveal from "./Reveal.jsx";
import SectionHeader from "./SectionHeader.jsx";

function Projects({ projects }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const orderedProjects = [...projects.items].sort(
    (a, b) => (a.homepageOrder ?? 99) - (b.homepageOrder ?? 99),
  );
  const homepageProjects = orderedProjects.filter((project) => project.homepageOrder).slice(0, 3);
  const filteredProjects =
    activeFilter === "all"
      ? orderedProjects
      : orderedProjects.filter((project) => project.filter === activeFilter);
  const visibleProjects = showAll ? filteredProjects : homepageProjects;

  const toggleAll = () => {
    setShowAll((current) => !current);
    setActiveFilter("all");
  };

  return (
    <section id="projects" className="section">
      <SectionHeader
        eyebrow="Selected work"
        title={projects.title}
        intro="Selected products and experiments across applied AI, mobile development and connected systems."
      >
        {showAll && <div className="filter-group" aria-label="Project filters">
          {projects.filters.map((filter) => (
            <button
              className={activeFilter === filter.value ? "is-active" : ""}
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>}
      </SectionHeader>
      <div className="projects-grid" id="projects-grid">
        {visibleProjects.map((project, index) => (
          <Reveal
            as="article"
            className={`project-card glass-card ${project.featured ? "is-featured" : ""}`}
            delay={index * 90}
            key={project.title}
          >
            <div className={`project-preview accent-${project.accent || "green"}`}>
              {project.image ? <img src={project.image} alt="" loading="lazy" /> : <span>{project.title.slice(0, 2).toUpperCase()}</span>}
              {project.featured && <strong>Featured</strong>}
            </div>
            <span className="project-category">{project.category}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tag-list">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="project-links">
              {project.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                  <Icon name={link.icon} size={18} />
                  {link.label}
                  <Icon name="ArrowUpRight" size={16} />
                </a>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
      {projects.items.length > 3 && (
        <div className="projects-toggle-wrap">
          <button
            className="button secondary"
            type="button"
            aria-expanded={showAll}
            aria-controls="projects-grid"
            onClick={toggleAll}
          >
            {showAll ? "Show selected projects" : "View all projects"}
            <Icon name={showAll ? "ArrowUp" : "ArrowDown"} size={18} />
          </button>
        </div>
      )}
    </section>
  );
}

export default Projects;
