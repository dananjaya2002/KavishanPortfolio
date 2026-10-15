import { Icon } from "../iconMap.jsx";
import Reveal from "./Reveal.jsx";

function ProjectCard({ project, index, variant, onOpen, reveal = true }) {
  const Card = reveal ? Reveal : "article";
  const primaryTags = project.primaryTags || project.tags;
  const visibleTags = primaryTags.slice(0, 3);

  return (
    <Card
      {...(reveal ? { as: "article", delay: Math.min(index, 3) * 70 } : {})}
      className={`project-card project-card-${variant} ${project.featured ? "is-featured" : ""}`}
    >
      <div className={`project-preview accent-${project.accent || "green"}`}>
        {project.image ? (
          <img src={project.image} alt={`${project.title} cover`} loading="lazy" />
        ) : (
          <span aria-hidden="true">{project.previewLabel || project.title.slice(0, 2).toUpperCase()}</span>
        )}
        <span className="project-preview-action" aria-hidden="true">
          <span><Icon name={project.video ? "Play" : "ArrowUpRight"} size={20} /></span>
        </span>
        {project.featured && <strong>Featured</strong>}
      </div>

      <div className="project-card-content">
        <span className="project-category"><span className="project-number">{String(project.homepageOrder || index + 1).padStart(2, "0")} /</span>{project.category}</span>
        <h3>{project.title}</h3>
        {project.role && <span className="project-role">{project.role}</span>}
        <p>{project.description}</p>
        <div className="tag-list" aria-label="Key technologies">
          {visibleTags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <button className="project-card-open" type="button" aria-label={`View project: ${project.title}`} onClick={() => onOpen(project)}>
          View project
          <Icon name="ArrowUpRight" size={17} />
        </button>
      </div>
    </Card>
  );
}

export default ProjectCard;
