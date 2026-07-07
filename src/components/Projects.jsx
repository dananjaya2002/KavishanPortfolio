import { useState } from "react";
import { Icon } from "../iconMap.jsx";
import Reveal from "./Reveal.jsx";
import SectionHeader from "./SectionHeader.jsx";

function Projects({ projects }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const visibleProjects =
    activeFilter === "all"
      ? projects.items
      : projects.items.filter((project) => project.filter === activeFilter);

  return (
    <section id="projects" className="section">
      <SectionHeader
        eyebrow="Selected work"
        title={projects.title}
        intro="A compact look at projects across AI, mobile applications, IoT ideas, and web systems."
      >
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
      </SectionHeader>
      <div className="projects-grid">
        {visibleProjects.map((project, index) => (
          <Reveal
            as="article"
            className={`project-card glass-card ${project.featured ? "is-featured" : ""}`}
            delay={index * 90}
            key={project.title}
          >
            <div className={`project-preview accent-${project.accent || "green"}`}>
              {project.image ? <img src={project.image} alt="" loading="lazy" /> : <span>{project.title.slice(0, 2)}</span>}
              {project.featured && <strong>Featured</strong>}
            </div>
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
              {!project.links.some((link) => /demo/i.test(link.label)) && (
                <span className="demo-placeholder">Live demo not added yet</span>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Projects;
