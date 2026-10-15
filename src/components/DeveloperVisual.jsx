import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Pause, Play, RotateCcw } from "lucide-react";
import useReducedMotion from "../hooks/useReducedMotion.js";
import engineeringModes from "../data/engineeringModes.json";

const FACES = ["front", "back", "left", "right", "top", "bottom"];
const INITIAL = { x: -18, y: 32 };

function DeveloperVisual({ engineeringMode, onEngineeringModeChange }) {
  const modeIndex = Math.max(0, engineeringModes.findIndex((mode) => mode.id === engineeringMode));
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const [dragging, setDragging] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const reduced = useReducedMotion();
  const rootRef = useRef(null);
  const sceneRef = useRef(null);
  const orientation = useRef({ ...INITIAL });
  const parallax = useRef({ x: 0, y: 0 });
  const dragRef = useRef(null);
  const frameRef = useRef(0);

  // JS owns two outer transform layers; CSS alone owns the inner idle rotation.
  const paint = useCallback(() => {
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      const scene = sceneRef.current;
      if (!scene) return;
      scene.style.setProperty("--tilt-x", `${orientation.current.x}deg`);
      scene.style.setProperty("--tilt-y", `${orientation.current.y}deg`);
      scene.style.setProperty("--pointer-tilt-x", `${parallax.current.x}deg`);
      scene.style.setProperty("--pointer-tilt-y", `${parallax.current.y}deg`);
    });
  }, []);

  const finishDrag = useCallback((pointerId) => {
    const drag = dragRef.current;
    if (!drag || (pointerId !== undefined && pointerId !== drag.pointerId)) return;
    // Clear first: releasePointerCapture can synchronously emit lostpointercapture.
    dragRef.current = null;
    setDragging(false);
    const root = rootRef.current;
    if (root?.hasPointerCapture(drag.pointerId)) root.releasePointerCapture(drag.pointerId);
    paint();
  }, [paint]);

  const reset = useCallback(() => {
    finishDrag();
    orientation.current = { ...INITIAL };
    parallax.current = { x: 0, y: 0 };
    paint();
    setPaused(false);
    setEpoch((current) => current + 1);
  }, [finishDrag, paint]);

  useEffect(() => {
    const root = rootRef.current;
    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
        setVisible(entry.isIntersecting);
        if (!entry.isIntersecting) finishDrag();
      }, { threshold: 0.1 })
      : null;
    if (observer) observer.observe(root);
    else setVisible(true);
    const updateVisibility = () => {
      setPageVisible(!document.hidden);
      if (document.hidden) finishDrag();
    };
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    };
  }, [finishDrag]);

  useEffect(() => {
    const root = rootRef.current;
    if (reduced) {
      finishDrag();
      setDragging(false);
      parallax.current = { x: 0, y: 0 };
      paint();
      return undefined;
    }
    const move = (event) => {
      if (event.pointerType !== "mouse") return;
      const drag = dragRef.current;
      if (drag) {
        if (drag.pointerId !== event.pointerId) return;
        orientation.current = {
          x: Math.max(-80, Math.min(80, drag.x - (event.clientY - drag.startY) * 0.35)),
          y: drag.y + (event.clientX - drag.startX) * 0.35,
        };
      } else {
        if (sceneRef.current?.matches(":focus-visible")) return;
        const rect = sceneRef.current.getBoundingClientRect();
        parallax.current = {
          x: -(event.clientY - rect.top - rect.height / 2) * 0.025,
          y: (event.clientX - rect.left - rect.width / 2) * 0.03,
        };
      }
      paint();
    };
    const down = (event) => {
      if (event.pointerType !== "mouse" || event.button !== 0 || !event.target.closest(".holo-scene")) return;
      dragRef.current = { ...orientation.current, startX: event.clientX, startY: event.clientY, pointerId: event.pointerId };
      setDragging(true);
      root.setPointerCapture(event.pointerId);
    };
    const up = (event) => finishDrag(event.pointerId);
    const leave = () => {
      if (dragRef.current) return;
      parallax.current = { x: 0, y: 0 };
      paint();
    };
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerdown", down);
    root.addEventListener("pointerup", up);
    root.addEventListener("pointercancel", up);
    root.addEventListener("lostpointercapture", up);
    root.addEventListener("pointerleave", leave);
    return () => {
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerdown", down);
      root.removeEventListener("pointerup", up);
      root.removeEventListener("pointercancel", up);
      root.removeEventListener("lostpointercapture", up);
      root.removeEventListener("pointerleave", leave);
      const drag = dragRef.current;
      dragRef.current = null;
      if (drag && root.hasPointerCapture(drag.pointerId)) root.releasePointerCapture(drag.pointerId);
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    };
  }, [reduced, finishDrag, paint]);

  const rotateWithKeyboard = (event) => {
    if (event.key === "Home") { event.preventDefault(); reset(); return; }
    const step = { ArrowLeft: [0, -15], ArrowRight: [0, 15], ArrowUp: [-15, 0], ArrowDown: [15, 0] }[event.key];
    if (!step) return;
    event.preventDefault();
    parallax.current = { x: 0, y: 0 };
    orientation.current = {
      x: Math.max(-80, Math.min(80, orientation.current.x + step[0])),
      y: orientation.current.y + step[1],
    };
    paint();
  };

  const isPaused = reduced || paused || !visible || !pageVisible || dragging;
  return (
    <div ref={rootRef} className={`developer-visual hologram mode-${modeIndex}${isPaused ? " cube-paused" : ""}${dragging ? " is-dragging" : ""}`}>
      <div ref={sceneRef} className="holo-scene" role="group" tabIndex={0}
        aria-label="Interactive holographic cube" aria-describedby="cube-instructions" onKeyDown={rotateWithKeyboard}>
        <div className="holo-parallax" aria-hidden="true"><div className="holo-tilt">
          <div className="holo-spin" key={epoch}>
            <div className="holo-cube">{FACES.map((face) => <div key={face} className={`holo-face face-${face}`} />)}</div>
            <div className="holo-core">{FACES.map((face) => <div key={face} className={`holo-face face-${face}`} />)}</div>
            <div className="holo-ring ring-a" /><div className="holo-ring ring-b" /><div className="holo-ring ring-c" />
          </div>
        </div></div>
      </div>
      <div className="holo-controls">
        <div><span className="eyebrow">Site accent</span><strong aria-live="polite">{engineeringModes[modeIndex].name}</strong></div>
        <button className="icon-button" type="button" aria-label="Next engineering mode" title="Next engineering mode" onClick={() => onEngineeringModeChange(engineeringModes[(modeIndex + 1) % engineeringModes.length].id)}><ArrowRight size={18} /></button>
        <button className="icon-button" type="button" aria-label={paused ? "Resume cube animation" : "Pause cube animation"} title={paused ? "Resume animation" : "Pause animation"} aria-pressed={paused} onClick={() => setPaused((current) => !current)}>{paused ? <Play size={17} /> : <Pause size={17} />}</button>
        <button className="icon-button" type="button" aria-label="Reset cube" title="Reset cube" onClick={reset}><RotateCcw size={18} /></button>
      </div>
      <p id="cube-instructions" className="cube-instructions">Drag to rotate · Arrow keys to explore · Home to reset</p>
    </div>
  );
}

export default DeveloperVisual;
