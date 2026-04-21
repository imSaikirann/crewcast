"use client";

import * as HugeIcons from "hugeicons-react";
import type { FC } from "react";

/**
 * Central icon registry
 * Keeps your app consistent and type-safe
 */
export const hugeIcons = {
  // navigation
  menu: HugeIcons.Menu01Icon,
  cancel: HugeIcons.Cancel01Icon,

  // theme
  sun: HugeIcons.Sun01Icon,
  moon: HugeIcons.Moon01Icon,

  // users
  user: HugeIcons.UserIcon,
  "user-add": HugeIcons.UserAdd01Icon,

  // business
  briefcase: HugeIcons.Briefcase01Icon,
  "office-building": HugeIcons.Building01Icon,

  // misc
  global: HugeIcons.GlobalIcon,
  link: HugeIcons.Link01Icon,
  calendar: HugeIcons.Calendar01Icon,
  "alert-circle": HugeIcons.AlertCircleIcon,

  // checks
  "checkmark-circle": HugeIcons.CheckmarkCircle01Icon,
  "checkmark-circle-2": HugeIcons.CheckmarkCircle02Icon,
  "verified-checkmark": HugeIcons.CheckmarkCircle02Icon,

  // actions
  refresh: HugeIcons.RefreshIcon,
  loading: HugeIcons.Loading01Icon,
  edit: HugeIcons.Edit01Icon,
  "add-circle": HugeIcons.Add01Icon,
  delete: HugeIcons.Cancel01Icon,
  upload: HugeIcons.Link01Icon,
  "arrow-right": HugeIcons.ArrowRight01Icon,
  "arrow-up-right": HugeIcons.ArrowUpRight01Icon,

  // analytics
  "time-quarter-pass": HugeIcons.TimeQuarterIcon,
  "analytics-up": HugeIcons.AnalyticsUpIcon,
  "target-03": HugeIcons.Target01Icon,

  // ui
  views: HugeIcons.EyeIcon,
  lock: HugeIcons.LockIcon,
  "more-vertical": HugeIcons.MoreVerticalIcon,

  // payments
  "credit-card": HugeIcons.CreditCardDefrostIcon,

  // communication
  mail: HugeIcons.Mail01Icon,

  // fallback
  save: HugeIcons.Sad01Icon,
} as const;

export type HugeIconName = keyof typeof hugeIcons;

interface HugeIconProps {
  name: HugeIconName;
  size?: number | string;
  color?: string;
  className?: string;
}

export const HugeIcon: FC<HugeIconProps> = ({
  name,
  size = 24,
  color = "currentColor",
  className,
}) => {
  const IconComponent = hugeIcons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent size={size} color={color} className={className} />;
};
