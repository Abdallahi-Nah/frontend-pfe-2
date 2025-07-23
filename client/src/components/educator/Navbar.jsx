import React from "react";
import { assets, dummyEducatorData } from "../../assets/assets";
import { Link } from "react-router-dom";
import Cookie from "cookie-universal";

const Navbar = () => {
  const educatorData = dummyEducatorData;

  const cookies = Cookie();
  const token = cookies.get("token");
  const isLoginPage = location.pathname === "/login";

  const handlLogoutEducator = () => {
    try {
      cookies.remove("token");
      cookies.remove("id");
      cookies.remove("role");

      window.location.pathname = "/login";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3">
      <Link to="/">
        <img src={assets.fst} alt="logo" className="w-28 lg:w-32" />
      </Link>
      <div className="flex items-center gap-5 text-gray-500 relative">
        <p>
          Bienvenue! {cookies.get("nom")} {cookies.get("prenom")}
        </p>
        <img
          className="w-10 h-10 rounded-full object-cover shadow ring-1 ring-gray-300"
          src={
            cookies.get("profile") && cookies.get("profile") !== "undefined"
              ? cookies.get("profile")
              : "/images/default-profile.png"
          }
          alt={`Photo de profil de ${cookies.get("nom") || "utilisateur"}`}
        />
        {/* Affichage du bouton Log In / Log Out */}
        {!token
          ? !isLoginPage && (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer"
              >
                Log In
              </Link>
            )
          : !isLoginPage && (
              <Link
                to="/login"
                className="bg-red-600 text-white px-5 py-2 rounded-full cursor-pointer"
                onClick={handlLogoutEducator}
              >
                Log Out
              </Link>
            )}
      </div>
    </div>
  );
};

export default Navbar;
