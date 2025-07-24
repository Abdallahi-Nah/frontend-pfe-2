// services/api.js
import axios from "axios";

export const fetchSpecialites = (backendUrl) =>
  axios.get(`${backendUrl}/specialite/get`);

export const fetchModulesBySpecialite = (backendUrl, id) =>
  axios.get(`${backendUrl}/specialite/${id}/module/get`);

export const fetchMatieresByModule = (backendUrl, id) =>
  axios.get(`${backendUrl}/module/${id}/matiere/get`);

export const fetchEtudiantsByMatiere = (backendUrl, id) =>
  axios.get(`${backendUrl}/etudiant/get-students-by-matiere/${id}`);

// export const fetchTypesByMatiere = (backendUrl, id) =>
//   axios.get(`${backendUrl}/matiere/${id}/types/get`);
