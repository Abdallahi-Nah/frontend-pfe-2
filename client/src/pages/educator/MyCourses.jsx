// // import React, { useContext, useEffect, useState } from "react";
// // import { AppContext } from "../../context/AppContext";
// // import Loading from "../../components/student/Loading";
// // import { Link } from "react-router-dom";
// // import axios from "axios";
// // import Swal from "sweetalert2";

// // const MyCourses = () => {
// //   const {
// //     currency,
// //     backendUrl,
// //     allCourses,
// //     fetchAllCourses,
// //     calculateCourseDuration,
// //   } = useContext(AppContext);

// //   const [courses, setCourses] = useState(null);

// //   const fetchEducatorCourses = async () => {
// //     setCourses(allCourses);
// //   };

// //   const handleDelete = async (id) => {
// //     try {
// //       //
// //       const res = await axios.delete(`${backendUrl}/course/${id}`);
// //       await fetchAllCourses();
// //       console.log(res);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAllCourses();
// //   }, []);

// //   useEffect(() => {
// //     if (allCourses.length > 0) {
// //       setCourses(allCourses);
// //     }
// //   }, [allCourses]);

// //   return courses ? (
// //     <div className="h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
// //       <div className="w-full">
// //         <h2 className="pb-4 text-lg font-medium">Mes cours</h2>
// //         <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
// //           <table className="md:table-auto table-fixed  w-full overflow-hidden">
// //             <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
// //               <tr>
// //                 <th className="px-4 py-3 font-semibold truncate">
// //                   Tous les cours
// //                 </th>
// //                 <th className="px-4 py-3 font-semibold truncate">
// //                   {" "}
// //                   Durée du cours
// //                 </th>
// //                 <th className="px-4 py-3 font-semibold truncate">Publié le</th>
// //                 <th className="px-4 py-3 font-semibold truncate">
// //                   Les actions
// //                 </th>
// //               </tr>
// //             </thead>
// //             <tbody className="text-sm text-gray-500">
// //               {courses.map((course) => (
// //                 <tr key={course._id} className="border-b border-gray-500/20">
// //                   <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
// //                     <img
// //                       src={course.courseThumbnail}
// //                       alt="Course Image"
// //                       className="w-16"
// //                     />
// //                     <span className="truncate hidden md:block">
// //                       {course.courseTitle}
// //                     </span>
// //                   </td>
// //                   <td className="px-4 py-3">
// //                     {calculateCourseDuration(course)}
// //                   </td>
// //                   <td className="px-4 py-3">
// //                     {new Date(course.createdAt).toLocaleDateString("fr-FR")}
// //                   </td>
// //                   <td className="px-4 py-3">
// //                     <div className="flex items-center gap-2">
// //                       {/* /educator/add-course */}
// //                       <Link
// //                         to={`/educator/update-course/${course._id}`}
// //                         className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded"
// //                       >
// //                         Modifier
// //                       </Link>
// //                       <button
// //                         onClick={() => {
// //                           Swal.fire({
// //                             title: "Êtes-vous sûr ?",
// //                             text: `Voulez-vous vraiment supprimer ce cours ?  Cette action est irréversible.`,
// //                             icon: "warning",
// //                             showCancelButton: true,
// //                             confirmButtonColor: "#d33",
// //                             cancelButtonColor: "#3085d6",
// //                             confirmButtonText: "Oui, supprimer",
// //                             cancelButtonText: "Annuler",
// //                             width: "50%",
// //                           }).then((result) => {
// //                             if (result.isConfirmed) {
// //                               handleDelete(course._id);
// //                             }
// //                           });
// //                         }}
// //                         className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-3 py-1 rounded cursor-pointer"
// //                       >
// //                         Supprimer
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   ) : (
// //     <Loading />
// //   );
// // };

// // export default MyCourses;

// "use client";

// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../../context/AppContext";
// import Loading from "../../components/student/Loading";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";

// const MyCourses = () => {
//   const {
//     currency,
//     backendUrl,
//     allCourses,
//     fetchAllCourses,
//     calculateCourseDuration,
//   } = useContext(AppContext);
//   const [courses, setCourses] = useState(null);

//   const fetchEducatorCourses = async () => {
//     setCourses(allCourses);
//   };

//   const handleDelete = async (id) => {
//     try {
//       //const res = await axios.delete(`${backendUrl}/course/${id}`)
//       await fetchAllCourses();
//       console.log("Course deleted");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const confirmDelete = (course) => {
//     Swal.fire({
//       title: "Êtes-vous sûr ?",
//       text: `Voulez-vous vraiment supprimer ce cours ? Cette action est irréversible.`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Oui, supprimer",
//       cancelButtonText: "Annuler",
//       width: "90%",
//       maxWidth: "500px",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         handleDelete(course._id);
//       }
//     });
//   };

//   useEffect(() => {
//     if (allCourses.length > 0) {
//       setCourses(allCourses);
//     }
//   }, [allCourses]);

//   useEffect(() => {
//     fetchAllCourses();
//   }, []);

//   if (!courses) {
//     return <Loading />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-6">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
//             Mes cours
//           </h2>
//           <p className="text-gray-600">Gérez vos cours et leur contenu</p>
//         </div>

//         {courses.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="text-gray-400 mb-4">
//               <svg
//                 className="mx-auto h-12 w-12"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               Aucun cours trouvé
//             </h3>
//             <p className="text-gray-500">
//               Commencez par créer votre premier cours.
//             </p>
//           </div>
//         ) : (
//           <>
//             {/* Desktop Table View */}
//             <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50 border-b border-gray-200">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
//                         Cours
//                       </th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
//                         Durée
//                       </th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
//                         Publié le
//                       </th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {courses.map((course) => (
//                       <tr
//                         key={course._id}
//                         className="hover:bg-gray-50 transition-colors"
//                       >
//                         <td className="px-6 py-4">
//                           <div className="flex items-center space-x-4">
//                             <img
//                               src={
//                                 course.courseThumbnail ||
//                                 "/placeholder.svg?height=60&width=80"
//                               }
//                               alt="Course thumbnail"
//                               className="w-16 h-12 object-cover rounded-md border border-gray-200"
//                             />
//                             <div className="min-w-0 flex-1">
//                               <p className="text-sm font-medium text-gray-900 truncate">
//                                 {course.courseTitle}
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-600">
//                           {calculateCourseDuration(course)}
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-600">
//                           {new Date(course.createdAt).toLocaleDateString(
//                             "fr-FR"
//                           )}
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center space-x-2">
//                             <Link
//                               to={`/educator/update-course/${course._id}`}
//                               className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                             >
//                               Modifier
//                             </Link>
//                             <button
//                               onClick={() => confirmDelete(course)}
//                               className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors cursor-pointer"
//                             >
//                               Supprimer
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Mobile/Tablet Card View */}
//             <div className="lg:hidden space-y-4">
//               {courses.map((course) => (
//                 <div
//                   key={course._id}
//                   className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
//                 >
//                   <div className="p-4 sm:p-6">
//                     {/* Course Header */}
//                     <div className="flex items-start space-x-4 mb-4">
//                       <img
//                         src={
//                           course.courseThumbnail ||
//                           "/placeholder.svg?height=80&width=100"
//                         }
//                         alt="Course thumbnail"
//                         className="w-20 h-16 sm:w-24 sm:h-18 object-cover rounded-md border border-gray-200 flex-shrink-0"
//                       />
//                       <div className="min-w-0 flex-1">
//                         <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
//                           {course.courseTitle}
//                         </h3>
//                         <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-gray-600">
//                           <div className="flex items-center">
//                             <svg
//                               className="w-4 h-4 mr-1"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                               />
//                             </svg>
//                             {calculateCourseDuration(course)}
//                           </div>
//                           <div className="flex items-center">
//                             <svg
//                               className="w-4 h-4 mr-1"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                               />
//                             </svg>
//                             {new Date(course.createdAt).toLocaleDateString(
//                               "fr-FR"
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
//                       <Link
//                         to={`/educator/update-course/${course._id}`}
//                         className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                       >
//                         <svg
//                           className="w-4 h-4 mr-2"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                           />
//                         </svg>
//                         Modifier
//                       </Link>
//                       <button
//                         onClick={() => confirmDelete(course)}
//                         className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
//                       >
//                         <svg
//                           className="w-4 h-4 mr-2"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                           />
//                         </svg>
//                         Supprimer
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyCourses;

// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../../context/AppContext";
// import Loading from "../../components/student/Loading";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Swal from "sweetalert2";

// const MyCourses = () => {
//   const { backendUrl, allCourses, fetchAllCourses, calculateCourseDuration } =
//     useContext(AppContext);

//   const [courses, setCourses] = useState(null);
//   const [matiereNames, setMatiereNames] = useState({}); // { matiereId: matiereNom }

//   useEffect(() => {
//     fetchAllCourses();
//   }, []);

//   useEffect(() => {
//     if (allCourses.length > 0) {
//       setCourses(allCourses);

//       // Extraire IDs matières uniques
//       const uniqueMatiereIds = [
//         ...new Set(allCourses.map((course) => course.matiere)),
//       ];

//       // Pour chaque matiereId, récupérer le nom si pas déjà dans matiereNames
//       uniqueMatiereIds.forEach(async (matiereId) => {
//         if (!matiereNames[matiereId]) {
//           try {
//             const res = await axios.get(
//               `${backendUrl}/matiere/get/${matiereId}`
//             );
//             console.log("res bbb : ", res.data);
//             const nom = res.data.data.nom || "Nom non trouvé";
//             setMatiereNames((prev) => ({ ...prev, [matiereId]: nom }));
//           } catch (error) {
//             console.error("Erreur récupération matière", matiereId, error);
//             setMatiereNames((prev) => ({
//               ...prev,
//               [matiereId]: "Erreur chargement",
//             }));
//           }
//         }
//       });
//     }
//   }, [allCourses]);

