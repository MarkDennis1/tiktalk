
import { Schema, model } from "mongoose";

const notificationSchema = new Schema(
  {
    chat_id: { type: Schema.Types.ObjectId, ref: "Conversation", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Notification = model("Notification", notificationSchema);
