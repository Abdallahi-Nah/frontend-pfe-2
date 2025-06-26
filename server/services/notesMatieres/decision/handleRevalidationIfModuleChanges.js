const Etudiant = require("../../../models/etudiant.model");
const Matiere = require("../../../models/matiere.model");
const ContratPedagogique = require("../../../models/contratPedagogique.model");
const NotesMatieres = require("../../../models/notesMatieres.model");
const NotesModules = require("../../../models/notesModules.model");

const handleRevalidationIfModuleChanges = async (idEtud, idMat, moyMod) => {
  // Si la moyenne du module est toujours >= 10, rien à faire
  if (moyMod >= 10) return;

  // Récupérer la note de matière liée
  const notesMatiere = await NotesMatieres.findOne({ etudiant: idEtud, matiere: idMat });
  if (!notesMatiere) return;

  // Récupérer le module contenant cette note
  const notesModule = await NotesModules.findOne({ notesMatieres: notesMatiere._id });
  if (!notesModule) return;

  const etudiant = await Etudiant.findById(idEtud);
  const contrat = await ContratPedagogique.findOne({ etudiant: idEtud });
  if (!etudiant || !contrat) return;

  for (let nmId of notesModule.notesMatieres) {
    const nm = await NotesMatieres.findById(nmId);
    if (!nm || nm.moyenne >= 10 || nm.decision !== 'V') continue;

    // Revenir à R car module n’est plus compensable
    nm.decision = 'R';
    await nm.save();

    const m = await Matiere.findById(nm.matiere);
    if (!m) continue;

    // Retirer les crédits donnés à tort
    etudiant.creditAccumulee = (etudiant.creditAccumulee || 0) - m.credit;
    await etudiant.save();

    // Replacer la matière dans le contrat pédagogique
    await ContratPedagogique.updateOne(
      { _id: contrat._id },
      { $addToSet: { matieresAValides: m._id } }
    );
  }
};

module.exports = handleRevalidationIfModuleChanges;
