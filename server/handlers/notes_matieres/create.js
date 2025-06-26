const validateUniqueNote = require("./validationUniqueNote");
const handleNotesMatieresCreation = require("../../services/notesMatieres/handleNotesMatieresCreation");

const create = async (Model, req, next) => {
  try {
    await validateUniqueNote(Model, req, next);

    let newDoc = await Model.create(req.body);

    const {
      newDoc: updatedDoc,
      notesModules,
      resultatsSemestre,
      resultatsAnnee,
    } = await handleNotesMatieresCreation(newDoc, req);

    // Met à jour le document avec les nouvelles données si handleNotesMatieresCreation le modifie
    newDoc = updatedDoc;
    await newDoc.save();

    console.log("New document saved:", newDoc);
    return newDoc;
  } catch (err) {
    next(err); // gestion centralisée des erreurs
  }
};

module.exports = create;
