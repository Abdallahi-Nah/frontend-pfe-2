const ApiErrors = require("../utils/ApiErrors.utils");
const updateDocument = require("../services/updateDocument");

const createOrUpdateNotesMatiere = async (Model, req, res, next) => {
  const existingNote = await Model.findOne({
    specialite: req.body.specialite,
    module: req.body.module,
    etudiant: req.body.etudiant,
    matiere: req.body.matiere,
  });

  if (existingNote) {
    const updatedDoc = await Model.findByIdAndUpdate(existingNote._id, req.body, { new: true });

    if (!updatedDoc) {
      return next(
        new ApiErrors(`Échec de la mise à jour du document avec l'ID ${existingNote._id}`, 400)
      );
    }

    const processedResult = await updateDocument(Model, updatedDoc, req, "NotesMatieres", next);

    return res.status(200).json({
      status: "Success",
      message: `Mise à jour terminée avec succès.`,
      mode: "updated",
      data: processedResult,
    });
  }

  return null; // 🔁 Si aucune note existante → création doit être faite dans le contrôleur
};

module.exports = createOrUpdateNotesMatiere;
