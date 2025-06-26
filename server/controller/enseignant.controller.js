const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const bcrypt = require('bcryptjs');

const factory = require('./handlersFactory');
const ApiError = require('../utils/ApiErrors.utils');
const { uploadSingleImage } = require('../my_middlewares/uploadImageMiddleware');
const createToken = require('../utils/createToken');
const Enseignant = require('../models/enseignant.model');

// Upload single image
exports.uploadEnseignantImage = uploadSingleImage('profileImg');

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/etudiants/${filename}`);

    // Save image into our db
    req.body.profileImg = filename;
  }

  next();
});

exports.getEnseignants = factory.getAll(Enseignant);

exports.getEnseignant = factory.getOne(Enseignant);

exports.createEnseignant = factory.createOne(Enseignant, "Enseignant");

exports.updateEnseignant = asyncHandler(async (req, res, next) => {
  const document = await Enseignant.findByIdAndUpdate(
    req.params.id,
    {
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      telephone: req.body.telephone,
      adresse: req.body.adresse,
      dateNaissance: req.body.dateNaissance,
      profileImg: req.body.profileImg,
      diplomes: req.body.diplomes,
      specialite: req.body.specialite,
      anneesExperience: req.body.anneesExperience,
      matieresEnseignes: req.body.matieresEnseignes,
      disponibilites: req.body.disponibilites,
      preferencesPedagogiques: req.body.preferencesPedagogiques,
      role: "enseignant"
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

exports.changeEnseignantPassword = asyncHandler(async (req, res, next) => {
  const document = await Enseignant.findByIdAndUpdate(
    req.params.id,
    {
      motDePasse: await bcrypt.hash(req.body.motDePasse, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

exports.deleteEnseignant = factory.deleteOne(Enseignant);

exports.getLoggedEnseignantData = asyncHandler(async (req, res, next) => {
  req.params.id = req.enseignant._id;
  next();
});

exports.updateLoggedEnseignantPassword = asyncHandler(async (req, res, next) => {
  // 1) Update user password based user payload (req.enseignant._id)
  const enseignant = await Enseignant.findByIdAndUpdate(
    req.enseignant._id,
    {
      motDePasse: await bcrypt.hash(req.body.motDePasse, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  // 2) Generate token
  const token = createToken(enseignant._id);

  res.status(200).json({ data: enseignant, token });
});

exports.deactivateLoggedEnseignant = asyncHandler(async (req, res, next) => {
  const enseignant = await Enseignant.findByIdAndUpdate(req.enseignant._id, {active: false}, {new: true});
  if(!enseignant) {
    return next(new ApiError("Pas d'enseignant", 404));
  }
  const token = createToken(enseignant._id);

  res.status(200).json({message: "enseignant desactivèe avec succèe", data: enseignant, token});
});

exports.activateLoggedEnseignant = asyncHandler(async (req, res, next) => {
  const enseignant = await Enseignant.findByIdAndUpdate(req.enseignant._id, {active: true}, {new: true});
  if(!enseignant) {
    return next(new ApiError("Pas d'enseignant", 404));
  }
  const token = createToken(enseignant._id);

  res.status(200).json({message: "enseignant activateè avec succèe", data: enseignant, token});
});