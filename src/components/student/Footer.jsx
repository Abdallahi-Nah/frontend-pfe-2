import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 md:px-36 text-left w-full mt-10">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30">
        <div className="flex flex-col md:items-start items-center w-full">
          <img className="w-30 h-30 rounded-full" src={assets.fst} alt="logo" />
          <p className="mt-6 text-center md:text-left text-sm text-white/80">
            Plateforme officielle de la Faculté des Sciences et Techniques de
            l’Université de Nouakchott. Apprentissage en ligne, emploi du temps
            et suivi des résultats.
          </p>
        </div>
        <div className="flex flex-col md:items-start items-center w-full">
          <h2 className="font-semibold text-white mb-5">Liens utiles</h2>
          <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
            <li>
              <a href="#">Accueil</a>
            </li>
            <li>
              <a href="#">Offre de formation</a>
            </li>
            <li>
              <a href="#">Espace étudiant</a>
            </li>
            <li>
              <a href="#">Support technique</a>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex flex-col items-start w-full">
          <h2 className="font-semibold text-white mb-5">Restez informé</h2>
          <p className="text-sm text-white/80">
            Inscrivez-vous pour recevoir les dernières actualités, mises à jour
            et annonces de la faculté.
          </p>
          <div className="flex items-center gap-2 pt-4">
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              className="border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm"
            />
            <button className="bg-blue-600 w-24 h-9 text-white rounded">
              S'inscrire
            </button>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm text-white/60">
        © 2025 Faculté des Sciences et Techniques - Université de Nouakchott.
        Tous droits réservés.
      </p>
    </footer>
  );
};

export default Footer;
