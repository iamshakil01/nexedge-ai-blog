"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function NavActions() {
  const router     = useRouter();
  const dropdownRef = useRef(null);

  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [open,    setOpen]    = useState(false);

  // Fetch current user
  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => { setUser(d.user); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Close on click outside OR Escape key
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown",   handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown",   handleKey);
    };
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="w-20 h-8 rounded-lg animate-pulse"
           style={{ background: "rgba(255,255,255,0.05)" }} />
    );
  }

  // Not logged in — Register only
  if (!user) {
    return (
      <a href="/register" className="btn-glow px-5 py-2 rounded-lg text-sm">
        Register
      </a>
    );
  }

  // Logged in
  return (
    <div className="flex items-center gap-2">

      {/* Admin: Write button */}
      {user.role === "admin" && (
        <a href="/admin"
           className="btn-glow px-5 py-2 rounded-lg text-sm inline-flex items-center gap-2">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Write
        </a>
      )}

      {/* Avatar dropdown — ref wraps the whole toggle + menu */}
      <div className="relative" ref={dropdownRef}>

        {/* Toggle button */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/5"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
               style={{ background: "linear-gradient(135deg, #0891b2, #2563eb)", color: "#fff" }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium hidden sm:block"
                style={{ color: "var(--text-primary)" }}>
            {user.name.split(" ")[0]}
          </span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
               style={{ color: "var(--text-muted)" }}
               className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Dropdown menu */}
        {open && (
          <div className="absolute right-0 top-full mt-2 w-52 rounded-xl overflow-hidden"
               style={{
                 background: "var(--bg-elevated)",
                 border: "1px solid rgba(6,182,212,0.15)",
                 boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                 zIndex: 9999,
               }}>

            {/* User info */}
            <div className="px-4 py-3"
                 style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                {user.name}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                {user.email}
              </p>
              {user.role === "admin" && (
                <span className="inline-block mt-2 tag-pill">Admin</span>
              )}
            </div>

            {/* Links */}
            <div className="py-1">
              <a href="/blog" onClick={() => setOpen(false)}
                 className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                 style={{ color: "var(--text-secondary)" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 3h10M2 7h7M2 11h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Browse Articles
              </a>

              {user.role === "admin" && (
                <a href="/admin" onClick={() => setOpen(false)}
                   className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                   style={{ color: "var(--text-secondary)" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Write Article
                </a>
              )}
            </div>

            {/* Logout */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <button onClick={logout}
                className="flex items-center gap-3 px-4 py-2.5 text-sm w-full text-left transition-colors hover:bg-white/5"
                style={{ color: "var(--accent-rose)" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2H2v10h3M9 4l3 3-3 3M12 7H5"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sign Out
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
