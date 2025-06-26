/**
 * Calcule la moyenne d'une matière en fonction des notes.
 *
 * @param {boolean} hasTp - Indique si la matière a un TP
 * @param {number} tp - Note de TP
 * @param {number} cc - Note de contrôle continu
 * @param {number} ecrit - Note de l'examen écrit
 * @returns {number} - Moyenne calculée
 */
const calculMoyMatiere = (hasTp, tp, cc, ecrit) => {
    // Conversion en nombres au cas où
    tp = Number(tp);
    cc = Number(cc);
    ecrit = Number(ecrit);
  
    console.log(`Calcul moyenne - hasTp:${hasTp}, tp:${tp}, cc:${cc}, ecrit:${ecrit}`);
  
    let moy = 0;
    if (hasTp === true) {
      moy = (tp * 1 + cc * 2 + ecrit * 3) / 6;
      console.log(`Moyenne avec TP: ${moy}`);
    } else {
      moy = (cc * 2 + ecrit * 3) / 5;
      console.log(`Moyenne sans TP: ${moy}`);
    }
  
    return moy;
  };
  
  module.exports = calculMoyMatiere;
  