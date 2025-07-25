const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const bcrypt = require("bcryptjs");

const factory = require("./handlersFactory");
const ApiError = require("../utils/ApiErrors.utils");
const {
  uploadSingleImage,
} = require("../my_middlewares/uploadImageMiddleware");
const createToken = require("../utils/createToken");
const Etudiant = require("../models/etudiant.model");
const NotesModules = require("../models/notesModules.model");
const contratPedagogiqueModel = require("../models/contratPedagogique.model");
const ContratPedagogique = require("../models/contratPedagogique.model");
const Module = require("../models/module.model");
const Matiere = require("../models/matiere.model");

// Upload single image
exports.uploadEnseignantImage = uploadSingleImage("profileImg");

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
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
      role: "etudiant",
    },
    { new: true }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }

  // 3. Vérifier si la spécialité a été modifiée
  if (
    req.body.specialite &&
    oldEtudiant.specialite.toString() !== req.body.specialite
  ) {
    // 4. Trouver le contrat pédagogique existant
    const contrat = await ContratPedagogique.findOne({
      etudiant: req.params.id,
    });

    if (contrat) {
      // 5. Récupérer les nouveaux modules et matières pour la nouvelle spécialité
      const modules = await Module.find({ specialite: req.body.specialite });
      const modulesIds = modules.map((module) => module._id);

      let matieresIds = [];
      for (const moduleId of modulesIds) {
        const matieres = await Matiere.find({ module: moduleId });
        matieresIds.push(...matieres.map((matiere) => matiere._id));
      }

      // 6. Mettre à jour le contrat pédagogique
      contrat.specialite = req.body.specialite;
      contrat.matieresAValides = matieresIds;
      await contrat.save();

      console.log("Contrat pédagogique mis à jour avec les nouvelles matières");
    } else {
      // 7. Si aucun contrat existant, en créer un nouveau (comme dans createOne)
      const modules = await Module.find({ specialite: req.body.specialite });
      const modulesIds = modules.map((module) => module._id);

      let matieresIds = [];
      for (const moduleId of modulesIds) {
        const matieres = await Matiere.find({ module: moduleId });
        matieresIds.push(...matieres.map((matiere) => matiere._id));
      }

      await ContratPedagogique.create({
        specialite: req.body.specialite,
        etudiant: req.params.id,
        matieresAValides: matieresIds,
      });

      console.log("Nouveau contrat pédagogique créé");
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

exports.getUserStudentsByMatiere = async (req, res) => {
  try {
    //
  } catch (error) {
    console.log(error);
  }
};

exports.getEtudiantsByMatiereId = async (req, res) => {
  try {
    const { matiereId } = req.params;

    const contrats = await contratPedagogiqueModel
      .find({
        matieresAValides: matiereId,
      })
      .populate({
        path: "etudiant",
        select: "nom prenom matricule specialite",
        populate: {
          path: "specialite",
          select: "nom",
        },
      });

    const etudiants = contrats.map((c) => c.etudiant);

    res.status(200).json({
      status: "success",
      results: etudiants.length,
      data: etudiants,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des étudiants :", error);
    res.status(500).json({ status: "error", message: "Erreur serveur" });
  }
};

exports.getStudentResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { semestre: semestreFiltre } = req.query; // Récupérer le semestre depuis l'URL

    // 1. Récupération de l'étudiant et de sa spécialité
    const etudiant = await Etudiant.findById(id).populate({
      path: "specialite",
      populate: {
        path: "modules",
      },
    });

    if (!etudiant) {
      return res.status(404).json({ message: "Étudiant non trouvé" });
    }

    // 2. Récupération des notes modules
    const notesModules = await NotesModules.find({ etudiant: id })
      .populate({
        path: "notesMatieres",
        populate: {
          path: "matiere",
          select: "nom code credit",
        },
      })
      .populate({
        path: "module",
        select: "nom slug semestre",
      });

    const resultats = {};

    // 3. Regrouper les résultats par semestre
    notesModules.forEach((noteModule) => {
      const module = noteModule.module;
      const semestre = module?.semestre || "Semestre inconnu";

      if (!resultats[semestre]) {
        resultats[semestre] = {
          moyenneSemestre: 0,
          decision: "",
          modules: [],
          _total: 0,
          _count: 0,
        };
      }

      const moduleObj = {
        nom: module.nom,
        code: module.slug || "",
        moyenne: noteModule.moyenne,
        decision: noteModule.decision,
        matieres: [],
      };

      noteModule.notesMatieres.forEach((noteMatiere) => {
        const matiere = noteMatiere.matiere;
        moduleObj.matieres.push({
          nom: matiere?.nom,
          code: matiere?.code,
          credit: matiere?.credit,
          cc: noteMatiere.cc,
          tp: noteMatiere.tp,
          ecrit: noteMatiere.ecrit,
          ratt: noteMatiere.ratt,
          moyenne: noteMatiere.moyenne,
          decision: noteMatiere.decision,
        });
      });

      resultats[semestre].modules.push(moduleObj);

      if (typeof noteModule.moyenne === "number") {
        resultats[semestre]._total += noteModule.moyenne;
        resultats[semestre]._count += 1;
      }
    });

    // 4. Calculer moyenne par semestre + décision
    for (const semestre in resultats) {
      const data = resultats[semestre];
      data.moyenneSemestre =
        data._count > 0 ? Number((data._total / data._count).toFixed(2)) : null;
      delete data._total;
      delete data._count;

      data.decision = data.moyenneSemestre >= 10 ? "Validé" : "Ajourné";
    }

    console.log("semestreFiltre :", semestreFiltre);
    console.log("Clés dans resultats :", Object.keys(resultats));

    // 5. Si filtre demandé et trouvé, ne retourner que ce semestre
    if (semestreFiltre) {
      if (resultats[semestreFiltre]) {
        return res.status(200).json({
          etudiant,
          resultats: { [semestreFiltre]: resultats[semestreFiltre] },
        });
      } else {
        // Bonnes pratiques : le semestre n'existe pas => retour vide
        return res.status(200).json({
          etudiant,
          resultats: {},
          message: `Aucun résultat trouvé pour le semestre ${semestreFiltre}`,
        });
      }
    }

    // 6. Sinon retourner tous les résultats
    return res.status(200).json({ etudiant, resultats });
  } catch (error) {
    console.error("Erreur lors de la récupération des résultats:", error);
    return res.status(500).json({
      message: "Erreur lors de la récupération des résultats",
      error,
    });
  }
};