import Joi, { boolean } from "joi";
import { Schema, model } from "mongoose";

const conversationSchema = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    isSeen: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const validate = (req: any) => {
  const schema = Joi.object({
    sender: Joi.string().required(),
    content: Joi.string().required(),
  });

  return schema.validate(req);
};

export const Conversation = model("Conversation", conversationSchema);
