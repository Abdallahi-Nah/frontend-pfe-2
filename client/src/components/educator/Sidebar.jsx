// "use client";

// import React, { useContext, useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   Menu,
//   X,
//   Home,
//   BookOpen,
//   Award,
//   MessageCircle,
//   Briefcase,
//   Plus,
//   FileText,
//   GraduationCap,
//   User,
// } from "lucide-react";
// import { AppContext } from "../../context/AppContext";

// const Sidebar = () => {
//   const { isEducator } = useContext(AppContext);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const studentMenuItems = [
//     {
//       name: "Mes emplois",
//       path: "/student/emplois",
//       icon: Home,
//     },
//     {
//       name: "Mes Résultats",
//       path: "/student/results",
//       icon: BookOpen,
//     },
//     {
//       name: "Attestation",
//       path: "/student/attestations",
//       icon: Award,
//     },
//     {
//       name: "Messageries",
//       path: "/student/messageries",
//       icon: MessageCircle,
//     },
//   ];

//   const educatorMenuItems = [
//     {
//       name: "Mon emploi",
//       path: "/educator/emplois",
//       icon: Briefcase,
//     },
//     {
//       name: "Mes Cours",
//       path: "/educator/my-courses",
//       icon: BookOpen,
//     },
//     {
//       name: "Ajouter un cours",
//       path: "/educator/add-course",
//       icon: Plus,
//     },
//     {
//       name: "Ajouter un résultat",
//       path: "/educator/add-result",
//       icon: FileText,
//     },
//     {
//       name: "Messageries",
//       path: "/educator/messageries",
//       icon: MessageCircle,
//     },
//   ];

//   const menuItems = isEducator ? educatorMenuItems : studentMenuItems;
//   const title = isEducator ? "Espace Éducateur" : "Espace Étudiant";
//   const roleIcon = isEducator ? GraduationCap : User;

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <>
//       {/* Mobile menu button */}
//       <div className="lg:hidden fixed top-4 left-4 z-50">
//         <button
//           onClick={toggleMobileMenu}
//           className="p-2 rounded-md bg-white shadow-md border border-gray-200 hover:bg-gray-50"
//         >
//           {isMobileMenuOpen ? (
//             <X className="w-6 h-6" />
//           ) : (
//             <Menu className="w-6 h-6" />
//           )}
//         </button>
//       </div>

//       {/* Mobile overlay */}
//       {isMobileMenuOpen && (
//         <div
//           className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
//           onClick={toggleMobileMenu}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`
//           fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
//           lg:translate-x-0 lg:static lg:inset-0
//           ${
//             isMobileMenuOpen
//               ? "translate-x-0"
//               : "-translate-x-full lg:translate-x-0"
//           }
//         `}
//       >
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:justify-start">
//             <div className="flex items-center gap-3">
//               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
//                 {roleIcon && <roleIcon className="h-4 w-4 text-white" />}
//               </div>
//               <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
//             </div>
//             <button
//               onClick={toggleMobileMenu}
//               className="lg:hidden p-1 rounded-md hover:bg-gray-100"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 px-4 py-4 space-y-2">
//             {menuItems.map((item) => (
//               <NavLink
//                 key={item.name}
//                 to={item.path}
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
//                     isActive
//                       ? "bg-indigo-100 text-indigo-700 border-r-4 border-indigo-500 font-medium"
//                       : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                   }`
//                 }
//               >
//                 <item.icon className="w-5 h-5 flex-shrink-0" />
//                 <span className="truncate">{item.name}</span>
//               </NavLink>
//             ))}
//           </nav>
//         </div>
//       </div>

//       {/* Main content wrapper */}
//       <div className="lg:ml-64">{/* Your main content goes here */}</div>
//     </>
//   );
// };

// export default Sidebar;

"use client";

import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  BookOpen,
  Award,
  MessageCircle,
  Briefcase,
  Plus,
  FileText,
  GraduationCap,
  User,
} from "lucide-react";
import { AppContext } from "../../context/AppContext";

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const studentMenuItems = [
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

  const educatorMenuItems = [
    {
      name: "Mon emploi",
      path: "/educator/emplois",
      icon: Briefcase,
    },
    {
      name: "Mes Cours",
      path: "/educator/my-courses",
      icon: BookOpen,
    },
    {
      name: "Ajouter un cours",
      path: "/educator/add-course",
      icon: Plus,
    },
    {
      name: "Ajouter un résultat",
      path: "/educator/add-result",
      icon: FileText,
    },
    {
      name: "Messageries",
      path: "/educator/messageries",
      icon: MessageCircle,
    },
  ];

  const menuItems = isEducator ? educatorMenuItems : studentMenuItems;
  const title = isEducator ? "Espace Éducateur" : "Espace Étudiant";
  const roleIcon = isEducator ? GraduationCap : User;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Burger menu button - Always visible */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-white shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                {roleIcon && <roleIcon className="h-4 w-4 text-white" />}
              </div>
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
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

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              {isEducator
                ? "Tableau de bord éducateur"
                : "Tableau de bord étudiant"}
            </div>
          </div>
        </div>
      </div>

      {/* Main content wrapper */}
      <div
        className={`
          transition-all duration-300 ease-in-out min-h-screen
          ${isSidebarOpen ? "md:ml-64" : "ml-0"}
        `}
      >
        {/* Content area with proper padding to avoid burger menu overlap */}
        <div className="pt-16 px-4">{/* Your main content goes here */}</div>
      </div>
    </>
  );
};

export default Sidebar;
