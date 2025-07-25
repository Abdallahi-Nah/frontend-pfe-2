"use client";

import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import Cookie from "cookie-universal";

export default function StudentResults() {
  const [selectedSemester, setSelectedSemester] = useState("S3");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { backendUrl } = useContext(AppContext);
  const cookies = Cookie();
  const idStu = cookies.get("id");

  const [studentInfos, setStudentInfos] = useState({});

  console.log("student infos : ", studentInfos);

  const getStudentInfos = async () => {
    try {
      const res = await axios.get(`${backendUrl}/etudiant/get/${idStu}`);
      console.log("infos stud : ", res.data.data);
      setStudentInfos(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudentInfos();
  }, []);
  console.log("studentInfos specialite : ", studentInfos.specialite);
  // specialite nouveauAcademique
  let studentInfo;
  if (studentInfos) {
    let specialite = studentInfos.specialite;
    console.log("studentInfos specialite : ", specialite);
    studentInfo = {
      numeroEtudiant: studentInfos.matricule,
      nomPrenom: `${studentInfos.nom} ${studentInfos.prenom}`,
      // profil: `${studentInfos.specialite.nouveauAcademique} - ${studentInfos.specialite.nom}`,
      profil: `${studentInfos.specialite?.nouveauAcademique || ""} - ${
        studentInfos.specialite?.nom || ""
      }`,
    };
  }

  const semesters = ["S1", "S2", "S3", "S4", "S5", "S6"];

  const [resultsData, setResultsData] = useState([
    {
      module: "Module 1",
      subjects: [
        {
          code: "C20M121",
          matiere: "SIG",
          credit: 3.0,
          noteCC: 15.0,
          noteTP: 16.5,
          noteE: 15.0,
          noteRattrapage: null,
        },
        {
          code: "C20M122",
          matiere: "IHM",
          credit: 3.0,
          noteCC: 14.0,
          noteTP: 13.5,
          noteE: 14.0,
          noteRattrapage: null,
        },
        {
          code: "C20M123",
          matiere: "Base de Données",
          credit: 4.0,
          noteCC: 8.5,
          noteTP: 9.0,
          noteE: 7.5,
          noteRattrapage: 12.0,
        },
        {
          code: "C20M124",
          matiere: "Réseaux",
          credit: 3.0,
          noteCC: 12.0,
          noteTP: 11.5,
          noteE: 13.0,
          noteRattrapage: null,
        },
      ],
    },
    {
      module: "Module 2",
      subjects: [
        {
          code: "C20M125",
          matiere: "Programmation Web",
          credit: 4.0,
          noteCC: 16.0,
          noteTP: 17.0,
          noteE: 15.5,
          noteRattrapage: null,
        },
        {
          code: "C20M126",
          matiere: "Sécurité Informatique",
          credit: 3.0,
          noteCC: 9.0,
          noteTP: 8.5,
          noteE: 8.0,
          noteRattrapage: 11.5,
        },
        {
          code: "C20M127",
          matiere: "Intelligence Artificielle",
          credit: 4.0,
          noteCC: 13.5,
          noteTP: 14.0,
          noteE: 12.5,
          noteRattrapage: null,
        },
      ],
    },
  ]);

  // Fonction pour calculer la moyenne d'une matière
  const calculateSubjectAverage = (subject) => {
    // Si il y a une note de rattrapage, elle remplace la note d'examen
    const noteExamen =
      subject.noteRattrapage !== null ? subject.noteRattrapage : subject.noteE;
    const notes = [subject.noteCC, subject.noteTP, noteExamen].filter(
      (note) => note !== null
    );
    if (notes.length === 0) return 0;
    return notes.reduce((sum, note) => sum + note, 0) / notes.length;
  };

  // Fonction pour déterminer la décision
  const getDecision = (average) => {
    if (average >= 10) return "V";
    if (average >= 8) return "R";
    return "NV";
  };

  // Fonction pour calculer la moyenne d'un module
  const calculateModuleAverage = (subjects) => {
    const totalCredits = subjects.reduce(
      (sum, subject) => sum + subject.credit,
      0
    );
    const weightedSum = subjects.reduce((sum, subject) => {
      const avg = calculateSubjectAverage(subject);
      return sum + avg * subject.credit;
    }, 0);
    return totalCredits > 0 ? weightedSum / totalCredits : 0;
  };

  // Fonction pour calculer la moyenne générale du semestre
  const calculateSemesterAverage = () => {
    let totalCredits = 0;
    let weightedSum = 0;

    resultsData.forEach((module) => {
      module.subjects.forEach((subject) => {
        const avg = calculateSubjectAverage(subject);
        totalCredits += subject.credit;
        weightedSum += avg * subject.credit;
      });
    });

    return totalCredits > 0 ? weightedSum / totalCredits : 0;
  };

  // Fonction pour calculer le total des crédits validés
  const calculateValidatedCredits = () => {
    let validatedCredits = 0;
    let totalCredits = 0;

    resultsData.forEach((module) => {
      module.subjects.forEach((subject) => {
        const avg = calculateSubjectAverage(subject);
        totalCredits += subject.credit;
        if (avg >= 10) {
          validatedCredits += subject.credit;
        }
      });
    });

    return { validatedCredits, totalCredits };
  };

  const semesterAverage = calculateSemesterAverage();
  const { validatedCredits, totalCredits } = calculateValidatedCredits();
  const juryDecision = getDecision(semesterAverage);

  const handleDownload = () => {
    window.print();
  };

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
              <span className="text-gray-700">Filter par semestre</span>
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
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  >
                    {semester}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            # Résultats de l'étudiant
          </h1>

          {/* Student Information Table */}
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
                <span className="font-semibold text-gray-700 w-20">Profil</span>
                <span className="text-gray-800 flex-1">
                  {studentInfo.profil}
                </span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-20">
                  Semestre
                </span>
                <span className="text-gray-800">{selectedSemester}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="p-6">
          {resultsData.map((module, moduleIndex) => (
            <div key={moduleIndex} className="mb-8">
              {/* Subjects Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                        Matière
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-center font-semibold">
                        Credit
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-center font-semibold">
                        Note CC
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-center font-semibold">
                        Note TP
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-center font-semibold">
                        Note E
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-center font-semibold">
                        Note Rattrapage
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-center font-semibold">
                        M
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-center font-semibold">
                        D
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {module.subjects.map((subject, subjectIndex) => {
                      const average = calculateSubjectAverage(subject);
                      const decision = getDecision(average);

                      return (
                        <tr key={subjectIndex} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">
                            <div className="font-mono text-xs text-gray-600">
                              {subject.code}
                            </div>
                            <div className="font-medium">{subject.matiere}</div>
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            {subject.credit.toFixed(1)}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            {subject.noteCC ? subject.noteCC.toFixed(2) : "-"}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            {subject.noteTP ? subject.noteTP.toFixed(2) : "-"}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            {subject.noteE ? subject.noteE.toFixed(2) : "-"}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            {subject.noteRattrapage ? (
                              <span className="text-orange-600 font-semibold">
                                {subject.noteRattrapage.toFixed(2)}
                              </span>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-semibold">
                            {average.toFixed(2)}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span
                              className={`font-semibold ${
                                decision === "V"
                                  ? "text-green-600"
                                  : decision === "R"
                                  ? "text-orange-600"
                                  : "text-red-600"
                              }`}
                            >
                              {decision}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Module Average */}
              <div className="mt-4 bg-gray-50 p-3 rounded">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">
                    Moyenne Module
                  </span>
                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-lg">
                      {calculateModuleAverage(module.subjects).toFixed(2)}
                    </span>
                    <span
                      className={`font-semibold ${
                        getDecision(calculateModuleAverage(module.subjects)) ===
                        "V"
                          ? "text-green-600"
                          : getDecision(
                              calculateModuleAverage(module.subjects)
                            ) === "R"
                          ? "text-orange-600"
                          : "text-red-600"
                      }`}
                    >
                      {getDecision(calculateModuleAverage(module.subjects))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Summary Section */}
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
                  {validatedCredits}/{totalCredits}
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">
                  Décision du Jury
                </div>
                <div
                  className={`text-2xl font-bold ${
                    juryDecision === "V"
                      ? "text-green-600"
                      : juryDecision === "R"
                      ? "text-orange-600"
                      : "text-red-600"
                  }`}
                >
                  {juryDecision}
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Légende :</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
              <div>
                <span className="font-semibold text-green-600">V :</span> Validé
              </div>
              <div>
                <span className="font-semibold text-red-600">NV :</span> Non
                Validé
              </div>
              <div>
                <span className="font-semibold text-orange-600">R :</span>{" "}
                Rattrapage
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="mt-6 text-center text-sm text-gray-600 italic">
            <p>NB : Ce relevé ne fait pas objet d'un document officiel</p>
          </div>
        </div>

        {/* Download Button */}
        <div className="p-6 text-center border-t border-gray-200 print:hidden">
          <button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Télécharger
          </button>
        </div>
      </div>
    </div>
  );
}
