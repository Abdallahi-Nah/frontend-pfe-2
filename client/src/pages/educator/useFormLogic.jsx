// hooks/useFormLogic.js
import { useState, useEffect } from "react";
import {
  fetchSpecialites,
  fetchModulesBySpecialite,
  fetchMatieresByModule,
  fetchEtudiantsByMatiere,
} from "./api.js";

export default function useFormLogic(backendUrl) {
  const [formData, setFormData] = useState({
    specialite: "",
    module: "",
    matiere: "",
    etudiant: "",
    note: 0,
  });

  const [specialiteOptions, setSpecialiteOptions] = useState([]);
  const [moduleOptions, setModuleOptions] = useState([]);
  const [matiereOptions, setMatiereOptions] = useState([]);
  const [etudiantOptions, setEtudiantOptions] = useState([]);

  useEffect(() => {
    const loadSpecialites = async () => {
      const res = await fetchSpecialites(backendUrl);
      setSpecialiteOptions(
        res.data.data.map((s) => ({ value: s._id, label: s.nom }))
      );
    };
    loadSpecialites();
  }, []);

  const handleSelectChange = async (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "specialite") {
      const res = await fetchModulesBySpecialite(backendUrl, value);
      setModuleOptions(
        res.data.data.map((m) => ({ value: m._id, label: m.nom }))
      );
      setFormData((prev) => ({
        ...prev,
        module: "",
        matiere: "",
        etudiant: "",
      }));
      setMatiereOptions([]);
      setEtudiantOptions([]);
    }

    if (field === "module") {
      const res = await fetchMatieresByModule(backendUrl, value);
      setMatiereOptions(
        res.data.data.map((m) => ({ value: m._id, label: m.nom }))
      );
      setFormData((prev) => ({ ...prev, matiere: "", etudiant: "" }));
      setEtudiantOptions([]);
    }

    if (field === "matiere") {
      const [etudiantsRes] = await Promise.all([
        fetchEtudiantsByMatiere(backendUrl, value),
      ]);

      setEtudiantOptions(
        etudiantsRes.data.data.map((e) => ({
          value: e._id,
          label: `${e.nom} ${e.prenom}`,
        }))
      );
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    specialiteOptions,
    moduleOptions,
    matiereOptions,
    etudiantOptions,
    handleSelectChange,
    handleInputChange,
    setFormData,
  };
}
