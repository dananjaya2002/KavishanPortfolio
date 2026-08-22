import { useEffect, useRef, useState } from "react";
import { Icon } from "../iconMap.jsx";

function copyToClipboard(value) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(value);
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  return Promise.resolve();
}

function ProjectDetailsModal({ project, previousProject, nextProject, shareUrl, onNavigate, onClose }) {
  const dialogRef = useRef(null);
  const scrollRef = useRef(null);
  const closeButtonRef = useRef(null);
  const videoRef = useRef(null);
  const shareTimerRef = useRef(null);
  const [videoStatus, setVideoStatus] = useState("idle");
  const [shareStatus, setShareStatus] = useState("");
  const isOpen = Boolean(project);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previouslyFocused = document.activeElement;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = [...dialogRef.current.querySelectorAll("a[href], button:not([disabled]), video[controls]")]
          .filter((element) => element.offsetParent !== null);
        const first = focusable[0];
        const last = focusable.at(-1);
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
      window.clearTimeout(shareTimerRef.current);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!project) return undefined;
    setShareStatus("");
    setVideoStatus("idle");
    scrollRef.current?.scrollTo({ top: 0 });
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.currentTime = 0;
    }
    return () => {
      video?.pause();
      if (video) video.currentTime = 0;
    };
  }, [project]);

  if (!project) return null;

  const details = project.details || {};
  const architecture = details.architecture;
  const gallery = details.gallery || [];
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: project.title, text: project.description, url: shareUrl });
        setShareStatus("Project shared");
      } else {
        await copyToClipboard(shareUrl);
        setShareStatus("Link copied");
      }
    } catch (error) {
      if (error?.name === "AbortError") return;
      try {
        await copyToClipboard(shareUrl);
        setShareStatus("Link copied");
      } catch {
        setShareStatus("Unable to copy link");
      }
    }
    window.clearTimeout(shareTimerRef.current);
    shareTimerRef.current = window.setTimeout(() => setShareStatus(""), 2400);
  };

  return (
    <div className="modal-backdrop project-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section ref={dialogRef} className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="project-modal-header">
          <div className="project-modal-heading">
            <span className="eyebrow">Project details</span>
            <h2 id="project-modal-title">{project.title}</h2>
          </div>
          <div className="project-modal-actions">
            <button className="icon-button" type="button" disabled={!previousProject} onClick={() => onNavigate(previousProject)} aria-label={previousProject ? `Previous project: ${previousProject.title}` : "No previous project"}><Icon name="ChevronLeft" /></button>
            <button className="icon-button" type="button" disabled={!nextProject} onClick={() => onNavigate(nextProject)} aria-label={nextProject ? `Next project: ${nextProject.title}` : "No next project"}><Icon name="ChevronRight" /></button>
            <button className="icon-button" type="button" onClick={handleShare} aria-label="Share project"><Icon name="Share2" /></button>
            <button ref={closeButtonRef} className="icon-button" type="button" onClick={onClose} aria-label="Close project details"><Icon name="X" /></button>
          </div>
          <span className="share-status" aria-live="polite">{shareStatus}</span>
        </header>

        <div ref={scrollRef} className="project-modal-scroll">
          <div className={`project-player ${project.video ? "has-video" : "is-static"}`}>
            {project.video ? (
              <>
              {videoStatus === "loading" && <span className="project-player-status" role="status">Loading video...</span>}
              {videoStatus === "error" ? (
                <div className="project-player-error" role="alert"><Icon name="Triangle" size={28} /><span>The project video could not be loaded.</span></div>
              ) : (
                <video key={project.slug} ref={videoRef} src={project.video} poster={project.image || undefined} controls muted playsInline tabIndex="0" preload="metadata" aria-label={`${project.title} demo video`} onPlaying={() => setVideoStatus("ready")} onWaiting={() => setVideoStatus("loading")} onError={() => setVideoStatus("error")} />
              )}
              </>
            ) : project.image ? (
              <img src={project.image} alt={`${project.title} project cover`} />
            ) : (
              <div className={`project-media-fallback accent-${project.accent || "green"}`} aria-label={`${project.title} project cover`}>
                <span>{project.previewLabel || project.title.slice(0, 2).toUpperCase()}</span>
              </div>
            )}
          </div>

          {project.links.length > 0 && (
            <section className="project-linkbar" aria-label="Project links">
              <span>Explore this project</span>
              <div>
                {project.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                    <Icon name={link.icon} size={18} />
                    {link.label}
                    <Icon name="ArrowUpRight" size={16} />
                  </a>
                ))}
              </div>
            </section>
          )}

          <div className="project-details-layout">
            <div className="project-details-main">
              <section className="project-detail-section">
                <p className="eyebrow">Overview</p>
                <p className="project-overview">{details.overview || project.description}</p>
              </section>
              {details.highlights?.length > 0 && (
                <section className="project-detail-section">
                  <h3>Highlights</h3>
                  <ul className="project-highlights">{details.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                </section>
              )}
              {architecture?.flows?.length > 0 && (
                <section className="project-detail-section">
                  <h3>System architecture</h3>
                  <div className="architecture-diagram">
                    {architecture.flows.map((flow) => (
                      <div className="architecture-flow" key={flow.label}>
                        <strong>{flow.label}</strong>
                        <div className="architecture-steps">
                          {flow.steps.map((step, index) => (
                            <div className="architecture-step-wrap" key={step}>
                              <span className="architecture-step">{step}</span>
                              {index < flow.steps.length - 1 && <span className="architecture-arrow" aria-hidden="true">→</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {architecture.deployment && <p className="architecture-deployment"><Icon name="Container" size={18} /> {architecture.deployment}</p>}
                  </div>
                </section>
              )}
              {gallery.length > 0 && (
                <section className="project-detail-section">
                  <h3>Gallery</h3>
                  <div className="project-gallery">{gallery.map((image) => <figure key={image.src}><img src={image.src} alt={image.alt} loading="lazy" />{image.caption && <figcaption>{image.caption}</figcaption>}</figure>)}</div>
                </section>
              )}
            </div>

            <aside className="project-details-sidebar">
              {project.role && <div><span>Role</span><strong>{project.role}</strong></div>}
              <div><span>Category</span><strong>{project.category}</strong></div>
              <div><span>Technologies</span><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
            </aside>
          </div>

          <nav className="project-modal-navigation" aria-label="Browse projects">
            <button type="button" disabled={!previousProject} onClick={() => onNavigate(previousProject)}><Icon name="ChevronLeft" /><span><small>Previous project</small>{previousProject?.title || "Beginning of projects"}</span></button>
            <button type="button" disabled={!nextProject} onClick={() => onNavigate(nextProject)}><span><small>Next project</small>{nextProject?.title || "End of projects"}</span><Icon name="ChevronRight" /></button>
          </nav>
        </div>
      </section>
    </div>
  );
}

export default ProjectDetailsModal;
