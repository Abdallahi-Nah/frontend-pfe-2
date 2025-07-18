import React from "react";
import { assets } from "../../assets/assets";

const Hero = () => {
  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] lg:h-[100vh] overflow-hidden">
      {/* Image de fond responsive */}
      <img
        src={assets.fstBackground} // Remplace par "/mnt/data/backgroundFST.PNG" si image locale
        alt="Faculté des Sciences et Techniques"
        className="w-full h-full object-cover"
      />

      {/* Contenu centré superposé */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8 text-center bg-black/40 space-y-5">
        <div className="flex flex-col items-center justify-center px-4 md:px-8 text-center bg-black/50 space-y-5 p-7 rounded-2xl">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">
            Faculté des Sciences et Techniques
          </h1>

          <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-3xl">
            Des enseignants qualifiés, des contenus interactifs et des
            formations adaptées aux défis scientifiques actuels.
          </p>

          <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-3xl">
            Un environnement stimulant pour réussir vos objectifs académiques et
            professionnels.
          </p>

          <div className="flex items-center font-medium gap-6 mt-4">
            <button className="px-10 py-3 rounded-md text-white bg-blue-600 cursor-pointer">
              Commencer
            </button>
            <button className="flex items-center gap-2 cursor-pointer">
              En savoir plus <img src={assets.arrow_icon} alt="arrow_icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
