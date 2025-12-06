import React from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/store/slices/authSlice";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }: {children: React.ReactNode}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
