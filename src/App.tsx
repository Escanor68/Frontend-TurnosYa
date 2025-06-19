import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Providers
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { PaymentProvider } from './context/PaymentContext';
import { ThemeProvider } from './context/ThemeContext';
import { AccessibilityProvider } from './components/common/AccessibilityProvider';

// Layouts
import Layout from './components/layout/Layout';
import AdminLayout from './layouts/AdminLayout';
import MainLayout from './layouts/MainLayout';

// Components
import { ErrorBoundary } from './components/common/ErrorBoundary';
import RequireAuth from './components/auth/RequireAuth';
import { PublicRoute } from './components/auth/PublicRoute';

// Routes configuration
import {
  publicRoutes,
  adminRoutes,
  ownerRoutes,
  playerRoutes,
} from './config/routes';

// Configuration
import { TOAST_CONFIG } from './config';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AccessibilityProvider>
          <AuthProvider>
            <UserProvider>
              <PaymentProvider>
                <ToastContainer {...TOAST_CONFIG} />

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
                      {route.element && (
                        <Route index element={<route.element />} />
                      )}
                    </Route>
                  ))}

                  {/* Admin Routes */}
                  {adminRoutes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        <RequireAuth allowedRoles={route.allowedRoles || []} />
                      }
                    >
                      <Route element={<AdminLayout />}>
                        {route.children?.map((childRoute) => (
                          <Route
                            key={childRoute.path}
                            path={childRoute.path}
                            element={
                              childRoute.element ? <childRoute.element /> : null
                            }
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
                      element={
                        <RequireAuth allowedRoles={route.allowedRoles || []} />
                      }
                    >
                      <Route element={<MainLayout />}>
                        {route.children?.map((childRoute) => (
                          <Route
                            key={childRoute.path}
                            path={childRoute.path}
                            element={
                              childRoute.element ? <childRoute.element /> : null
                            }
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
                      element={
                        <RequireAuth allowedRoles={route.allowedRoles || []} />
                      }
                    >
                      <Route element={<MainLayout />}>
                        {route.children?.map((childRoute) => (
                          <Route
                            key={childRoute.path}
                            path={childRoute.path}
                            element={
                              childRoute.element ? <childRoute.element /> : null
                            }
                          />
                        ))}
                      </Route>
                    </Route>
                  ))}
                </Routes>
              </PaymentProvider>
            </UserProvider>
          </AuthProvider>
        </AccessibilityProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
