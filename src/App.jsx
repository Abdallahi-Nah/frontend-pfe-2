import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/student/Home.jsx";
import CoursesList from "./pages/student/CoursesList.jsx";
import CourseDetails from "./pages/student/CourseDetails.jsx";
import MyEnrollments from "./pages/student/MyEnrollments.jsx";
import Player from "./pages/student/Player.jsx";
import Loading from "./components/student/Loading.jsx";
import Educator from "./pages/educator/Educator.jsx";
import Dashboard from "./pages/educator/Dashboard.jsx";
import AddCourse from "./pages/educator/AddCourse.jsx";
import MyCourses from "./pages/educator/MyCourses.jsx";
import StudentEnrolled from "./pages/educator/StudentsEnrolled.jsx";
import Emplois from "./pages/educator/Emplois.jsx";
import Message from "./pages/educator/Message.jsx";
import AddResult from "./pages/educator/AddResult.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/course-list" element={<CoursesList />}/>
        <Route path="/course-list/:input" element={<CoursesList />}/>
        <Route path="/course/:id" element={<CourseDetails />}/>
        <Route path="/my-enrollments" element={<MyEnrollments />}/>
        <Route path="/player/:courseId" element={<Player />}/>
        <Route path="/loading/:path" element={<Loading />}/>
        <Route path="/educator" element={<Educator />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentEnrolled />} />
          <Route path="emplois" element={<Emplois />} />
          <Route path="messagerie" element={<Message />} />
          <Route path="add-result" element={<AddResult />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App