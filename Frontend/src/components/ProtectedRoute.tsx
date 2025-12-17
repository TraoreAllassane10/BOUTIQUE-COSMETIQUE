import React from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/store/slices/authSlice";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }: {children: React.ReactNode}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const token  = localStorage.getItem("token")

  if (!isAuthenticated || !token) {
    <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
