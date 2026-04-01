"use client";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        border: "1px solid var(--border)",
        background: "#fff",
        padding: "8px 10px",
        fontSize: 13,
        outline: "none",
        ...(props.style || {}),
      }}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      style={{
        border: "1px solid var(--border)",
        background: "#fff",
        padding: "8px 10px",
        fontSize: 13,
        outline: "none",
        ...(props.style || {}),
      }}
    />
  );
}
