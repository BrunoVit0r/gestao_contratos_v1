import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { Login } from '@/sections/Login';
import { Dashboard } from '@/sections/Dashboard';
import { Toaster } from '@/components/ui/sonner';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? <Dashboard /> : <Login />}
      <Toaster />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
