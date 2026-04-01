'use client';

export function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
    return (
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
  