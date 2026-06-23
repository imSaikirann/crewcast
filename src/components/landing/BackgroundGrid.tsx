export default function BackgroundGrid() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(var(--lc-grid) 1px, transparent 1px),
          linear-gradient(90deg, var(--lc-grid) 1px, transparent 1px)
        `,
        backgroundSize: "64px 64px",
      }}
    />
  );
}

