const handleNotesMatieresUpdate = require("../services/notesMatieres/handleNotesMatieresUpdate");
const ApiErrors = require("../utils/ApiErrors.utils");

const updateDocument = async (Model, updatedDoc, req, modelName, next) => {
  switch (modelName) {
    case "NotesMatieres":
      return await handleNotesMatieresUpdate(updatedDoc, req);
    default:
      return updatedDoc;
  }
};

module.exports = updateDocument;
