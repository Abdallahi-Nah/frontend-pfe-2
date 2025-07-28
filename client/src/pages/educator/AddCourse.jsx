// import React, { useContext, useEffect, useRef, useState } from "react";
// import uniqid from "uniqid";
// import Quill from "quill";
// import { assets } from "../../assets/assets";
// import { AppContext } from "../../context/AppContext";
// import { toast } from "react-toastify";
// import axios from "axios";
// import Cookie from "cookie-universal";
// import { useLocation, useParams } from "react-router-dom";

// const AddCourse = () => {
//   const { backendUrl } = useContext(AppContext);
//   const quillRef = useRef(null);
//   const editorRef = useRef(null);

//   const [courseTitle, setCourseTitle] = useState("");
//   const [image, setImage] = useState(null);
//   const [chapters, setChapters] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [currentChapterId, setCurrentChapterId] = useState(null);
//   const [lectureDetails, setLectureDetails] = useState({
//     lectureTitle: "",
//     lectureDuration: "",
//     lectureUrl: "",
//     isPreviewFree: true,
//   });
//   const [matiere, setMatiere] = useState("");
//   const cookies = Cookie();
//   const param = useParams();

//   const idCourse = param.idCourse;

//   // const getCourseById = async () => {
//   //   try {
//   //     const res = await axios.get(`${backendUrl}/course/${idCourse}`);
//   //     if(res.data.success) {
//   //       console.log("course data : ", res.data.courseData);
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   const getCourseById = async () => {
//     try {
//       const res = await axios.get(`${backendUrl}/course/${idCourse}`);
//       if (res.data.success) {
//         const course = res.data.courseData;

//         setCourseTitle(course.courseTitle);
//         setMatiere(course.matiere);
//         setImage(course.courseThumbnail);
//         setChapters(course.courseContent || []);

//         if (quillRef.current) {
//           quillRef.current.root.innerHTML = course.courseDescription;
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const { fetchEmplois, emplois } = useContext(AppContext);

//   console.log("les matieres : ", emplois);

//   const matieresUniques = [
//     ...new Map(
//       emplois.map((emploi) => [emploi.matiere._id, emploi.matiere])
//     ).values(),
//   ];

//   useEffect(() => {
//     fetchEmplois();
//     getCourseById();
//   }, []);

//   const handleChapter = (action, chapterId) => {
//     if (action === "add") {
//       const title = prompt("Entrez le nom du chapitre :");
//       if (title) {
//         const newChapter = {
//           chapterId: uniqid(),
//           chapterTitle: title,
//           chapterContent: [],
//           collapsed: false,
//           chapterOrder:
//             chapters.length > 0
//               ? chapters[chapters.length - 1].chapterOrder + 1
//               : 1,
//         };
//         setChapters([...chapters, newChapter]);
//       }
//     } else if (action === "remove") {
//       setChapters(
//         chapters.filter((chapter) => chapter.chapterId !== chapterId)
//       );
//     } else if (action === "toggle") {
//       setChapters(
//         chapters.map((chapter) =>
//           chapter.chapterId === chapterId
//             ? { ...chapter, collapsed: !chapter.collapsed }
//             : chapter
//         )
//       );
//     }
//   };

//   const handleLecture = (action, chapterId, lectureIndex) => {
//     if (action === "add") {
//       setCurrentChapterId(chapterId);
//       setShowPopup(true);
//     } else if (action === "remove") {
//       setChapters(
//         chapters.map((chapter) => {
//           if (chapter.chapterId === chapterId) {
//             chapter.chapterContent.splice(lectureIndex, 1);
//           }
//           return chapter;
//         })
//       );
//     }
//   };

//   const addLecture = () => {
//     setChapters(
//       chapters.map((chapter) => {
//         if (chapter.chapterId === currentChapterId) {
//           const newLecture = {
//             ...lectureDetails,
//             lectureOrder:
//               chapter.chapterContent.length > 0
//                 ? chapter.chapterContent[chapter.chapterContent.length - 1]
//                     .lectureOrder + 1
//                 : 1,
//             lectureId: uniqid(),
//           };
//           chapter.chapterContent.push(newLecture);
//         }
//         return chapter;
//       })
//     );
//     setShowPopup(false);
//     setLectureDetails({
//       lectureTitle: "",
//       lectureDuration: "",
//       lectureUrl: "",
//       isPreviewFree: true,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!image) {
//       toast.error("Thumbnail Not Selected");
//       return;
//     }

//     if (chapters.length === 0) {
//       toast.error("Please add at least one chapter");
//       return;
//     }

//     const hasLecture = chapters.some(
//       (chapter) => chapter.chapterContent.length > 0
//     );
//     if (!hasLecture) {
//       toast.error("Please add at least one lecture");
//       return;
//     }

//     // const courseData = {
//     //   matiere,
//     //   courseTitle: matieresUniques.find((m) => m._id === matiere)?.nom || "",
//     //   courseDescription: quillRef.current.root.innerHTML,
//     //   courseContent: chapters,
//     //   educator: cookies.get("id"),
//     // };

//     const courseData = {
//       matiere,
//       courseTitle: idCourse
//         ? courseTitle 
//         : matieresUniques.find((m) => m._id === matiere)?.nom || "", 
//       courseDescription: quillRef.current.root.innerHTML,
//       courseContent: chapters,
//       educator: cookies.get("id"),
//     };


//     const formData = new FormData();
//     formData.append("courseData", JSON.stringify(courseData));
//     formData.append("image", image);

//     for (let [key, value] of formData.entries()) {
//       console.log("FormData:", key, value);
//     }

//     try {
//       let data;
//       if (idCourse) {
//         data = await axios.put(
//           backendUrl + "/enseignant/update-course/" + idCourse,
//           formData,
//           {
//             withCredentials: true,
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//       } else {
//         data = await axios.post(
//           backendUrl + "/enseignant/add-course",
//           formData,
//           {
//             withCredentials: true,
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//       }

//       console.log("data course updated : ", data.data);

//       if (data.data.success || data.success) {
//         toast.success(data.data.message || data.message);
//         setCourseTitle("");
//         setImage(null);
//         setChapters([]);
//         quillRef.current.root.innerHTML = "";
//       } else {
//         toast.error(data.message || "Course creation failed");
//       }
//     } catch (error) {
//       console.error("Error during course submission:", error);
//       if (error.response) {
//         console.log("Error response:", error.response);
//         toast.error(error.response.data.message || "Server error");
//       } else {
//         toast.error(error.message || "Unknown error");
//       }
//     }
//   };

//   useEffect(() => {
//     if (!quillRef.current && editorRef.current) {
//       quillRef.current = new Quill(editorRef.current, {
//         theme: "snow",
//       });
//     }
//   }, []);

//   return (
//     <div className="h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col gap-4 max-w-md w-full text-gray-500"
//       >
//         <select
//           onChange={(e) => setMatiere(e.target.value)}
//           value={matiere}
//           required
//           className="outline-none md:py-2.5 py-2 px-2 rounded border border-gray-500"
//         >
//           <option value="" disabled className="cursor-pointer">
//             -- Sélectionnez une matière --
//           </option>
//           {matieresUniques.map((matiere) => (
//             <option
//               className="cursor-pointer"
//               key={matiere._id}
//               value={matiere._id}
//             >
//               {matiere.nom}
//             </option>
//           ))}
//         </select>

//         {/* Description */}
//         <div className="flex flex-col gap-1">
//           <p>Description du cours</p>
//           <div ref={editorRef}></div>
//         </div>

//         {/* Image */}
//         <div className="flex items-center justify-between flex-wrap">
//           <div className="flex md:flex-row flex-col items-center gap-3">
//             <p>Vignette du cours</p>
//             <label
//               htmlFor="thumbnailImage"
//               className="flex items-center gap-3 cursor-pointer"
//             >
//               <img
//                 src={assets.file_upload_icon}
//                 alt=""
//                 className="p-3 bg-blue-500 rounded"
//               />
//             </label>
//             <input
//               type="file"
//               id="thumbnailImage"
//               onChange={(e) => setImage(e.target.files[0])}
//               accept="image/*"
//               hidden
//             />
//             {/* <img
//               className="max-h-10"
//               src={image ? URL.createObjectURL(image) : null}
//               alt=""
//             /> */}
//             <img
//               className="max-h-10"
//               src={
//                 image
//                   ? typeof image === "string"
//                     ? image
//                     : URL.createObjectURL(image)
//                   : null
//               }
//               alt=""
//             />
//           </div>
//         </div>

//         {/* Chapitres et Leçons */}
//         <div>
//           {chapters.map((chapter, chapterIndex) => (
//             <div key={chapterIndex} className="bg-white border rounded-lg mb-4">
//               <div className="flex justify-between items-center p-4 border-b">
//                 <div className="flex items-center">
//                   <img
//                     src={assets.dropdown_icon}
//                     width={14}
//                     alt=""
//                     className={`mr-2 cursor-pointer transition-all ${
//                       chapter.collapsed && "-rotate-90"
//                     }`}
//                     onClick={() => handleChapter("toggle", chapter.chapterId)}
//                   />
//                   <span className="font-semibold">
//                     {chapterIndex + 1} {chapter.chapterTitle}
//                   </span>
//                 </div>
//                 <span className="text-gray-500">
//                   {chapter.chapterContent.length} Lectures
//                 </span>
//                 <img
//                   src={assets.cross_icon}
//                   alt=""
//                   className="cursor-pointer"
//                   onClick={() => handleChapter("remove", chapter.chapterId)}
//                 />
//               </div>
//               {!chapter.collapsed && (
//                 <div className="p-4">
//                   {chapter.chapterContent.map((lecture, lectureIndex) => (
//                     <div
//                       key={lectureIndex}
//                       className="flex justify-between items-center mb-2"
//                     >
//                       <span>
//                         {lectureIndex + 1} {lecture.lectureTitle} -{" "}
//                         {lecture.lectureDuration} mins -{" "}
//                         <a
//                           href={lecture.lectureUrl}
//                           target="_blank"
//                           className="text-blue-500"
//                         >
//                           Link
//                         </a>{" "}
//                         - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
//                       </span>
//                       <img
//                         src={assets.cross_icon}
//                         alt=""
//                         className="cursor-pointer"
//                         onClick={() =>
//                           handleLecture(
//                             "remove",
//                             chapter.chapterId,
//                             lectureIndex
//                           )
//                         }
//                       />
//                     </div>
//                   ))}
//                   <div
//                     className="inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2"
//                     onClick={() => handleLecture("add", chapter.chapterId)}
//                   >
//                     + Ajouter une leçon
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//           <div
//             className="flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer"
//             onClick={() => handleChapter("add")}
//           >
//             + Ajouter un chapitre
//           </div>

//           {/* Popup d'ajout de leçon */}
//           {showPopup && (
//             <div className="fixed inset-0 flex items-center justify-center bg-gray-400/40">
//               <div className="bg-white text-gray-700 p-4 rounded relative w-full max-w-80">
//                 <h2 className="text-lg font-semibold mb-4">
//                   Ajouter une leçon
//                 </h2>
//                 <div className="mb-2">
//                   <p>Titre de la leçon</p>
//                   <input
//                     type="text"
//                     className="mt-1 block w-full border rounded py-1 px-2"
//                     value={lectureDetails.lectureTitle}
//                     onChange={(e) =>
//                       setLectureDetails({
//                         ...lectureDetails,
//                         lectureTitle: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <p>Durée (en minutes)</p>
//                   <input
//                     type="number"
//                     className="mt-1 block w-full border rounded py-1 px-2"
//                     value={lectureDetails.lectureDuration}
//                     onChange={(e) =>
//                       setLectureDetails({
//                         ...lectureDetails,
//                         lectureDuration: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <p>Lien de la leçon</p>
//                   <input
//                     type="text"
//                     className="mt-1 block w-full border rounded py-1 px-2"
//                     value={lectureDetails.lectureUrl}
//                     onChange={(e) =>
//                       setLectureDetails({
//                         ...lectureDetails,
//                         lectureUrl: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//                 <div className="flex gap-2 my-4">
//                   <p>L’aperçu est-il gratuit ?</p>
//                   <input
//                     type="checkbox"
//                     className="mt-1 scale-125"
//                     checked={lectureDetails.isPreviewFree}
//                     onChange={(e) =>
//                       setLectureDetails({
//                         ...lectureDetails,
//                         isPreviewFree: e.target.checked,
//                       })
//                     }
//                   />
//                 </div>
//                 <button
//                   type="button"
//                   className="w-full bg-blue-400 text-white px-4 py-2 rounded cursor-pointer"
//                   onClick={addLecture}
//                 >
//                   Ajouter
//                 </button>
//                 <img
//                   onClick={() => setShowPopup(false)}
//                   src={assets.cross_icon}
//                   alt=""
//                   className="absolute top-4 right-4 w-4 cursor-pointer"
//                 />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Bouton final */}
//         <button
//           type="submit"
//           className="bg-black text-white w-max py-2.5 px-8 rounded my-4 cursor-pointer"
//         >
//           Enregistrer
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddCourse;

"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import uniqid from "uniqid";
import Quill from "quill";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Cookie from "cookie-universal";
import { useParams } from "react-router-dom";

const AddCourse = () => {
  const { backendUrl } = useContext(AppContext);
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: true,
  });
  const [matiere, setMatiere] = useState("");
  const cookies = Cookie();
  const param = useParams();
  const idCourse = param.idCourse;

  const getCourseById = async () => {
    try {
      const res = await axios.get(`${backendUrl}/course/${idCourse}`);
      if (res.data.success) {
        const course = res.data.courseData;
        setCourseTitle(course.courseTitle);
        setMatiere(course.matiere);
        setImage(course.courseThumbnail);
        setChapters(course.courseContent || []);
        if (quillRef.current) {
          quillRef.current.root.innerHTML = course.courseDescription;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { fetchEmplois, emplois } = useContext(AppContext);
  console.log("les matieres : ", emplois);

  const matieresUniques = [
    ...new Map(
      emplois.map((emploi) => [emploi.matiere._id, emploi.matiere])
    ).values(),
  ];

  useEffect(() => {
    fetchEmplois();
    getCourseById();
  }, []);

  // useEffect(() => {
  //   const fetchMatiereName = async () => {
  //     if (matiere) {
  //       try {
  //         const response = await axios.get(
  //           `${backendUrl}/matiere/get/${matiere}`
  //         );
  //         console.log("res : ", response);
  //         if (response.data && response.data.nom) {
  //           setCourseTitle(response.data.nom);
  //         }
  //       } catch (error) {
  //         console.error(
  //           "Erreur lors de la récupération du nom de la matière :",
  //           error
  //         );
  //       }
  //     }
  //   };

  //   // Si on est en création de cours (pas modification)
  //   if (!idCourse) {
  //     fetchMatiereName();
  //   }
  // }, [matiere]);

  useEffect(() => {
    if (!idCourse && matiere) {
      const matiereObj = matieresUniques.find((m) => m._id === matiere);
      if (matiereObj) {
        setCourseTitle(matiereObj.nom);
      }
    }
  }, [matiere, idCourse, matieresUniques]);


  const handleChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Entrez le nom du chapitre :");
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0
              ? chapters[chapters.length - 1].chapterOrder + 1
              : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === "remove") {
      setChapters(
        chapters.filter((chapter) => chapter.chapterId !== chapterId)
      );
    } else if (action === "toggle") {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === "remove") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
    }
  };

  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent[chapter.chapterContent.length - 1]
                    .lectureOrder + 1
                : 1,
            lectureId: uniqid(),
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Thumbnail Not Selected");
      return;
    }
    if (chapters.length === 0) {
      toast.error("Please add at least one chapter");
      return;
    }

    const hasLecture = chapters.some(
      (chapter) => chapter.chapterContent.length > 0
    );
    if (!hasLecture) {
      toast.error("Please add at least one lecture");
      return;
    }

    const courseData = {
      matiere,
      courseTitle: idCourse
        ? courseTitle
        : matieresUniques.find((m) => m._id === matiere)?.nom || "",
      courseDescription: quillRef.current.root.innerHTML,
      courseContent: chapters,
      educator: cookies.get("id"),
    };

    const formData = new FormData();
    formData.append("courseData", JSON.stringify(courseData));
    formData.append("image", image);
    console.log("Cookie id:", cookies.get("id"));
    console.log("Course data to send:", courseData);

    for (const [key, value] of formData.entries()) {
      console.log("FormData:", key, value);
    }

    try {
      let data;
      if (idCourse) {
        data = await axios.put(
          backendUrl + "/enseignant/update-course/" + idCourse,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        data = await axios.post(
          backendUrl + "/enseignant/add-course",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      console.log("data course updated : ", data.data);
      if (data.data.success || data.success) {
        toast.success(data.data.message || data.message);
        setCourseTitle("");
        setImage(null);
        setChapters([]);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message || "Course creation failed");
      }
    } catch (error) {
      console.error("Error during course submission:", error);
      if (error.response) {
        console.log("Error response:", error.response);
        toast.error(error.response.data.message || "Server error");
      } else {
        toast.error(error.message || "Unknown error");
      }
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-sm border p-6 lg:p-8 space-y-6"
          >
            {/* Header */}
            <div className="border-b pb-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {idCourse ? "Modifier le cours" : "Ajouter un cours"}
              </h1>
            </div>

            {/* Subject Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Matière
              </label>
              <select
                onChange={(e) => setMatiere(e.target.value)}
                value={matiere}
                required
                className="w-full outline-none py-2.5 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option value="" disabled>
                  -- Sélectionnez une matière --
                </option>
                {matieresUniques.map((matiere) => (
                  <option key={matiere._id} value={matiere._id}>
                    {matiere.nom}
                  </option>
                ))}
              </select>
            </div>

            {/* Course Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description du cours
              </label>
              <div className="border border-gray-300 rounded-md">
                <div ref={editorRef} className="min-h-[200px]"></div>
              </div>
            </div>

            {/* Course Thumbnail */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Vignette du cours
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <label
                  htmlFor="thumbnailImage"
                  className="flex items-center gap-3 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <img
                    src={assets.file_upload_icon || "/placeholder.svg"}
                    alt=""
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium">
                    Choisir un fichier
                  </span>
                </label>
                <input
                  type="file"
                  id="thumbnailImage"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                  hidden
                />
                {image && (
                  <div className="flex items-center gap-3">
                    <img
                      className="h-16 w-16 object-cover rounded-md border"
                      src={
                        image
                          ? typeof image === "string"
                            ? image
                            : URL.createObjectURL(image)
                          : null
                      }
                      alt="Course thumbnail"
                    />
                    <span className="text-sm text-gray-600">
                      Image sélectionnée
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Chapters and Lectures */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Chapitres et Leçons
                </h2>
                <button
                  type="button"
                  className="inline-flex items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-md cursor-pointer transition-colors text-sm font-medium"
                  onClick={() => handleChapter("add")}
                >
                  + Ajouter un chapitre
                </button>
              </div>

              <div className="space-y-4">
                {chapters.map((chapter, chapterIndex) => (
                  <div
                    key={chapterIndex}
                    className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white border-b gap-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <img
                          src={assets.dropdown_icon || "/placeholder.svg"}
                          width={14}
                          alt=""
                          className={`cursor-pointer transition-transform flex-shrink-0 ${
                            chapter.collapsed && "-rotate-90"
                          }`}
                          onClick={() =>
                            handleChapter("toggle", chapter.chapterId)
                          }
                        />
                        <span className="font-semibold text-gray-900 truncate">
                          {chapterIndex + 1}. {chapter.chapterTitle}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {chapter.chapterContent.length} Lecture
                          {chapter.chapterContent.length !== 1 ? "s" : ""}
                        </span>
                        <img
                          src={assets.cross_icon || "/placeholder.svg"}
                          alt=""
                          className="w-4 h-4 cursor-pointer hover:opacity-70 transition-opacity"
                          onClick={() =>
                            handleChapter("remove", chapter.chapterId)
                          }
                        />
                      </div>
                    </div>

                    {!chapter.collapsed && (
                      <div className="p-4 space-y-3">
                        {chapter.chapterContent.map((lecture, lectureIndex) => (
                          <div
                            key={lectureIndex}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-white rounded border"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-gray-900 font-medium truncate">
                                {lectureIndex + 1}. {lecture.lectureTitle}
                              </div>
                              <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-600">
                                <span className="bg-gray-100 px-2 py-1 rounded">
                                  {lecture.lectureDuration} mins
                                </span>
                                <a
                                  href={lecture.lectureUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:text-blue-700 underline"
                                >
                                  Lien
                                </a>
                                <span
                                  className={`px-2 py-1 rounded text-xs ${
                                    lecture.isPreviewFree
                                      ? "bg-green-100 text-green-700"
                                      : "bg-orange-100 text-orange-700"
                                  }`}
                                >
                                  {lecture.isPreviewFree
                                    ? "Aperçu gratuit"
                                    : "Payant"}
                                </span>
                              </div>
                            </div>
                            <img
                              src={assets.cross_icon || "/placeholder.svg"}
                              alt=""
                              className="w-4 h-4 cursor-pointer hover:opacity-70 transition-opacity flex-shrink-0"
                              onClick={() =>
                                handleLecture(
                                  "remove",
                                  chapter.chapterId,
                                  lectureIndex
                                )
                              }
                            />
                          </div>
                        ))}
                        <button
                          type="button"
                          className="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md cursor-pointer transition-colors text-sm font-medium w-full sm:w-auto"
                          onClick={() =>
                            handleLecture("add", chapter.chapterId)
                          }
                        >
                          + Ajouter une leçon
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t">
              <button
                type="submit"
                className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-md cursor-pointer transition-colors font-medium"
              >
                {idCourse ? "Mettre à jour" : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Lecture Addition Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
          <div className="bg-white text-gray-700 rounded-lg relative w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Ajouter une leçon</h2>
              <img
                onClick={() => setShowPopup(false)}
                src={assets.cross_icon || "/placeholder.svg"}
                alt=""
                className="w-5 h-5 cursor-pointer hover:opacity-70 transition-opacity"
              />
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre de la leçon
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={lectureDetails.lectureTitle}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureTitle: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Durée (en minutes)
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={lectureDetails.lectureDuration}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureDuration: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lien de la leçon
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={lectureDetails.lectureUrl}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureUrl: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="previewFree"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={lectureDetails.isPreviewFree}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      isPreviewFree: e.target.checked,
                    })
                  }
                />
                <label htmlFor="previewFree" className="text-sm text-gray-700">
                  L'aperçu est-il gratuit ?
                </label>
              </div>

              <button
                type="button"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer transition-colors font-medium"
                onClick={addLecture}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourse;
