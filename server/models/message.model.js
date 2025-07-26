const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderType: {
      type: String,
      enum: ["Etudiant", "Enseignant"],
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "senderType",
    },
    receiverType: {
      type: String,
      enum: ["Etudiant", "Enseignant"],
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "receiverType",
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
