import { Icon } from "../iconMap.jsx";

function Skills({ skills }) {
  return (
    <section id="skills" className="section">
      <div className="section-heading">
        <p className="eyebrow">Capabilities</p>
        <h2>{skills.title}</h2>
      </div>
      <div className="skills-grid">
        {skills.categories.map((category) => (
          <article className="skill-card" key={category.title}>
            <div className="card-title">
              <Icon name={category.icon} />
              <h3>{category.title}</h3>
            </div>
            <div className="skill-list">
              {category.skills.map((skill) => (
                <div className="skill-row" key={skill.name}>
                  <div>
                    <span>{skill.name}</span>
                    <small>{skill.level}%</small>
                  </div>
                  <div className="skill-track" aria-hidden="true">
                    <span style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Skills;
