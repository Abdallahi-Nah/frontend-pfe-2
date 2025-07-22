import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Cookie from "cookie-universal";

const Navbar = () => {
  const { navigate } = useContext(AppContext);
  const cookies = Cookie();
  const location = useLocation();

  const token = cookies.get("token");
  const role = cookies.get("role");

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 bg-white">
      <img
        onClick={() => navigate("/")}
        src={assets.fst}
        alt="Logo"
        className="w-8 lg:w-8 cursor-pointer"
      />

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        {/* Si l'utilisateur est connecté et c'est un étudiant */}
        {token && role === "etudiant" && (
          <>
            <Link to="/student/emplois">E-Scolarité</Link>
            <Link to="/my-enrollments">Mes Cours</Link>
          </>
        )}

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
              >
                Log Out
              </Link>
            )}
      </div>

      {/* Mobile view */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          <Link to="/my-enrollments">E-Etudiant</Link>
        </div>
        <button>
          <img src={assets.user_icon} alt="User" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
