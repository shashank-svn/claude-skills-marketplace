import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const ProtectedRoute = ({
  children,
  requireSeller = false,
  requireBuyer = false,
}) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireSeller && currentUser.role !== "seller") {
    return <Navigate to="/" replace />;
  }

  if (requireBuyer && currentUser.role === "seller") {
    return <Navigate to="/" replace />;
  }

  return children;
};
