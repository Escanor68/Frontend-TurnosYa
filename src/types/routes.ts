import { User } from './auth';

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: User['role'][];
  children?: RouteConfig[];
}

export interface BreadcrumbItem {
  name: string;
  href: string;
  current: boolean;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  current?: boolean;
  children?: NavigationItem[];
}
