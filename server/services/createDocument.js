const createNoteMatiere = require('../handlers/notes_matieres/create');
const createEtudiant = require('../handlers/etudiant/create');
const createUser = require('../handlers/enseignant_admin/create');

const createDocument = async (Model, req, modelName, next) => {
  switch (modelName) {
    case "NotesMatieres":
      return await createNoteMatiere(Model, req, next);
    case "Etudiant":
      return await createEtudiant(Model, req);
    case "Enseignant":
    case "Admin":
      return await createUser(Model, req, modelName);
    default:
      return await Model.create(req.body);
  }
};

module.exports = createDocument;