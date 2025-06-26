import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);

  const newMenuItems = [
    {
      name: "Mon emploi",
      path: "/educator/emplois",
      icon: assets.home_icon,
    },
    {
      name: "Mes Cours",
      path: "/educator/my-courses",
      icon: assets.lesson_icon,
    },
    {
      name: "Ajouter un cours",
      path: "/educator/add-course",
      icon: assets.add_icon,
    },
    {
      name: "Ajouter un résultat",
      path: "/educator/add-result",
      icon: assets.add_icon,
    },
    {
      name: "Messageries",
      path: "/educator/messageries",
      icon: assets.person_tick_icon,
    },
  ];

  return (
    isEducator && (
      <div className="md:w-64 w-16 border-r min-h-screen text-base border-gray-500 py-2 flex flex-col">
        {newMenuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            end={item.path === "/educator"}
            className={({ isActive }) =>
              `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 ${
                isActive
                  ? "bg-indigo-50 border-r-[6px] border-indigo-500/90"
                  : "hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90"
              }`
            }
          >
            <img src={item.icon} alt="" className="w-6 h-6" />
            <p className="md:block hidden">{item.name}</p>
          </NavLink>
        ))}
      </div>
    )
  );
};

export default Sidebar;
