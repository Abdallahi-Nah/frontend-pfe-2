const {
    calculMoyMatiere,
    calculMoyModule,
    calculMoySemestre,
    calculMoyAnn
  } = require("./calcule_moyennes/allMoy");
  
  /**
   * Met à jour toutes les moyennes (matière, module, semestre, année).
   *
   * @param {Object} noteMatiere - Document NotesMatieres
   * @param {Object} matiere - Document Matiere
   * @param {Object} notesModule - Document NotesModules
   * @param {Object} resultatsSemestre - Document ResultatsSemestres
   * @param {Object} resultatsAnnee - Document ResultatsAnneeUniversitaire
   * @returns {Object} - Moyennes calculées
   */
  const updateAllAverages = async (
    noteMatiere,
    matiere,
    notesModule,
    resultatsSemestre,
    resultatsAnnee
  ) => {
    const moyMat = calculMoyMatiere(matiere.hasTp, noteMatiere.tp, noteMatiere.cc, noteMatiere.ecrit);
    console.log(noteMatiere, noteMatiere.moyenne, moyMat);
    noteMatiere.moyenne = moyMat;
    await noteMatiere.save();
    console.log(noteMatiere, noteMatiere.moyenne, moyMat);
  
    const moyMod = await calculMoyModule(noteMatiere._id);
    notesModule.moyenne = moyMod;
    await notesModule.save();
  
    const moySem = await calculMoySemestre(notesModule._id);
    resultatsSemestre.moyenne = moySem;
    await resultatsSemestre.save();
  
    const moyAnn = await calculMoyAnn(resultatsSemestre._id);
    resultatsAnnee.moyenne = moyAnn;
    await resultatsAnnee.save();
  
    return { moyMat, moyMod, moySem, moyAnn };
  };
  
  module.exports = updateAllAverages;
  