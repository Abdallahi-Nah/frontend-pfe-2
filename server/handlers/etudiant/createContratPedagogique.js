const Module = require("../../models/module.model");
const Matiere = require("../../models/matiere.model");
const ContratPedagogique = require("../../models/contratPedagogique.model");

const createContratPedagogique = async (etudiant) => {
  const modules = await Module.find({ specialite: etudiant.specialite });
  const moduleIds = modules.map(mod => mod._id);

  const matieres = await Matiere.find({ module: { $in: moduleIds } });
  const matieresIds = matieres.map(m => m._id);

  await ContratPedagogique.create({
    specialite: etudiant.specialite,
    etudiant: etudiant._id,
    matieresAValides: matieresIds,
  });
};

module.exports = createContratPedagogique;
