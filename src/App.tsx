import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { PaymentProvider } from './context/PaymentContext';
// import { ErrorBoundary } from './components/common/ErrorBoundary';
// import { routerConfig } from './router/config';

// Layouts
// import Layout from './components/layout/Layout';
// import RequireAuth from './components/auth/RequireAuth';

// Páginas públicas
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/404';
// Asegúrate de tener estos componentes:
import AboutPage from './components/home/AboutSection';
import ContactPage from './components/home/ContactSection';
import RegisterPage from './pages/auth/RegisterPage';
import { ProfilePage } from './pages/profile/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <PaymentProvider>
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PaymentProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
