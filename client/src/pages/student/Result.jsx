// "use client";
// import React from "react";
// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AppContext } from "../../context/AppContext";
// import Cookie from "cookie-universal";

// export default function StudentResults() {
//   const { backendUrl } = useContext(AppContext);
//   const cookies = Cookie();
//   const idStu = cookies.get("id");
//   const [studentInfos, setStudentInfos] = useState(null);
//   const [selectedSemester, setSelectedSemester] = useState("S3");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const semesters = ["S1", "S2", "S3", "S4", "S5", "S6"];
//   const [resultsData, setResultsData] = useState([]);

//   // 1. Récupérer les infos de l'étudiant
//   const getStudentInfos = async () => {
//     try {
//       const res = await axios.get(`${backendUrl}/etudiant/get/${idStu}`);
//       console.log("res : ", res.data.data);
//       setStudentInfos(res.data.data || res.data.etudiant);
//     } catch (err) {
//       console.error("Erreur récupération infos étudiant :", err);
//     }
//   };

//   // 2. Récupérer les résultats selon le semestre sélectionné
//   const getStudentResults = async () => {
//     try {
//       const res = await axios.get(
//         `${backendUrl}/etudiant/get-result/${idStu}`,
//         {
//           params: { semestre: selectedSemester },
//         }
//       );
//       console.log("res 2 : ", res.data.resultats);
//       const out = res.data.resultats || res.data.data?.resultats;
//       if (out && Object.keys(out).length === 1) {
//         // extraire les modules
//         const semKey = Object.keys(out)[0];
//         setResultsData(out[semKey].modules);
//       } else {
//         setResultsData([]);
//       }
//     } catch (err) {
//       console.error("Erreur récupération résultats :", err);
//       setResultsData([]);
//     }
//   };

//   useEffect(() => {
//     if (idStu) getStudentInfos();
//   }, [idStu]);

//   useEffect(() => {
//     if (idStu && selectedSemester) getStudentResults();
//   }, [selectedSemester, idStu]);

//   // const calculateSubjectAverage = (subject) => {
//   //   const noteExamen = subject.ratt != null ? subject.ratt : subject.ecrit;
//   //   const notes = [subject.cc, subject.tp, noteExamen].filter((n) => n != null);
//   //   if (notes.length === 0) return 0;
//   //   return notes.reduce((a, b) => a + b, 0) / notes.length;
//   // };

//   const calculateSubjectAverage = (subject) => {
//     if (subject.moyenne != null) return subject.moyenne;

//     const noteExamen = subject.ratt != null ? subject.ratt : subject.ecrit;
//     const notes = [subject.cc, subject.tp, noteExamen].filter((n) => n != null);
//     if (notes.length === 0) return 0;
//     return notes.reduce((a, b) => a + b, 0) / notes.length;
//   };

//   const getDecision = (avg) => (avg >= 10 ? "V" : avg >= 8 ? "R" : "NV");

//   const calculateModuleAverage = (subjects) => {
//     const totCred = subjects.reduce((s, m) => s + (m.credit || 0), 0);
//     const weighted = subjects.reduce(
//       (sum, m) => sum + calculateSubjectAverage(m) * (m.credit || 0),
//       0
//     );
//     return totCred ? weighted / totCred : 0;
//   };

//   const semesterAverage = resultsData.reduce(
//     (sum, mod) =>
//       sum +
//       calculateModuleAverage(mod.matieres || mod.subjects || mod.matieres),
//     0
//   );

//   const totalCredits = resultsData.reduce(
//     (sum, mod) =>
//       sum +
//       (mod.matieres || mod.subjects).reduce((c, m) => c + (m.credit || 0), 0),
//     0
//   );

//   // const validatedCredits = resultsData.reduce(
//   //   (sum, mod) =>
//   //     sum +
//   //     (mod.matieres || mod.subjects).reduce((v, m) => {
//   //       const avg = calculateSubjectAverage(m);
//   //       return sum + (avg >= 10 ? m.credit || 0 : 0);
//   //     }, 0),
//   //   0
//   // );


//   const validatedCredits = resultsData.reduce((sum, mod) => {
//     return (
//       sum +
//       (mod.matieres || mod.subjects).reduce((v, m) => {
//         const avg = calculateSubjectAverage(m);
//         return v + (avg >= 10 ? m.credit || 0 : 0);
//       }, 0)
//     );
//   }, 0);


