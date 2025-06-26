const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const bcrypt = require('bcryptjs');

const factory = require('./handlersFactory');
const ApiError = require('../utils/ApiErrors.utils');
const { uploadSingleImage } = require('../my_middlewares/uploadImageMiddleware');
const createToken = require('../utils/createToken');
const Etudiant = require('../models/etudiant.model');
const ContratPedagogique = require('../models/contratPedagogique.model');
const Module = require('../models/module.model');
const Matiere = require('../models/matiere.model');

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

exports.createEtudiant = factory.createOne(Etudiant, "Etudiant");

exports.getEtudiants = factory.getAll(Etudiant);

exports.getEtudiant = factory.getOne(Etudiant);

exports.updateEtudiant = asyncHandler(async (req, res, next) => {
  // 1. Récupérer l'étudiant avant modification pour vérifier si la spécialité change
  const oldEtudiant = await Etudiant.findById(req.params.id);
  
  // 2. Mettre à jour l'étudiant
  const document = await Etudiant.findByIdAndUpdate(
    req.params.id,
    {
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      telephone: req.body.telephone,
      adresse: req.body.adresse,
      dateNaissance: req.body.dateNaissance,
      profileImg: req.body.profileImg,
      matricule: req.body.matricule,
      specialite: req.body.specialite, // Ajout du champ specialite
      role: "etudiant"
    },
    { new: true }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }

  // 3. Vérifier si la spécialité a été modifiée
  if (req.body.specialite && oldEtudiant.specialite.toString() !== req.body.specialite) {
    // 4. Trouver le contrat pédagogique existant
    const contrat = await ContratPedagogique.findOne({ etudiant: req.params.id });
    
    if (contrat) {
      // 5. Récupérer les nouveaux modules et matières pour la nouvelle spécialité
      const modules = await Module.find({ specialite: req.body.specialite });
      const modulesIds = modules.map(module => module._id);
      
      let matieresIds = [];
      for (const moduleId of modulesIds) {
        const matieres = await Matiere.find({ module: moduleId });
        matieresIds.push(...matieres.map(matiere => matiere._id));
      }

      // 6. Mettre à jour le contrat pédagogique
      contrat.specialite = req.body.specialite;
      contrat.matieresAValides = matieresIds;
      await contrat.save();
      
      console.log('Contrat pédagogique mis à jour avec les nouvelles matières');
    } else {
      // 7. Si aucun contrat existant, en créer un nouveau (comme dans createOne)
      const modules = await Module.find({ specialite: req.body.specialite });
      const modulesIds = modules.map(module => module._id);
      
      let matieresIds = [];
      for (const moduleId of modulesIds) {
        const matieres = await Matiere.find({ module: moduleId });
        matieresIds.push(...matieres.map(matiere => matiere._id));
      }

      await ContratPedagogique.create({
        specialite: req.body.specialite,
        etudiant: req.params.id,
        matieresAValides: matieresIds
      });
      
      console.log('Nouveau contrat pédagogique créé');
    }
  }

  res.status(200).json({ data: document });
});

exports.deleteEtudiant = factory.deleteOne(Etudiant, "Etudiant");

// Students Enrolled Courses With Lecture Links
// export const userEnrolledCourses = async (req, res) => {
//   try {
//     const userId = req.auth.userId;
//     const userData = await User.findById(userId).populate("enrolledCourses");

//     if (!userData) {
//       return res.json({ success: false, message: "User Not Found" });
//     }

//     res.json({ success: true, enrolledCourses: userData.enrolledCourses });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// Update Student Course Progress
// export const updateUserCourseProgress = async (req, res) => {
//   try {
//     const userId = req.auth.userId;
//     const { courseId, lectureId } = req.body;

//     const progressData = await CourseProgress.findOne({ userId, courseId });

//     if (progressData) {
//       if (progressData.lectureCompleted.includes(lectureId)) {
//         return res.json({
//           success: true,
//           message: "Lecture already completed",
//         });
//       }

//       progressData.lectureCompleted.push(lectureId);
//       await progressData.save();
//     } else {
//       await CourseProgress.create({
//         userId,
//         courseId,
//         lectureCompleted: [lectureId],
//       });
//     }

//     res.json({ success: true, message: "Progress Updated" });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// get Student Course Progress
exports.getUserCourseProgress = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { courseId, lectureId } = req.body;
    const progressData = await CourseProgress.findOne({ userId, courseId });

    res.json({ success: true, progressData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Add student ratings to course
// export const addUserRating = async (req, res) => {
//   const userId = req.auth.userId;
//   const { courseId, rating } = req.body;

//   if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
//     return res.json({ success: false, message: "Invalid Details" });
//   }

//   try {
//     const course = await Course.findById(courseId);

//     if (!course) {
//       return res.json({ success: false, message: "Course not found" });
//     }

//     const user = await User.findById(userId);

//     if (!user || !user.enrolledCourses.includes(courseId)) {
//       return res.json({
//         success: false,
//         message: "User has not purchased this course",
//       });
//     }

//     const existingRatingIndex = course.courseRatings.findIndex(
//       (r) => r.userId === userId
//     );

//     if (existingRatingIndex > -1) {
//       course.courseRatings[existingRatingIndex].rating = rating;
//     } else {
//       course.courseRatings.push({ userId, rating });
//     }

//     await course.save();

//     return res.json({ success: true, message: "Rating Added" });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };