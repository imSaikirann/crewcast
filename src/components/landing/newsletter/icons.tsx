import type { SVGProps } from "react";

/**
 * Arcade-style icon set for the landing page.
 * Bold, rounded, slightly playful strokes with a soft duotone fill —
 * inspired by playful "arcade" icon sets, redrawn in-house.
 * 24x24 viewBox, currentColor, 1.9 stroke, round caps/joins.
 */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 20, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Soft duotone fill shorthand (uses currentColor at low opacity). */
const fill = { fill: "currentColor", fillOpacity: 0.12, stroke: "none" } as const;

export const MailIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="3" {...fill} />
    <rect x="3" y="5.5" width="18" height="13" rx="3" />
    <path d="m4 8 8 5 8-5" />
  </Icon>
);

export const SparkIcon = (p: IconProps) => (
  <Icon {...p}>
    <path
      d="M12 3.5c.5 4 2 5.5 6 6-4 .5-5.5 2-6 6-.5-4-2-5.5-6-6 4-.5 5.5-2 6-6Z"
      {...fill}
    />
    <path d="M12 3.5c.5 4 2 5.5 6 6-4 .5-5.5 2-6 6-.5-4-2-5.5-6-6 4-.5 5.5-2 6-6Z" />
    <path d="M18.5 15c.2 1.4.8 2 2.2 2.3-1.4.2-2 .9-2.2 2.2-.2-1.3-.8-2-2.2-2.2 1.4-.3 2-.9 2.2-2.3Z" />
  </Icon>
);

export const ClockIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" {...fill} />
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Icon>
);

export const InboxIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.5 5h15l2 8v4a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2v-4Z" {...fill} />
    <path d="M3.5 13h4l1.5 3h6l1.5-3h4" />
    <path d="M4.5 5h15l2 8v4a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2v-4Z" />
  </Icon>
);

export const ShieldIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3 5 6v5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z" {...fill} />
    <path d="M12 3 5 6v5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

export const BookIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 6c-1.7-1.3-3.8-2-6.5-2v13c2.7 0 4.8.7 6.5 2 1.7-1.3 3.8-2 6.5-2V4c-2.7 0-4.8.7-6.5 2Z" {...fill} />
    <path d="M12 6c-1.7-1.3-3.8-2-6.5-2v13c2.7 0 4.8.7 6.5 2" />
    <path d="M12 6c1.7-1.3 3.8-2 6.5-2v13c-2.7 0-4.8.7-6.5 2" />
    <path d="M12 6v13" />
  </Icon>
);

export const UsersIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="9" cy="8" r="3.2" {...fill} />
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 19c0-3 2.5-5.2 5.5-5.2S14.5 16 14.5 19" />
    <path d="M16 5.2a3.2 3.2 0 0 1 0 5.8M20.5 19c0-2.4-1.5-4.4-3.7-5" />
  </Icon>
);

export const PenIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M14 5.2 18.8 10 9 19.8H4.2V15L14 5.2Z" {...fill} />
    <path d="M14 5.2 18.8 10 9 19.8H4.2V15L14 5.2Z" />
    <path d="m12.5 6.7 4.8 4.8" />
  </Icon>
);

export const CompassIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" {...fill} />
    <circle cx="12" cy="12" r="8.5" />
    <path d="m15.5 8.5-2.2 5-5 2.2 2.2-5 5-2.2Z" />
    <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
  </Icon>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </Icon>
);

export const CheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Icon>
);

export const QuoteIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9.5 6.5c-2.8 1-4.5 3.4-4.5 6.5v4.5h5.5v-5.5H7c0-2.2 1-3.6 3-4.4l-.5-1.6ZM19.5 6.5c-2.8 1-4.5 3.4-4.5 6.5v4.5h5.5v-5.5H17c0-2.2 1-3.6 3-4.4l-.5-1.6Z" {...fill} />
    <path d="M9.5 6.5c-2.8 1-4.5 3.4-4.5 6.5v4.5h5.5v-5.5H7c0-2.2 1-3.6 3-4.4l-.5-1.6ZM19.5 6.5c-2.8 1-4.5 3.4-4.5 6.5v4.5h5.5v-5.5H17c0-2.2 1-3.6 3-4.4l-.5-1.6Z" />
  </Icon>
);

export const CloseIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" {...fill} />
    <path d="M8.5 8.5 15.5 15.5M15.5 8.5 8.5 15.5" />
  </Icon>
);

export const FilterIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 6h16l-6 7v5l-4 2v-7L4 6Z" {...fill} />
    <path d="M4 6h16l-6 7v5l-4 2v-7L4 6Z" />
  </Icon>
);

export const BranchIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="6" cy="6" r="2.6" {...fill} />
    <circle cx="6" cy="6" r="2.6" />
    <circle cx="6" cy="18" r="2.6" {...fill} />
    <circle cx="6" cy="18" r="2.6" />
    <circle cx="18" cy="8" r="2.6" {...fill} />
    <circle cx="18" cy="8" r="2.6" />
    <path d="M6 8.6v6.8M18 10.6c0 3.2-2.6 4.8-6 5.4" />
  </Icon>
);

export const GaugeIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 18a8 8 0 1 1 16 0Z" {...fill} />
    <path d="M4 18a8 8 0 1 1 16 0" />
    <path d="m12 14 4-3.8" />
    <circle cx="12" cy="14" r="1.2" fill="currentColor" stroke="none" />
  </Icon>
);

