function About({ about }) {
  return (
    <section id="about" className="section">
      <div className="section-heading">
        <p className="eyebrow">Background</p>
        <h2>{about.title}</h2>
      </div>
      <div className="about-layout">
        <div className="about-copy">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="highlight-list">
          {about.highlights.map((item) => (
            <div className="highlight-item" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
