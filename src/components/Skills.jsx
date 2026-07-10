import { Icon } from "../iconMap.jsx";
import Reveal from "./Reveal.jsx";
import SectionHeader from "./SectionHeader.jsx";

function Skills({ skills }) {
  const visibleCategories = skills.categories
    .map((category) => ({
      ...category,
      skills: category.skills.filter((skill) => skill.featured),
    }))
    .filter((category) => category.skills.length > 0);

  return (
    <section id="skills" className="section">
      <SectionHeader
        eyebrow="Capabilities"
        title={skills.title}
        intro={skills.intro}
      />
      <div className="skills-groups">
        {visibleCategories.map((category, categoryIndex) => (
          <Reveal
            as="article"
            className="skill-group"
            delay={categoryIndex * 60}
            key={category.title}
          >
            <header className="skill-group-header">
              <Icon name={category.icon} size={20} />
              <h3>{category.title}</h3>
            </header>
            <div className="skill-group-list">
              {category.skills.map((skill) => (
                <div className="skill-item" key={skill.name}>
                  <Icon name={skill.icon} size={18} />
                  <strong>{skill.name}</strong>
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
