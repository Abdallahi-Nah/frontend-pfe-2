// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../../context/AppContext";
// import { Line } from "rc-progress";
// import Footer from "../../components/student/Footer";
// // import axios from "axios";
// import { toast } from "react-toastify";

// const MyEnrollments = () => {
//   const {
//     allCourses,
//     calculateCourseDuration,
//     navigate,
//     // backendUrl,
//     calculateNoOfLectures,
//   } = useContext(AppContext);

//   const [progressArray, setProgressArray] = useState([]);

//   const getCourseProgress = async () => {
//     try {
//       const tempProgressArray = await Promise.all(
//         allCourses.map(async (course) => {
//           // const { data } = await axios.post(
//           //   `${backendUrl}/api/user/get-course-progress`,
//           //   { courseId: course._id }
//           //   // Pas d'Authorization header
//           // );

//           let totalLectures = calculateNoOfLectures(course);

//           // Supposons que backend renvoie directement lectureCompleted en nombre
//           const lectureCompleted = 0;

//           return { totalLectures, lectureCompleted };
//         })
//       );
//       setProgressArray(tempProgressArray);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     if (allCourses.length > 0) {
//       getCourseProgress();
//     }
//   }, [allCourses]);

//   return (
//     <>
//       <div className="md:px-36 px-8 pt-10">
//         <h1 className="text-2xl font-semibold">Mes Cours</h1>
//         <table className="md:table-auto table-fixed w-full overflow-hidden border-0 mt-10">
//           <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
//             <tr>
//               <th className="px-4 py-3 font-semibold truncate">Cours</th>
//               <th className="px-4 py-3 font-semibold truncate">Durée</th>
//               <th className="px-4 py-3 font-semibold truncate">Terminé</th>
//               <th className="px-4 py-3 font-semibold truncate">Statut</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {allCourses.map((course, index) => (
//               <tr key={index} className="border-b border-gray-500/20">
//                 <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
//                   <img
//                     src={course.courseThumbnail}
//                     alt=""
//                     className="w-14 sm:w-24 md:w-28"
//                   />
//                   <div className="flex-1">
//                     <p className="mb-1 max-sm:text-sm">{course.courseTitle}</p>
//                     <Line
//                       strokeWidth={2}
//                       percent={
//                         progressArray[index]
//                           ? (progressArray[index].lectureCompleted * 100) /
//                             progressArray[index].totalLectures
//                           : 0
//                       }
//                       className="bg-gray-300 rounded-full"
//                     />
//                   </div>
//                 </td>
//                 <td className="px-4 py-3 max-sm:hidden">
//                   {calculateCourseDuration(course)}
//                 </td>
//                 <td className="px-4 py-3 max-sm:hidden">
//                   {progressArray[index] ?
//                     `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures}`: 0} {" "}
//                   <span>Leçons</span>
//                 </td>
//                 <td className="px-4 py-3 max-sm:text-right">
//                   <button
//                     onClick={() => navigate("/player/" + course._id)}
//                     className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white rounded-1xl cursor-pointer"
//                   >
//                     {progressArray[index] &&
//                     progressArray[index].lectureCompleted /
//                       progressArray[index].totalLectures ===
//                       1
//                       ? "Terminé"
//                       : "En Cours "}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default MyEnrollments;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Line } from "rc-progress";
import { toast } from "react-toastify";
import Footer from "../../components/student/Footer";
import { backendUrl, AppContext } from "../../context/AppContext";

const MyEnrollments = () => {
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [progressArray, setProgressArray] = useState([]);
  const {setAllCourses} = useContext(AppContext);

  const calculateCourseDuration = (course) => {
    let total = 0;
    course.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        total += lecture.lectureDuration;
      });
    });
    return `${total} min`;
  };

  const calculateNoOfLectures = (course) => {
    let count = 0;
    course.courseContent.forEach((chapter) => {
      count += chapter.chapterContent.length;
    });
    return count;
  };

  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        const idEtudiant = Cookies.get("id");
        if (!idEtudiant) {
          toast.error("ID étudiant non trouvé dans les cookies.");
          return;
        }

        // 1. Récupérer les infos de l'étudiant
        const { data: etudiantData } = await axios.get(
          `${backendUrl}/etudiant/get/${idEtudiant}`
        );
        const etudiant = etudiantData.data;

        // 2. Récupérer tous les cours
        const { data: courseData } = await axios.get(
          `${backendUrl}/course/all`
        );
        setAllCourses(courseData.data);
        const allCourses = courseData.data;

        // 3. Filtrer les cours selon la présence de l’étudiant dans la matière
        const coursesWithEtudiant = await Promise.all(
          allCourses.map(async (course) => {
            const idMatiere = course.matiere;
            const { data: studentsData } = await axios.get(
              `${backendUrl}/etudiant/get-students-by-matiere/${idMatiere}`
            );

            const etudiants = studentsData.data.filter((e) => e && e._id);
            const isConcerned = etudiants.some(
              (e) => String(e._id) === String(etudiant._id)
            );

            return isConcerned ? course : null;
          })
        );

        const filtered = coursesWithEtudiant.filter(Boolean);
        setFilteredCourses(filtered);

        // 4. Calcul du progrès (fictif ici)
        const tempProgressArray = filtered.map((course) => {
          const totalLectures = calculateNoOfLectures(course);
          const lectureCompleted = 0; // à remplacer si tracking réel
          return { totalLectures, lectureCompleted };
        });

        setProgressArray(tempProgressArray);
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors du chargement des cours.");
      }
    };

    fetchStudentCourses();
  }, []);

  return (
    <>
      <div className="md:px-36 px-8 pt-10">
        <h1 className="text-2xl font-semibold">Mes Cours</h1>
        <table className="md:table-auto table-fixed w-full overflow-hidden border-0 mt-10">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
            <tr>
              <th className="px-4 py-3 font-semibold truncate">Cours</th>
              <th className="px-4 py-3 font-semibold truncate">Durée</th>
              <th className="px-4 py-3 font-semibold truncate">Les cours</th>
              <th className="px-4 py-3 font-semibold truncate">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredCourses.map((course, index) => (
              <tr key={index} className="border-b border-gray-500/20">
                <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                  <img
                    src={course.courseThumbnail}
                    alt=""
                    className="w-14 sm:w-24 md:w-28"
                  />
                  <div className="flex-1">
                    <p className="mb-1 max-sm:text-sm">{course.courseTitle}</p>
                  </div>
                </td>
                <td className="px-4 py-3 max-sm:hidden">
                  {calculateCourseDuration(course)}
                </td>
                <td className="px-4 py-3 max-sm:hidden">
                  {progressArray[index]
                    ? `${progressArray[index].totalLectures}`
                    : "0"}{"  "}
                  <span>Cours</span>
                </td>
                <td className="px-4 py-3 max-sm:text-right">
                  <button
                    onClick={() =>
                      (window.location.href = "/player/" + course._id)
                    }
                    className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white rounded-1xl cursor-pointer"
                  >
                    {progressArray[index] &&
                    progressArray[index].lectureCompleted /
                      progressArray[index].totalLectures ===
                      1
                      ? "Terminé"
                      : "Regarder "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default MyEnrollments;

