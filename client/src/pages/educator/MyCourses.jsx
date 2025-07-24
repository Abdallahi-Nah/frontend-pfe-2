import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const MyCourses = () => {
  const {
    currency,
    backendUrl,
    allCourses,
    fetchAllCourses,
    calculateCourseDuration,
  } = useContext(AppContext);

  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    setCourses(allCourses);
  };

  const handleDelete = async (id) => {
    try {
      //
      const res = await axios.delete(`${backendUrl}/course/${id}`);
      await fetchAllCourses();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    if (allCourses.length > 0) {
      setCourses(allCourses);
    }
  }, [allCourses]);

  return courses ? (
    <div className="h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="w-full">
        <h2 className="pb-4 text-lg font-medium">Mes cours</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed  w-full overflow-hidden">
            <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">
                  Tous les cours
                </th>
                <th className="px-4 py-3 font-semibold truncate">
                  {" "}
                  Durée du cours
                </th>
                <th className="px-4 py-3 font-semibold truncate">Publié le</th>
                <th className="px-4 py-3 font-semibold truncate">
                  Les actions
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {courses.map((course) => (
                <tr key={course._id} className="border-b border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <img
                      src={course.courseThumbnail}
                      alt="Course Image"
                      className="w-16"
                    />
                    <span className="truncate hidden md:block">
                      {course.courseTitle}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {calculateCourseDuration(course)}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(course.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {/* /educator/add-course */}
                      <Link
                        to={`/educator/update-course/${course._id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => {
                          Swal.fire({
                            title: "Êtes-vous sûr ?",
                            text: `Voulez-vous vraiment supprimer ce cours ?  Cette action est irréversible.`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                            confirmButtonText: "Oui, supprimer",
                            cancelButtonText: "Annuler",
                            width: "50%",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleDelete(course._id);
                            }
                          });
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-3 py-1 rounded cursor-pointer"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourses;
