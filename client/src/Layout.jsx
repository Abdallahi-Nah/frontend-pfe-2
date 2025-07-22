import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import Home from "./pages/student/Home.jsx";
import Login from "./pages/common/login/Login.jsx";
import MyEnrollments from "./pages/student/MyEnrollments.jsx";
import Player from "./pages/student/Player.jsx";
import Educator from "./pages/educator/Educator.jsx";
import AddCourse from "./pages/educator/AddCourse.jsx";
import MyCourses from "./pages/educator/MyCourses.jsx";
import Emplois from "./pages/educator/Emplois.jsx";
import Message from "./pages/educator/Message.jsx";
import AddResult from "./pages/educator/AddResult.jsx";
import Navbar from "./components/student/Navbar.jsx";
import "quill/dist/quill.snow.css";
import Student from "./pages/student/Student.jsx";
import StudentEmplois from "./pages/student/Emplois.jsx";
import Result from "./pages/student/Result.jsx";
import Attestation from "./pages/student/Attestation.jsx";
import StudentMessage from "./pages/student/Message.jsx";
import { ToastContainer } from "react-toastify";
import RequireAuth from "./pages/auth/RequireAuth.jsx";

const Layout = () => {
  const isEducatorRoute = useMatch("/educator/*");

  return (
    <div className="text-default min-h-screen bg-white">
      <ToastContainer />
      {!isEducatorRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/my-enrollments" element={<MyEnrollments />} />
          <Route path="/player/:courseId" element={<Player />} />
          <Route path="/student" element={<Student />}>
            <Route path="emplois" element={<StudentEmplois />} />
            <Route path="results" element={<Result />} />
            <Route path="attestations" element={<Attestation />} />
            <Route path="messageries" element={<StudentMessage />} />
          </Route>
        </Route>
        <Route path="/educator" element={<Educator />}>
          <Route path="emplois" element={<Emplois />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="add-result" element={<AddResult />} />
          <Route path="messageries" element={<Message />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Layout;
