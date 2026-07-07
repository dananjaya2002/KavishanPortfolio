import { Icon } from "../iconMap.jsx";
import Reveal from "./Reveal.jsx";
import SectionHeader from "./SectionHeader.jsx";

function Skills({ skills }) {
  return (
    <section id="skills" className="section">
      <SectionHeader
        eyebrow="Capabilities"
        title={skills.title}
        intro="A practical toolkit across product interfaces, mobile apps, data, AI, and deployment workflows."
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
                  <div>
                    <span>
                      <Icon name={skill.icon} size={16} />
                      {skill.name}
                    </span>
                    <small>{skill.level}%</small>
                  </div>
                  <div className="skill-track" aria-hidden="true">
                    <span style={{ width: `${skill.level}%` }} />
                  </div>
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
