import { Icon } from "../iconMap.jsx";
import Reveal from "./Reveal.jsx";
function Contact({ contact }) {
  const email = contact.details.find((item) => item.label === "Email");
  const location = contact.details.find((item) => item.label === "Location");

  return (
    <section id="contact" className="section contact-section">
      <Reveal className="contact-cta">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>{contact.title}</h2>
          <p>{contact.intro}</p>
          {location && <span className="contact-location"><Icon name="MapPin" size={17} /> {location.value}</span>}
        </div>
        <div className="contact-actions">
          {email && <a className="button primary" href={email.href}><Icon name="Mail" /> Email me</a>}
          <div className="social-links">
            {contact.socials.map((social) => (
              <a key={social.href} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                <Icon name={social.icon} />
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default Contact;
