import { Outlet } from 'react-router-dom';
import { useAuthRedirect } from '../hooks/useAuthRedirect';
import { Sidebar } from '../components/admin/Sidebar';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function AdminLayout() {
  const { isLoading } = useAuthRedirect({
    requireAuth: true,
    redirectTo: '/login',
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
