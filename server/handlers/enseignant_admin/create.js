const createAccount = require("../../services/createAccount");
const sendWelcomeEmail = require("../../services/sendWelcomeEmail");

const create = async (Model, req, modelName) => {
  const newUser = await createAccount(Model, req.body, modelName);
  await sendWelcomeEmail(newUser);
  return newUser;
};

module.exports = create;
