import { useRef, useState } from "react";
import { Icon } from "../iconMap.jsx";
import SectionHeader from "./SectionHeader.jsx";

function Skills({ skills }) {
  const initial = Math.max(0, skills.categories.findIndex((category) => category.label === "Frontend"));
  const [active, setActive] = useState(initial);
  const [selectedSkill, setSelectedSkill] = useState(skills.categories[initial].skills[0].name);
  const [paused, setPaused] = useState(false);
  const tabRefs = useRef([]);
  const category = skills.categories[active];
  const detail = category.skills.find((skill) => skill.name === selectedSkill);
  const positions = skills.categories.map((_, index) => {
    const angle = (Math.PI * 2 * index) / skills.categories.length - Math.PI / 2;
    return { x: 50 + Math.cos(angle) * 34, y: 50 + Math.sin(angle) * 36 };
  });
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
      <div className={`skills-explorer${paused ? " skills-paused" : ""}`}>
        <div className="skills-universe">
          <div className="skills-universe-heading">
            <p className="eyebrow">Interactive skills universe</p>
            <button type="button" className="skills-motion" aria-pressed={paused} onClick={() => setPaused(!paused)}>
              {paused ? "Resume motion" : "Pause motion"}
            </button>
          </div>
          <div className="skills-map">
            <svg className="skills-paths" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <ellipse cx="50" cy="50" rx="34" ry="36" />
              {positions.map(({ x, y }, index) => <line key={index} x1="50" y1="50" x2={x} y2={y} className={active === index ? "is-active" : ""} />)}
            </svg>
            <div className="skills-hub" aria-hidden="true">
              <div className="skills-cube">{["front", "back", "left", "right", "top", "bottom"].map((face) => <span key={face} className={`skills-face skills-face-${face}`} />)}</div>
            </div>
            <div className="skills-categories" role="tablist" aria-label="Skill categories">
              {skills.categories.map((item, index) => (
                <button key={item.title} ref={(element) => { tabRefs.current[index] = element; }}
                  style={{ "--node-x": `${positions[index].x}%`, "--node-y": `${positions[index].y}%` }}
                  id={`skill-tab-${index}`} type="button" role="tab" aria-selected={active === index}
                  aria-controls={`skill-panel-${index}`} tabIndex={active === index ? 0 : -1}
                  onClick={() => selectCategory(index)} onKeyDown={(event) => handleKeyDown(event, index)}>
                  <Icon name={item.icon} size={18} /><span>{item.label || item.title}</span>
                </button>
              ))}
            </div>
          </div>
          <p className="skills-map-hint">Select a category / Arrow keys to explore</p>
        </div>
        {skills.categories.map((item, index) => (
          <div key={item.title} id={`skill-panel-${index}`} role="tabpanel" aria-labelledby={`skill-tab-${index}`}
            className="skills-panel" hidden={active !== index} tabIndex={0}>
            {<div className="skills-panel-content">
              <div className="skills-panel-heading"><p className="eyebrow">Explore the toolkit</p><h3>{item.title}</h3></div>
              <p className="skills-hint">Select a technology to explore its role.</p>
              <ul className="skill-chip-list">
                {item.skills.map((skill) => <li key={skill.name}>
                  <button className="skill-chip" type="button" aria-pressed={selectedSkill === skill.name}
                    aria-controls="skill-detail" onClick={() => setSelectedSkill(skill.name)}>
                    <Icon name={skill.icon} size={16} /><span>{skill.name}</span>
                  </button>
                </li>)}
              </ul>
              <div id={active === index ? "skill-detail" : undefined} className="skill-detail" aria-live={active === index ? "polite" : "off"} aria-atomic="true">
                <p className="eyebrow">Technology spotlight</p><h4>{(active === index ? detail : item.skills[0]).name}</h4><p>{(active === index ? detail : item.skills[0]).description}</p>
              </div>
            </div>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
