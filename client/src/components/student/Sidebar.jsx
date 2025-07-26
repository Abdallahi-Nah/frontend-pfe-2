"use client";

import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Home, BookOpen, Award, MessageCircle } from "lucide-react";
import { AppContext } from "../../context/AppContext";

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      name: "Mes emplois",
      path: "/student/emplois",
      icon: Home,
    },
    {
      name: "Mes Résultats",
      path: "/student/results",
      icon: BookOpen,
    },
    {
      name: "Attestation",
      path: "/student/attestations",
      icon: Award,
    },
    {
      name: "Messageries",
      path: "/student/messageries",
      icon: MessageCircle,
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!isEducator) return null;

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-white shadow-md border border-gray-200 hover:bg-gray-50"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:justify-center">
            <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700 border-r-4 border-indigo-500 font-medium"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content wrapper */}
      <div className="lg:ml-64">{/* Your main content goes here */}</div>
    </>
  );
};

export default Sidebar;
