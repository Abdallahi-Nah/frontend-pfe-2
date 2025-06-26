const createAccount = require("../../services/createAccount");
const sendWelcomeEmail = require("../../services/sendWelcomeEmail");
const createContratPedagogique = require("./createContratPedagogique");

const create = async (Model, req) => {
  const newDoc = await createAccount(Model, req.body, "etudiant");
  await sendWelcomeEmail(newDoc);
  await createContratPedagogique(newDoc);
  return newDoc;
};

module.exports = create;
