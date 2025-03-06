import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { auth } = useAuth();

  if (auth?.account) {
    return <Outlet />; // Renders the protected component
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
