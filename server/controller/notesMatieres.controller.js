const factory = require('./handlersFactory');
const asyncHandler = require("express-async-handler");
const NotesMatieres = require("../models/notesMatieres.model");
const ApiErrors = require("../utils/ApiErrors.utils");

exports.createNotesMatiere = factory.createOne(NotesMatieres, "NotesMatieres");

exports.updateNotesMatiere = factory.updateOne(NotesMatieres, "NotesMatieres");

exports.getOneNotesMatiere = factory.getOne(NotesMatieres);

exports.getAllNotesMatieres = factory.getAll(NotesMatieres);

exports.deleteNotesMatieres = factory.deleteOne(NotesMatieres);

exports.getNotesMatieresByEtudiant = factory.getNotesMatieresByEtudiant(NotesMatieres);