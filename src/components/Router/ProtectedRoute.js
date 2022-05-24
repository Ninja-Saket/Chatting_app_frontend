import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  //   console.log(isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate replace to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
