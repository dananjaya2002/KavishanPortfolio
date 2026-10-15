import { Icon } from "../iconMap.jsx";
import Reveal from "./Reveal.jsx";
import SectionHeader from "./SectionHeader.jsx";

function Experience({ experience }) {
  return (
    <section id="experience" className="section section-toned">
      <SectionHeader number="03" eyebrow="The journey" title={experience.title} intro={experience.intro} />
      <div className="timeline">
        {experience.items.map((item, index) => (
          <Reveal as="article" className="timeline-item" delay={index * 90} key={`${item.title}-${item.company}-${item.dates}`}>
            <div className="timeline-marker" aria-hidden="true">
              <Icon name="Workflow" size={18} />
            </div>
            <div className="timeline-card glass-card">
              <div className="timeline-topline">
                <span>{item.dates}</span>
                <span>{item.location}</span>
              </div>
              <div className="timeline-position">
                <h3>
                  <span className="experience-role">{item.title}</span>
                  {item.employmentType && <span className="employment-type"> · {item.employmentType}</span>}
                </h3>
                <p className="timeline-company">{item.company}</p>
              </div>
              <div className="timeline-description">
                <p>{item.description}</p>
                {item.achievements?.length > 0 && (
                  <ul>
                    {item.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="tag-list">
                {item.technologies.slice(0, 5).map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      {experience.education && (
        <Reveal as="article" className="education-card">
          <div><p className="eyebrow">Education</p><span>{experience.education.dates}</span></div>
          <div>
            <h3>{experience.education.degree}</h3>
            <strong>{experience.education.classification}</strong>
            <p>{experience.education.institution}</p>
          </div>
        </Reveal>
      )}
    </section>
  );
}

export default Experience;
