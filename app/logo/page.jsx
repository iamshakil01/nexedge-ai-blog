// PUBLIC BRAND / LOGO PAGE — /logo
// Shows all logo variants, color palette, typography, and usage guidelines

import Logo from "@/app/components/Logo/page.jsx";

// ── Reusable inline mark SVG at any size ──────────────────────────
function LogoMark({ size = 64, id = "a" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#6d28d9" />
          <stop offset="100%" stopColor="#4338ca" />
        </linearGradient>
        <linearGradient id={`nib-${id}`} x1="18" y1="6" x2="18" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="1"   />
          <stop offset="70%"  stopColor="#ddd6fe" stopOpacity="0.85"/>
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id={`drop-${id}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`shine-${id}`} x1="0" y1="0" x2="0" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.20)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)"    />
        </linearGradient>
        <clipPath id={`clip-${id}`}>
          <rect width="36" height="36" rx="10" />
        </clipPath>
      </defs>

      <rect width="36" height="36" rx="10" fill={`url(#bg-${id})`} />
      <g clipPath={`url(#clip-${id})`} opacity="0.15">
        {[6,12,18,24,30].flatMap(x =>
          [6,12,18,24,30].map(y => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="0.65" fill="white" />
          ))
        )}
      </g>
      <rect width="36" height="36" rx="10" fill={`url(#shine-${id})`} />
      <path d="M18 7 C12.5 7, 8 12, 9.5 18 C10.5 22.5, 14 26.5, 18 29.5"
            stroke={`url(#nib-${id})`} strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M18 7 C23.5 7, 28 12, 26.5 18 C25.5 22.5, 22 26.5, 18 29.5"
            stroke={`url(#nib-${id})`} strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M12.5 10 Q18 7.5 23.5 10"
            stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <line x1="18" y1="13.5" x2="18" y2="28"
            stroke="rgba(255,255,255,0.28)" strokeWidth="1"
            strokeLinecap="round" strokeDasharray="1.8 2.2" />
      <circle cx="18" cy="29.5" r="4" fill={`url(#drop-${id})`} opacity="0.55" />
      <circle cx="18" cy="29.5" r="1.9" fill="white" />
      <rect x="0.75" y="0.75" width="34.5" height="34.5" rx="9.5"
            stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
    </svg>
  );
}

// ── Section wrapper ───────────────────────────────────────────────
function Section({ title, subtitle, children }) {
  return (
    <section className="mb-20">
      <div className="mb-8">
        <h2 className="text-2xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{subtitle}</p>
        )}
        <div className="shimmer-line mt-4 max-w-xs" />
      </div>
      {children}
    </section>
  );
}

// ── Preview card ──────────────────────────────────────────────────
function PreviewCard({ label, bg, children }) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="rounded-2xl flex items-center justify-center p-10"
        style={{ background: bg, border: "1px solid rgba(255,255,255,0.07)" }}
      >
        {children}
      </div>
      <p className="text-xs text-center font-medium" style={{ color: "var(--text-muted)" }}>
        {label}
      </p>
    </div>
  );
}

// ── Color swatch ──────────────────────────────────────────────────
function Swatch({ name, hex, role }) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="h-16 rounded-xl border"
        style={{
          background: hex,
          borderColor: "rgba(255,255,255,0.08)",
        }}
      />
      <div>
        <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{name}</p>
        <p className="text-xs font-mono mt-0.5" style={{ color: "var(--accent-violet)" }}>{hex}</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{role}</p>
      </div>
    </div>
  );
}

