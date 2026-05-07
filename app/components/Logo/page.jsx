"use client";

import { useState } from "react";

export default function Logo({ size = "default" }) {
  const [failed, setFailed] = useState(false);
  const isSmall = size === "sm";

  if (failed) {
    return (
      <div className="logo-wrap">
        <div className="logo-wordmark">
          <span className="wm-main">NexEdge&nbsp;</span>
          <span className="wm-accent">AI</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src="/logo.png"
      alt="NexEdge AI"
      style={{
        height: "clamp(48px, 8vw, 80px)",
        width: "auto",
        maxWidth: "180px",
        display: "block",
        marginLeft: "-30px",
        filter: "drop-shadow(0 0 10px rgba(6,182,212,0.5))",
        transition: "filter 0.3s ease, transform 0.3s ease",
      }}
      onError={() => setFailed(true)}
    />
  );
}
