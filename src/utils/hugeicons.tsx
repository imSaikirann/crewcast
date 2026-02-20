"use client";
import { 
  Menu01Icon,
  Cancel01Icon,
  Sun01Icon,
  Moon01Icon,
  UserIcon,
  UserAdd01Icon,
  Briefcase01Icon,
  GlobalIcon,
  Link01Icon,
  Calendar01Icon,
  AlertCircleIcon,
  CheckmarkCircle01Icon,
  RefreshIcon,
  Sad01Icon,
  Building01Icon,
  ArrowUpRight01Icon,
  Loading01Icon,
  CheckmarkCircle02Icon,
  Edit01Icon,
  Add01Icon,
  ArrowRight01Icon,
  EyeIcon,
  LockIcon,
  MoreVerticalIcon,
  TimeQuarterIcon,
  AnalyticsUpIcon,
  Target01Icon,
  CreditCardDefrostIcon,
  Mail01Icon
} from 'hugeicons-react';

export const hugeIcons = {
  "time-quarter-pass":TimeQuarterIcon,
  "analytics-up":AnalyticsUpIcon, 
  "target-03":Target01Icon,
  menu: Menu01Icon,
  cancel: Cancel01Icon,
  sun: Sun01Icon,
  moon: Moon01Icon,
  user: UserIcon,
  'user-add': UserAdd01Icon,
  briefcase: Briefcase01Icon,
  global: GlobalIcon,
  link: Link01Icon,
  calendar: Calendar01Icon,
  'alert-circle': AlertCircleIcon,
  'checkmark-circle': CheckmarkCircle01Icon,
  'checkmark-circle-2': CheckmarkCircle02Icon,
  refresh: RefreshIcon,
  save: Sad01Icon,
  'office-building': Building01Icon,
  'arrow-up-right': ArrowUpRight01Icon,
  loading: Loading01Icon,
  'verified-checkmark': CheckmarkCircle02Icon,
  edit: Edit01Icon,
  'add-circle': Add01Icon,
  'form': Briefcase01Icon,
  delete: Cancel01Icon,
  'upload': Link01Icon,
  'arrow-right': ArrowRight01Icon,
  views:EyeIcon,
  lock:LockIcon,
  'more-vertical':MoreVerticalIcon,
  'credit-card':CreditCardDefrostIcon,
  'mail':Mail01Icon
};

export type HugeIconName = keyof typeof hugeIcons;

interface HugeIconProps {
  name: HugeIconName;
  size?: number | string;
  color?: string;
  className?: string;
}

export const HugeIcon: React.FC<HugeIconProps> = ({ name, size = 24, color = '#000', className }) => {
  const IconComponent = hugeIcons[name];
  if (!IconComponent) {
    // Fallback to a default icon if not found
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent size={size} color={color} className={className} />;
};
