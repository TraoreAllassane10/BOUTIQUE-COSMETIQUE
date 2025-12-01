import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/slices/authSlice";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }: {children: React.ReactNode}) => {
  const isAuthenticated = useSelector(selectCurrentUser);

  if (!isAuthenticated) {
    <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
