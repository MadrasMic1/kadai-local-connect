import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  roles = [] 
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified and the user's role doesn't match, redirect
  if (roles.length > 0 && !roles.includes(user.role)) {
    // Redirect customers to customer dashboard and vendors to vendor dashboard
    if (user.role === "customer") {
      return <Navigate to="/customer/dashboard" replace />;
    } else {
      return <Navigate to="/vendor/dashboard" replace />;
    }
  }

  // Otherwise, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
