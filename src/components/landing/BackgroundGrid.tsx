export default function BackgroundGrid() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(to right, #e7e5e4 1px, transparent 1px),
          linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px",
        maskImage: `
          repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
          radial-gradient(ellipse 60% 60% at 50% 45%, black 32%, transparent 75%)
        `,
        WebkitMaskImage: `
          repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
          radial-gradient(ellipse 60% 60% at 50% 45%, black 32%, transparent 75%)
        `,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    />
  );
}
