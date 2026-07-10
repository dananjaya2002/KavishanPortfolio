import { Icon } from "../iconMap.jsx";
import Reveal from "./Reveal.jsx";
import SectionHeader from "./SectionHeader.jsx";

function Experience({ experience }) {
  return (
    <section id="experience" className="section section-toned">
      <SectionHeader eyebrow="Experience" title={experience.title} intro={experience.intro} />
      <div className="timeline">
        {experience.items.map((item, index) => (
          <Reveal as="article" className="timeline-item" delay={index * 90} key={`${item.title}-${item.company}`}>
            <div className="timeline-marker" aria-hidden="true">
              <Icon name="Workflow" size={18} />
            </div>
            <div className="timeline-card glass-card">
              <div className="timeline-topline">
                <span>{item.dates}</span>
                <span>{item.location}</span>
              </div>
              <h3>{item.title}</h3>
              <p className="timeline-company">{item.company}</p>
              <p>{item.description}</p>
              <div className="tag-list">
                {item.technologies.slice(0, 3).map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Experience;
