const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const bcrypt = require('bcryptjs');

const factory = require('./handlersFactory');
const ApiError = require('../utils/ApiErrors.utils');
const { uploadSingleImage } = require('../my_middlewares/uploadImageMiddleware');
const createToken = require('../utils/createToken');
const Admin = require('../models/admin.model');

// Upload single image
exports.uploadAdminImage = uploadSingleImage('profileImg');

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/admin/${filename}`);

    // Save image into our db
    req.body.profileImg = filename;
  }

  next();
});

exports.getAdmins = factory.getAll(Admin);

exports.getAdmin = factory.getOne(Admin);

exports.createAdmin = factory.createOne(Admin, "Admin");

exports.updateAdmin = asyncHandler(async (req, res, next) => {
  const document = await Admin.findByIdAndUpdate(
    req.params.id,
    {
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      telephone: req.body.telephone,
      adresse: req.body.adresse,
      dateNaissance: req.body.dateNaissance,
      profileImg: req.body.profileImg,
      dateEmbauche: req.body.dateEmbauche,
      role: "admin"
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

exports.changeAdminPassword = asyncHandler(async (req, res, next) => {
  const document = await Admin.findByIdAndUpdate(
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

exports.deleteAdmin = factory.deleteOne(Admin);

exports.getLoggedAdminData = asyncHandler(async (req, res, next) => {
  req.params.id = req.admin._id;
  next();
});

exports.updateLoggedAdminPassword = asyncHandler(async (req, res, next) => {
  // 1) Update user password based user payload (req.admin._id)
  const admin = await Admin.findByIdAndUpdate(
    req.admin._id,
    {
      motDePasse: await bcrypt.hash(req.body.motDePasse, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  // 2) Generate token
  const token = createToken(admin._id);

  res.status(200).json({ data: admin, token });
});

exports.deactivateLoggedAdmin = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findByIdAndUpdate(req.admin._id, {active: false}, {new: true});
  if(!admin) {
    return next(new ApiError("Pas d'admin", 404));
  }
  const token = createToken(admin._id);

  res.status(200).json({message: "admin desactivèe avec succèe", data: admin, token});
});

exports.activateLoggedAdmin = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findByIdAndUpdate(req.admin._id, {active: true}, {new: true});
  if(!admin) {
    return next(new ApiError("Pas d'admin", 404));
  }
  const token = createToken(admin._id);

  res.status(200).json({message: "admin activateè avec succèe", data: admin, token});
});