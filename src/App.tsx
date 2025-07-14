import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import Layout from './components/layout/Layout';
import AdminLayout from './layouts/AdminLayout';
import MainLayout from './layouts/MainLayout';

// Components
import { ErrorBoundary } from './components/common/ErrorBoundary';
import RequireAuth from './components/auth/RequireAuth';
import { PublicRoute } from './components/auth/PublicRoute';
import LoadingSpinner from './components/common/LoadingSpinner';
import { ScrollToTop } from './components/common/ScrollToTop';

// Routes configuration
import {
  publicRoutes,
  adminRoutes,
  ownerRoutes,
  playerRoutes,
} from './config/routes';

// Configuration
import { TOAST_CONFIG } from './config';

// Componente de fallback para lazy loading
const LazyFallback = () => (
  <div className="d-flex align-items-center justify-content-center min-vh-100">
    <LoadingSpinner size="lg" />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      {/* Scroll to top on route change */}
      <ScrollToTop />

      <Suspense fallback={<LazyFallback />}>
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.element ? (
                  <PublicRoute>
                    <Layout />
                  </PublicRoute>
                ) : null
              }
            >
              {route.element && <Route index element={<route.element />} />}
            </Route>
          ))}

          {/* Admin Routes */}
          {adminRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<RequireAuth allowedRoles={route.allowedRoles || []} />}
            >
              <Route element={<AdminLayout />}>
                {route.children?.map((childRoute) => (
                  <Route
                    key={childRoute.path}
                    path={childRoute.path}
                    element={childRoute.element ? <childRoute.element /> : null}
                  />
                ))}
              </Route>
            </Route>
          ))}

          {/* Owner Routes */}
          {ownerRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<RequireAuth allowedRoles={route.allowedRoles || []} />}
            >
              <Route element={<MainLayout />}>
                {route.children?.map((childRoute) => (
                  <Route
                    key={childRoute.path}
                    path={childRoute.path}
                    element={childRoute.element ? <childRoute.element /> : null}
                  />
                ))}
              </Route>
            </Route>
          ))}

          {/* Player Routes */}
          {playerRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<RequireAuth allowedRoles={route.allowedRoles || []} />}
            >
              <Route element={<MainLayout />}>
                {route.children?.map((childRoute) => (
                  <Route
                    key={childRoute.path}
                    path={childRoute.path}
                    element={childRoute.element ? <childRoute.element /> : null}
                  />
                ))}
              </Route>
            </Route>
          ))}
        </Routes>
      </Suspense>

      <ToastContainer {...TOAST_CONFIG} />
    </ErrorBoundary>
  );
}

export default App;
