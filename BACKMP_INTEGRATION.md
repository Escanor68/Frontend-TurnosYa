# 🔗 Integración Frontend con BackMP

## 📋 Resumen

Este documento describe la integración del frontend de TurnosYa con el microservicio BackMP (backend de MercadoPago) que se ejecuta en `localhost:3003`.

## 🏗️ Arquitectura

```
┌─────────────────┐    HTTP/WebSocket    ┌─────────────────┐
│   Frontend      │ ◄──────────────────► │     BackMP      │
│  TurnosYa       │                      │  localhost:3003  │
│                 │                      │                 │
│ - React + Vite  │                      │ - Node.js       │
│ - TypeScript    │                      │ - Express       │
│ - Tailwind CSS  │                      │ - MercadoPago   │
└─────────────────┘                      └─────────────────┘
```

## ⚙️ Configuración

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```bash
# Configuración de BackMP (Microservicio de Pagos)
VITE_BACKMP_API_URL=http://localhost:3003/api
VITE_BACKMP_SOCKET_URL=http://localhost:3003

# Configuración del Frontend
VITE_API_URL=http://localhost:3001/api
VITE_FOOTBALL_API_URL=/api/v1

# Configuración de MercadoPago (solo para referencia)
VITE_MERCADOPAGO_API_URL=https://api.mercadopago.com
```

### Verificar Configuración

```bash
# Verificar que BackMP esté corriendo
curl http://localhost:3003/health

# Verificar conectividad con BackFutbol
curl http://localhost:3003/backfutbol/health
```

## 🚀 Servicios Implementados

### 1. BackMPService (`src/services/backmp.service.ts`)

Servicio principal para comunicación con BackMP:

```typescript
import { backMPService } from '../services/backmp.service';

// Crear preferencia de pago
const preference = await backMPService.createPaymentPreference(
  bookingId,
  amount
);

// Obtener estado de pago
const status = await backMPService.getPaymentStatus(paymentId);

// Solicitar reembolso
const refund = await backMPService.requestRefund({ paymentId, reason, amount });

// Generar factura PDF
const blob = await backMPService.generateInvoice(paymentId);
```

### 2. useBackMP Hook (`src/hooks/useBackMP.ts`)

Hook personalizado para usar BackMP en componentes React:

```typescript
import { useBackMP } from '../hooks/useBackMP';

const MyComponent = () => {
  const {
    createPaymentPreference,
    getPaymentStatus,
    requestRefund,
    isLoading,
    error,
  } = useBackMP();

  const handlePayment = async () => {
    const preference = await createPaymentPreference(bookingId, amount);
    if (preference) {
      window.location.href = preference.initPoint;
    }
  };
};
```

### 3. PaymentContext Actualizado

El contexto de pagos ahora usa BackMP:

```typescript
import { usePayment } from '../hooks/usePayment';

const { createPaymentPreference } = usePayment();

// Crear preferencia con monto
const preference = await createPaymentPreference(bookingId, amount);
```

## 📱 Componentes

### BackMPStatus (`src/components/BackMPStatus.tsx`)

Componente para mostrar el estado de conectividad:

```typescript
import BackMPStatus from '../components/BackMPStatus';

// Vista simple
<BackMPStatus />

// Vista detallada
<BackMPStatus showDetails={true} />
```

## 🔄 Flujo de Pagos

### 1. Crear Reserva

```typescript
// 1. Usuario crea reserva en el frontend
const booking = await createBooking(bookingData);

// 2. Redirigir a pago
navigate(`/payment/${booking.id}`);
```

### 2. Procesar Pago

```typescript
// 1. Crear preferencia de pago en BackMP
const preference = await backMPService.createPaymentPreference(
  bookingId,
  amount
);

// 2. Redirigir a MercadoPago
window.location.href = preference.initPoint;
```

### 3. Webhook de Confirmación

```typescript
// BackMP recibe webhook de MercadoPago
// BackMP notifica a BackFutbol para confirmar reserva
// BackMP actualiza estado del pago
```

### 4. Verificar Estado

```typescript
// Verificar estado del pago
const status = await backMPService.getPaymentStatus(paymentId);

if (status === 'approved') {
  // Pago exitoso
  showSuccessMessage();
} else if (status === 'rejected') {
  // Pago fallido
  showErrorMessage();
}
```

## 🛠️ Endpoints de BackMP

### Pagos

