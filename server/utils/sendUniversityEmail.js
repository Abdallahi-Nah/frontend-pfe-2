const sendEmail = require("./sendEmail");

const sendUniversityEmail = async ({ nom, email, emailUniv, rawPassword }) => {
  const message = `Bonjour ${nom},\n\nVoici votre e-mail universitaire et mot de passe pour la plateforme éducative FST :\n\nE-mail : ${emailUniv}\nMot de passe : ${rawPassword}`;

  await sendEmail({
    email,
    subject: "E-mail Universitaire et Mot de passe - FST",
    message
  });
};

module.exports = sendUniversityEmail;
