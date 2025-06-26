const NotesModules = require("../../models/notesModules.model");
const ResultatsSemestres = require("../../models/resultatsSemestres.model");
const ResultatsAnneeUniversitaire = require("../../models/resultatsAnneeUniversitaire.model");
const Matiere = require("../../models/matiere.model");

const updateAllAverages = require("./updateAllAverages");
const getDecision = require("./decision/getDecision");
const updateModuleDecision = require("./decision/updateModuleDecision");
const updateSemestreDecision = require("./decision/updateSemestreDecision");
const updateAnneeDecision = require("./decision/updateAnneeDecision");
const calculMoyMatiere = require("./calcule_moyennes/calculMoyMatiere");
const calculMoyModule = require("./calcule_moyennes/calculMoyModule");
const calculMoySemestre = require("./calcule_moyennes/calculMoySemestre");
const calculMoyAnn = require("./calcule_moyennes/calculMoyAnn");

async function handleNotesMatieresUpdate(updatedDoc, req) {
  try {
    // 1. Appliquer immédiatement la note de rattrapage si présente
    if (req.body.ratt) {
      console.log("I'm in rattrapage");
      // updatedDoc.ecrit = req.body.ratt;  // Remplacer la note d'écrit par ratt
      updatedDoc.hasRatt = true;
      updatedDoc.ratt = req.body.ratt;
    }

    // 2. Récupération initiale des documents liés
    let notesModules = await NotesModules.findOne({ notesMatieres: updatedDoc._id });
    if (!notesModules) throw new Error("Module de notes non trouvé");

    let resultatsSemestre = await ResultatsSemestres.findOne({ notesModules: notesModules._id });
    if (!resultatsSemestre) throw new Error("Résultats semestre non trouvé");

    let resultatsAnnee = await ResultatsAnneeUniversitaire.findOne({ resultatsSemestres: resultatsSemestre._id });
    if (!resultatsAnnee) throw new Error("Résultats année universitaire non trouvé");

    const matiere = await Matiere.findById(updatedDoc.matiere);
    if (!matiere) throw new Error("Matière non trouvée");

    let etudiant = await Etudiant.findById(newDoc.etudiant);
    if (!etudiant) throw new Error("Etudiant non trouvée");

    // 3. Mise à jour de la moyenne après éventuel ratt
    const moyMat = calculMoyMatiere(
      matiere.hasTp,
      updatedDoc.tp,
      updatedDoc.cc,
      updatedDoc.ratt // ici ecrit = ratt si envoyé
    );
    updatedDoc.moyenne = moyMat;
    await updatedDoc.save();

    // 4. Mise à jour des moyennes globales
    const moyMod = await calculMoyModule(updatedDoc._id);
    notesModules.moyenne = moyMod;
    await notesModules.save();

    const moySem = await calculMoySemestre(notesModules._id);
    resultatsSemestre.moyenne = moySem;
    await resultatsSemestre.save();

    const moyAnn = await calculMoyAnn(resultatsSemestre._id);
    resultatsAnnee.moyenne = moyAnn;
    await resultatsAnnee.save();
    etudiant.moyAnnuelle = moyAnn;
    await etudiant.save();
    // 5. Mise à jour correcte de la décision après recalculs
    let dec = await getDecision(
      updatedDoc.moyenne,
      moyMod,
      updatedDoc.decision,
      updatedDoc.etudiant,
      updatedDoc.matiere
    );
    updatedDoc.decision = dec;
    await updatedDoc.save();

    // 6. Mise à jour des décisions module/semestre/année
    const decMod = await updateModuleDecision(notesModules);
    const decSem = await updateSemestreDecision(resultatsSemestre);
    const decAnn = await updateAnneeDecision(resultatsAnnee);

    // 7. Retourner toutes les informations
    return {
      updatedDoc,
      notesModules,
      resultatsSemestre,
      resultatsAnnee,
      moyMat,
      moyMod,
      moySem,
      moyAnn,
      dec,
      decMod,
      decSem,
      decAnn,
    };
  } catch (error) {
    console.error("Erreur dans handleNotesMatieresUpdate:", error);
    throw error;
  }
}

module.exports = handleNotesMatieresUpdate;
