const bcrypt = require("bcryptjs");

const generateCredentials = async (nom, prenom, role) => {
  const randomPassword = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedPassword = await bcrypt.hash(randomPassword, 10);
  const randomEmailNum = Math.floor(100000 + Math.random() * 900000).toString();

  const emailUniv = `${nom}.${prenom}.${randomEmailNum}.FST@un.mr`;

  return {
    rawPassword: randomPassword,
    hashedPassword,
    emailUniv,
    role: role.toLowerCase()
  };
};

module.exports = generateCredentials;
