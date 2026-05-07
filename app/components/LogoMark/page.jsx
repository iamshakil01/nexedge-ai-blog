// LOGO MARK — standalone icon only, no text
// Use for: favicons, app icons, avatars, small contexts
// Props:
//   size    — pixel size (default 36)
//   id      — unique string to namespace SVG gradient IDs (default "a")
//             Pass a unique id when rendering multiple marks on the same page

export default function LogoMark({ size = 36, id = "a" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="NexEdge AI logo mark"
      role="img"
    >
      <defs>
        {/* Squircle background: deep violet → indigo */}
        <linearGradient
          id={`lm-bg-${id}`}
          x1="0" y1="0" x2="36" y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#6d28d9" />
          <stop offset="100%" stopColor="#4338ca" />
        </linearGradient>

        {/* Nib stroke: white top → soft violet bottom */}
        <linearGradient
          id={`lm-nib-${id}`}
          x1="18" y1="6" x2="18" y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="1"   />
          <stop offset="70%"  stopColor="#ddd6fe" stopOpacity="0.85"/>
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.5" />
        </linearGradient>

        {/* Ink drop: white core → violet fade */}
        <radialGradient id={`lm-drop-${id}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>

        {/* Top glass shine */}
        <linearGradient
          id={`lm-shine-${id}`}
          x1="0" y1="0" x2="0" y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="rgba(255,255,255,0.20)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)"    />
        </linearGradient>

        <clipPath id={`lm-clip-${id}`}>
          <rect width="36" height="36" rx="10" />
        </clipPath>
      </defs>

      {/* Background squircle */}
      <rect width="36" height="36" rx="10" fill={`url(#lm-bg-${id})`} />

      {/* Dot-grid texture */}
      <g clipPath={`url(#lm-clip-${id})`} opacity="0.15">
        {[6, 12, 18, 24, 30].flatMap((x) =>
          [6, 12, 18, 24, 30].map((y) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="0.65" fill="white" />
          ))
        )}
      </g>

      {/* Glass shine overlay */}
      <rect width="36" height="36" rx="10" fill={`url(#lm-shine-${id})`} />

      {/* Pen nib — left wing */}
      <path
        d="M18 7 C12.5 7, 8 12, 9.5 18 C10.5 22.5, 14 26.5, 18 29.5"
        stroke={`url(#lm-nib-${id})`}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Pen nib — right wing (mirror) */}
      <path
        d="M18 7 C23.5 7, 28 12, 26.5 18 C25.5 22.5, 22 26.5, 18 29.5"
        stroke={`url(#lm-nib-${id})`}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Shoulder arc */}
      <path
        d="M12.5 10 Q18 7.5 23.5 10"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Center slit */}
      <line
        x1="18" y1="13.5" x2="18" y2="28"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="1.8 2.2"
      />

      {/* Ink drop glow */}
      <circle cx="18" cy="29.5" r="4" fill={`url(#lm-drop-${id})`} opacity="0.55" />

      {/* Ink drop core */}
      <circle cx="18" cy="29.5" r="1.9" fill="white" />

      {/* Border ring */}
      <rect
        x="0.75" y="0.75" width="34.5" height="34.5" rx="9.5"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}
