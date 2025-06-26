const crypto = require("crypto");

const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiErrors.utils");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/enseignant.model");

const generateToken = require("../utils/createToken");

exports.signup = asyncHandler(async (req, res, next) => {
  // 1- create user
  const user = await User.create({
    nom: req.body.nom,
    email: req.body.email,
    motDePasse: req.body.motDePasse,
  });
  // 2- generate user token
  const token = generateToken(user._id);

  res.status(201).json({ data: user, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  // 1)- check if the 'motDePasse' and 'emailUniv' in the body (validation layer)
  // 2)- check if 'emailUniv' and 'motDePasse' for user already exist
  const user = await User.findOne({ emailUniv: req.body.emailUniv });
  console.log(user);
  console.log(await bcrypt.compare(req.body.motDePasse, user.motDePasse));
  if (!user || !(await bcrypt.compare(req.body.motDePasse, user.motDePasse))) {
    return next(new ApiError("email ou mot de passe incorrect", 401));
  }
  // 3)- generate token (jwt)
  const token = generateToken(user._id);
  // 4)- send response with status code 200 (ok)
  res.status(200).json({ data: user, token });
});

exports.protect = asyncHandler(async (req, res, next) => {
  // 1)- check if token exist, if yes get it
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ApiError("Vous n'etes pas connecté. Veuillez vous connecter, svp"), 401);
  }
  // 2)- verify token (no change happens or token expires)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // 3)- check if user exist (using id user in payload token)
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError("L'utilisateur associé à ce jeton n'existe pas.", 401)
    );
  }
  // 4)- check if user not change his password after token generated
  if (currentUser.passwordChangedAt) {
    const passwordChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    // password changed after token generated (Error)
    if (passwordChangedTimestamp > decoded.iat) {
      return next(new ApiError("Mot de passe modifié. Veuillez vous reconnecter, svp", 401));
    }
  }
  req.enseignant = currentUser;
  next();
});

// ["superAdmin", "admin", "enseignant", "etudiant"]
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    // 1)- access roles ("admin", "enseignant", "etudiant")
    // 2)- access registered user role (admin, enseignant, etudiant) using : (req.enseignant.role)
    if (!roles.includes(req.user.role) || !(req.user.active)) {
      return next(
        new ApiError("Vous n'etes pas autorisé à accéder à cette route", 403)
      );
    }
    next();
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // 1)- get user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("Utilisateur non trouvé", 404));
  }

  // 2)- if user exist => generate reset random code of 6 digits, hash and save it in database
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = await bcrypt.hash(resetCode, 10);
  // save hashed reset code into db
  user.passwordResetCode = hashedResetCode;
  // add expiration time for password reset code (10 min)
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;
  await user.save();

  // 3)- send the reset code via email
  const message = `Bonjour ${user.nom},\n, tu demande code de réinitialisation pour changer votre mot de passe. \n\n
  voici votre code de réinitialisation : ${resetCode} \n Valable jusqu'à dix minutes (10 min)`;

  await sendEmail({
    email: user.email,
    subject: "Votre code de réinitialisation de mot de passe (Valable jusqu'à 10 min)",
    message,
  });
  res
    .status(200)
    .json({ status: "Success", message: `code de réinitialisation envoyer vers ${user.email}` });
});

exports.verifyPasswordResetCode = asyncHandler(async (req, res, next) => {
  // 1)- Trouver l'utilisateur avec le code de réinitialisation (sans le comparer)
  const user = await User.findOne({
    passwordResetExpires: { $gt: Date.now() }, // Vérifier l'expiration
  });

  if (!user) {
    return next(new ApiError("Code de réinitialisation invalide ou expiré", 404));
  }

  // 2)- Vérifier si le code envoyé correspond au code hashé en base
  const isMatch = await bcrypt.compare(req.body.resetCode, user.passwordResetCode);
  if (!isMatch) {
    return next(new ApiError("Code de réinitialisation invalide ou expiré", 404));
  }

  // 3)- Marquer le code comme vérifié
  user.passwordResetVerified = true;
  await user.save();

  res.status(200).json({ status: "success" });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  // 1)- get user by email
  const user = await User.findOne({email: req.body.email});

  if(!user) {
    return next(new ApiError("Il n'existe aucun utilisateur avec cet e-mail", 404));
  }

  // 2)- check if the reset code verified
  if(!user.passwordResetVerified) {
    return next(new ApiError("code de réinitialisation non verifié", 400));
  }
  const hashedResetCode = await bcrypt.hash(req.body.newMotDePasse, 10);
  user.motDePasse = hashedResetCode;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;

  await user.save();

  // 3)- if everything is ok, generate new token for his
  const token = generateToken(user._id);
  res.status(200).json({token});
});