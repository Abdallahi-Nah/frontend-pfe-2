const ContratPedagogique = require("../../../models/contratPedagogique.model");

const validateMatiere = async (etudiant, matiere, contratPedagogique) => {
  // Ajout des crédits à l'étudiant
  etudiant.creditAccumulee = (etudiant.creditAccumulee || 0) + matiere.credit;
  await etudiant.save();

  // Suppression de la matière validée de la liste matieresAValides du contrat pédagogique
  await ContratPedagogique.updateOne(
    { _id: contratPedagogique._id },
    { $pull: { matieresAValides: matiere._id } }
  );
};

module.exports = validateMatiere;
