const express = require("express");
const router = express.Router();

const { createMessage, getMessages, getConversation } = require("../controller/message.controller");

router.post("/create", createMessage);
router.get("/get/:id", getMessages);
// router.get("/get-conversation/:id", getConversation);
router.get("/get-conversation/:teacherId/:studentId", getConversation);


module.exports = router;