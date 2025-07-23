import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookie from "cookie-universal";

const RequireEducatorAuth = () => {
  const cookies = Cookie();
  const location = useLocation();
  console.log(location);
  return cookies.get("token") !== "" && cookies.get("role") === "enseignant" ? (
    <Outlet />
  ) : cookies.get("role") === "etudiant" ? (
    <Navigate state={{ from: location }} replace to="/" />
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
};

export default RequireEducatorAuth;
