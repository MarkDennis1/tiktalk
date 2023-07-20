import jwt from "jsonwebtoken";
import Joi from "joi";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Other user information fields
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, name: this.name, email: this.email },
    process.env.JWT_SECRET
  );
};

export const User = model("User", userSchema);

export const validate = (req: any) => {
  const schema = Joi.object({
    email: Joi.string().min(5).required().email(),
    name: Joi.string().min(5).required(),
    password: Joi.string().min(5).required(),
  });

  return schema.validate(req);
};