//   const juryDecision = getDecision(semesterAverage / resultsData.length);

//   const handleDownload = () => window.print();

//   // Préparer les infos étudiant
//   let studentInfo = {};
//   if (studentInfos) {
//     studentInfo = {
//       numeroEtudiant: studentInfos.matricule,
//       nomPrenom: `${studentInfos.nom} ${studentInfos.prenom}`,
//       profil: `${studentInfos.specialite?.nouveauAcademique || ""} - ${
//         studentInfos.specialite?.nom || ""
//       }`,
//     };
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
//         {/* Filter Dropdown */}
//         <div className="p-6 border-b border-gray-200">
//           <div className="relative w-64">
//             <button
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-left focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between cursor-pointer"
//             >
//               <span className="text-gray-700">
//                 Filter par semestre: {selectedSemester}
//               </span>
//               <svg
//                 className={`w-4 h-4 transition-transform ${
//                   isDropdownOpen ? "rotate-180" : ""
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>
//             {isDropdownOpen && (
//               <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
//                 {semesters.map((semester) => (
//                   <button
//                     key={semester}
//                     onClick={() => {
//                       setSelectedSemester(semester);
//                       setIsDropdownOpen(false);
//                     }}
//                     className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
//                   >
//                     {semester}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Header */}
//         <div className="p-6 border-b border-gray-200">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">
//             # Résultats de l'étudiant
//           </h1>
//           {/* Student Information */}
//           {studentInfos && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//               <div className="space-y-2">
//                 <div className="flex">
//                   <span className="font-semibold text-gray-700 w-32">
//                     Numéro Étudiant
//                   </span>
//                   <span className="text-gray-800">
//                     {studentInfo.numeroEtudiant}
//                   </span>
//                 </div>
//                 <div className="flex">
//                   <span className="font-semibold text-gray-700 w-32">
//                     Nom/Prénom
//                   </span>
//                   <span className="text-gray-800">{studentInfo.nomPrenom}</span>
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <div className="flex">
//                   <span className="font-semibold text-gray-700 w-20">
//                     Profil
//                   </span>
//                   <span className="text-gray-800 flex-1">
//                     {studentInfo.profil}
//                   </span>
//                 </div>
//                 <div className="flex">
//                   <span className="font-semibold text-gray-700 w-20">
//                     Semestre
//                   </span>
//                   <span className="text-gray-800">{selectedSemester}</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Results */}
//         <div className="p-6">
//           {resultsData.length === 0 ? (
//             <div className="text-center text-gray-500">
//               Aucun résultat pour ce semestre.
//             </div>
//           ) : (
//             resultsData.map((module, moduleIndex) => (
//               <div key={moduleIndex} className="mb-8">
//                 {/* Subjects Table */}
//                 <div className="overflow-x-auto">
//                   <table className="w-full border-collapse border border-gray-300 text-sm">
//                     <thead>
//                       <tr className="bg-gray-50">
//                         <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
//                           Matière
//                         </th>
//                         <th className="border border-gray-300 px-3 py-2 text-center font-semibold">
//                           Credit
//                         </th>
//                         <th className="border border-gray-300 px-3 py-2 text-center font-semibold">
//                           Note CC
//                         </th>
//                         <th className="border border-gray-300 px-3 py-2 text-center font-semibold">
//                           Note TP
//                         </th>
//                         <th className="border border-gray-300 px-3 py-2 text-center font-semibold">
//                           Note E
//                         </th>
//                         <th className="border border-gray-300 px-3 py-2 text-center font-semibold">
//                           Note Rattrapage
//                         </th>
//                         <th className="border border-gray-300 px-3 py-2 text-center font-semibold">
//                           M
//                         </th>
//                         <th className="border border-gray-300 px-3 py-2 text-center font-semibold">
//                           D
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {(module.matieres || module.subjects).map(
//                         (subject, subjectIndex) => {
//                           const average = calculateSubjectAverage(subject);
//                           const decision = getDecision(average);
//                           return (
//                             <tr key={subjectIndex} className="hover:bg-gray-50">
//                               <td className="border border-gray-300 px-3 py-2">
//                                 <div className="font-medium">
//                                   {subject.nom || subject.matiere}
//                                 </div>
//                               </td>
//                               <td className="border border-gray-300 px-3 py-2 text-center">
//                                 {(subject.credit || 0).toFixed(1)}
//                               </td>
//                               <td className="border border-gray-300 px-3 py-2 text-center">
//                                 {subject.cc ? subject.cc.toFixed(2) : "-"}
//                               </td>
//                               <td className="border border-gray-300 px-3 py-2 text-center">
//                                 {subject.tp ? subject.tp.toFixed(2) : "-"}
//                               </td>
//                               <td className="border border-gray-300 px-3 py-2 text-center">
//                                 {subject.ecrit ? subject.ecrit.toFixed(2) : "-"}
//                               </td>
//                               <td className="border border-gray-300 px-3 py-2 text-center">
//                                 {subject.ratt ? (
//                                   <span className="text-orange-600 font-semibold">
//                                     {subject.ratt.toFixed(2)}
//                                   </span>
//                                 ) : (
//                                   "-"
//                                 )}
//                               </td>
//                               <td className="border border-gray-300 px-3 py-2 text-center font-semibold">
//                                 {average.toFixed(2)}
//                               </td>
//                               <td className="border border-gray-300 px-3 py-2 text-center">
//                                 <span
//                                   className={`font-semibold ${
//                                     decision === "V"
//                                       ? "text-green-600"
//                                       : decision === "R"
//                                       ? "text-orange-600"
//                                       : "text-red-600"
//                                   }`}
//                                 >
//                                   {decision}
//                                 </span>
//                               </td>
//                             </tr>
//                           );
//                         }
//                       )}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Module Average */}
//                 <div className="mt-4 bg-gray-50 p-3 rounded">
//                   <div className="flex justify-between items-center">
//                     <span className="font-semibold text-gray-700">
//                       Moyenne Module
//                     </span>
//                     <div className="flex items-center space-x-4">
//                       <span className="font-bold text-lg">
//                         {calculateModuleAverage(
//                           module.matieres || module.subjects
//                         ).toFixed(2)}
//                       </span>
//                       <span
//                         className={`font-semibold ${
//                           getDecision(
//                             calculateModuleAverage(
//                               module.matieres || module.subjects
//                             )
//                           ) === "V"
//                             ? "text-green-600"
//                             : getDecision(
//                                 calculateModuleAverage(
//                                   module.matieres || module.subjects
//                                 )
//                               ) === "R"
//                             ? "text-orange-600"
//                             : "text-red-600"
//                         }`}
//                       >
//                         {getDecision(
//                           calculateModuleAverage(
//                             module.matieres || module.subjects
//                           )
//                         )}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}

//           {/* Summary Section */}
//           {resultsData.length > 0 && (
//             <div className="border-t-2 border-gray-300 pt-6 mt-8">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
//                 <div className="bg-blue-50 p-4 rounded-lg">
//                   <div className="text-sm text-gray-600 mb-1">
//                     Moyenne Semestre
//                   </div>
//                   <div className="text-2xl font-bold text-blue-600">
//                     {(semesterAverage / resultsData.length).toFixed(2)}/20
//                   </div>
//                 </div>
//                 <div className="bg-green-50 p-4 rounded-lg">
//                   <div className="text-sm text-gray-600 mb-1">
//                     Total crédit validé
//                   </div>
//                   <div className="text-2xl font-bold text-green-600">
//                     {validatedCredits}/{totalCredits}
//                   </div>
//                 </div>
//                 <div className="bg-purple-50 p-4 rounded-lg">
//                   <div className="text-sm text-gray-600 mb-1">
//                     Décision du Jury
//                   </div>
//                   <div
//                     className={`text-2xl font-bold ${
//                       juryDecision === "V"
//                         ? "text-green-600"
//                         : juryDecision === "R"
//                         ? "text-orange-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {juryDecision}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Legend */}
//           <div className="mt-8 p-4 bg-gray-50 rounded-lg">
//             <h3 className="font-semibold text-gray-700 mb-2">Légende :</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
//               <div>
//                 <span className="font-semibold text-green-600">V :</span> Validé
//               </div>
//               <div>
//                 <span className="font-semibold text-red-600">NV :</span> Non
//                 Validé
//               </div>
//               <div>
//                 <span className="font-semibold text-orange-600">R :</span>{" "}
//                 Rattrapage
//               </div>
//             </div>
//           </div>

//           {/* Note */}
//           <div className="mt-6 text-center text-sm text-gray-600 italic">
//             <p>NB : Ce relevé ne fait pas objet d'un document officiel</p>
//           </div>
//         </div>

//         {/* Download Button */}
//         <div className="p-6 text-center border-t border-gray-200 print:hidden">
//           <button
//             onClick={handleDownload}
//             className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//           >
//             Télécharger
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import Cookie from "cookie-universal";

export default function StudentResults() {
  const { backendUrl } = useContext(AppContext);
  const cookies = Cookie();
  const idStu = cookies.get("id");

  const [studentInfos, setStudentInfos] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState("S1");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const semesters = ["S1", "S2", "S3", "S4", "S5", "S6"];

  const [resultsData, setResultsData] = useState([]);
  const [semesterAverage, setSemesterAverage] = useState(0);
  const [validatedCredits, setValidatedCredits] = useState(0);
  const [juryDecision, setJuryDecision] = useState("NV");

  // 1. Récupérer les infos de l'étudiant
  const getStudentInfos = async () => {
    try {
      const res = await axios.get(`${backendUrl}/etudiant/get/${idStu}`);
      setStudentInfos(res.data.data || res.data.etudiant);
    } catch (err) {
      console.error("Erreur récupération infos étudiant :", err);
    }
  };

  const calculerDecisionMatiere = (matiere, moyenneModule) => {
    const moyenne = matiere.moyenne;
    const ratt = matiere.Rattrapage;

    if (moyenne >= 10) return "V";
    if (moyenne >= 7 && moyenne < 10) {
      if (moyenneModule >= 10) return "V";
      else return ratt > 0 ? "NV" : "R";
    }
    if (moyenne < 7) {
      return ratt > 0 ? "NV" : "R";
    }
    return "NV";
  };

  const calculerDecisionModule = (decisionsMatieres) => {
    if (decisionsMatieres.every((d) => d === "V")) return "V";
    if (decisionsMatieres.includes("R")) return "R";
    if (decisionsMatieres.includes("NV")) return "NV";
    return "NV";
  };

  const calculerDecisionSemestre = (decisionsModules) => {
    if (decisionsModules.every((d) => d === "V")) return "V";
    if (decisionsModules.includes("R")) return "R";
    if (decisionsModules.includes("NV")) return "NV";
    return "NV";
  };


  // 2. Récupérer les résultats selon le semestre
  const getStudentResults = async () => {
    try {
      const res = await axios.get(
        `${backendUrl}/notes-matieres/get-notes-matieres-by-etudiant/${idStu}`
      );

      const allSemestres = res.data.data || [];
      const found = allSemestres.find(
        (item) => item.semestre === selectedSemester
      );

      if (found) {
        const modules = found.modules || [];

        // Recalcul des décisions
        const decisionsModules = [];

        modules.forEach((module) => {
          const moyenneModule = module.moyenneModule || 0;
          const decisionsMatieres = [];

          module.notesMatieres.forEach((matiere) => {
            const decision = calculerDecisionMatiere(matiere, moyenneModule);
            matiere.decision = decision;
            decisionsMatieres.push(decision);
          });

          const decisionModule = calculerDecisionModule(decisionsMatieres);
          module.decisionModule = decisionModule;
          decisionsModules.push(decisionModule);
        });

        const decisionSemestre = calculerDecisionSemestre(decisionsModules);

        setResultsData(found.modules || []);
        setSemesterAverage(found.moyenneSemestre || 0);
        setValidatedCredits(found.creditsSemestreValidee || 0);
        setJuryDecision(decisionSemestre || "NV");
      } else {
        setResultsData([]);
        setSemesterAverage(0);
        setValidatedCredits(0);
        setJuryDecision("NV");
      }
    } catch (err) {
      console.error("Erreur récupération résultats :", err);
      setResultsData([]);
      setSemesterAverage(0);
      setValidatedCredits(0);
      setJuryDecision("NV");
    }
  };

  useEffect(() => {
    if (idStu) getStudentInfos();
  }, [idStu]);

  useEffect(() => {
    console.log("selectedSemester : ", typeof selectedSemester);
    if (idStu && selectedSemester) getStudentResults();
  }, [selectedSemester, idStu]);

  const handleDownload = () => window.print();

  let studentInfo = {};
  if (studentInfos) {
    studentInfo = {
      numeroEtudiant: studentInfos.matricule,
      nomPrenom: `${studentInfos.nom} ${studentInfos.prenom}`,
      profil: `${studentInfos.specialite?.nouveauAcademique || ""} - ${
        studentInfos.specialite?.nom || ""
      }`,
    };
  }

  const getDecisionColor = (decision) =>
    decision === "V"
      ? "text-green-600"
      : decision === "R"
      ? "text-orange-600"
      : "text-red-600";

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
        {/* Filter Dropdown */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative w-64">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-left focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between cursor-pointer"
            >
              <span className="text-gray-700">
                Filter par semestre: {selectedSemester}
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {semesters.map((semester) => (
                  <button
                    key={semester}
                    onClick={() => {
                      setSelectedSemester(semester);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    {semester}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Student Info Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            # Résultats de l'étudiant
          </h1>
          {studentInfos && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-32">
                    Numéro Étudiant
                  </span>
                  <span className="text-gray-800">
                    {studentInfo.numeroEtudiant}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-32">
                    Nom/Prénom
                  </span>
                  <span className="text-gray-800">{studentInfo.nomPrenom}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-20">
                    Profil
                  </span>
                  <span className="text-gray-800">{studentInfo.profil}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-20">
                    Semestre
                  </span>
                  <span className="text-gray-800">{selectedSemester}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="p-6">
          {resultsData.length === 0 ? (
            <div className="text-center text-gray-500">
              Aucun résultat pour ce semestre.
            </div>
          ) : (
            resultsData.map((module, i) => (
              <div key={i} className="mb-8">
                <h2 className="text-lg font-bold text-gray-700 mb-2">
                  Module {i + 1}
                </h2>
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                        Matière
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                        Credit
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                        CC
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                        TP
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                        Ecrit
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                        Ratt
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                        Moy
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                        D
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {module.notesMatieres.map((m, j) => (
                      <tr key={j} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2">
                          {m.nom}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-center">
                          {m.credit}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-center">
                          {m.CC || "-"}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-center">
                          {m.TP || "-"}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-center">
                          {m.Ecrit || "-"}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-center">
                          {m.Rattrapage > 0 ? (
                            <span className="text-orange-600 font-semibold">
                              {m.Rattrapage}
                            </span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-center font-semibold">
                          {m.moyenne?.toFixed(2)}
                        </td>
                        <td
                          className={`border border-gray-300 px-3 py-2 text-center font-semibold ${getDecisionColor(
                            m.decision
                          )}`}
                        >
                          {m.decision}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-2 flex justify-between items-center bg-gray-100 px-4 py-2 rounded">
                  <span className="font-semibold">Moyenne Module :</span>
                  <div className="flex gap-4 items-center">
                    <span className="text-lg font-bold">
                      {module.moyenneModule?.toFixed(2)}
                    </span>
                    <span
                      className={`font-semibold ${getDecisionColor(
                        module.decisionModule
                      )}`}
                    >
                      {module.decisionModule}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Résumé */}
          {resultsData.length > 0 && (
            <div className="border-t-2 border-gray-300 pt-6 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">
                    Moyenne Semestre
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {semesterAverage.toFixed(2)}/20
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">
                    Total crédit validé
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {validatedCredits}
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">
                    Décision du Jury
                  </div>
                  <div
                    className={`text-2xl font-bold ${getDecisionColor(
                      juryDecision
                    )}`}
                  >
                    {juryDecision}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Légende */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Légende :</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
              <div>
                <span className="font-semibold text-green-600">V :</span> Validé
              </div>
              <div>
                <span className="font-semibold text-orange-600">R :</span>{" "}
                Rattrapage
              </div>
              <div>
                <span className="font-semibold text-red-600">NV :</span> Non
                Validé
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600 italic">
            <p>NB : Ce relevé ne fait pas objet d'un document officiel</p>
          </div>
        </div>

        {/* Télécharger */}
        <div className="p-6 text-center border-t border-gray-200 print:hidden">
          <button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium transition"
          >
            Télécharger
          </button>
        </div>
      </div>
    </div>
  );
}
