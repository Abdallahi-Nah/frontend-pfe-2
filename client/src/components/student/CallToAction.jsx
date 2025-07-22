import React from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import Cookie from "cookie-universal";

const CallToAction = () => {
  const cookies = Cookie();
  const location = useLocation();

  const token = cookies.get("token");
  const isLoginPage = location.pathname === "/login";

  const shouldShowStartButton = !token && !isLoginPage;

  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0">
      <h1 className="text-xl md:text-4xl text-gray-800 font-semibold">
        Apprenez librement. Suivez emploi du temps et résultats
      </h1>
      <p className="text-gray-500 sm:text-sm text-center">
        Une plateforme moderne d'apprentissage en ligne, conçue pour vous
        accompagner à chaque étape. Suivez vos cours facilement, accédez à vos
        emplois du temps, consultez vos résultats, <br /> où que vous soyez et à
        tout moment.
      </p>

      {shouldShowStartButton && (
        <div className="flex items-center font-medium gap-6 mt-4">
          <Link
            to="/login"
            className="px-10 py-3 rounded-md text-white bg-blue-600 cursor-pointer"
          >
            Commencer
          </Link>
        </div>
      )}
    </div>
  );
};

export default CallToAction;
