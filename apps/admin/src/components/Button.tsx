"use client";

export function Button({
  children,
  onClick,
  type = "button",
  kind = "default",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  kind?: "default" | "primary" | "danger";
}) {
  const base: React.CSSProperties = {
    border: "1px solid var(--border)",
    background: "#fff",
    padding: "8px 10px",
    cursor: "pointer",
    fontSize: 13,
  };

  const variants: Record<string, React.CSSProperties> = {
    default: {},
    primary: { borderColor: "var(--blue)", color: "var(--blue)", fontWeight: 700 },
    danger: { borderColor: "var(--red)", color: "var(--red)", fontWeight: 700 },
  };

  return (
    <button type={type} onClick={onClick} style={{ ...base, ...variants[kind] }}>
      {children}
    </button>
  );
}
