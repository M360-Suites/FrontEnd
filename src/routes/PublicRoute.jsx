import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/UseAuth";

const PublicRoute = ({ children, restricted = false }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading while checking auth status
  if (loading) {
    return null; // The AuthProvider will handle the loading screen
  }

  // If restricted route and user is authenticated, redirect to dashboard
  if (restricted && isAuthenticated) {
    // Always redirect to dashboard for authenticated users
    return <Navigate to='/dashboard' replace />;
  }

  return children;
};

export default PublicRoute;
