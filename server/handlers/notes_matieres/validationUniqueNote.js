const ApiErrors = require("../../utils/ApiErrors.utils");

const validateUniqueNote = async (Model, req, next) => {
  const existingNote = await Model.findOne({
    specialite: req.body.specialite,
    module: req.body.module,
    etudiant: req.body.etudiant,
    matiere: req.body.matiere,
    _id: { $ne: req.params.id }
  });

  if (existingNote) {
    return next(new ApiErrors(`Une note existe déjà pour cette matière et cet étudiant.`, 400));
  }
};

module.exports = validateUniqueNote;
