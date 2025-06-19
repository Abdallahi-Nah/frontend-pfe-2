import React from "react";
import Hero from "../../components/student/Hero";
import Widget from "../../components/student/Widget";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SchoolIcon from "@mui/icons-material/School";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import HailIcon from "@mui/icons-material/Hail";
import "./animations.css";

const data = [
  {
    title: "LES DEPARTEMENTS",
    counter: 6,
    icon: <ApartmentIcon className="icon" />,
  },
  {
    title: "LES SPECIALITES",
    counter: 45,
    icon: <SchoolIcon className="icon" />,
  },
  {
    title: "LES MODULES",
    counter: 250,
    icon: <ViewModuleIcon className="icon" />,
  },
  {
    title: "LES MATIERES",
    counter: 600,
    icon: <MenuBookIcon className="icon" />,
  },
  {
    title: "LES ENSEIGNANTS",
    counter: 130,
    icon: <HailIcon className="icon" />,
  },
  {
    title: "LES ETUDIANTS",
    counter: 5560,
    icon: <GroupIcon className="icon" />,
  },
];


const Home = () => {
  return (
    <div className="flex flex-col items-center space-y-7 text-center">
      <Hero />

      <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wider">
        Informations de la Faculté
      </h2>
      {/* <div className="flex flex-wrap justify-between gap-5 p-5">
        <div className="flex-1 basis-[calc(33.33%-13.33px)] max-w-[calc(33.33%-13.33px)] max-md:basis-full max-md:max-w-[300px] max-md:mx-auto">
          <Widget
            title="LES DEPARTEMENTS"
            counter="6"
            icon={<ApartmentIcon className="icon" />}
          />
        </div>
        <div className="flex-1 basis-[calc(33.33%-13.33px)] max-w-[calc(33.33%-13.33px)] max-md:basis-full max-md:max-w-[300px] max-md:mx-auto">
          <Widget
            title="LES SPECIALITES"
            counter="45"
            icon={<SchoolIcon className="icon" />}
          />
        </div>
        <div className="flex-1 basis-[calc(33.33%-13.33px)] max-w-[calc(33.33%-13.33px)] max-md:basis-full max-md:max-w-[300px] max-md:mx-auto">
          <Widget
            title="LES MODULES"
            counter="250"
            icon={<ViewModuleIcon className="icon" />}
          />
        </div>
        <div className="flex-1 basis-[calc(33.33%-13.33px)] max-w-[calc(33.33%-13.33px)] max-md:basis-full max-md:max-w-[300px] max-md:mx-auto">
          <Widget
            title="LES MATIERES"
            counter="600"
            icon={<MenuBookIcon className="icon" />}
          />
        </div>
        <div className="flex-1 basis-[calc(33.33%-13.33px)] max-w-[calc(33.33%-13.33px)] max-md:basis-full max-md:max-w-[300px] max-md:mx-auto">
          <Widget
            title="LES ENSEIGNANTS"
            counter="130"
            icon={<HailIcon className="icon" />}
          />
        </div>
        <div className="flex-1 basis-[calc(33.33%-13.33px)] max-w-[calc(33.33%-13.33px)] max-md:basis-full max-md:max-w-[300px] max-md:mx-auto">
          <Widget
            title="LES ETUDIANTS"
            counter="5560"
            icon={<GroupIcon className="icon" />}
          />
        </div>
      </div> */}
      <div className="flex flex-wrap justify-between gap-5 p-5">
        {data.map((item, i) => (
          <div
            key={i}
            className="flex-1 basis-[calc(33.33%-13.33px)] max-w-[calc(33.33%-13.33px)] max-md:basis-full max-md:max-w-[300px] max-md:mx-auto fade-in-up"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <Widget
              title={item.title}
              counter={item.counter}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