// ── Do / Don't rule ───────────────────────────────────────────────
function Rule({ type, text }) {
  const isdo = type === "do";
  return (
    <div
      className="flex items-start gap-3 p-4 rounded-xl"
      style={{
        background: isdo ? "rgba(34,197,94,0.06)" : "rgba(244,63,94,0.06)",
        border: `1px solid ${isdo ? "rgba(34,197,94,0.18)" : "rgba(244,63,94,0.18)"}`,
      }}
    >
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: isdo ? "rgba(34,197,94,0.2)" : "rgba(244,63,94,0.2)" }}
      >
        {isdo ? (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5l2.5 2.5 3.5-4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M3 3l4 4M7 3l-4 4" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{text}</p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function LogoPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      {/* Page header */}
      <div className="mb-16">
        <div className="tag-pill inline-flex mb-5">Brand Identity</div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4"
            style={{ color: "var(--text-primary)" }}>
          Logo &amp; <span className="gradient-text">Brand</span>
        </h1>
        <p className="text-lg max-w-xl" style={{ color: "var(--text-secondary)" }}>
          Official NexEdge AI brand assets, color palette, typography, and usage guidelines.
        </p>
        <div className="shimmer-line mt-8 max-w-xs" />
      </div>

      {/* ── 1. Primary Logo ─────────────────────────────────── */}
      <Section
        title="Primary Logo"
        subtitle="The default logo — mark + wordmark side by side. Use this in most contexts."
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <PreviewCard label="On dark background" bg="var(--bg-surface)">
            <Logo />
          </PreviewCard>
          <PreviewCard label="On deep background" bg="var(--bg-base)">
            <Logo />
          </PreviewCard>
        </div>
      </Section>

      {/* ── 2. Logo Mark (icon only) ─────────────────────────── */}
      <Section
        title="Logo Mark"
        subtitle="Use the mark alone only when the brand name is already established in context (favicons, app icons, avatars)."
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {[
            { size: 96,  label: "96 × 96",  id: "s96" },
            { size: 72,  label: "72 × 72",  id: "s72" },
            { size: 48,  label: "48 × 48",  id: "s48" },
            { size: 32,  label: "32 × 32",  id: "s32" },
          ].map(({ size, label, id }) => (
            <PreviewCard key={id} label={label} bg="var(--bg-surface)">
              <div
                style={{
                  filter: "drop-shadow(0 0 8px rgba(124,58,237,0.5)) drop-shadow(0 0 20px rgba(124,58,237,0.2))",
                }}
              >
                <LogoMark size={size} id={id} />
              </div>
            </PreviewCard>
          ))}
        </div>
      </Section>

      {/* ── 3. Logo on light background ─────────────────────── */}
      <Section
        title="Light Background Usage"
        subtitle="Avoid placing the logo on light backgrounds. If unavoidable, use the mark only with sufficient contrast."
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <PreviewCard label="On white — avoid" bg="#ffffff">
            <div style={{ filter: "drop-shadow(0 0 6px rgba(124,58,237,0.4))" }}>
              <LogoMark size={64} id="light1" />
            </div>
          </PreviewCard>
          <PreviewCard label="On light grey — avoid" bg="#f3f4f6">
            <div style={{ filter: "drop-shadow(0 0 6px rgba(124,58,237,0.4))" }}>
              <LogoMark size={64} id="light2" />
            </div>
          </PreviewCard>
        </div>
        <p className="text-xs mt-4 px-1" style={{ color: "var(--text-muted)" }}>
          The mark retains legibility on light backgrounds due to its gradient fill, but the wordmark loses contrast. Prefer dark surfaces.
        </p>
      </Section>

      {/* ── 4. Color Palette ─────────────────────────────────── */}
      <Section
        title="Brand Colors"
        subtitle="The NexEdge AI color system. Use these values consistently across all brand touchpoints."
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          <Swatch name="Violet"      hex="#7c3aed" role="Primary brand color" />
          <Swatch name="Indigo"      hex="#6366f1" role="Secondary / gradient end" />
          <Swatch name="Soft Violet" hex="#a78bfa" role="Gradient text, accents" />
          <Swatch name="Lavender"    hex="#c084fc" role="Hover states, highlights" />
          <Swatch name="Base"        hex="#0f0f13" role="Page background" />
          <Swatch name="Surface"     hex="#16161d" role="Card background" />
          <Swatch name="Elevated"    hex="#1c1c26" role="Elevated surfaces" />
          <Swatch name="Rose"        hex="#f43f5e" role="Error / destructive" />
        </div>
      </Section>

      {/* ── 5. Typography ────────────────────────────────────── */}
      <Section
        title="Typography"
        subtitle="NexEdge AI uses system-native Inter for all UI text."
      >
        <div
          className="rounded-2xl p-8 flex flex-col gap-6"
          style={{ background: "var(--bg-surface)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {[
            { label: "Display",   sample: "Where Great Ideas Live",  style: { fontSize: "2.5rem",  fontWeight: 900, letterSpacing: "-0.04em", color: "var(--text-primary)" } },
            { label: "Heading 1", sample: "The Archive",             style: { fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text-primary)" } },
            { label: "Heading 2", sample: "Brand Identity",          style: { fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" } },
            { label: "Body",      sample: "Thoughtfully crafted articles on technology, design, and the ideas shaping our world.", style: { fontSize: "1rem", fontWeight: 400, lineHeight: 1.8, color: "var(--text-secondary)" } },
            { label: "Caption",   sample: "Published · 3 min read",  style: { fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.05em", color: "var(--text-muted)" } },
          ].map(({ label, sample, style }) => (
            <div key={label} className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6"
                 style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "1.25rem" }}>
              <span className="text-xs font-bold uppercase tracking-widest w-24 flex-shrink-0"
                    style={{ color: "var(--text-muted)" }}>
                {label}
              </span>
              <span style={style}>{sample}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 6. Wordmark breakdown ────────────────────────────── */}
      <Section
        title="Wordmark"
        subtitle="The wordmark uses two distinct color treatments to create visual contrast."
      >
        <div
          className="rounded-2xl p-10 flex flex-col items-center gap-8"
          style={{ background: "var(--bg-surface)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Large wordmark */}
          <div style={{ fontSize: "3.5rem", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.02em" }}>
            <span style={{ color: "#ffffff" }}>NexEdge</span>
            <span style={{
              background: "linear-gradient(110deg, #c084fc 0%, #a855f7 40%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>AI</span>
          </div>

          {/* Annotation */}
          <div className="flex items-center gap-10 text-center">
            <div>
              <div className="w-8 h-1 rounded-full mx-auto mb-2" style={{ background: "#ffffff" }} />
              <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>NexEdge</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>#ffffff · weight 800</p>
            </div>
            <div className="h-8 w-px" style={{ background: "rgba(255,255,255,0.08)" }} />
            <div>
              <div className="w-8 h-1 rounded-full mx-auto mb-2"
                   style={{ background: "linear-gradient(90deg, #c084fc, #818cf8)" }} />
              <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>AI</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Violet gradient · weight 800</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 7. Spacing / Clear space ─────────────────────────── */}
      <Section
        title="Clear Space"
        subtitle="Always maintain minimum clear space around the logo equal to the height of the mark."
      >
        <div
          className="rounded-2xl p-10 flex items-center justify-center"
          style={{ background: "var(--bg-surface)", border: "2px dashed rgba(139,92,246,0.25)" }}
        >
          <div
            className="relative flex items-center justify-center"
            style={{ padding: "36px" }}
          >
            {/* Clear space guides */}
            <div className="absolute inset-0 rounded-xl"
                 style={{ border: "1px dashed rgba(139,92,246,0.3)" }} />
            <Logo />
          </div>
        </div>
        <p className="text-xs mt-3 px-1" style={{ color: "var(--text-muted)" }}>
          The dashed border represents the minimum clear space zone. No other elements should enter this area.
        </p>
      </Section>

      {/* ── 8. Do's and Don'ts ───────────────────────────────── */}
      <Section
        title="Do's &amp; Don'ts"
        subtitle="Follow these rules to maintain brand consistency."
      >
        <div className="grid sm:grid-cols-2 gap-3">
          <Rule type="do"   text="Use the logo on dark or deep-coloured backgrounds." />
          <Rule type="dont" text="Don't stretch, skew, or distort the logo in any direction." />
          <Rule type="do"   text="Maintain the minimum clear space around the logo at all times." />
          <Rule type="dont" text="Don't change the wordmark colours or use unapproved colour combinations." />
          <Rule type="do"   text="Use the mark-only variant for favicons, app icons, and small contexts." />
          <Rule type="dont" text="Don't add drop shadows, outlines, or effects to the wordmark." />
          <Rule type="do"   text="Scale the logo proportionally — never resize width and height independently." />
          <Rule type="dont" text="Don't place the logo on busy or low-contrast backgrounds." />
        </div>
      </Section>

      {/* ── Footer CTA ───────────────────────────────────────── */}
      <div
        className="rounded-2xl p-10 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(99,102,241,0.06) 100%)",
          border: "1px solid rgba(139,92,246,0.18)",
        }}
      >
        <Logo />
        <p className="text-sm mt-5 mb-6" style={{ color: "var(--text-muted)" }}>
          Questions about brand usage? Reach out before publishing.
        </p>
        <a href="/" className="btn-ghost-custom px-7 py-2.5 rounded-xl text-sm inline-block">
          ← Back to Home
        </a>
      </div>

    </div>
  );
}
