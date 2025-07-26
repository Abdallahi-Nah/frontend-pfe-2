"use client";

import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Cookie from "cookie-universal";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigate } = useContext(AppContext);
  const cookies = Cookie();
  const location = useLocation();
  const token = cookies.get("token");
  const role = cookies.get("role");
  const isLoginPage = location.pathname === "/login";

  const handlLogoutStudent = () => {
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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Navigation links based on role
  const getNavigationLinks = () => {
    if (!token) return [];

    if (role === "etudiant") {
      return [
        { to: "/student/emplois", label: "E-Scolarité" },
        { to: "/my-enrollments", label: "Mes Cours" },
      ];
    }

    if (role === "enseignant") {
      return [{ to: "/educator/emplois", label: "Dashboard" }];
    }

    return [];
  };

  const navigationLinks = getNavigationLinks();

  return (
    <nav className="bg-white border-b border-gray-500 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 py-4">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          src={assets.fst || "/placeholder.svg"}
          alt="Logo"
          className="w-8 lg:w-10 cursor-pointer hover:opacity-80 transition-opacity"
        />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-5 text-gray-500">
          {/* Role-based navigation links */}
          {navigationLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="hover:text-gray-700 transition-colors duration-200 font-medium"
            >
              {link.label}
            </Link>
          ))}

          {/* Desktop Auth Button */}
          {!token
            ? !isLoginPage && (
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full cursor-pointer transition-colors duration-200 font-medium"
                >
                  Log In
                </Link>
              )
            : !isLoginPage && (
                <Link
                  to="/login"
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full cursor-pointer transition-colors duration-200 font-medium"
                  onClick={handlLogoutStudent}
                >
                  Log Out
                </Link>
              )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {/* User Icon for Mobile */}
          {token && (
            <button className="p-1">
              <img
                src={assets.user_icon || "/placeholder.svg"}
                alt="User"
                className="w-6 h-6"
              />
            </button>
          )}

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="flex flex-col items-center justify-center w-8 h-8 space-y-1 focus:outline-none"
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
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 py-4 space-y-3">
          {/* Mobile Navigation Links */}
          {token && navigationLinks.length > 0 && (
            <div className="space-y-2 pb-3 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Navigation
              </h3>
              {navigationLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="block py-2 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Mobile User Info */}
          {token && (
            <div className="flex items-center gap-3 py-2 px-3 bg-gray-50 rounded-md">
              <img
                src={assets.user_icon || "/placeholder.svg"}
                alt="User"
                className="w-8 h-8"
              />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {role === "etudiant"
                    ? "Étudiant"
                    : role === "enseignant"
                    ? "Enseignant"
                    : "Utilisateur"}
                </p>
                <p className="text-xs text-gray-500">Connecté</p>
              </div>
            </div>
          )}

          {/* Mobile Auth Button */}
          <div className="pt-2">
            {!token
              ? !isLoginPage && (
                  <Link
                    to="/login"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 text-center font-medium"
                    onClick={closeMobileMenu}
                  >
                    Log In
                  </Link>
                )
              : !isLoginPage && (
                  <Link
                    to="/login"
                    className="block w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 text-center font-medium"
                    onClick={(e) => {
                      handlLogoutStudent();
                      closeMobileMenu();
                    }}
                  >
                    Log Out
                  </Link>
                )}
          </div>

          {/* Quick Access for Students (Mobile) */}
          {token && role === "etudiant" && (
            <div className="pt-3 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                Accès Rapide
              </h3>
              <Link
                to="/my-enrollments"
                className="block py-2 px-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors duration-200 text-sm"
                onClick={closeMobileMenu}
              >
                📚 E-Étudiant
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
