import { Response } from "express";
import { Notification } from "@/models/notification";
import { AuthRequest } from "@/middlewares/auth";

interface NotificationRequest extends AuthRequest {
  body: {
    chat_id: string;
    receiver: string;
    content: string;
  };
}

export const getNotifications = async (req: AuthRequest, res: Response) => {
  const notifications = await Notification.find({
    receiver: { $in: req.user._id },
  });
  res.send(notifications);
};

export const store = async (req: NotificationRequest, res: Response) => {
  const { chat_id, receiver, content } = req.body;

  const newNotification = new Notification({
    chat_id,
    sender: req.user._id,
    receiver,
    content,
  });

  await newNotification.save();

  res.send(newNotification);
};

export const destroyByConversationId = async (req: AuthRequest, res: Response) => {
  const { chat_id } = req.params;

  try {
    // Delete all notifications with the specified chat_id and sender being the current user
    const deleteNotifications = await Notification.deleteMany({
      chat_id,
    });

    if (deleteNotifications.deletedCount === 0) {
      return res.status(404).send({ error: "Notifications not found." });
    }

    res.send({ message: "Notifications deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while deleting notifications." });
  }
};
