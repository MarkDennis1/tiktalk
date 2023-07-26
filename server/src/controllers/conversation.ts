import { Request, Response } from "express";
import { AuthRequest } from "@/middlewares/auth";
import { Conversation } from "@/models/conversation";
import { any } from "joi";

interface ConversationRequest extends AuthRequest {
  body: {
    conversationId: string | null | undefined;
    receiverId: string;
    messageId: string | null | undefined;
  };
}

export const getConversations = async (req: AuthRequest, res: Response) => {
  const conversations = await Conversation.find({
    participants: { $in: [req.user._id] },
    messages: { $not: { $size: 0 } },
  })
  .sort({ updatedAt: -1 })
  .populate("participants", "email name")
  .populate({
    path: "messages",
    populate: {
      path: "sender",
      select: "email name",
    },
  })
  .populate({
    path: "deletedBy.user",
    select: "email name",
  });

  res.send(conversations);
};

export const getConversationWithReceiverId = async (
  req: ConversationRequest,
  res: Response
) => {
  const { receiverId } = req.params;
  const conversation = await Conversation.findOne({
    participants: { $all: [req.user._id, receiverId] },
  }).populate("participants", {
    fields: ["email", "name"],
  });
  res.send(conversation);
};

export const getConversationsWithId = async (
  req: ConversationRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const conversation = await Conversation.findOne({
      _id: id,
    })
      .populate("participants", "email name")
      .populate({
        path: "messages",
        populate: {
          path: "sender",
          select: "email name",
        },
      });

    // Save the updated conversation back to the database
    await conversation.save();

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    res.send(conversation);
  } catch (error) {
    console.log("conversation:controller:getConversationsWithId error:", error);
  }
};

export const store = async (req: ConversationRequest, res: Response) => {
  const { receiverId, messageId, conversationId } = req.body;
  let conversation: any;

  try {
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
      if (messageId) {
        conversation.messages.push(messageId);
      }
    } else {
      conversation = await Conversation.findOne({
        participants: { $all: [req.user._id, receiverId] },
      }).populate("participants", {
        fields: ["email", "name"],
      });
      if (messageId) {
        conversation.messages.push(messageId);
      }
    }

    if (!conversation) {
      conversation = new Conversation({
        participants: [receiverId, req.user._id],
        messages: [],
      });

      // Populate the participants before sending the response
      await conversation.populate({
        path: "participants",
        select: "-password",
      });
    }

    await conversation.save();
    return res.status(201).send(conversation);
  } catch (exception) {
    return res.status(404).send(`Error: ${exception.message}`);
  }
};

export const destroy = async (req: ConversationRequest, res: Response) => {
  const { conversationId } = req.body;
  let conversation: any;
  try {
    conversation = await Conversation.findById(conversationId);
    const isUserDeletedConvo = conversation.deletedBy.some(
      (item: any) => item.user === req.user._id
    );

    // Get the current date in the format "YYYY-MM-DDTHH:mm:ss.sssZ"
    const currentDate = new Date();

    if (isUserDeletedConvo) {
      // Replace the object in the array that meets the condition and update deletedAt
      conversation.deletedBy = conversation.deletedBy.map((item: any) => {
        if (item.user === req.user._id) {
          return {
            ...item, // Copy the existing object properties
            deletedAt: currentDate, // Update the deletedAt property with the current date
          };
        }
        return item; // For other objects, return them as they are
      });
    } else {
      conversation.deletedBy.push({
        user: req.user._id,
        deletedAt: currentDate,
      });
    }
    conversation.save();
  } catch (error) {
    console.log("conversation:controller:destroy error: ", error);
  }
};
