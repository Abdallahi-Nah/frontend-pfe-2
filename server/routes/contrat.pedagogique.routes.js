const express = require("express");
const router = express.Router();
const {
  getContratPedagogique,
} = require("../controller/contrat.pedagogique.controller.js");

router.get("/get/:id", getContratPedagogique);

module.exports = router;