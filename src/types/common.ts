// Tipos básicos
export type ID = string;

export type Timestamp = string;

export type Status = 'active' | 'inactive' | 'pending' | 'deleted';

export type SortOrder = 'asc' | 'desc';

export type PaginationParams = {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

// Tipos de filtros
export type FilterOperator =
  | 'eq'
  | 'ne'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'in'
  | 'nin'
  | 'like'
  | 'ilike';

export type FilterCondition = {
  field: string;
  operator: FilterOperator;
  value: string | number | boolean | Array<string | number>;
};

export type FilterGroup = {
  operator: 'and' | 'or';
  conditions: (FilterCondition | FilterGroup)[];
};

export type Filter = FilterCondition | FilterGroup;

// Tipos de búsqueda
export type SearchParams = {
  query: string;
  fields?: string[];
  filters?: Filter[];
  pagination?: PaginationParams;
};

// Tipos de respuesta de API
export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
};

export type ApiError = {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, unknown>;
};

// Tipos de formularios
export type FormField = {
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'file';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    custom?: (value: unknown) => string | null;
  };
};

export type FormConfig = {
  fields: FormField[];
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit: (values: Record<string, unknown>) => void | Promise<void>;
  onCancel?: () => void;
};

// Tipos de notificaciones
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
};

// Tipos de modales
export type ModalConfig = {
  title: string;
  content: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  onClose?: () => void;
  actions?: Array<{
    label: string;
    variant?: 'primary' | 'secondary' | 'danger';
    onClick: () => void;
  }>;
};

// Tipos de breadcrumbs
export type BreadcrumbItem = {
  label: string;
  href?: string;
  current?: boolean;
};

// Tipos de navegación
export type NavigationItem = {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavigationItem[];
  current?: boolean;
  disabled?: boolean;
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
};

// Tipos de tabla
export type TableColumn<T = unknown> = {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: T) => React.ReactNode;
};

export type TableConfig<T = unknown> = {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  pagination?: PaginationParams;
  onSort?: (key: string, order: SortOrder) => void;
  onPageChange?: (page: number) => void;
  onRowClick?: (row: T) => void;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
};

// Tipos de gráficos
export type ChartData = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }>;
};

export type ChartConfig = {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'polarArea';
  data: ChartData;
  options?: Record<string, unknown>;
};

// Tipos de archivos
export type FileInfo = {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: Timestamp;
  uploadedBy: ID;
};

export type FileUploadConfig = {
  maxSize: number;
  allowedTypes: string[];
  maxFiles: number;
  onUpload: (files: File[]) => Promise<FileInfo[]>;
  onError?: (error: string) => void;
};

// Tipos de geolocalización
export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Address = {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  coordinates?: Coordinates;
};

// Tipos de horarios
export type TimeSlot = {
  start: string;
  end: string;
  available: boolean;
  price?: number;
};

export type Schedule = {
  dayOfWeek: number;
  slots: TimeSlot[];
};

// Tipos de estadísticas
export type Statistic = {
  label: string;
  value: number | string;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    percentage: number;
  };
  icon?: React.ComponentType<{ className?: string }>;
};

// Tipos de configuración
export type AppConfig = {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  currency: string;
  dateFormat: string;
  timeFormat: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
};

// Tipos de auditoría
export type AuditLog = {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  userId: string;
  timestamp: Timestamp;
  details: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
};

// Tipos de permisos
export type Permission = {
  resource: string;
  action: string;
  conditions?: Record<string, unknown>;
};

export type Role = {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
};

// Tipos de caché
export type CacheConfig = {
  key: string;
  ttl: number; // Time to live in seconds
  tags?: string[];
};

export type CacheEntry<T = unknown> = {
  data: T;
  timestamp: number;
  ttl: number;
  tags?: string[];
};

// Tipos de websocket
export type WebSocketMessage<T = unknown> = {
  type: string;
  data: T;
  timestamp: Timestamp;
  userId?: string;
};

export type WebSocketConfig = {
  url: string;
  reconnectAttempts: number;
  reconnectInterval: number;
  onMessage: (message: WebSocketMessage) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Event) => void;
};
