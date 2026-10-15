import { useState } from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";

const MODES = ["Systems thinking", "Local intelligence", "Product engineering"];

// Adapted from the Lovable design exploration; this is decorative concept art.
function DeveloperVisual() {
  const [mode, setMode] = useState(0);

  return (
    <div className={`developer-visual visual-mode-${mode}`}>
      <span className="visual-coordinate coord-top">Colombo / Sri Lanka</span>
      <div className="visual-orbit" aria-hidden="true">
        <svg viewBox="0 0 400 400">
          <defs><pattern id="developer-dot-grid" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.8" /></pattern></defs>
          <rect width="400" height="400" fill="url(#developer-dot-grid)" />
          <g className="cube-lines">
            <path d="M200 75 325 147 325 290 200 362 75 290 75 147Z" />
            <path d="M200 75V218L75 290M200 218l125 72M75 147l125 71 125-71" />
            <path d="M137 111v144l126 72M263 111v144l-126 72M75 218l125-72 125 72" />
            <path d="M137 183l126 72M263 183l-126 72" />
          </g>
          <g className="cube-core"><path d="m200 149 61 35v70l-61 35-61-35v-70Z" /><path d="m139 184 61 35 61-35M200 219v70" /></g>
          <circle className="orbit-point" cx="325" cy="147" r="6" /><circle className="orbit-point" cx="75" cy="290" r="4" />
        </svg>
      </div>
      <span className="visual-coordinate coord-left" aria-hidden="true">Build / Iterate / Ship</span>
      <div className="visual-bottom">
        <span aria-live="polite"><span className="status-dot" />{MODES[mode]}</span>
        <button className="icon-button" type="button" onClick={() => setMode((current) => (current + 1) % MODES.length)} aria-label="Change developer visual" title="Change developer visual"><RotateCcw size={18} /></button>
      </div>
      <ArrowUpRight className="visual-corner" size={17} aria-hidden="true" />
    </div>
  );
}

export default DeveloperVisual;
