import { useState } from "react";
import { Icon } from "../iconMap.jsx";

function Projects({ projects }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const visibleProjects =
    activeFilter === "all"
      ? projects.items
      : projects.items.filter((project) => project.filter === activeFilter);

  return (
    <section id="projects" className="section">
      <div className="section-heading project-heading">
        <div>
          <p className="eyebrow">Selected work</p>
          <h2>{projects.title}</h2>
        </div>
        <div className="filter-group" aria-label="Project filters">
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
        </div>
      </div>
      <div className="projects-grid">
        {visibleProjects.map((project) => (
          <article className="project-card" key={project.title}>
            <span className="project-category">{project.category}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tag-list">
              {project.tags.map((tag) => (
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
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
