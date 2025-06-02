import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/UseAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading while checking auth status
  if (loading) {
    return null; // The AuthProvider will handle the loading screen
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;