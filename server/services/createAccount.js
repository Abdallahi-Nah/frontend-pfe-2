const generateCredentials = require("../utils/generateCredentials");

const createAccount = async (Model, data, roleType = "user") => {
  // Génère les credentials
  const credentials = await generateCredentials(data.nom, data.prenom, roleType.toLowerCase());

  // Crée le document avec les credentials intégrés
  const newDoc = await Model.create({
    ...data,
    motDePasse: credentials.hashedPassword,
    emailUniv: credentials.emailUniv,
    role: credentials.role,
  });

  // Attache le mot de passe brut pour l'email (non stocké en DB)
  newDoc.rawPassword = credentials.rawPassword;

  return newDoc;
};

module.exports = createAccount;
