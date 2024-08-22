import express from "express";
import verifyJWT from "../middlewares/verifyJWT.middleware.js";
import Message from "../models/Message.model.js";
import Conversation from "../models/Conversation.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

const router = express.Router();

router.post("/send/:receiverId", verifyJWT, async (req, res, next) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user._id; // from the verifyJWT middleware
    const { content } = req.body; // from the request body

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      // If no conversation exists, create a new one
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });

      await conversation.save();
    }

    // Create and save the new message
    const newMessage = new Message({
      conversationId: conversation._id, // _id from mongoDB created above or found
      sender: senderId,
      content,
      createdAt: new Date(),
    });

    await newMessage.save();

    // Send the new message to the receiver using socket.io
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/read/:receiverId", verifyJWT, async (req, res, next) => {
  try {
    const { receiverId } = req.params;

    const senderId = req.user._id;

    // fetch the conveersation between the sender and receiver from the DB

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      return res.status(404).json({ message: "not found" });
    }

    // fetch all the messages in the conversation

    const allMessages = await Message.find({
      conversationId: conversation._id,
    }).sort({ createdAt: 1 });

    return res.status(200).json(allMessages);
  } catch (error) {
    console.error(error);
  }
});

export default router;
