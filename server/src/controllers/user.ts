import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";
import { User, validate } from "@/models/user";
import { AuthRequest } from "@/middlewares/auth";
const router = Router();
const saltRounds = 10;

interface StoreUserRequest extends Request {
  body: {
    email: string;
    name: string;
    password: string;
  };
}

export const getUsers = async (req: AuthRequest, res: Response) => {
  //req.user
  const users = await User.find(
    { _id: { $ne: req.user._id } },
    { password: 0 }
  );
  res.send(users);
};

export const searchUsers = async (req: Request, res: Response) => {
  const { search } = req.params;
  const users = await User.find({
    $or: [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ],
  });
  res.send(users);
};

export const store = async (req: StoreUserRequest, res: Response) => {
  const { email, name, password } = req.body;
  const result = validate(req.body);
  if (result.error)
    return res.status(422).send({ error: result.error.details[0].message });

  let user: any = await User.findOne({ email: email });
  if (user)
    return res.status(400).send({ error: "Email address already taken." });

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  user = new User({
    email: email,
    name: name,
    password: hashedPassword,
  });

  await user.save();

  res
    .cookie("token", user.generateAuthToken(), {
      sameSite: "none",
      secure: true,
    })
    .send({ _id: user._id, email: user.email, name: user.name });
};

export default router;
