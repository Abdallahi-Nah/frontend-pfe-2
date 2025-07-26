import React, { useContext, useEffect, useState } from "react";
import Hero from "../../components/student/Hero";
import Widget from "../../components/student/Widget";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SchoolIcon from "@mui/icons-material/School";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import HailIcon from "@mui/icons-material/Hail";
import "./animations.css";
import TestimonialsSection from "../../components/student/TestimonialsSection";
import CallToAction from "../../components/student/CallToAction";
import Footer from "../../components/student/Footer";
import axios from "axios";
import CountUp from "react-countup";
import { AppContext } from "../../context/AppContext";

const data = [
  {
    key: "departments",
    title: "LES DEPARTEMENTS",
    icon: <ApartmentIcon className="icon" />,
  },
  {
    key: "specialties",
    title: "LES SPECIALITES",
    icon: <SchoolIcon className="icon" />,
  },
  {
    key: "modules",
    title: "LES MODULES",
    icon: <ViewModuleIcon className="icon" />,
  },
  {
    key: "matieres",
    title: "LES MATIERES",
    icon: <MenuBookIcon className="icon" />,
  },
  {
    key: "enseignants",
    title: "LES ENSEIGNANTS",
    icon: <HailIcon className="icon" />,
  },
  {
    key: "etudiants",
    title: "LES ETUDIANTS",
    icon: <GroupIcon className="icon" />,
  },
];

const Home = () => {
  const [stats, setStats] = useState({
    departments: 0,
    specialties: 0,
    modules: 0,
    matieres: 0,
    enseignants: 0,
    etudiants: 0,
  });
  const {backendUrl} = useContext(AppContext);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [deptRes, specRes, modRes, matRes, ensRes, etuRes] =
          await Promise.all([
            axios.get(`${backendUrl}/departement/get`),
            axios.get(`${backendUrl}/specialite/get`),
            axios.get(`${backendUrl}/module/get`),
            axios.get(`${backendUrl}/matiere/get`),
            axios.get(`${backendUrl}/enseignant/get`),
            axios.get(`${backendUrl}/etudiant/get`),
          ]);

        setStats({
          departments: deptRes.data?.results || 0,
          specialties: specRes.data?.results || 0,
          modules: modRes.data?.results || 0,
          matieres: matRes.data?.results || 0,
          enseignants: ensRes.data?.results || 0,
          etudiants: etuRes.data?.results || 0,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des stats :", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-7 text-center">
      <Hero />

      <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wider">
        Informations de la Faculté
      </h2>

      <div className="flex flex-wrap justify-between gap-5 p-5">
        {data.map((item, i) => (
          <div
            key={i}
            className="flex-1 basis-[calc(33.33%-13.33px)] max-w-[calc(33.33%-13.33px)] max-md:basis-full max-md:max-w-[300px] max-md:mx-auto fade-in-up"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <Widget
              title={item.title}
              icon={item.icon}
              counter={
                <CountUp end={stats[item.key]} duration={2} separator=" " />
              }
            />
          </div>
        ))}
      </div>

      <TestimonialsSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
