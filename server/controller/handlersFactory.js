const asyncHandler = require("express-async-handler");
const ApiErrors = require("../utils/ApiErrors.utils");
const ApiFeatures = require("../utils/apiFeatures");
const ContratPedagogique = require("../models/contratPedagogique.model");
const NotesModules = require("../models/notesModules.model");
const ResultatsSemestre = require("../models/resultatsSemestres.model");

// ************************
const createDocument = require("../services/createDocument");
const updateDocument = require("../services/updateDocument");
const createOrUpdateNotesMatiere = require("../services/createOrUpdateNotesMatiere");

exports.deleteOne = (Model, modelName = "") =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (modelName === "Etudiant") {
      await ContratPedagogique.findOneAndDelete({ etudiant: id });
    }

    if (!document) {
      return next(new ApiErrors(`No document for this id ${id}`, 404));
    }
    res.status(204).send();
  });

exports.updateOne = (Model, modelName = "") =>
  asyncHandler(async (req, res, next) => {
    let updatedDoc;

    // Récupérer le document existant
    const existingDoc = await Model.findById(req.params.id);

    if (!existingDoc) {
      return next(
        new ApiErrors(`Aucun document trouvé avec l'ID ${req.params.id}`, 404)
      );
    }

    // Mettre à jour le document brut
    updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedDoc) {
      return next(
        new ApiErrors(
          `Échec de la mise à jour du document avec l'ID ${req.params.id}`,
          400
        )
      );
    }

    // Traitement spécifique selon le modelName
    const processedResult = await updateDocument(
      Model,
      updatedDoc,
      req,
      modelName,
      next
    );

    return res.status(200).json({
      status: "Success",
      message: `Mise à jour terminée avec succès.`,
      data: processedResult,
    });
  });

exports.createOne = (Model, modelName = "") =>
  asyncHandler(async (req, res, next) => {
    if (modelName === "NotesMatieres") {
      const result = await createOrUpdateNotesMatiere(Model, req, res, next);
      if (result) return;
    }

    // Création normale
    const newDoc = await createDocument(Model, req, modelName, next);

    return res.status(200).json({
      status: "Success",
      message: `Ajout terminé avec succès.`,
      mode: "created",
      data: newDoc,
    });
  });

exports.getOne = (Model, modelName = "") =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let document;
    if (modelName === "contrat") {
      document = await Model.findOne({ etudiant: id });
    } else {
      document = await Model.findById(id);
    }
    if (!document) {
      return next(new ApiErrors(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model) =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    // Build query
    const documentsCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(documentsCounts)
      .filter()
      .search()
      .limitFields()
      .sort();

    // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;

    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });

exports.getNotesMatieresByEtudiant = (Model) =>
  asyncHandler(async (req, res, next) => {
    const etudiantId = req.params.etudiant;
    const document = await Model.find({ etudiant: etudiantId });
    if (!document) {
      return next(new ApiErrors(`No document for this id ${etudiantId}`, 404));
    }
    res.status(200).json({ data: document });
    // next();
  });
