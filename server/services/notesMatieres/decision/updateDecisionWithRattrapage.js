const { calculMoyMatiere, calculMoyModule, calculMoySemestre, calculMoyAnn }
 = require("../calcule_moyennes/allMoy");
const getDecision = require("./getDecision");
const updateAllAverages = require("../updateAllAverages");
const handleRevalidationIfModuleChanges = require("./handleRevalidationIfModuleChanges");

/**
 * Gère la mise à jour de la décision de la note de matière,
 * avec recalcul des moyennes en cas de rattrapage.
 *
 * @param {Object} params
 * @param {Object} params.newDoc - Document NotesMatieres
 * @param {Object} params.req - Objet de requête HTTP
 * @param {Object} params.matiere - Document Matiere
 * @param {Object} params.notesModules - Document NotesModules
 * @param {Object} params.resultatsSemestre - Document ResultatsSemestres
 * @param {Object} params.resultatsAnnee - Document ResultatsAnneeUniversitaire
 * @param {Object} params.newMod - NotesModules parent
 * @param {Object} params.newSem - ResultatsSemestres parent
 * @returns {Object} - Moyennes et décision mises à jour
 */
const updateDecisionWithRattrapage = async ({
  newDoc,
  req,
  matiere,
  newMod,
  newSem,
  newAnnee
}) => {
  let moyMat, moyMod, moySem, moyAnn, dec;

  // Première décision
  dec = await getDecision(newDoc.moyenne, newMod.moyenne, newDoc.decision, newDoc.etudiant, newDoc.matiere);
  newDoc.decision = dec;
  await newDoc.save();

  // Si rattrapage présent
  if (dec === 'R' && req.body.ratt) {
    moyMat = calculMoyMatiere(matiere.hasTp, newDoc.tp, newDoc.cc, newDoc.ratt);
    newDoc.moyenne = moyMat;
    await newDoc.save();

    moyMod = await calculMoyModule(newDoc._id);
    newMod.moyenne = moyMod;
    await newMod.save();

    moySem = await calculMoySemestre(newMod._id);
    newSem.moyenne = moySem;
    await newSem.save();

    moyAnn = await calculMoyAnn(newSem._id);
    newAnnee.moyenne = moyAnn;
    await newAnnee.save();

    dec = await getDecision(newDoc.moyenne, newMod.moyenne, newDoc.decision, newDoc.etudiant, newDoc.matiere);
    newDoc.decision = dec;
    await newDoc.save();

    // 🔥 AJOUTE CE BLOC ICI 👇
    if (newMod.moyenne < 10) {
      await handleRevalidationIfModuleChanges(newDoc.etudiant, newDoc.matiere, newMod.moyenne);
    }
  }else {
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
  }

  // Dernière mise à jour des champs
  newDoc.moyenne = moyMat;
  newDoc.decision = dec;
  await newDoc.save();
  newMod.moyenne = moyMod;
  await newMod.save();
  newSem.moyenne = moySem;
  await newSem.save();
  newAnnee.moyenne = moyAnn;
  await newAnnee.save();

  return { moyMat, moyMod, moySem, moyAnn, dec };
};

module.exports = updateDecisionWithRattrapage;
