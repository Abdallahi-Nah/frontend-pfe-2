// "use client";

// import React, { useContext, useEffect } from "react";
// import { useState } from "react";
// import { AppContext } from "../../context/AppContext";

// import axios from "axios";

// export default function AddResult() {
//   const [formData, setFormData] = useState({
//     specialite: "",
//     module: "",
//     matiere: "",
//     matricule: "",
//     type: "",
//     note: 0,
//   });
//   const [specialiteOptions, setSpecialiteOptions] = useState([]);
//   const {backendUrl} = useContext(AppContext);

//   console.log("form data result : ", formData);

//   const fetchSpecialites = async () => {
//     try {
//       const response = await axios.get(`${backendUrl}/specialite/get`);
//       const specialitesData = response.data.data || response.data;

//       const formattedOptions = specialitesData.map((sp) => ({
//         value: sp._id,
//         label: sp.nom,
//       }));

//       setSpecialiteOptions(formattedOptions);
//     } catch (error) {
//       console.error("Erreur lors de la récupération des spécialités:", error);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//   };

//   const handleSelectChange = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   const handleInputChange = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   useEffect(() => {
//     fetchSpecialites();
//   }, []);

//   const FormField = ({ children, label }) => (
//     <div className="relative">
//       <label className="block text-sm text-gray-600 mb-2 font-medium">
//         {label}
//       </label>
//       <div className="relative">{children}</div>
//     </div>
//   );

//   const CustomSelect = ({ value, onChange, placeholder, options }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     return (
//       <div className="relative">
//         <button
//           type="button"
//           onClick={() => setIsOpen(!isOpen)}
//           className="w-full h-12 px-3 py-2 bg-white border border-gray-300 rounded-md text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
//         >
//           <span className={value ? "text-gray-900" : "text-gray-500"}>
//             {value
//               ? options.find((opt) => opt.value === value)?.label
//               : placeholder}
//           </span>
//           <svg
//             className={`w-4 h-4 transition-transform ${
//               isOpen ? "rotate-180" : ""
//             }`}
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M19 9l-7 7-7-7"
//             />
//           </svg>
//         </button>

//         {isOpen && (
//           <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
//             {options.map((option) => (
//               <button
//                 key={option.value}
//                 type="button"
//                 onClick={() => {
//                   onChange(option.value);
//                   setIsOpen(false);
//                 }}
//                 className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
//               >
//                 {option.label}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const moduleOptions = [
//     { value: "module1", label: "Module 1" },
//     { value: "module2", label: "Module 2" },
//     { value: "module3", label: "Module 3" },
//     { value: "module4", label: "Module 4" },
//   ];

//   const typeOptions = [
//     { value: "examen", label: "Examen" },
//     { value: "controle", label: "Contrôle" },
//     { value: "tp", label: "Travaux Pratiques" },
//     { value: "projet", label: "Projet" },
//   ];

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Grid Layout */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Row 1 */}
//           <FormField label="spécialité">
//             <CustomSelect
//               value={formData.specialite}
//               onChange={(value) => handleSelectChange("specialite", value)}
//               placeholder="Sélectionner une spécialité"
//               options={specialiteOptions}
//             />
//           </FormField>

//           <FormField label="module">
//             <CustomSelect
//               value={formData.module}
//               onChange={(value) => handleSelectChange("module", value)}
//               placeholder="Sélectionner un module"
//               options={moduleOptions}
//             />
//           </FormField>

//           {/* Row 2 */}
//           <FormField label="matière">
//             <input
//               type="text"
//               value={formData.matiere}
//               onChange={(e) => handleInputChange("matiere", e.target.value)}
//               placeholder="Entrer la matière"
//               className="w-full h-12 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </FormField>

//           <FormField label="matricule">
//             <input
//               type="text"
//               value={formData.matricule}
//               onChange={(e) => handleInputChange("matricule", e.target.value)}
//               placeholder="Entrer le matricule"
//               className="w-full h-12 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </FormField>

//           {/* Row 3 */}
//           <FormField label="type">
//             <CustomSelect
//               value={formData.type}
//               onChange={(value) => handleSelectChange("type", value)}
//               placeholder="Sélectionner un type"
//               options={typeOptions}
//             />
//           </FormField>

//           <FormField label="note">
//             <input
//               type="number"
//               value={formData.note}
//               onChange={(e) => handleInputChange("note", e.target.value)}
//               placeholder="Entrer une note"
//               className="w-full h-12 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               min="0"
//               max="20"
//               step="0.1"
//             />
//           </FormField>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-center pt-6">
//           <button
//             type="submit"
//             className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium min-w-[200px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
//           >
//             Enregistrer
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


// Déclaration du composant FormField
const FormField = ({ children, label }) => (
  <div className="mb-4">
    <label className="block text-sm text-gray-600 mb-1 font-medium">
      {label}
    </label>
    <div>{children}</div>
  </div>
);

