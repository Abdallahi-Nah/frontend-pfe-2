import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
    console.log("form data matiere : ", formData.matiere);
    if (formData.matiere) {
      axios
        .get(
          `http://localhost:4000/etudiant/get-students-by-matiere/${formData.matiere}`
        )
        .then((res) => {
          console.log("Étudiants récupérés :", res.data.data);
          setEtudiants(res.data.data);
        })
        .catch((err) => console.error(err));
    }
  }, [formData.matiere]);

  useEffect(() => {
    const { specialite, module, matiere, etudiant, type } = formData;

    if (specialite && module && matiere && etudiant && type) {
      console.log("hellooooo");
      const url = `http://localhost:4000/notes-matieres/note/${specialite}/${module}/${matiere}/${etudiant}/${type}`;
      console.log("url : ", url);
      axios.get(
        `http://localhost:4000/notes-matieres/note/${specialite}/${module}/${matiere}/${etudiant}/${type}`
      )
        .then((res) => {
          const noteValue = res.data.data.value ?? 0;
          console.log("response : ", res.data.data.value ?? 0);
          // const noteValue = res.data.data?.value ?? 0;
          setFormData((prev) => ({ ...prev, note: noteValue }));
          console.log("FormData sent to GET:", formData);
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

          {/* <FormField label="Étudiant">
            <CustomSelect
              value={formData.etudiant}
              onChange={(value) => handleChange("etudiant", value)}
              placeholder="Choisir un étudiant"
              options={etudiants.map((e) => ({
                label: `${e.matricule}`,
                value: e._id,
              }))}
            />
          </FormField> */}

          <FormField label="Étudiant">
            <CustomSelect
              value={formData.etudiant}
              onChange={(value) => handleChange("etudiant", value)}
              placeholder="Choisir un étudiant"
              options={etudiants
                .filter((e) => e && e.matricule && e._id) 
                .map((e) => ({
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
