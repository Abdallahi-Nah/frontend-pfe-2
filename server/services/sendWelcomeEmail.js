const sendUniversityEmail = require("../utils/sendUniversityEmail");

const sendWelcomeEmail = async (person) => {
  await sendUniversityEmail({
    nom: person.nom,
    email: person.email,
    emailUniv: person.emailUniv,
    rawPassword: person.rawPassword,
  });
};

module.exports = sendWelcomeEmail;
