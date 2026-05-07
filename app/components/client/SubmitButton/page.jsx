"use client";

export default function SubmitButton({ loading, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn-glow w-full py-3.5 rounded-xl text-base font-bold flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
    >
      {loading ? (
        <>
          <svg
            className="animate-spin"
            width="18" height="18" viewBox="0 0 18 18" fill="none"
          >
            <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" opacity="0.3" />
            <path
              d="M9 2a7 7 0 0 1 7 7"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            />
          </svg>
          Publishing...
        </>
      ) : (
        <>
          Publish Article
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </>
      )}
    </button>
  );
}
