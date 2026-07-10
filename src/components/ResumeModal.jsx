import { useEffect, useRef } from "react";
import { Icon } from "../iconMap.jsx";

function ResumeModal({ resume, isOpen, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previouslyFocused = document.activeElement;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll("a[href], button:not([disabled]), iframe");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.body.classList.add("modal-open");
    closeButtonRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        ref={dialogRef}
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
            <button ref={closeButtonRef} className="icon-button" type="button" onClick={onClose} aria-label="Close resume preview">
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
