export default function AdminHeader() {
  return (
    <div className="mb-12">
      <div className="tag-pill inline-flex mb-5">Admin Panel</div>
      <h1 className="text-5xl font-black tracking-tight mb-3"
          style={{ color: "var(--text-primary)" }}>
        New <span className="gradient-text">Article</span>
      </h1>
      <p style={{ color: "var(--text-secondary)" }}>
        Write something worth reading. Publish it instantly.
      </p>
      <div className="shimmer-line mt-6 max-w-xs" />
    </div>
  );
}
