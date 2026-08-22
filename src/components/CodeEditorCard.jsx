import { useEffect, useState } from "react";

const CODE = `const danidu = {
  role: "Software Developer",
  focus: ["AI Systems", "Full-Stack", "Mobile"],
  stack: ["Python", "React", "Flutter"],
  building: "Useful products",
};

danidu.build();`;

const COMPLETE_LINES = CODE.split("\n");

function tokenize(line) {
  const tokens = [];
  let index = 0;

  while (index < line.length) {
    const rest = line.slice(index);
    const whitespace = rest.match(/^\s+/);
    if (whitespace) {
      tokens.push({ value: whitespace[0], type: "plain" });
      index += whitespace[0].length;
      continue;
    }

    if (line[index] === '"') {
      let end = index + 1;
      while (end < line.length && line[end] !== '"') end += 1;
      if (end < line.length) end += 1;
      tokens.push({ value: line.slice(index, end), type: "string" });
      index = end;
      continue;
    }

    const identifier = rest.match(/^[A-Za-z_$][\w$]*/);
    if (identifier) {
      const value = identifier[0];
      const before = line.slice(0, index).trimEnd();
      const after = line.slice(index + value.length).trimStart();
      let type = "plain";
      if (["const", "let", "var"].includes(value)) type = "keyword";
      else if (before.endsWith(".")) type = "method";
      else if (after.startsWith(":")) type = "property";
      else if (value === "danidu") type = "variable";
      tokens.push({ value, type });
      index += value.length;
      continue;
    }

    const number = rest.match(/^\d+/);
    if (number) {
      tokens.push({ value: number[0], type: "number" });
      index += number[0].length;
      continue;
    }

    tokens.push({ value: line[index], type: "punctuation" });
    index += 1;
  }

  return tokens;
}

function typingDelay(character) {
  const base = 24 + Math.random() * 42;
  if (character === "\n") return base + 220 + Math.random() * 110;
  if (character === ",") return base + 105 + Math.random() * 70;
  if (character === ";") return base + 170;
  if (["}", "]"].includes(character)) return base + 115;
  return base;
}

function CodeEditorCard() {
  const [visibleLength, setVisibleLength] = useState(0);
  const [phase, setPhase] = useState("typing");
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(query.matches);
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setVisibleLength(CODE.length);
      setPhase("complete");
      return undefined;
    }

    let cancelled = false;
    let timer;
    const wait = (duration) => new Promise((resolve) => {
      timer = window.setTimeout(resolve, duration);
    });

    const animate = async () => {
      while (!cancelled) {
        setPhase("typing");
        for (let length = 1; length <= CODE.length && !cancelled; length += 1) {
          setVisibleLength(length);
          await wait(typingDelay(CODE[length - 1]));
        }
        if (cancelled) break;

        setPhase("complete");
        await wait(4200);
        if (cancelled) break;

        setPhase("erasing");
        for (let length = CODE.length; length >= 0 && !cancelled; length -= 3) {
          setVisibleLength(Math.max(0, length));
          await wait(20);
        }
        setVisibleLength(0);
        await wait(900);
      }
    };

    animate();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [reducedMotion]);

  const visibleCode = CODE.slice(0, visibleLength);
  const visibleLines = visibleCode.split("\n");
  const cursorLine = visibleLines.length - 1;

  return (
    <div className="code-editor-stage">
      <article
        className={`code-editor-card ${phase === "complete" ? "is-complete" : ""}`}
        aria-label="Animated JavaScript profile snippet"
      >
        <header className="editor-chrome">
          <div className="window-controls" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="editor-tab">
            <span className="tab-indicator" aria-hidden="true" />
            <span>danidu.js</span>
          </div>
          <span className="editor-language">JavaScript</span>
        </header>

        <div className="editor-body" aria-hidden="true">
          {COMPLETE_LINES.map((_, lineIndex) => {
            const line = visibleLines[lineIndex] ?? "";
            const isCursorLine = lineIndex === cursorLine && phase !== "complete";
            const isBuildLine = lineIndex === COMPLETE_LINES.length - 1 && phase === "complete";
            return (
              <div className={`code-line ${isBuildLine ? "is-build-line" : ""}`} key={lineIndex}>
                <span className="line-number">{lineIndex + 1}</span>
                <code>
                  {tokenize(line).map((token, tokenIndex) => (
                    <span className={`syntax-${token.type}`} key={`${tokenIndex}-${token.value}`}>
                      {token.value}
                    </span>
                  ))}
                  {isCursorLine && <span className="typing-cursor" />}
                </code>
              </div>
            );
          })}
        </div>

        <footer className="editor-statusbar">
          <span>Ln {Math.min(cursorLine + 1, COMPLETE_LINES.length)}, Col {(visibleLines.at(-1)?.length ?? 0) + 1}</span>
          {phase === "complete" && (
            <span className="build-status" role="status">
              <span aria-hidden="true">●</span> Build successful
            </span>
          )}
          <span>UTF-8&nbsp;&nbsp; JS</span>
        </footer>
      </article>
    </div>
  );
}

export default CodeEditorCard;
