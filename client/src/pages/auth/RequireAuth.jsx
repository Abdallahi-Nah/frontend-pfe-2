import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookie from "cookie-universal";

const RequireAuth = () => {
  const cookies = Cookie();
  const location = useLocation();
  console.log(location);
  return cookies.get("token") !== "" && cookies.get("role") === "etudiant" ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
};

export default RequireAuth;
