"use client";

import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AppContext } from "../../context/AppContext";
import Cookie from "cookie-universal";

export default function AttestationPage() {
  const { backendUrl } = useContext(AppContext);
  const cookies = Cookie();
  const idStu = cookies.get("id");
  const [attestationType, setAttestationType] = useState("inscription");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [studentInfos, setStudentInfos] = useState(null);
  const [matieres, setMatieres] = useState(null);

  console.log("matieres : ", matieres);

  const attestationTypes = [
    { value: "inscription", label: "Attestation d'inscription" },
    { value: "licence", label: "Attestation licence" },
    { value: "master", label: "Attestation master" },
  ];

  console.log("studentInfos : ", studentInfos);

  // 1. Récupérer les infos de l'étudiant
  const getStudentInfos = async () => {
    try {
      const res = await axios.get(`${backendUrl}/etudiant/get/${idStu}`);
      console.log("res : ", res.data.data);
      setStudentInfos(res.data.data || res.data.etudiant);
    } catch (err) {
      console.error("Erreur récupération infos étudiant :", err);
    }
  };

  const getMatieresAValides = async () => {
    try {
      const res = await axios.get(`${backendUrl}/contrat/get/${idStu}`);
      console.log("matieres a valides : ", res.data);
      setMatieres(res.data.data.matieresAValides);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-4);
    return `${day}-${month}-${year}`;
  };

  const formatYear = (dateString) => {
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(-4);
    return `${year - 1}-${year}`;
  };

  useEffect(() => {
    if (idStu) getStudentInfos();
  }, [idStu]);

  useEffect(() => {
    getMatieresAValides();
  }, []);

  let studentData = {};
  if (studentInfos) {
    console.log("annee univ : ", formatYear(studentInfos.updatedAt));
    studentData = {
      name: `${studentInfos.nom}`,
      surname: `${studentInfos.prenom}`,
      birthDate: formatDate(studentInfos.dateNaissance),
      birthPlace: "Nouakchott",
      studentId: studentInfos.matricule,
      program: `${studentInfos.specialite?.nouveauAcademique || ""} - ${
        studentInfos.specialite?.nom || ""
      }`,
      profileImg: studentInfos.profileImg,
      academicYear: formatYear(studentInfos.updatedAt),
    };
  }

  const courses = [
    { code: "C1SM212", element: "Sécurité des SI", coef: "3.0" },
    { code: "C1SM213", element: "ERP", coef: "2.0" },
    { code: "C1SM214", element: "Spring", coef: "4.0" },
    { code: "CAN546", element: "Angular", coef: "3.0" },
  ];

  const getAttestationTitle = () => {
    const selected = attestationTypes.find(
      (type) => type.value === attestationType
    );
    return selected ? selected.label : "Attestation d'inscription";
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100/50">
      {/* Filter Section */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="relative w-64">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-left focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between cursor-pointer"
          >
            <span className="text-gray-700">Filter par type</span>
            <svg
              className={`w-4 h-4 transition-transform ${
                isFilterOpen ? "rotate-180" : ""
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

          {isFilterOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {attestationTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => {
                    setAttestationType(type.value);
                    setIsFilterOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  {type.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Document */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
        {/* Header */}
        <div className="text-center py-6 border-b-2 border-gray-300">
          <div className="text-sm font-medium text-gray-600 mb-2">
            République Islamique de Mauritanie
          </div>
          <div className="text-sm text-gray-600 mb-1">
            Ministère de l'Enseignement Supérieur et de la Recherche
            Scientifique
          </div>
          <div className="text-lg font-bold text-gray-800 mb-2">
            UNIVERSITÉ DE NOUANCHEFT
          </div>
          <div className="text-base font-semibold text-gray-700 mb-1">
            Faculté des Sciences et Techniques
          </div>
          <div className="text-sm text-gray-600">
            Service des Affaires Existématives
          </div>
        </div>

        {/* Title */}
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-gray-800 underline decoration-2 underline-offset-4">
            {getAttestationTitle()}
          </h1>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          <div className="mb-6">
            <p className="text-sm text-gray-700 leading-relaxed">
              Le Doyen de la Faculté des Sciences et Techniques de l'Université
              de Nouancheft certifie que :
            </p>
          </div>

          {/* Student Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold text-gray-700">Nom(s) :</span>
                  <span className="ml-2 text-gray-800">{studentData.name}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Né(e) le :
                  </span>
                  <span className="ml-2 text-gray-800">
                    {studentData.birthDate}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold text-gray-700">
                    Nom de famille :
                  </span>
                  <span className="ml-2 text-gray-800">
                    {studentData.surname}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-gray-700">
                  est inscrit(e) sous le numéro :
                </span>
                <span className="ml-2 text-gray-800 font-mono">
                  {studentData.studentId}
                </span>
              </div>

              <div className="mt-4">
                <span className="font-semibold text-gray-700">En :</span>
                <div className="mt-1 text-gray-800">{studentData.program}</div>
              </div>
            </div>

            {/* Photo Placeholder */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-32 h-40 bg-gray-200 border-2 border-gray-300 overflow-hidden rounded-md">
                {studentData?.profileImg ? (
                  <img
                    src={studentData.profileImg}
                    alt="Photo de profil"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Pas de photo
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Course Table */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-4">
              aux éléments suivants :
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                      Code
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                      Élément
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                      Crédit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {matieres && matieres.map((matiere, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                        {matiere.code || ""}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {matiere.nom || ""}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {matiere.credit || ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <span className="font-semibold text-gray-700">
              Pour l'année universitaire :
            </span>
            <span className="ml-2 text-gray-800">
              {studentData.academicYear}
            </span>
          </div>

          <div className="mb-8 text-sm text-gray-700">
            <p>
              En foi de quoi, il lui est délivré la présente attestation
              d'inscription pour servir et valoir ce que de droit.
            </p>
          </div>

          <div className="mb-8">
            <span className="text-sm text-gray-700">Nouakchott, le </span>
            <span className="text-sm text-gray-800">
              {formatDate(new Date())}
            </span>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Bloc Chef de la Scolarité avec QR Code */}
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-700 mb-2">
                Le Chef service de la Scolarité
              </div>
              <div className="mt-4 flex justify-center">
                <div className="p-2 border border-gray-300 rounded-md bg-white shadow-sm">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://votre-universite.edu/verif-scolarite/${studentData._id}`}
                    alt="QR Code - Scolarité"
                    className="w-24 h-24 object-contain"
                  />
                  <div className="text-xs text-gray-500 mt-1">Vérification</div>
                </div>
              </div>
            </div>

            {/* Bloc Doyen avec QR Code */}
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-700 mb-2">
                Le Doyen
              </div>
              <div className="mt-4 flex justify-center">
                <div className="p-2 border border-gray-300 rounded-md bg-white shadow-sm">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://votre-universite.edu/verif-doyen/${studentData._id}`}
                    alt="QR Code - Doyen"
                    className="w-24 h-24 object-contain"
                  />
                  <div className="text-xs text-gray-500 mt-1">Vérification</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="max-w-4xl mx-auto mt-6 text-center print:hidden">
        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Télécharger
        </button>
      </div>
    </div>
  );
}
