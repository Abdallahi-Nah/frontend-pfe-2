const contratPedagogiqueModel = require("../models/contratPedagogique.model");
const factory = require("./handlersFactory");

exports.getContratPedagogique = factory.getOne(
  contratPedagogiqueModel,
  "contrat"
);
