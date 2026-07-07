import { Icon } from "../iconMap.jsx";
import Reveal from "./Reveal.jsx";
import SectionHeader from "./SectionHeader.jsx";

function Skills({ skills }) {
  return (
    <section id="skills" className="section">
      <SectionHeader
        eyebrow="Capabilities"
        title={skills.title}
        intro={skills.intro}
      />
      <div className="skills-grid">
        {skills.categories.map((category, index) => (
          <Reveal as="article" className="skill-card glass-card" delay={index * 70} key={category.title}>
            <div className="card-title">
              <Icon name={category.icon} />
              <h3>{category.title}</h3>
            </div>
            <div className="skill-list">
              {category.skills.map((skill) => (
                <div className="skill-row" key={skill.name}>
                  {skill.badge ? (
                    <img className="shield-badge" src={skill.badge} alt={skill.name} loading="lazy" />
                  ) : (
                    <>
                      <Icon name={skill.icon} size={17} />
                      <span>{skill.name}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Skills;
