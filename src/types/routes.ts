import { User } from './user';
import type { ComponentType } from 'react';

export interface RouteConfig {
  path: string;
  element: ComponentType | null;
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
  icon?: ComponentType<{ className?: string }>;
  current?: boolean;
  children?: NavigationItem[];
}
