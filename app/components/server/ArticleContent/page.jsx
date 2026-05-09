// SERVER COMPONENT — Smart article content renderer
// Parses plain text and applies rich formatting automatically:
//   • Section headings  (Introduction, Conclusion, Why X:, Key Benefits:, etc.)
//   • Subheadings       (lines ending with ":" that are short)
//   • Bullet lists      (lines starting with - or •)
//   • Bold inline text  (**text**)
//   • Callout blocks    (lines starting with 💡 🚀 ⚡ ✅ ⚠️ 📌 🔑 🎯)
//   • Normal paragraphs

// ── Inline bold parser ────────────────────────────────────────────
function parseBold(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ color: "var(--text-primary)", fontWeight: 700 }}>{part}</strong>
      : part
  );
}

// ── Line type detector ────────────────────────────────────────────
const SECTION_HEADINGS = [
  "introduction", "conclusion", "summary", "overview",
  "background", "final thoughts", "closing thoughts",
  "the road ahead", "what's next", "next steps",
  "key takeaways", "wrapping up",
];

const CALLOUT_EMOJIS = ["💡", "🚀", "⚡", "✅", "⚠️", "📌", "🔑", "🎯", "🔹", "🔸", "💎", "🌟", "📊", "🛠️", "🎬", "🛒", "🎨"];

function getLineType(line) {
  const trimmed = line.trim();
  if (!trimmed) return "empty";

  // Bullet list
  if (/^[-•*]\s+/.test(trimmed)) return "bullet";

  // Numbered list
  if (/^\d+\.\s+/.test(trimmed)) return "numbered";

  // Callout emoji line
  if (CALLOUT_EMOJIS.some((e) => trimmed.startsWith(e))) return "callout";

  // Section heading — exact match (case-insensitive)
  const lower = trimmed.toLowerCase().replace(/:$/, "").trim();
  if (SECTION_HEADINGS.includes(lower)) return "section";

  // Subheading — short line ending with ":" (max 80 chars)
  if (trimmed.endsWith(":") && trimmed.length <= 80 && !trimmed.includes(".")) return "subheading";

  // Subheading — "Why X", "How X", "What X" patterns
  if (/^(why|how|what|when|where|the|building|using|getting|making)\s.{3,60}$/i.test(trimmed) && trimmed.length <= 70) {
    return "subheading";
  }

  return "paragraph";
}

// ── Group consecutive bullets into lists ─────────────────────────
function groupLines(lines) {
  const groups = [];
  let i = 0;

  while (i < lines.length) {
    const type = getLineType(lines[i]);

    if (type === "bullet" || type === "numbered") {
      const listType = type;
      const items = [];
      while (i < lines.length && getLineType(lines[i]) === listType) {
        items.push(lines[i].trim().replace(/^[-•*\d.]\s+/, ""));
        i++;
      }
      groups.push({ type: listType, items });
    } else {
      groups.push({ type, text: lines[i] });
      i++;
    }
  }

  return groups;
}

// ── Render a single group ─────────────────────────────────────────
function renderGroup(group, idx) {
  switch (group.type) {

    case "empty":
      return <div key={idx} style={{ height: "0.75rem" }} />;

    case "section":
      return (
        <div key={idx} className="mt-10 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0"
                 style={{ background: "linear-gradient(180deg, #06b6d4, #2563eb)" }} />
            <h2 style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.02em",
            }}>
              {parseBold(group.text.trim())}
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
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "var(--accent-cyan)" }} />
          {parseBold(group.text.trim())}
        </h3>
      );

    case "callout": {
      const emoji = CALLOUT_EMOJIS.find((e) => group.text.trim().startsWith(e)) || "💡";
      const text  = group.text.trim().slice(emoji.length).trim();
      return (
        <div key={idx} className="my-4 flex items-start gap-3 px-4 py-3.5 rounded-xl"
             style={{
               background: "rgba(6,182,212,0.06)",
               border: "1px solid rgba(6,182,212,0.15)",
               borderLeft: "3px solid var(--accent-cyan)",
             }}>
          <span style={{ fontSize: "1.1rem", lineHeight: 1.5, flexShrink: 0 }}>{emoji}</span>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--text-secondary)", margin: 0 }}>
            {parseBold(text)}
          </p>
        </div>
      );
    }

    case "bullet":
      return (
        <ul key={idx} className="my-4 flex flex-col gap-2.5 ml-1">
          {group.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--accent-cyan)" }} />
              <span style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                {parseBold(item)}
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
                {parseBold(item)}
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
        <p key={idx} className="mb-4"
           style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "var(--text-secondary)" }}>
          {parseBold(text)}
        </p>
      );
    }
  }
}

// ── Main component ────────────────────────────────────────────────
export default function ArticleContent({ content = "" }) {
  const lines  = content.split("\n");
  const groups = groupLines(lines);

  return (
    <article className="article-content">
      {groups.map((group, i) => renderGroup(group, i))}
    </article>
  );
}
