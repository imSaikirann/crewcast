# Crewcast Design System

> A focused hiring workspace for publishing roles, reviewing candidates, and making decisions from structured evidence.

## Product Direction

Crewcast must feel like a hiring tool, not a marketing template. The interface is precise, calm, and operational: clear hierarchy, compact controls, strong tables, useful metadata, and obvious actions. The visual identity comes from typography, spacing, borders, and the contrast between pure white and `#131313`—not from decorative color.

- Default theme: **light**. Do not inherit the operating-system theme on a first visit.
- Alternate theme: **dark**, selected explicitly with the theme toggle.
- Core colors: pure white and `#131313`.
- Neutral grays may support hierarchy, borders, disabled states, and secondary surfaces.
- Never use cream, beige, ivory, warm off-white, pastel backgrounds, gradients, glows, or decorative blobs.
- Semantic colors are reserved for data and feedback: candidate status, score quality, warnings, errors, and success.
- Product UI is the brand. Marketing pages should look like an introduction to the same application, not a separate visual world.

## Design Principles

### 1. Evidence before decoration

Candidate scores, GitHub signals, role details, application status, and comparison data should attract attention before illustrations or promotional copy.

### 2. Dense, but never cramped

Recruiters scan and compare. Use compact rows and controls, clear column alignment, restrained spacing, and progressive disclosure for deeper information.

### 3. Borders create structure

Use 1px neutral borders and subtle surface changes to separate regions. Shadows are rare and limited to floating UI such as menus, dialogs, and sheets.

### 4. One visual language

Landing pages, authentication, dashboards, public hiring forms, and admin screens use the same sans-serif type, radii, controls, and monochrome palette.

### 5. Color has meaning

Green, amber, red, and blue are not brand decoration. They communicate success, review states, risk, errors, or informational status.

## Color Tokens

### Light theme — default

| Token | Value | Use |
|---|---:|---|
| `--background` | `#ffffff` | Page and application canvas |
| `--foreground` | `#131313` | Primary text and icons |
| `--card` | `#ffffff` | Cards, tables, panels, popovers |
| `--card-foreground` | `#131313` | Text on cards |
| `--primary` | `#131313` | Primary buttons, selected emphasis |
| `--primary-foreground` | `#ffffff` | Content on primary controls |
| `--secondary` | `#f4f4f4` | Secondary controls and compact grouped regions |
| `--secondary-foreground` | `#131313` | Content on secondary surfaces |
| `--muted` | `#f4f4f4` | Subtle rows, skeletons, inactive surfaces |
| `--muted-foreground` | `#666666` | Helper text, metadata, placeholders |
| `--border` | `#e2e2e2` | Default borders and dividers |
| `--border-strong` | `#c9c9c9` | Hovered or emphasized boundaries |
| `--ring` | `#131313` | Keyboard focus ring |
| `--destructive` | `#c52a2a` | Destructive actions and errors |

`#f4f4f4` is a neutral gray utility surface, not an alternate page canvas. Large page regions remain pure white.

### Dark theme

| Token | Value | Use |
|---|---:|---|
| `--background` | `#131313` | Page and application canvas |
| `--foreground` | `#f5f5f5` | Primary text and icons |
| `--card` | `#181818` | Cards, tables, panels, popovers |
| `--card-foreground` | `#f5f5f5` | Text on cards |
| `--primary` | `#ffffff` | Primary buttons and selected emphasis |
| `--primary-foreground` | `#131313` | Content on primary controls |
| `--secondary` | `#222222` | Secondary controls and grouped regions |
| `--secondary-foreground` | `#f5f5f5` | Content on secondary surfaces |
| `--muted` | `#222222` | Subtle rows, skeletons, inactive surfaces |
| `--muted-foreground` | `#a3a3a3` | Helper text, metadata, placeholders |
| `--border` | `#303030` | Default borders and dividers |
| `--border-strong` | `#484848` | Hovered or emphasized boundaries |
| `--ring` | `#ffffff` | Keyboard focus ring |
| `--destructive` | `#ef5b5b` | Destructive actions and errors |

Dark mode is charcoal, not absolute black. Use `#131313` for the canvas so panels and interactive states can remain visible.

### Semantic colors

Use semantic colors in small areas only: badges, dots, icons, score bars, validation messages, and chart marks. Every status must also have a text label or icon; color cannot carry meaning alone.

| Meaning | Light | Dark | Typical use |
|---|---:|---:|---|
| Success / hired / strong | `#18794e` | `#4ade80` | Hired state, strong score, completed action |
| Warning / review / medium | `#9a6700` | `#f6c453` | Needs review, medium score, expiry warning |
| Danger / rejected / weak | `#c52a2a` | `#ef6a6a` | Error, rejected state, weak score |
| Info / active | `#2463a7` | `#70a7e8` | Informational status, active processing |

