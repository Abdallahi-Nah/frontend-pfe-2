const handleRattrapage = (moyMat, moyMod, dec) => {
    // Cas 1 : Moyenne matière < 7 → on ignore totalement la moyenne du module
    if (moyMat < 7) {
      return dec === 'R' ? 'NV' : 'R';
    }
  
    // Cas 2 : Moyenne matière entre 7 et 10 mais module < 10
    if (moyMat < 10 && moyMod < 10) {
      return dec === 'R' ? 'NV' : 'R';
    }
  
    // Par défaut : on ne tranche pas ici, laisser à la logique principale
    return null;
  };
  
module.exports = handleRattrapage;
  