- `POST /api/payments/preference` - Crear preferencia de pago
- `GET /api/payments/:id/status` - Obtener estado de pago
- `GET /api/payments/:id` - Obtener pago por ID

### Reembolsos

- `POST /api/payments/:id/refund` - Solicitar reembolso
- `GET /api/payments/:id/refund-status` - Estado del reembolso
- `GET /api/payments/user/refunds` - Historial de reembolsos

### Facturación

- `GET /api/payments/:id/invoice` - Generar factura PDF
- `POST /api/payments/:id/invoice/email` - Enviar factura por email

### Salud del Sistema

- `GET /health` - Health check de BackMP
- `GET /backfutbol/health` - Conectividad con BackFutbol

## 🔍 Debugging

### Logs del Frontend

El frontend registra todas las operaciones con BackMP:

```bash
# Ver logs de BackMP en consola del navegador
🚀 [BackMP] Request: POST /api/payments/preference
✅ [BackMP] Response: 200 /api/payments/preference
❌ [BackMP] Error: Error message
```

### Verificar Conectividad

```typescript
import { useBackMP } from '../hooks/useBackMP';

const { healthCheck, backFutbolHealthCheck } = useBackMP();

// Verificar BackMP
const backMPOk = await healthCheck();

// Verificar BackFutbol
const backFutbolOk = await backFutbolHealthCheck();
```

## 🚨 Manejo de Errores

### Errores de Conexión

- Timeout de 15 segundos para operaciones de pago
- Reintentos automáticos para operaciones críticas
- Fallback graceful si BackMP no está disponible

### Errores de Autenticación

- Token JWT automático en todas las peticiones
- Redirección automática a login si token expira
- Limpieza automática de tokens inválidos

### Errores de Pago

- Validación de datos antes de enviar a BackMP
- Mensajes de error específicos para cada tipo de error
- Logs detallados para debugging

## 📊 Monitoreo

### Métricas Disponibles

- Estado de conectividad con BackMP
- Estado de conectividad con BackFutbol
- Tiempo de respuesta de operaciones
- Tasa de éxito de pagos
- Errores por tipo

### Alertas Recomendadas

- BackMP no responde por más de 30 segundos
- Tasa de errores de pago > 5%
- Errores de autenticación > 10 en 1 hora
- Webhooks fallidos > 3 en 10 minutos

## 🔧 Troubleshooting

### Problemas Comunes

#### 1. BackMP no responde

```bash
# Verificar que esté corriendo
curl http://localhost:3003/health

# Verificar logs de BackMP
tail -f /var/log/backmp.log
```

#### 2. Errores de CORS

```typescript
// Verificar configuración en BackMP
CORS_ORIGIN=http://localhost:3000
```

#### 3. Errores de autenticación

```typescript
// Verificar token en localStorage
const token = localStorage.getItem('token');
console.log('Token:', token);
```

#### 4. Pagos no se procesan

```typescript
// Verificar preferencia creada
const preference = await backMPService.createPaymentPreference(
  bookingId,
  amount
);
console.log('Preference:', preference);
```

## 🚀 Deployment

### Variables de Producción

```bash
# Producción
VITE_BACKMP_API_URL=https://backmp.turnosya.com/api
VITE_BACKMP_SOCKET_URL=https://backmp.turnosya.com
```

### Verificación Post-Deployment

1. Health check de BackMP
2. Verificar conectividad con BackFutbol
3. Probar creación de preferencia de pago
4. Verificar webhooks de MercadoPago
5. Probar generación de facturas

## 📚 Recursos Adicionales

- [Documentación de BackMP](../BackMP/README.md)
- [API de MercadoPago](https://www.mercadopago.com.ar/developers/es/docs)
- [Integración con BackFutbol](../BackMP/NESTJS_INTEGRATION.md)

## ✅ Checklist de Integración

- [ ] Variables de entorno configuradas
- [ ] BackMP corriendo en localhost:3003
- [ ] Health check exitoso
- [ ] Conectividad con BackFutbol verificada
- [ ] Prueba de creación de preferencia
- [ ] Prueba de webhook de pago
- [ ] Prueba de reembolso
- [ ] Prueba de generación de factura
- [ ] Componente de estado implementado
- [ ] Manejo de errores configurado
- [ ] Logs de debugging activos
- [ ] Documentación actualizada

---

**🎉 ¡La integración con BackMP está completa y lista para usar!**
