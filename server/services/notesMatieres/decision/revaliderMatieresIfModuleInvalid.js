const Matiere = require("../../../models/matiere.model");
const ContratPedagogique = require("../../../models/contratPedagogique.model");
const NotesMatieres = require("../../../models/notesMatieres.model");
const NotesModules = require("../../../models/notesModules.model");

const revaliderMatieresIfModuleInvalid = async (idEtud, idMat, etudiant, contratPedagogique) => {
  const notesMatiere = await NotesMatieres.findOne({ etudiant: idEtud, matiere: idMat });
  const notesModule = await NotesModules.findOne({ notesMatieres: notesMatiere });

  if (!notesModule) return;

  for (let notesMatiereId of notesModule.notesMatieres) {
    const nm = await NotesMatieres.findById(notesMatiereId);
    if (!nm) continue;

    console.log(nm);
    console.log('Decision actuelle de la matière :', nm.decision);

    if (nm.moyenne < 10 && nm.decision === 'V') {
      if(nm.decision === 'R') {
        nm.decision = 'NV';
      }else {
        nm.decision = 'R';
        nm.hasRatt = true;
      }
      await nm.save();

      const m = await Matiere.findById(nm.matiere);
      if (!m) continue;

      etudiant.creditAccumulee = (etudiant.creditAccumulee || 0) - m.credit;
      await etudiant.save();

      await ContratPedagogique.updateOne(
        { _id: contratPedagogique._id },
        { $addToSet: { matieresAValides: m._id } }
      );
    }
  }
};

module.exports = revaliderMatieresIfModuleInvalid;
