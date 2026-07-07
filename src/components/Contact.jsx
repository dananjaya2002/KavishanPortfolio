import { useState } from "react";
import { Icon } from "../iconMap.jsx";
import Reveal from "./Reveal.jsx";
import SectionHeader from "./SectionHeader.jsx";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function Contact({ contact, resume, onResumeOpen }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const openMailto = () => {
    const emailBody = [
      `Name: ${form.firstName} ${form.lastName}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || "Not provided"}`,
      `Subject: ${form.subject}`,
      "",
      "Message:",
      form.message,
      "",
      "Sent from Portfolio Contact Form",
    ].join("\n");

    window.location.href = `mailto:${contact.recipientEmail}?subject=${encodeURIComponent(
      `Contact Form: ${form.subject}`,
    )}&body=${encodeURIComponent(emailBody)}`;
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Sending your message..." });

    if (contact.formspreeEndpoint) {
      try {
        const response = await fetch(contact.formspreeEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          setStatus({ type: "success", message: "Message sent successfully." });
          setForm(initialForm);
          return;
        }
      } catch {
        // Fall through to mailto fallback.
      }
    }

    openMailto();
    setStatus({
      type: "info",
      message: "Opening your email app so you can send the message manually.",
    });
  };

  return (
    <section id="contact" className="section">
      <SectionHeader eyebrow="Contact" title={contact.title} intro={contact.intro} />
      <div className="contact-layout">
        <Reveal as="aside" className="contact-panel glass-card">
          <p>Reach out for collaborations, internships, software projects, or AI/mobile ideas worth building.</p>
          <div className="contact-details">
            {contact.details.map((item) => (
              <div className="contact-item" key={item.label}>
                <Icon name={item.icon} />
                <div>
                  <span>{item.label}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <strong>{item.value}</strong>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="social-links">
            {contact.socials.map((social) => (
              <a key={social.href} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                <Icon name={social.icon} />
              </a>
            ))}
          </div>
          <button className="button secondary resume-contact" type="button" onClick={onResumeOpen}>
            <Icon name="Download" />
            Download / View {resume.label}
          </button>
        </Reveal>
        <Reveal as="form" className="contact-form glass-card" delay={120} onSubmit={submitForm}>
          <div className="form-row">
            <label>
              First Name
              <input name="firstName" value={form.firstName} onChange={updateField} required />
            </label>
            <label>
              Last Name
              <input name="lastName" value={form.lastName} onChange={updateField} required />
            </label>
          </div>
          <div className="form-row">
            <label>
              Email Address
              <input name="email" type="email" value={form.email} onChange={updateField} required />
            </label>
            <label>
              Phone Number
              <input name="phone" type="tel" value={form.phone} onChange={updateField} />
            </label>
          </div>
          <label>
            Subject
            <select name="subject" value={form.subject} onChange={updateField} required>
              <option value="">Select a subject</option>
              {contact.subjects.map((subject) => (
                <option key={subject.value} value={subject.value}>
                  {subject.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows="6"
              value={form.message}
              onChange={updateField}
              placeholder="Tell me about your project or opportunity..."
              required
            />
          </label>
          <button className="button primary submit-button" type="submit" disabled={status.type === "loading"}>
            <Icon name="Send" />
            {status.type === "loading" ? "Sending..." : "Send Message"}
          </button>
          {status.message && <p className={`form-status ${status.type}`}>{status.message}</p>}
        </Reveal>
      </div>
    </section>
  );
}

export default Contact;