Do not tint full pages or large cards with semantic colors. Prefer a neutral surface with a colored badge or small indicator.

## Typography

Use one sans-serif family across the entire product. **Inter** is the primary font; the system sans-serif stack is the fallback. Do not use editorial serif fonts, display novelty fonts, or a separate marketing typeface.

```css
--font-sans: "Inter", ui-sans-serif, system-ui, -apple-system,
  BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
```

| Role | Size | Weight | Line height | Tracking |
|---|---:|---:|---:|---:|
| Page title | 24–28px | 600 | 1.2 | `-0.025em` |
| Marketing hero | 48–64px | 650–700 | 1.02–1.08 | `-0.04em` |
| Section title | 20–24px | 600 | 1.25 | `-0.02em` |
| Card title | 14–16px | 600 | 1.4 | `-0.01em` |
| Body | 14–16px | 400 | 1.5 | normal |
| UI label | 13–14px | 500 | 1.35 | normal |
| Metadata | 12–13px | 400–500 | 1.4 | normal |

- Default application text is 14px; public forms and marketing body copy may use 16px.
- Use sentence case. Avoid all-caps section labels and excessive letter spacing.
- Use tabular numerals for scores, counts, dates, and dashboard metrics.
- Keep functional copy short and direct: “Create job”, “Compare candidates”, “Publish form”.

## Spacing and Layout

Use a 4px base grid.

| Token | Value | Typical use |
|---|---:|---|
| `--space-1` | 4px | Tight icon or label separation |
| `--space-2` | 8px | Inline control gap |
| `--space-3` | 12px | Compact padding |
| `--space-4` | 16px | Standard component padding |
| `--space-5` | 20px | Page subsection gap |
| `--space-6` | 24px | Standard page gap |
| `--space-8` | 32px | Major content separation |
| `--space-12` | 48px | Marketing section padding |
| `--space-20` | 80px | Large landing-section separation |

### Application shell

- Desktop sidebar: 228px expanded, 60px collapsed.
- Main content: fluid, with a practical max width of 1440px for data-heavy screens.
- Standard page padding: 24px desktop, 16px tablet, 12–16px mobile.
- Page header: title and context left; primary action and utilities right.
- Avoid placing dashboard content in a narrow centered marketing container.

### Marketing and public pages

- Content max width: 1120px.
- Reading-width copy: 560–680px.
- Section spacing: 72–96px desktop, 48–64px mobile.
- Prefer left-aligned product messaging. Center alignment is acceptable only for a short hero or final action.
- Show real product workflows: job creation, ranked candidates, GitHub evidence, and comparison views.

## Shape and Elevation

| Element | Radius |
|---|---:|
| Buttons, inputs, selects | 6px |
| Badges | 4–6px; pill only for compact status chips |
| Cards and panels | 8px |
| Dialogs, sheets, large previews | 10–12px |
| Avatars | Full circle |

Avoid oversized 24–42px “friendly SaaS” cards. Crewcast should feel structured and professional.

- Default cards: no shadow; use a 1px border.
- Menus and dialogs: `0 12px 32px rgba(0, 0, 0, 0.12)` in light mode.
- Dark-mode floating surfaces may use `0 16px 40px rgba(0, 0, 0, 0.35)`.
- No colored shadows, glows, glassmorphism, or gradients.

## Core Components

### Buttons

- Primary: `#131313` fill with white text in light mode; invert in dark mode.
- Secondary: neutral gray surface with foreground text.
- Outline: transparent surface with a neutral border.
- Ghost: transparent until hover; use for row and navigation actions.
- Destructive: red only when the action is genuinely destructive.
- Standard height: 36px; compact table action: 32px; large public CTA: 40px.
- Use one primary button per action group.

### Inputs and filters

- 36–40px high with a 6px radius and visible 1px border.
- White in light mode and panel charcoal in dark mode.
- Labels remain visible above fields; placeholders are examples, not labels.
- Focus uses a high-contrast ring plus border change.
- Keep job and candidate filters in a compact horizontal toolbar on desktop and a stacked layout on mobile.

### Cards and panels

- Use cards for grouped information, not for every piece of copy.
- Standard padding: 16–20px. Use 24px only for major empty states or public forms.
- Prefer a flat section with dividers when several cards would create visual noise.
- Candidate comparison panels should align identical metrics in consistent columns.

### Tables and lists

Tables are a primary Crewcast surface.

- Header height: 40px; row height: 48–56px.
- Use a neutral header, 1px horizontal dividers, and a subtle gray row hover.
- Keep names and the primary identifier visually strongest; metadata and timestamps recede.
- Right-align numeric values and use tabular numerals.
- Row actions appear at the end of the row and must remain keyboard accessible.
- Preserve column headers on long lists when practical.
- On mobile, convert rows into compact records; do not force a miniature desktop table.

