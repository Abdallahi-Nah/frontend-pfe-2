import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/student/Sidebar";
import Footer from "../../components/educator/Footer";

const Student = () => {
  return (
    <div className="text-base min-h-screen bg-white">
      <div className="flex ">
        <Sidebar />
        <div className="flex-1">{<Outlet />}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Student;
