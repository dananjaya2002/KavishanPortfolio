import { useCallback, useEffect, useRef, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion.js";

// Adapted from Lovable 936700ed. This is a brief visual introduction, not a loading gate.
export function BootIntro() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (new URLSearchParams(window.location.search).has("project")) return false;
    try { return !sessionStorage.getItem("dk-boot-seen"); } catch { return false; }
  });
  const finish = useCallback(() => setActive(false), []);

  useEffect(() => {
    if (!active) return undefined;
    try { sessionStorage.setItem("dk-boot-seen", "1"); } catch { finish(); }
    // Watchdog only: the CSS animation normally dismisses the intro first.
    const timer = window.setTimeout(finish, 1000);
    const skip = (event) => { if (event.key === "Escape") finish(); };
    window.addEventListener("keydown", skip);
    return () => { window.clearTimeout(timer); window.removeEventListener("keydown", skip); };
  }, [active, finish]);

  if (!active || reduced) return null;
  return (
    <aside className="boot-intro" aria-label="Portfolio introduction" onAnimationEnd={(event) => {
      if (event.target === event.currentTarget) finish();
    }}>
      <div className="boot-cube-stage" aria-hidden="true">
        <div className="boot-cube">
          {["front", "back", "left", "right", "top", "bottom"].map((face, index) => (
            <span key={face} className={`holo-face face-${face}`} style={{ "--face-index": index }} />
          ))}
        </div>
      </div>
      <span>DK.DEV // INITIALIZING</span>
      <div className="boot-progress" aria-hidden="true" />
      <button className="button secondary" type="button" onClick={finish}>Skip intro</button>
    </aside>
  );
}

export function useStudioPointer() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = ref.current;
    if (!element || reduced || !window.matchMedia("(pointer: fine)").matches) return undefined;
    let frame = 0;
    const move = (event) => {
      if (event.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        element.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
        element.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
        element.style.setProperty("--spotlight-opacity", "1");
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      element.style.setProperty("--spotlight-opacity", "0");
    };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    return () => {
      leave();
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
    };
  }, [reduced]);
  return ref;
}

export function HeadlineText({ text, offset = 0 }) {
  let index = offset;
  return text.split(" ").map((word, wordIndex) => (
    <span className="headline-word" key={`${wordIndex}-${word}`}>
      {wordIndex > 0 && " "}
      {[...word].map((character) => {
        const characterIndex = index++;
        return <span className="headline-char" key={characterIndex} style={{ "--character-index": characterIndex }}>{character}</span>;
      })}
    </span>
  ));
}