### Status and score badges

- Use short labels: “New”, “Review”, “Shortlisted”, “Hired”, “Rejected”.
- Use compact neutral badges by default; introduce semantic color only where it improves scanning.
- Scores should always show the number, such as `82/100`; never rely only on red/amber/green.
- GitHub scoring is decision support, not a verdict. UI copy should say “signal”, “evidence”, or “fit”, not imply certainty.

### Navigation

- Sidebar navigation is compact and stable; icons support labels rather than replace them when expanded.
- Active items use a neutral filled state, stronger text, and optionally a slim indicator.
- The theme switch belongs with account/settings utilities, not as a prominent brand element.
- Public navigation should be minimal: logo, product context, sign in, and one primary action.

### Empty, loading, and error states

- Empty states explain what is missing and provide one clear next action.
- Use neutral line icons or simple product diagrams—no stock illustration style.
- Skeletons must match the structure of the content they replace.
- Errors are specific and actionable. Do not show a red card when a short inline message is enough.

## Motion

- Interaction transitions: 120–180ms.
- Panels and dialogs: 180–240ms.
- Animate opacity and small position changes; avoid large zooms, bouncing, or continuous decorative motion.
- Respect `prefers-reduced-motion`.
- Motion should clarify state change, not make the product feel promotional.

## Accessibility

- Meet WCAG AA contrast for text and controls.
- Never remove visible keyboard focus.
- Interactive targets should be at least 36px in dense desktop UI and 44px on touch layouts.
- Do not communicate candidate status or score through color alone.
- Tables require correct headers; form fields require persistent labels and useful error text.
- Light and dark themes must preserve the same information hierarchy.

## Theme Behavior

The first visit resolves to light mode. Store only an explicit user choice.

```ts
const theme = localStorage.getItem("crewcast-theme") ?? "light";
```

- `light`: pure white canvas with `#131313` foreground and actions.
- `dark`: `#131313` canvas with white primary actions and layered charcoal panels.
- A system-following option may be offered later, but it must not be the default.
- Prevent a theme flash by applying the stored theme before the application renders.

## Do

- Make candidate names, role titles, statuses, scores, and next actions easy to scan.
- Use pure white as the large light-theme canvas.
- Use `#131313` as the light-theme anchor and dark-theme canvas.
- Build hierarchy with type, spacing, borders, and neutral surface changes.
- Keep application controls compact and consistent.
- Show real product UI on landing pages.
- Use semantic color sparingly and accessibly.

## Don’t

- Do not use cream, beige, bone, ivory, warm gray page backgrounds, or paper-like surfaces.
- Do not use lavender, pastel blue, pink CTAs, or decorative brand gradients.
- Do not use serif display fonts or magazine-style editorial layouts.
- Do not use giant rounded cards, pill-shaped controls everywhere, or floating glass panels.
- Do not make the landing page feel visually separate from the hiring product.
- Do not use marketing decoration where a real role, candidate, score, or workflow can tell the story.
- Do not make dark mode the default.

## Implementation Reference

```css
:root,
.light {
  color-scheme: light;
  --background: #ffffff;
  --foreground: #131313;
  --card: #ffffff;
  --card-foreground: #131313;
  --primary: #131313;
  --primary-foreground: #ffffff;
  --secondary: #f4f4f4;
  --secondary-foreground: #131313;
  --muted: #f4f4f4;
  --muted-foreground: #666666;
  --border: #e2e2e2;
  --border-strong: #c9c9c9;
  --ring: #131313;
  --destructive: #c52a2a;
  --radius: 0.5rem;
}

.dark {
  color-scheme: dark;
  --background: #131313;
  --foreground: #f5f5f5;
  --card: #181818;
  --card-foreground: #f5f5f5;
  --primary: #ffffff;
  --primary-foreground: #131313;
  --secondary: #222222;
  --secondary-foreground: #f5f5f5;
  --muted: #222222;
  --muted-foreground: #a3a3a3;
  --border: #303030;
  --border-strong: #484848;
  --ring: #ffffff;
  --destructive: #ef5b5b;
}
```

## Agent Prompt Guide

When designing or implementing Crewcast, use this short direction:

> Design a precise, product-led hiring interface. Light mode is the default with a pure `#ffffff` canvas, `#131313` text and primary actions, neutral gray utility surfaces, compact 6–8px radii, thin borders, and minimal shadows. Dark mode uses `#131313` as the canvas with charcoal panels and white primary actions. Use Inter throughout. Prioritize jobs, candidates, GitHub evidence, comparison, statuses, tables, forms, and clear next actions. Avoid cream or warm off-whites, pastels, gradients, serif headlines, oversized rounded marketing cards, and decorative SaaS visuals.
