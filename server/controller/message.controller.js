// controller/message.controller.js
const Message = require("../models/message.model");
const mongoose = require("mongoose");

exports.createMessage = async (req, res) => {
  try {
    const { senderId, senderType, receiverId, receiverType, text, image } =
      req.body;

    // Vérification de type
    if (
      !["Etudiant", "Enseignant"].includes(senderType) ||
      !["Etudiant", "Enseignant"].includes(receiverType)
    ) {
      return res.status(400).json({ message: "Type d'utilisateur invalide" });
    }

    const newMessage = new Message({
      senderId,
      senderType,
      receiverId,
      receiverType,
      text,
      image,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    console.error("Erreur création message :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// exports.getMessages = async (req, res) => {
//   try {
//     const cookies = req.headers.cookie;
//     const cookie = require("cookie");
//     const parsed = cookie.parse(cookies || "");

//     const userCookie = parsed.user ? JSON.parse(parsed.user) : null;

//     if (!userCookie || !userCookie._id) {
//       return res
//         .status(401)
//         .json({ message: "Utilisateur non authentifié (cookie manquant)" });
//     }

//     const myId = userCookie._id;
//     const { id: userTochatId } = req.params;

//     const messages = await Message.find({
//       $or: [
//         { senderId: myId, receiverId: userTochatId },
//         { senderId: userTochatId, receiverId: myId },
//       ],
//     });

//     res.status(200).json(messages);
//   } catch (error) {
//     console.log("Erreur dans getMessages :", error.message);
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// };

exports.getMessages = async (req, res) => {
  try {
    const cookies = req.headers.cookie;
    const cookie = require("cookie");
    const parsed = cookie.parse(cookies || "");

    const myId = parsed.id; // <-- lecture directe depuis cookie

    if (!myId) {
      return res
        .status(401)
        .json({ message: "Utilisateur non authentifié (cookie id manquant)" });
    }

    const { id: userTochatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userTochatId },
        { senderId: userTochatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Erreur dans getMessages :", error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// message.controller.js

// exports.getConversation = async (req, res) => {
//   const { studentId, teacherId } = req.params;

//   try {
//     const messages = await Message.find({
//       $or: [
//         {
//           senderId: new mongoose.Types.ObjectId(studentId),
//           receiverId: new mongoose.Types.ObjectId(teacherId),
//         },
//         {
//           senderId: new mongoose.Types.ObjectId(teacherId),
//           receiverId: new mongoose.Types.ObjectId(studentId),
//         },
//       ],
//     }).sort({ createdAt: 1 });

//     res.status(200).json(messages);
//   } catch (error) {
//     console.error("Erreur getConversation:", error);
//     res.status(500).json({ error: "Erreur récupération des messages" });
//   }
// };


exports.getConversation = async (req, res) => {
  const { teacherId, studentId } = req.params;

  try {
    // Vérifier les IDs
    if (
      !mongoose.Types.ObjectId.isValid(studentId) ||
      !mongoose.Types.ObjectId.isValid(teacherId)
    ) {
      return res.status(400).json({ error: "ID invalide" });
    }

    const messages = await Message.find({
      $or: [
        {
          senderId: new mongoose.Types.ObjectId(studentId),
          receiverId: new mongoose.Types.ObjectId(teacherId),
        },
        {
          senderId: new mongoose.Types.ObjectId(teacherId),
          receiverId: new mongoose.Types.ObjectId(studentId),
        },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Erreur getConversation:", error.message);
    res.status(500).json({ error: "Erreur récupération des messages" });
  }
};


