export function Table({ children }: { children: React.ReactNode }) {
    return (
      <div style={{ border: "1px solid var(--border)", background: "#fff", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>{children}</table>
      </div>
    );
  }
  
  export function Th({ children }: { children: React.ReactNode }) {
    return (
      <th style={{ textAlign: "left", padding: 10, fontSize: 12, color: "#444", borderBottom: "1px solid var(--border)" }}>
        {children}
      </th>
    );
  }
  
  export function Td({ children }: { children: React.ReactNode }) {
    return <td style={{ padding: 10, fontSize: 13, borderBottom: "1px solid var(--border)" }}>{children}</td>;
  }
  