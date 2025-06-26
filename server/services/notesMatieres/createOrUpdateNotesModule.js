const NotesModules = require("../../models/notesModules.model");

/**
 * Associe une note de matière à un NotesModule.
 * Crée le NotesModule s'il n'existe pas.
 *
 * @param {Object} noteMatiere - Document NotesMatieres déjà créé
 * @returns {Object} notesModule - Le module mis à jour ou créé
 */
const createOrUpdateNotesModule = async (noteMatiere) => {
  let notesModule = await NotesModules.findOne({ module: noteMatiere.module, etudiant: noteMatiere.etudiant });

  if (!notesModule) {
    // Création du NotesModule
    notesModule = await NotesModules.create({
      module: noteMatiere.module,
      etudiant: noteMatiere.etudiant,
      notesMatieres: [noteMatiere._id]
    });
  } else {
    // Mise à jour si la note n'est pas encore liée
    if (!notesModule.notesMatieres.includes(noteMatiere._id)) {
      notesModule.notesMatieres.push(noteMatiere._id);
      await notesModule.save();
    }
  }

  return notesModule;
};

module.exports = createOrUpdateNotesModule;
