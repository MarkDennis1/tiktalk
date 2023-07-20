import { Request, Response } from "express";
import { Message, validate } from "@/models/message";
import { AuthRequest } from "@/middlewares/auth";

interface MessageRequest extends AuthRequest {
  body: {
    content: string;
  };
}

export const store = async (req: MessageRequest, res: Response) => {
  const { content } = req.body;

  const result = validate(req.body);
  if (result.error)
    return res.status(422).send({ error: result.error.details[0].message });

  const newMessage = new Message({
    sender: req.user._id,
    content,
  });

  await newMessage.save();

  res.send({ _id: newMessage._id });
};
