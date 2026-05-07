// LOGO WORDMARK — NexEdge AI text mark
// "NexEdge" white · "AI" cyan-to-blue gradient

const sizes = {
  sm:      { fontSize: "0.95rem" },
  default: { fontSize: "1.18rem" },
  lg:      { fontSize: "1.6rem"  },
};

export default function LogoWordmark({ size = "default" }) {
  const { fontSize } = sizes[size] ?? sizes.default;

  return (
    <div className="logo-wordmark" style={{ fontSize }}>
      <span className="wm-main">NexEdge&nbsp;</span>
      <span className="wm-accent">AI</span>
    </div>
  );
}
