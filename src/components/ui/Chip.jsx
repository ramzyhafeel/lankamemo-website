export default function Chip({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 text-sm font-medium transition"
      style={{
        borderRadius: 999,
        border: active ? "1px solid rgba(15,118,110,0.25)" : "1px solid var(--border)",
        background: active ? "rgba(15,118,110,0.12)" : "white",
        color: active ? "var(--accent-2)" : "var(--text)",
        boxShadow: active ? "0 10px 22px rgba(15,23,42,0.06)" : "none",
      }}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}