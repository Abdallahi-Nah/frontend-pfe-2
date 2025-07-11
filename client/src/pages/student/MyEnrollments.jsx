import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";
// import axios from "axios";
import { toast } from "react-toastify";

const MyEnrollments = () => {
  const {
    allCourses,
    calculateCourseDuration,
    navigate,
    // backendUrl,
    calculateNoOfLectures,
  } = useContext(AppContext);

  const [progressArray, setProgressArray] = useState([]);

  const getCourseProgress = async () => {
    try {
      const tempProgressArray = await Promise.all(
        allCourses.map(async (course) => {
          // const { data } = await axios.post(
          //   `${backendUrl}/api/user/get-course-progress`,
          //   { courseId: course._id }
          //   // Pas d'Authorization header
          // );

          let totalLectures = calculateNoOfLectures(course);

          // Supposons que backend renvoie directement lectureCompleted en nombre
          const lectureCompleted = 0;

          return { totalLectures, lectureCompleted };
        })
      );
      setProgressArray(tempProgressArray);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (allCourses.length > 0) {
      getCourseProgress();
    }
  }, [allCourses]);

  return (
    <>
      <div className="md:px-36 px-8 pt-10">
        <h1 className="text-2xl font-semibold">Mes Cours</h1>
        <table className="md:table-auto table-fixed w-full overflow-hidden border-0 mt-10">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
            <tr>
              <th className="px-4 py-3 font-semibold truncate">Cours</th>
              <th className="px-4 py-3 font-semibold truncate">Durée</th>
              <th className="px-4 py-3 font-semibold truncate">Terminé</th>
              <th className="px-4 py-3 font-semibold truncate">Statut</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {allCourses.map((course, index) => (
              <tr key={index} className="border-b border-gray-500/20">
                <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                  <img
                    src={course.courseThumbnail}
                    alt=""
                    className="w-14 sm:w-24 md:w-28"
                  />
                  <div className="flex-1">
                    <p className="mb-1 max-sm:text-sm">{course.courseTitle}</p>
                    <Line
                      strokeWidth={2}
                      percent={
                        progressArray[index]
                          ? (progressArray[index].lectureCompleted * 100) /
                            progressArray[index].totalLectures
                          : 0
                      }
                      className="bg-gray-300 rounded-full"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 max-sm:hidden">
                  {calculateCourseDuration(course)}
                </td>
                <td className="px-4 py-3 max-sm:hidden">
                  {progressArray[index] ?
                    `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures}`: 0} {" "}
                  <span>Leçons</span>
                </td>
                <td className="px-4 py-3 max-sm:text-right">
                  <button
                    onClick={() => navigate("/player/" + course._id)}
                    className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white rounded-1xl cursor-pointer"
                  >
                    {progressArray[index] &&
                    progressArray[index].lectureCompleted /
                      progressArray[index].totalLectures ===
                      1
                      ? "Terminé"
                      : "En Cours "}
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
