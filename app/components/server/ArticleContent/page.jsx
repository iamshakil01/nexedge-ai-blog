// SERVER COMPONENT — Smart article content renderer
// Handles both:
//   1. Properly formatted content (with \n newlines)
//   2. Collapsed content (no newlines — auto-splits on known patterns)

// ── Inline parser: bold + inline code ────────────────────────────
function parseInline(text) {
  const parts = text.split(/(\*\*.*?\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} style={{ color: "var(--text-primary)", fontWeight: 700 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} style={{
          fontFamily: "'Fira Code','Cascadia Code','Consolas',monospace",
          fontSize: "0.85em",
          padding: "2px 7px",
          borderRadius: "5px",
          background: "rgba(6,182,212,0.10)",
          border: "1px solid rgba(6,182,212,0.20)",
          color: "#67e8f9",
          whiteSpace: "nowrap",
        }}>
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

// ── Constants ─────────────────────────────────────────────────────
const SECTION_HEADINGS = [
  "introduction","conclusion","summary","overview","background",
  "final thoughts","closing thoughts","the road ahead","what's next",
  "next steps","key takeaways","wrapping up",
];

const CALLOUT_EMOJIS = [
  "💡","🚀","⚡","✅","⚠️","📌","🔑","🎯",
  "🔹","🔸","💎","🌟","📊","🛠️","🎬","🛒","🎨","📝","🔥","👉",
];

// ── Known heading patterns that appear inline in collapsed text ───
// These are used to split collapsed (no-newline) content
const HEADING_PATTERNS = [
  // "Introduction", "Conclusion" etc. at word boundary
  /(?<=[.!?]\s{0,2}|^)(Introduction|Conclusion|Summary|Overview|Background|Final Thoughts?|The Road Ahead|Key Takeaways?|Wrapping Up|Next Steps?)(?=[:A-Z\s])/g,
  // "Why This Matters:", "How Companies are Preparing:", etc.
  /(?<=[.!?]\s{0,2})((?:Why|How|What|When|Where|The|Building|Using|Getting|Making|Step \d+)[^.!?\n]{3,60}:)/g,
  // "Key Benefits:", "Actionable Tips:", etc.
  /(?<=[.!?]\s{0,2})([A-Z][a-zA-Z\s&]{3,50}:)(?=\s*[A-Z])/g,
];

// ── Pre-process: inject newlines into collapsed content ───────────
function injectNewlines(content) {
  // If content already has reasonable newlines, return as-is
  const lineCount = (content.match(/\n/g) || []).length;
  const wordCount = content.split(/\s+/).length;
  // If ratio is OK (at least 1 newline per 50 words), content is structured
  if (lineCount > 0 && wordCount / lineCount < 60) return content;

  // Content is collapsed — inject newlines before known patterns
  let result = content;

  // Before section headings
  result = result.replace(
    /(?<=[.!?]["']?\s{0,3})(Introduction|Conclusion|Summary|Overview|Background|Final Thoughts|The Road Ahead|Key Takeaways|Wrapping Up|Next Steps)(?=[:A-Z\s])/g,
    "\n\n$1"
  );

  // Before "Why X:", "How X:", "Step N:" subheadings
  result = result.replace(
    /(?<=[.!?]["']?\s{0,3})((?:Why|How|What|Step \d+|Tutorial|Actionable Tips?|Key Benefits?|Real-World)[^.!?\n]{2,60}:)/g,
    "\n\n$1"
  );

  // Before bullet-like patterns "Word Word: text"
  result = result.replace(
    /(?<=[.!?]["']?\s{0,3})([A-Z][a-zA-Z\s&\-]{3,45}:)(?=\s+[A-Z])/g,
    "\n\n$1"
  );

  // Before numbered items "1. " "2. "
  result = result.replace(/(?<=\S)(\s)(\d+\.\s)/g, "\n$2");

  // Before bullet items "- " or "• "
  result = result.replace(/(?<=\S)(\s)([-•]\s)/g, "\n$2");

  return result;
}

// ── Line type ─────────────────────────────────────────────────────
function getLineType(line) {
  const trimmed = line.trim();
  if (!trimmed) return "empty";
  if (/^[-•*]\s+/.test(trimmed)) return "bullet";
  if (/^\d+\.\s+/.test(trimmed)) return "numbered";
  if (CALLOUT_EMOJIS.some((e) => trimmed.startsWith(e))) return "callout";
  const lower = trimmed.toLowerCase().replace(/:$/, "").trim();
  if (SECTION_HEADINGS.includes(lower)) return "section";
  if (trimmed.endsWith(":") && trimmed.length <= 80 && !trimmed.includes(".")) return "subheading";
  if (/^(why|how|what|when|where|the|building|using|getting|making|step \d+|tutorial|actionable|key benefits?|real-world)\s?.{2,60}$/i.test(trimmed) && trimmed.length <= 80) return "subheading";
  return "paragraph";
}

// ── Group lines ───────────────────────────────────────────────────
function groupLines(lines) {
  const groups = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.trim().startsWith("```")) {
      const lang = line.trim().slice(3).trim() || "code";
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      groups.push({ type: "code", lang, code: codeLines.join("\n") });
      continue;
    }

    const type = getLineType(line);

    if (type === "bullet" || type === "numbered") {
      const listType = type;
      const items = [];
      while (i < lines.length && getLineType(lines[i]) === listType) {
        items.push(lines[i].trim().replace(/^[-•*]\s+/, "").replace(/^\d+\.\s+/, ""));
        i++;
      }
      groups.push({ type: listType, items });
      continue;
    }

    groups.push({ type, text: line });
    i++;
  }

  return groups;
}

// ── Render group ──────────────────────────────────────────────────
function renderGroup(group, idx) {
  switch (group.type) {

    case "empty":
      return <div key={idx} style={{ height: "0.5rem" }} />;

    case "code":
      return (
        <div key={idx} className="my-6 rounded-2xl overflow-hidden"
             style={{
               background: "rgba(8,12,20,0.95)",
               border: "1px solid rgba(6,182,212,0.15)",
               boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
             }}>
          <div className="flex items-center justify-between px-5 py-3"
               style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(244,63,94,0.7)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(251,191,36,0.7)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(34,197,94,0.7)" }} />
              </div>
              <span style={{
                fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: "var(--accent-cyan)",
              }}>
                {group.lang}
              </span>
            </div>
            <span dangerouslySetInnerHTML={{
              __html: `<button onclick="navigator.clipboard.writeText(${JSON.stringify(group.code)}).then(()=>{this.textContent='✓ Copied';setTimeout(()=>{this.textContent='Copy'},2000)})" style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:8px;color:rgba(255,255,255,0.55);font-size:0.7rem;font-weight:600;padding:4px 12px;cursor:pointer;font-family:inherit">Copy</button>`,
            }} />
          </div>
          <pre style={{
            margin: 0, padding: "1.25rem 1.5rem", overflowX: "auto",
            fontSize: "0.875rem", lineHeight: 1.7,
            fontFamily: "'Fira Code','Cascadia Code','Consolas','Monaco',monospace",
            color: "#e2e8f0", tabSize: 2,
          }}>
            <code>{group.code}</code>
          </pre>
        </div>
      );

    case "section":
      return (
        <div key={idx} className="mt-12 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0"
                 style={{ background: "linear-gradient(180deg, #06b6d4, #2563eb)" }} />
            <h2 style={{
              fontSize: "1.5rem", fontWeight: 800,
              color: "var(--text-primary)",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.02em",
            }}>
              {parseInline(group.text.trim())}
            </h2>
          </div>
          <div className="mt-3 h-px ml-4"
               style={{ background: "linear-gradient(90deg, rgba(6,182,212,0.3), transparent)" }} />
        </div>
      );

    case "subheading":
      return (
        <h3 key={idx} className="mt-8 mb-3 flex items-center gap-2"
            style={{
              fontSize: "1.1rem", fontWeight: 700,
              color: "var(--text-primary)",
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "var(--accent-cyan)" }} />
          {parseInline(group.text.trim())}
        </h3>
      );

    case "callout": {
      const emoji = CALLOUT_EMOJIS.find((e) => group.text.trim().startsWith(e)) || "💡";
      const text  = group.text.trim().slice(emoji.length).trim();
      return (
        <div key={idx} className="my-5 flex items-start gap-3 px-4 py-4 rounded-xl"
             style={{
               background: "rgba(6,182,212,0.06)",
               border: "1px solid rgba(6,182,212,0.15)",
               borderLeft: "3px solid var(--accent-cyan)",
             }}>
          <span style={{ fontSize: "1.1rem", lineHeight: 1.5, flexShrink: 0 }}>{emoji}</span>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--text-secondary)", margin: 0 }}>
            {parseInline(text)}
          </p>
        </div>
      );
    }

    case "bullet":
      return (
        <ul key={idx} className="my-4 flex flex-col gap-2.5 ml-1">
          {group.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--accent-cyan)" }} />
              <span style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                {parseInline(item)}
              </span>
            </li>
          ))}
        </ul>
      );

    case "numbered":
      return (
        <ol key={idx} className="my-4 flex flex-col gap-2.5 ml-1">
          {group.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                    style={{
                      background: "rgba(6,182,212,0.12)",
                      border: "1px solid rgba(6,182,212,0.25)",
                      color: "var(--accent-cyan)",
                    }}>
                {j + 1}
              </span>
              <span style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                {parseInline(item)}
              </span>
            </li>
          ))}
        </ol>
      );

    case "paragraph":
    default: {
      const text = group.text?.trim();
      if (!text) return null;
      return (
        <p key={idx} style={{
          fontSize: "1.05rem", lineHeight: 1.85,
          color: "var(--text-secondary)",
          marginBottom: "1.1rem",
        }}>
          {parseInline(text)}
        </p>
      );
    }
  }
}

// ── Main ──────────────────────────────────────────────────────────
export default function ArticleContent({ content = "" }) {
  // Step 1: normalize line endings
  const normalized = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Step 2: inject newlines if content is collapsed (no structure)
  const processed = injectNewlines(normalized);

  // Step 3: split and group
  const lines  = processed.split("\n");
  const groups = groupLines(lines);

  return (
    <article className="article-content">
      {groups.map((group, i) => renderGroup(group, i))}
    </article>
  );
}
