# TurnosYa - Sistema de Reserva de Canchas Deportivas

## 📝 Descripción

TurnosYa es una aplicación web moderna desarrollada con React y TypeScript que permite la gestión y reserva de canchas deportivas. El sistema maneja múltiples roles de usuario (administrador, propietario y jugador) y proporciona una interfaz intuitiva para la gestión de turnos y canchas.

## 🚀 Características

- **Autenticación y Autorización**

  - Sistema de login y registro
  - Manejo de roles (owner, owner, player)
  - Protección de rutas por rol
  - Recuperación de contraseña

- **Gestión de Canchas**

  - Alta, baja y modificación de canchas
  - Visualización de disponibilidad
  - Filtros y búsqueda

- **Reservas**

  - Creación y cancelación de reservas
  - Historial de reservas
  - Notificaciones

- **Panel de Administración**
  - Gestión de usuarios
  - Reportes y estadísticas
  - Configuración del sistema

## 🛠️ Tecnologías

- React 18
- TypeScript
- Vite
- React Router v6
- Tailwind CSS
- Axios
- React Toastify
- Context API

## 📋 Prerrequisitos

```bash
node >= 16.0.0
npm >= 8.0.0
```

## 🔧 Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/tuusuario/turnosya-frontend.git
cd turnosya-frontend
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

```bash
# Crear archivo .env.local
cp .env.example .env.local

# Editar .env.local con tus valores
VITE_API_URL=http://localhost:3000/api
```

4. **Iniciar en modo desarrollo**

```bash
npm run dev
```

## 🚀 Despliegue

1. **Construir para producción**

```bash
npm run build
```

2. **Previsualizar build**

```bash
npm run preview
```

## 🔍 Debugging

### Herramientas Recomendadas

1. **React Developer Tools**

   - Instalar la extensión para Chrome/Firefox
   - Útil para inspeccionar componentes y estado

2. **Network Tab (DevTools)**
   - Monitorear llamadas API
   - Verificar respuestas y errores

### Logs de Depuración

La aplicación incluye logs detallados para debugging:

- Estado de autenticación
- Rutas y navegación
- Llamadas a la API
- Manejo de errores

### Problemas Comunes

1. **Errores de Autenticación**

   - Verificar token en localStorage
   - Revisar permisos de usuario
   - Validar rutas protegidas

2. **Problemas de Red**
   - Verificar URL de la API
   - Revisar errores CORS
   - Validar formato de respuestas

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── auth/         # Componentes de autenticación
│   ├── common/       # Componentes reutilizables
│   └── layout/       # Componentes de estructura
├── context/          # Contextos de React
├── pages/           # Páginas de la aplicación
├── services/        # Servicios y llamadas API
├── types/           # Definiciones de TypeScript
└── utils/           # Utilidades y helpers
```

## 🔐 Roles y Permisos

1. **Administrador**

   - Gestión completa del sistema
   - Acceso a todas las funcionalidades

2. **Propietario**

   - Gestión de sus canchas
   - Ver reservas de sus canchas
   - Administrar disponibilidad

3. **Jugador**
   - Buscar canchas disponibles
   - Realizar reservas
   - Ver historial personal

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature

```bash
git checkout -b feature/AmazingFeature
```

3. Commit tus cambios

```bash
git commit -m 'Add some AmazingFeature'
```

4. Push a la rama

```bash
git push origin feature/AmazingFeature
```

5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 📧 Contacto

Tu Nombre - [@tutwitter](https://twitter.com/tutwitter) - email@example.com

Link del proyecto: [https://github.com/tuusuario/turnosya-frontend](https://github.com/tuusuario/turnosya-frontend)
