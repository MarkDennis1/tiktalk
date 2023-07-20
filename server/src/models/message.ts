import Joi from "joi";
import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const validate = (req: any) => {
  const schema = Joi.object({
    content: Joi.string().required(),
  });

  return schema.validate(req);
};

export const Message = model("Message", messageSchema);
