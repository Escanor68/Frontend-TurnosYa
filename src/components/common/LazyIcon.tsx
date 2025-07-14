import React, { useState, useEffect } from 'react';
import { Loader2, LucideProps } from 'lucide-react';

interface LazyIconProps {
  iconName: string;
  className?: string;
  size?: number;
  fallback?: React.ReactNode;
}

// Mapeo de íconos para importación dinámica
const iconMap: Record<
  string,
  () => Promise<{ default: React.ComponentType<LucideProps> }>
> = {
  'map-pin': () =>
    import('lucide-react').then((module) => ({
      default: module.MapPin as React.ComponentType<LucideProps>,
    })),
  star: () =>
    import('lucide-react').then((module) => ({
      default: module.Star as React.ComponentType<LucideProps>,
    })),
  clock: () =>
    import('lucide-react').then((module) => ({
      default: module.Clock as React.ComponentType<LucideProps>,
    })),
  users: () =>
    import('lucide-react').then((module) => ({
      default: module.Users as React.ComponentType<LucideProps>,
    })),
  'dollar-sign': () =>
    import('lucide-react').then((module) => ({
      default: module.DollarSign as React.ComponentType<LucideProps>,
    })),
  plus: () =>
    import('lucide-react').then((module) => ({
      default: module.Plus as React.ComponentType<LucideProps>,
    })),
  minus: () =>
    import('lucide-react').then((module) => ({
      default: module.Minus as React.ComponentType<LucideProps>,
    })),
  calendar: () =>
    import('lucide-react').then((module) => ({
      default: module.Calendar as React.ComponentType<LucideProps>,
    })),
  'loader-2': () =>
    import('lucide-react').then((module) => ({
      default: module.Loader2 as React.ComponentType<LucideProps>,
    })),
  'chevron-down': () =>
    import('lucide-react').then((module) => ({
      default: module.ChevronDown as React.ComponentType<LucideProps>,
    })),
  'chevron-up': () =>
    import('lucide-react').then((module) => ({
      default: module.ChevronUp as React.ComponentType<LucideProps>,
    })),
  'chevron-left': () =>
    import('lucide-react').then((module) => ({
      default: module.ChevronLeft as React.ComponentType<LucideProps>,
    })),
  'chevron-right': () =>
    import('lucide-react').then((module) => ({
      default: module.ChevronRight as React.ComponentType<LucideProps>,
    })),
  search: () =>
    import('lucide-react').then((module) => ({
      default: module.Search as React.ComponentType<LucideProps>,
    })),
  filter: () =>
    import('lucide-react').then((module) => ({
      default: module.Filter as React.ComponentType<LucideProps>,
    })),
  settings: () =>
    import('lucide-react').then((module) => ({
      default: module.Settings as React.ComponentType<LucideProps>,
    })),
  user: () =>
    import('lucide-react').then((module) => ({
      default: module.User as React.ComponentType<LucideProps>,
    })),
  'log-out': () =>
    import('lucide-react').then((module) => ({
      default: module.LogOut as React.ComponentType<LucideProps>,
    })),
  home: () =>
    import('lucide-react').then((module) => ({
      default: module.Home as React.ComponentType<LucideProps>,
    })),
  bookmark: () =>
    import('lucide-react').then((module) => ({
      default: module.Bookmark as React.ComponentType<LucideProps>,
    })),
  heart: () =>
    import('lucide-react').then((module) => ({
      default: module.Heart as React.ComponentType<LucideProps>,
    })),
  share: () =>
    import('lucide-react').then((module) => ({
      default: module.Share as React.ComponentType<LucideProps>,
    })),
  phone: () =>
    import('lucide-react').then((module) => ({
      default: module.Phone as React.ComponentType<LucideProps>,
    })),
  mail: () =>
    import('lucide-react').then((module) => ({
      default: module.Mail as React.ComponentType<LucideProps>,
    })),
  'message-circle': () =>
    import('lucide-react').then((module) => ({
      default: module.MessageCircle as React.ComponentType<LucideProps>,
    })),
  bell: () =>
    import('lucide-react').then((module) => ({
      default: module.Bell as React.ComponentType<LucideProps>,
    })),
  check: () =>
    import('lucide-react').then((module) => ({
      default: module.Check as React.ComponentType<LucideProps>,
    })),
  x: () =>
    import('lucide-react').then((module) => ({
      default: module.X as React.ComponentType<LucideProps>,
    })),
  'alert-circle': () =>
    import('lucide-react').then((module) => ({
      default: module.AlertCircle as React.ComponentType<LucideProps>,
    })),
  info: () =>
    import('lucide-react').then((module) => ({
      default: module.Info as React.ComponentType<LucideProps>,
    })),
  warning: () =>
    import('lucide-react').then((module) => ({
      default: module.AlertTriangle as React.ComponentType<LucideProps>,
    })),
  edit: () =>
    import('lucide-react').then((module) => ({
      default: module.Edit as React.ComponentType<LucideProps>,
    })),
  trash: () =>
    import('lucide-react').then((module) => ({
      default: module.Trash as React.ComponentType<LucideProps>,
    })),
  download: () =>
    import('lucide-react').then((module) => ({
      default: module.Download as React.ComponentType<LucideProps>,
    })),
  upload: () =>
    import('lucide-react').then((module) => ({
      default: module.Upload as React.ComponentType<LucideProps>,
    })),
  eye: () =>
    import('lucide-react').then((module) => ({
      default: module.Eye as React.ComponentType<LucideProps>,
    })),
  'eye-off': () =>
    import('lucide-react').then((module) => ({
      default: module.EyeOff as React.ComponentType<LucideProps>,
    })),
  lock: () =>
    import('lucide-react').then((module) => ({
      default: module.Lock as React.ComponentType<LucideProps>,
    })),
  unlock: () =>
    import('lucide-react').then((module) => ({
      default: module.Unlock as React.ComponentType<LucideProps>,
    })),
  key: () =>
    import('lucide-react').then((module) => ({
      default: module.Key as React.ComponentType<LucideProps>,
    })),
  shield: () =>
    import('lucide-react').then((module) => ({
      default: module.Shield as React.ComponentType<LucideProps>,
    })),
  'credit-card': () =>
    import('lucide-react').then((module) => ({
      default: module.CreditCard as React.ComponentType<LucideProps>,
    })),
  wallet: () =>
    import('lucide-react').then((module) => ({
      default: module.Wallet as React.ComponentType<LucideProps>,
    })),
  receipt: () =>
    import('lucide-react').then((module) => ({
      default: module.Receipt as React.ComponentType<LucideProps>,
    })),
  ticket: () =>
    import('lucide-react').then((module) => ({
      default: module.Ticket as React.ComponentType<LucideProps>,
    })),
  'calendar-days': () =>
    import('lucide-react').then((module) => ({
      default: module.CalendarDays as React.ComponentType<LucideProps>,
    })),
  'clock-3': () =>
    import('lucide-react').then((module) => ({
      default: module.Clock3 as React.ComponentType<LucideProps>,
    })),
  map: () =>
    import('lucide-react').then((module) => ({
      default: module.Map as React.ComponentType<LucideProps>,
    })),
  navigation: () =>
    import('lucide-react').then((module) => ({
      default: module.Navigation as React.ComponentType<LucideProps>,
    })),
  location: () =>
    import('lucide-react').then((module) => ({
      default: module.MapPin as React.ComponentType<LucideProps>,
    })),
  flag: () =>
    import('lucide-react').then((module) => ({
      default: module.Flag as React.ComponentType<LucideProps>,
    })),
  award: () =>
    import('lucide-react').then((module) => ({
      default: module.Award as React.ComponentType<LucideProps>,
    })),
  trophy: () =>
    import('lucide-react').then((module) => ({
      default: module.Trophy as React.ComponentType<LucideProps>,
    })),
  medal: () =>
    import('lucide-react').then((module) => ({
      default: module.Medal as React.ComponentType<LucideProps>,
    })),
  target: () =>
    import('lucide-react').then((module) => ({
      default: module.Target as React.ComponentType<LucideProps>,
    })),
  zap: () =>
    import('lucide-react').then((module) => ({
      default: module.Zap as React.ComponentType<LucideProps>,
    })),
  fire: () =>
    import('lucide-react').then((module) => ({
      default: module.Flame as React.ComponentType<LucideProps>,
    })),
  sun: () =>
    import('lucide-react').then((module) => ({
      default: module.Sun as React.ComponentType<LucideProps>,
    })),
  moon: () =>
    import('lucide-react').then((module) => ({
      default: module.Moon as React.ComponentType<LucideProps>,
    })),
  cloud: () =>
    import('lucide-react').then((module) => ({
      default: module.Cloud as React.ComponentType<LucideProps>,
    })),
  rain: () =>
    import('lucide-react').then((module) => ({
      default: module.CloudRain as React.ComponentType<LucideProps>,
    })),
  wind: () =>
    import('lucide-react').then((module) => ({
      default: module.Wind as React.ComponentType<LucideProps>,
    })),
  thermometer: () =>
    import('lucide-react').then((module) => ({
      default: module.Thermometer as React.ComponentType<LucideProps>,
    })),
  droplets: () =>
    import('lucide-react').then((module) => ({
      default: module.Droplets as React.ComponentType<LucideProps>,
    })),
  umbrella: () =>
    import('lucide-react').then((module) => ({
      default: module.Umbrella as React.ComponentType<LucideProps>,
    })),
  snowflake: () =>
    import('lucide-react').then((module) => ({
      default: module.Snowflake as React.ComponentType<LucideProps>,
    })),
  'cloud-lightning': () =>
    import('lucide-react').then((module) => ({
      default: module.CloudLightning as React.ComponentType<LucideProps>,
    })),
  'cloud-snow': () =>
    import('lucide-react').then((module) => ({
      default: module.CloudSnow as React.ComponentType<LucideProps>,
    })),
  'cloud-fog': () =>
    import('lucide-react').then((module) => ({
      default: module.CloudFog as React.ComponentType<LucideProps>,
    })),
  'cloud-drizzle': () =>
    import('lucide-react').then((module) => ({
      default: module.CloudDrizzle as React.ComponentType<LucideProps>,
    })),
  'cloud-hail': () =>
    import('lucide-react').then((module) => ({
      default: module.CloudHail as React.ComponentType<LucideProps>,
    })),
  'cloud-off': () =>
    import('lucide-react').then((module) => ({
      default: module.CloudOff as React.ComponentType<LucideProps>,
    })),
  'cloud-sun': () =>
    import('lucide-react').then((module) => ({
      default: module.CloudSun as React.ComponentType<LucideProps>,
    })),
  'cloud-moon': () =>
    import('lucide-react').then((module) => ({
      default: module.CloudMoon as React.ComponentType<LucideProps>,
    })),
};

const LazyIcon: React.FC<LazyIconProps> = React.memo(
  ({ iconName, className = '', size = 24, fallback }) => {
    const [IconComponent, setIconComponent] =
      useState<React.ComponentType<LucideProps> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
      const loadIcon = async () => {
        try {
          setIsLoading(true);
          setError(false);

          const iconLoader = iconMap[iconName];
          if (!iconLoader) {
            throw new Error(`Icon ${iconName} not found`);
          }

          const module = await iconLoader();
          setIconComponent(() => module.default);
        } catch (err) {
          console.error(`Failed to load icon ${iconName}:`, err);
          setError(true);
        } finally {
          setIsLoading(false);
        }
      };

      loadIcon();
    }, [iconName]);

    if (isLoading) {
      return (
        fallback || (
          <Loader2 className={`animate-spin ${className}`} size={size} />
        )
      );
    }

    if (error || !IconComponent) {
      return (
        fallback || (
          <div
            className={`w-${size} h-${size} bg-gray-300 rounded ${className}`}
          />
        )
      );
    }

    return <IconComponent className={className} size={size} />;
  }
);

LazyIcon.displayName = 'LazyIcon';

export default LazyIcon;
