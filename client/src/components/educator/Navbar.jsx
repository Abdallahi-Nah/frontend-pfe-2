"use client";

import React, { useState } from "react";
import { assets, dummyEducatorData } from "../../assets/assets";
import { Link } from "react-router-dom";
import Cookie from "cookie-universal";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-500 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-8 py-3">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={assets.fst || "/placeholder.svg"}
            alt="logo"
            className="w-24 sm:w-28 lg:w-32"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-5 text-gray-500">
          <div className="flex items-center gap-3">
            <p className="text-sm lg:text-base whitespace-nowrap">
              Bienvenue! {cookies.get("nom")} {cookies.get("prenom")}
            </p>
            <img
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover shadow ring-1 ring-gray-300"
              src={
                cookies.get("profile") && cookies.get("profile") !== "undefined"
                  ? cookies.get("profile")
                  : "/images/default-profile.png"
              }
              alt={`Photo de profil de ${cookies.get("nom") || "utilisateur"}`}
            />
          </div>

          {/* Desktop Auth Button */}
          {!token
            ? !isLoginPage && (
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 lg:px-5 py-2 rounded-full cursor-pointer transition-colors duration-200 text-sm lg:text-base whitespace-nowrap"
                >
                  Log In
                </Link>
              )
            : !isLoginPage && (
                <Link
                  to="/login"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 lg:px-5 py-2 rounded-full cursor-pointer transition-colors duration-200 text-sm lg:text-base whitespace-nowrap"
                  onClick={handlLogoutEducator}
                >
                  Log Out
                </Link>
              )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1 focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          <span
            className={`block w-5 h-0.5 bg-gray-600 transition-transform duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-gray-600 transition-opacity duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-gray-600 transition-transform duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 py-4 space-y-4">
          {/* Mobile User Info */}
          <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
            <img
              className="w-10 h-10 rounded-full object-cover shadow ring-1 ring-gray-300"
              src={
                cookies.get("profile") && cookies.get("profile") !== "undefined"
                  ? cookies.get("profile")
                  : "/images/default-profile.png"
              }
              alt={`Photo de profil de ${cookies.get("nom") || "utilisateur"}`}
            />
            <div>
              <p className="text-gray-700 font-medium text-sm">
                {cookies.get("nom")} {cookies.get("prenom")}
              </p>
              <p className="text-gray-500 text-xs">Bienvenue!</p>
            </div>
          </div>

          {/* Mobile Auth Button */}
          {!token
            ? !isLoginPage && (
                <Link
                  to="/login"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 text-center font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log In
                </Link>
              )
            : !isLoginPage && (
                <Link
                  to="/login"
                  className="block w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 text-center font-medium"
                  onClick={(e) => {
                    handlLogoutEducator();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Log Out
                </Link>
              )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
