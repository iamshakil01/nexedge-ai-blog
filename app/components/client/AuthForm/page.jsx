"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthForm({ mode = "login", from = "/" }) {
  const router = useRouter();
  const isLogin = mode === "login";

  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const body     = isLogin ? { email, password } : { name, email, password };

    const res  = await fetch(endpoint, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(body),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }

    // Redirect after success
    router.push(from);
    router.refresh();
  };

  return (
    <div className="w-full max-w-md">

      {/* Header */}
      <div className="text-center mb-10">
        <div className="tag-pill inline-flex mb-4">
          {isLogin ? "Welcome Back" : "Join NexEdge AI"}
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-2"
            style={{ color: "var(--text-primary)" }}>
          {isLogin ? "Sign In" : "Create Account"}
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          {isLogin
            ? "Sign in to leave reviews and comments."
            : "Create an account to join the community."}
        </p>
      </div>

      {/* Card */}
      <div className="rounded-2xl overflow-hidden"
           style={{
             background: "var(--bg-surface)",
             border: "1px solid rgba(6,182,212,0.12)",
             boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
           }}>

        {/* Top bar */}
        <div className="h-1 w-full"
             style={{ background: "linear-gradient(90deg, #0891b2, #2563eb)" }} />

        <form onSubmit={submit} className="p-8 flex flex-col gap-5">

          {/* Name — register only */}
          {!isLogin && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest"
                     style={{ color: "var(--text-muted)" }}>
                Full Name
              </label>
              <input
                type="text"
                className="input-premium"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest"
                   style={{ color: "var(--text-muted)" }}>
              Email
            </label>
            <input
              type="email"
              className="input-premium"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest"
                   style={{ color: "var(--text-muted)" }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className="input-premium"
                style={{ paddingRight: "48px" }}
                placeholder={isLogin ? "Your password" : "Min. 6 characters"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                style={{ color: "var(--text-muted)" }}
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? (
                  /* Eye-off icon */
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M2 2l14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M7.5 3.5C8 3.2 8.5 3 9 3c4 0 7 6 7 6s-.8 1.5-2 3"
                          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M4.5 5C3 6.2 2 9 2 9s3 6 7 6c1.5 0 2.8-.5 3.9-1.3"
                          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M10.5 10.5A2 2 0 0 1 7.5 7.5"
                          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ) : (
                  /* Eye icon */
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M2 9s3-6 7-6 7 6 7 6-3 6-7 6-7-6-7-6z"
                          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 p-3 rounded-xl"
                 style={{ background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                   style={{ color: "var(--accent-rose)", flexShrink: 0 }}>
                <path d="M7 4v4M7 9.5v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <p className="text-xs" style={{ color: "var(--accent-rose)" }}>{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-glow w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                  <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                {isLogin ? "Signing in..." : "Creating account..."}
              </>
            ) : (
              isLogin ? "Sign In" : "Create Account"
            )}
          </button>

        </form>
      </div>

      {/* Switch mode */}
      <p className="text-center text-sm mt-6" style={{ color: "var(--text-muted)" }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <a href={isLogin ? "/register" : "/login"}
           className="font-semibold transition-colors"
           style={{ color: "var(--accent-cyan)" }}>
          {isLogin ? "Register" : "Sign In"}
        </a>
      </p>

    </div>
  );
}
