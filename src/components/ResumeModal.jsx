import { useEffect } from "react";
import { Icon } from "../iconMap.jsx";

function ResumeModal({ resume, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="resume-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Resume preview"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="modal-header">
          <div>
            <span className="eyebrow">PDF Resume</span>
            <h2>{resume.label}</h2>
          </div>
          <div className="modal-actions">
            <a className="icon-button" href={resume.path} download={resume.downloadName} aria-label="Download resume">
              <Icon name="Download" />
            </a>
            <button className="icon-button" type="button" onClick={onClose} aria-label="Close resume preview">
              <Icon name="X" />
            </button>
          </div>
        </header>
        <iframe title="Resume PDF preview" src={resume.path} />
      </section>
    </div>
  );
}

export default ResumeModal;