//   const handleDelete = async (id) => {
//     try {
//       // const res = await axios.delete(`${backendUrl}/course/${id}`);
//       await fetchAllCourses();
//       console.log("Course deleted");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const confirmDelete = (course) => {
//     Swal.fire({
//       title: "Êtes-vous sûr ?",
//       text: `Voulez-vous vraiment supprimer ce cours ? Cette action est irréversible.`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Oui, supprimer",
//       cancelButtonText: "Annuler",
//       width: "90%",
//       maxWidth: "500px",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         handleDelete(course._id);
//       }
//     });
//   };

//   if (!courses) {
//     return <Loading />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
//           Mes cours
//         </h2>

//         {courses.length === 0 ? (
//           <div className="text-center py-12 text-gray-500">
//             Aucun cours trouvé. Commencez par créer votre premier cours.
//           </div>
//         ) : (
//           <table className="w-full bg-white rounded-md shadow-md overflow-hidden">
//             <thead>
//               <tr className="bg-gray-100 border-b">
//                 <th className="px-6 py-4 text-left">Cours (Nom matière)</th>
//                 <th className="px-6 py-4 text-left">Durée</th>
//                 <th className="px-6 py-4 text-left">Publié le</th>
//                 <th className="px-6 py-4 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {courses.map((course) => (
//                 <tr key={course._id} className="border-b hover:bg-gray-50">
//                   <td className="flex items-center space-x-4 px-6 py-3">
//                     <img
//                       src={course.courseThumbnail || "/placeholder.svg"}
//                       alt="Course thumbnail"
//                       className="w-16 h-12 object-cover rounded-md border"
//                     />
//                     <span className="truncate">
//                       {/* Affiche le nom de la matière récupéré, ou fallback */}
//                       {matiereNames[course.matiere] || "Chargement..."}
//                     </span>
//                   </td>
//                   <td className="px-6 py-3 text-gray-600 text-sm">
//                     {calculateCourseDuration(course)}
//                   </td>
//                   <td className="px-6 py-3 text-gray-600 text-sm">
//                     {new Date(course.createdAt).toLocaleDateString("fr-FR")}
//                   </td>
//                   <td className="px-6 py-3">
//                     <div className="flex space-x-2">
//                       <Link
//                         to={`/educator/update-course/${course._id}`}
//                         className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
//                       >
//                         Modifier
//                       </Link>
//                       <button
//                         onClick={() => confirmDelete(course)}
//                         className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
//                       >
//                         Supprimer
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyCourses;

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const MyCourses = () => {
  const { backendUrl, allCourses, fetchAllCourses, calculateCourseDuration } =
    useContext(AppContext);

  const [courses, setCourses] = useState(null);
  const [matiereNames, setMatiereNames] = useState({}); // { matiereId: matiereNom }

  useEffect(() => {
    const loadCoursesAndMatieres = async () => {
      try {
        await fetchAllCourses();

        const matiereIds = [
          ...new Set(allCourses.map((course) => course.matiere)),
        ];

        const matiereRequests = matiereIds.map(async (id) => {
          try {
            const res = await axios.get(`${backendUrl}/matiere/get/${id}`);
            return { id, nom: res.data.data.nom || "Nom non trouvé" };
          } catch (err) {
            console.error("Erreur récupération matière :", id, err);
            return { id, nom: "Erreur chargement" };
          }
        });

        const matieres = await Promise.all(matiereRequests);
        const matiereMap = {};
        matieres.forEach(({ id, nom }) => {
          matiereMap[id] = nom;
        });

        setMatiereNames(matiereMap);
        setCourses(allCourses);
      } catch (error) {
        console.error("Erreur chargement cours/matières :", error);
      }
    };

    loadCoursesAndMatieres();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetchAllCourses(); // Recharger les cours après suppression
      setCourses(allCourses);
      console.log("Course deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = (course) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: `Voulez-vous vraiment supprimer ce cours ? Cette action est irréversible.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
      width: "90%",
      maxWidth: "500px",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(course._id);
      }
    });
  };

  if (!courses) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Mes cours
          </h2>
          <button
            onClick={async () => {
              await fetchAllCourses();
              setCourses(allCourses);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            Rafraîchir les cours
          </button>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Aucun cours trouvé. Commencez par créer votre premier cours.
          </div>
        ) : (
          <table className="w-full bg-white rounded-md shadow-md overflow-hidden">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-4 text-left">Cours (Nom matière)</th>
                <th className="px-6 py-4 text-left">Durée</th>
                <th className="px-6 py-4 text-left">Publié le</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className="border-b hover:bg-gray-50">
                  <td className="flex items-center space-x-4 px-6 py-3">
                    <img
                      src={course.courseThumbnail || "/placeholder.svg"}
                      alt="Course thumbnail"
                      className="w-16 h-12 object-cover rounded-md border"
                    />
                    <span className="truncate">
                      {matiereNames[course.matiere] || "Chargement..."}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-600 text-sm">
                    {calculateCourseDuration(course)}
                  </td>
                  <td className="px-6 py-3 text-gray-600 text-sm">
                    {new Date(course.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex space-x-2">
                      <Link
                        to={`/educator/update-course/${course._id}`}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => confirmDelete(course)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
