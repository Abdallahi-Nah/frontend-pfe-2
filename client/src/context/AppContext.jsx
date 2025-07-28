import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import axios from "axios";
import { toast } from "react-toastify";
import Cookie from "cookie-universal";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [emplois, setEmplois] = useState([]);
  const [studentEmplois, setStudentEmplois] = useState([]);

  const cookies = Cookie();
  const idEtud = cookies.get("id");

  // fetch all courses
  const fetchAllCourses = async () => {
    if (cookies.get("role") === "enseignant") {
      try {
        const { data } = await axios.get(
          `${backendUrl}/enseignant/${cookies.get("id")}/course/all`
        );

        if (data.data) {
          console.log("✅ Tous les cours récupérés :", data.data);
          setAllCourses(data.data);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // function to calculate avg rating of course
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });

    return totalRating / course.courseRatings.length;
  };

  // function to calculate course chapter time
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // function to calculate the course duration
  const calculateCourseDuration = (course) => {
    console.log("Course", course); // 🔍 Vérifie si course est bien un objet
    console.log("CourseContent", course.courseContent);
    let time = 0;

    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );

    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to calculate number of lectures in the course
  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;

    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });

    return totalLectures;
  };

  // Fetch user Enrolled Courses
  const fetchUserEnrolledCourses = async () => {
    setEnrolledCourses(dummyCourses);
  };

  const fetchEmplois = async () => {
    if (cookies.get("role") === "enseignant") {
      try {
        const url = `${backendUrl}/enseignant/${cookies.get("id")}/emplois/get`;
        console.log("url emplois : ", url);
        const res = await axios.get(url);
        console.log("res emplois : ", res);
        setEmplois(res.data.data);
      } catch (err) {
        console.error("Erreur fetch emplois :", err);
      }
    }
  };

  const fetchStudentEmplois = async () => {
    try {
      const res = await axios.get(`${backendUrl}/contrat/get/${idEtud}`);
      const matieresAValides = res.data.data.matieresAValides || [];

      console.log("Matières à valider :", matieresAValides);

      // Récupérer les emplois pour chaque matière
      const emploisPromises = matieresAValides.map((matiere) =>
        axios.get(`${backendUrl}/matiere/${matiere._id}/emplois/get`)
      );

      const emploisResponses = await Promise.all(emploisPromises);

      // Extraire les données d'emploi de chaque réponse
      const allEmplois = emploisResponses.flatMap(
        (response) => response.data.data
      );

      console.log("Tous les emplois :", allEmplois);
      setStudentEmplois(allEmplois);
    } catch (error) {
      console.error("Erreur lors de la récupération des emplois :", error);
    }
  };

  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourses();
    fetchEmplois();
    fetchStudentEmplois();
  }, []);

  const value = {
    currency,
    allCourses,
    setAllCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    enrolledCourses,
    fetchUserEnrolledCourses,
    fetchAllCourses,
    backendUrl,
    emplois,
    setEmplois,
    fetchEmplois,
    studentEmplois,
    setStudentEmplois,
    fetchStudentEmplois,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
