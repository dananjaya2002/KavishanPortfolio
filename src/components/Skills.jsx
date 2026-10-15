import { useRef, useState } from "react";
import { Icon } from "../iconMap.jsx";
import SectionHeader from "./SectionHeader.jsx";

function Skills({ skills }) {
  const [active, setActive] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(skills.categories[0].skills[0].name);
  const tabRefs = useRef([]);

  const selectCategory = (index) => {
    setActive(index);
    setSelectedSkill(skills.categories[index].skills[0].name);
  };
  const handleKeyDown = (event, index) => {
    let next;
    if (["ArrowDown", "ArrowRight"].includes(event.key)) next = (index + 1) % skills.categories.length;
    else if (["ArrowUp", "ArrowLeft"].includes(event.key)) next = (index - 1 + skills.categories.length) % skills.categories.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = skills.categories.length - 1;
    else return;
    event.preventDefault();
    selectCategory(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="skills" className="section">
      <SectionHeader number="04" eyebrow="Capabilities" title={skills.title} intro={skills.intro} />
      <div className="skills-explorer">
        <div className="skills-categories" role="tablist" aria-label="Skill categories" aria-orientation="vertical">
          {skills.categories.map((category, index) => (
            <button key={category.title} ref={(element) => { tabRefs.current[index] = element; }}
              id={`skill-tab-${index}`} type="button" role="tab" aria-selected={active === index}
              aria-controls={`skill-panel-${index}`} tabIndex={active === index ? 0 : -1}
              onClick={() => selectCategory(index)} onKeyDown={(event) => handleKeyDown(event, index)}>
              <Icon name={category.icon} size={18} /><span>{category.title}</span><Icon name="ArrowUpRight" size={15} />
            </button>
          ))}
        </div>
        {skills.categories.map((category, index) => (
          <div key={category.title} id={`skill-panel-${index}`} role="tabpanel"
            aria-labelledby={`skill-tab-${index}`} className="skills-panel" hidden={active !== index} tabIndex={0}>
            {active === index && <>
              <div className="skills-panel-copy">
                <p className="eyebrow">Explore the toolkit</p>
                <h3>{category.title}</h3>
                <p className="skills-hint">Select a skill to highlight it in the network.</p>
                <ul className="skill-chip-list">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skill.name}>
                      <button className="skill-chip" type="button" aria-pressed={selectedSkill === skill.name}
                        style={{ "--skill-index": skillIndex }} onClick={() => setSelectedSkill(skill.name)}>
                        <Icon name={skill.icon} size={18} />{skill.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="skills-network">
                <svg viewBox="0 0 320 220" aria-hidden="true" style={{ "--network-angle": `${index * 13}deg` }}>
                  <ellipse cx="160" cy="110" rx="110" ry="76" className="network-orbit" />
                  <ellipse cx="160" cy="110" rx="75" ry="104" className="network-orbit network-orbit-secondary" />
                  {category.skills.map((skill, skillIndex) => {
                    const angle = (Math.PI * 2 * skillIndex) / category.skills.length - Math.PI / 2;
                    const x = 160 + Math.cos(angle) * 110;
                    const y = 110 + Math.sin(angle) * 76;
                    return <g key={skill.name} className={selectedSkill === skill.name ? "network-node is-selected" : "network-node"}>
                      <line x1="160" y1="110" x2={x} y2={y} /><circle cx={x} cy={y} r={selectedSkill === skill.name ? 7 : 4} />
                    </g>;
                  })}
                  <circle cx="160" cy="110" r="22" className="network-core" />
                </svg>
                <p className="network-selection" aria-live="polite">{selectedSkill}</p>
              </div>
            </>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
