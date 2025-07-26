const express = require("express");
const router = express.Router();

const { createMessage, getMessages } = require("../controller/message.controller");

router.post("/create", createMessage);
router.get("/get/:id", getMessages);

module.exports = router;