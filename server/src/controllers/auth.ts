import bcrypt from "bcrypt";
import Joi from "joi";
import { Request, Response } from "express";
import { User } from "@/models/user";
import { AuthRequest } from "@/middlewares/auth";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = validate(req.body);
  const errorMessage = "Invalid email or password";

  if (result.error) return res.status(400).send({ error: errorMessage });

  // check if username exist
  const user: any = await User.findOne({ email: email });
  if (!user) return res.status(400).send({ error: errorMessage });

  // check if password match
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).send({ error: errorMessage });

  // generate auth token and apply it to headers
  res
    .cookie("token", user.generateAuthToken(), {
      sameSite: "none",
      secure: true,
    })
    .send({ _id: user._id, email: user.email, name: user.name });
};

export const currentUser = async (req: AuthRequest, res: Response) => {
  res.send(req.user);
};

export const logout = async (req: AuthRequest, res: Response) => {
  req.user = null;
  res
    .clearCookie("token", { sameSite: "none", secure: true })
    .send("cookies removed");
};

export const validate = (req: any) => {
  const schema = Joi.object({
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(5).required(),
  });

  return schema.validate(req);
};
