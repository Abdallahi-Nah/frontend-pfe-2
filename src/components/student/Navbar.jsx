import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {

  const { navigate } = useContext(AppContext);

  return (
    <div className="flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 bg-white">
      <img
        onClick={() => navigate("/")}
        src={assets.fst}
        alt="Logo"
        className="w-8 lg:w-8 cursor-pointer"
      />
      <div className="hidden md:flex items-center gap-5 text-gray-500 ">
        <div className="flex items-center gap-5">
          <Link to="/my-enrollments">Mes Cours</Link>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer">
          Créer un compte
        </button>
      </div>

      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          <Link to="/my-enrollments">E-Etudiant</Link>
        </div>
        <button>
          <img src={assets.user_icon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
