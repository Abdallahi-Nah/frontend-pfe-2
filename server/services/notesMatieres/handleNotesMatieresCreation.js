const createOrUpdateNotesModule = require("./createOrUpdateNotesModule");
const createOrUpdateResultatsSemestre = require("./createOrUpdateResultatsSemestre");
const createOrUpdateResultatsAnneeUniversitaire = require("./createOrUpdateResultatsAnnee");
const fetchEvaluationData = require("./fetchEvaluationData");
const updateAllAverages = require("./updateAllAverages");
const updateDecisionWithRattrapage = require("./decision/updateDecisionWithRattrapage");
const updateModuleDecision = require("./decision/updateModuleDecision");
const updateSemestreDecision = require("./decision/updateSemestreDecision");
const updateAnneeDecision = require("./decision/updateAnneeDecision");
const Matiere = require("../../models/matiere.model");
const Etudiant = require("../../models/etudiant.model");
const handleRevalidationIfModuleChanges = require("./decision/handleRevalidationIfModuleChanges");


const handleNotesMatieresCreation = async(newDoc, req) => {
  try {
    // ******************************************************************************
    let matiere = await Matiere.findById(newDoc.matiere);
    // Gestion de NotesModules (existant ou création)
    let newMod = await createOrUpdateNotesModule(newDoc);
    
    // Gestion de ResultatsSemestres (existant ou création)
    let newSem = await createOrUpdateResultatsSemestre(newDoc, newMod);
    
    // Gestion de ResultatsAnneeUniversitaire (existant ou création)
    let newAnnee = await createOrUpdateResultatsAnneeUniversitaire(newDoc, newSem);

    let etudiant = await Etudiant.findById(newDoc.etudiant);

    // ************************************************************************
    console.log(`new mod 1: ${newMod}`);
    console.log(`new sem 1: ${newSem}`);
    console.log(`new ann 1: ${newAnnee}`);
    console.log(`matière 1: ${matiere}`);

    // ({
    //     matiere,
    //     newMod,
    //     newSem,
    //     newAnnee
    // } = await fetchEvaluationData(newDoc, newMod, newSem));

    let moyMat = 0;
    let moyMod = 0;
    let moySem = 0;
    let moyAnn = 0;
    let dec = '';
    let decMod = '';
    let decSem = '';
    let decAnn = '';

    // ******************************************************************************
    console.log(`new mod : ${newMod}`);
    console.log(`new sem : ${newSem}`);
    console.log(`new ann : ${newAnnee}`);
    console.log(`matière : ${matiere}`);
    // Mise à jour des moyennes et récupération des résultats
    ({
        moyMat,
        moyMod,
        moySem,
        moyAnn
    } = await updateAllAverages(
        newDoc,
        matiere,
        newMod,
        newSem,
        newAnnee
    ));

    // 🔥 AJOUTE CE BLOC ICI 👇
    if (newMod.moyenne < 10) {
      await handleRevalidationIfModuleChanges(newDoc.etudiant, newDoc.matiere, newMod.moyenne);
    }
    //  await newDoc.save();
    console.log(`new doc : ${newDoc}`);
    // *******************************************************************************
    ({
      moyMat,
      moyMod,
      moySem,
      moyAnn,
      dec
    } = await updateDecisionWithRattrapage({
      newDoc,
      req,
      matiere,
      newMod,
      newSem,
      newAnnee
    }));
    
    newDoc.moyenne = moyMat;
    newDoc.decision = dec;
    await newDoc.save();
    newMod.moyenne = moyMod;
    await newMod.save();
    newSem.moyenne = moySem;
    await newSem.save();
    newAnnee.moyenne = moyAnn;
    await newAnnee.save();
    etudiant.moyAnnuelle = moyAnn;
    await etudiant.save();
    // ****************************************************************
    decMod = await updateModuleDecision(newMod);

    // *******************************************************************
    decSem = await updateSemestreDecision(newSem);

    // *******************************************************************
    decAnn = await updateAnneeDecision(newAnnee);

    // Rechargement des documents depuis la base pour garantir qu'ils sont bien à jour
    // Sauvegardes finales
  await newDoc.save();
  await newMod.save();
  await newSem.save();
  await newAnnee.save();

  // 🔁 Rechargement des documents pour garantir qu'ils sont bien synchronisés avec la BDD
  newDoc = await newDoc.constructor.findById(newDoc._id);
  newMod = await newMod.constructor.findById(newMod._id);
  newSem = await newSem.constructor.findById(newSem._id);
  newAnnee = await newAnnee.constructor.findById(newAnnee._id);

  return {
    newDoc,
    newMod,
    newSem,
    newAnnee
  };


  } catch (error) {
    console.error("Erreur dans handleNotesMatieresCreation:", error);
    throw error;
  }
}

module.exports = handleNotesMatieresCreation;