// Déclaration du composant CustomSelect
const CustomSelect = ({ value, onChange, placeholder, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded text-left flex items-center justify-between"
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>
          {selectedLabel || placeholder}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M19 9l-7 7-7-7"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute w-full z-10 bg-white shadow border mt-1 max-h-60 overflow-auto">
          {options.map((opt) => (
            <button
              key={opt.value}
              className="w-full text-left px-3 py-2 hover:bg-gray-100"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const AddResult = () => {
  const [specialites, setSpecialites] = useState([]);
  const [modules, setModules] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [etudiants, setEtudiants] = useState([]);
  const [formData, setFormData] = useState({
    specialite: "",
    module: "",
    matiere: "",
    etudiant: "",
    type: "",
    note: 0,
  });

  console.log("Form data submitted:", formData);

  const typeOptions = [
    { label: "TP", value: "tp" },
    { label: "Contrôle Continu", value: "cc" },
    { label: "Examen", value: "ecrit" },
    { label: "Rattrapage", value: "ratt" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:4000/specialite/get")
      .then((res) => setSpecialites(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (formData.specialite) {
      axios
        .get(
          `http://localhost:4000/specialite/${formData.specialite}/module/get`
        )
        .then((res) => setModules(res.data.data))
        .catch((err) => console.error(err));
    }
  }, [formData.specialite]);

  useEffect(() => {
    if (formData.module) {
      axios
        .get(`http://localhost:4000/module/${formData.module}/matiere/get`)
        .then((res) => setMatieres(res.data.data))
        .catch((err) => console.error(err));
    }
  }, [formData.module]);

  useEffect(() => {
    if (formData.matiere) {
      axios
        .get(
          `http://localhost:4000/etudiant/get-students-by-matiere/${formData.matiere}`
        )
        .then((res) => setEtudiants(res.data.data))
        .catch((err) => console.error(err));
    }
  }, [formData.matiere]);

  useEffect(() => {
    const { specialite, module, matiere, etudiant, type } = formData;

    if (specialite && module && matiere && etudiant && type) {
      axios
        .get(
          `http://localhost:4000/note/${specialite}/${module}/${matiere}/${etudiant}/${type}`
        )
        .then((res) => {
          const noteValue = res.data.note ?? 0; // si undefined/null → 0
          setFormData((prev) => ({ ...prev, note: noteValue }));
        })
        .catch((err) => {
          console.warn("Note introuvable, on met 0 par défaut");
          setFormData((prev) => ({ ...prev, note: 0 }));
        });
    }
  }, [
    formData.specialite,
    formData.module,
    formData.matiere,
    formData.etudiant,
    formData.type,
  ]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form data submitted:", formData);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { specialite, module, matiere, etudiant, type, note } = formData;

    if (!specialite || !module || !matiere || !etudiant || !type) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const payload = {
        specialite,
        module,
        matiere,
        etudiant,
        [type]: parseFloat(note), // clé dynamique (tp, cc, ecrit, ratt)
      };

      const response = await axios.post(
        "http://localhost:4000/notes-matieres/create",
        payload
      );

      console.log("Note enregistrée :", response.data);
      toast.success("✅ Note enregistrée avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      toast.error("❌ Échec de l'enregistrement !");
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Spécialité">
            <CustomSelect
              value={formData.specialite}
              onChange={(value) => handleChange("specialite", value)}
              placeholder="Choisir une spécialité"
              options={specialites.map((s) => ({ label: s.nom, value: s._id }))}
            />
          </FormField>

          <FormField label="Module">
            <CustomSelect
              value={formData.module}
              onChange={(value) => handleChange("module", value)}
              placeholder="Choisir un module"
              options={modules.map((m) => ({ label: m.nom, value: m._id }))}
            />
          </FormField>

          <FormField label="Matière">
            <CustomSelect
              value={formData.matiere}
              onChange={(value) => handleChange("matiere", value)}
              placeholder="Choisir une matière"
              options={matieres.map((m) => ({ label: m.nom, value: m._id }))}
            />
          </FormField>

          <FormField label="Étudiant">
            <CustomSelect
              value={formData.etudiant}
              onChange={(value) => handleChange("etudiant", value)}
              placeholder="Choisir un étudiant"
              options={etudiants.map((e) => ({
                label: `${e.matricule}`,
                value: e._id,
              }))}
            />
          </FormField>

          <FormField label="Type">
            <CustomSelect
              value={formData.type}
              onChange={(value) => handleChange("type", value)}
              placeholder="Choisir un type"
              options={typeOptions}
            />
          </FormField>

          <FormField label="Note">
            <input
              type="number"
              min="0"
              max="20"
              step="0.01"
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded"
              value={formData.note}
              onChange={(e) => handleChange("note", e.target.value)}
            />
          </FormField>
        </div>

        <div className="flex justify-center pt-6">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium min-w-[200px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddResult;
