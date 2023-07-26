import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user: any;
}

const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;
  if (!cookies.token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const loggedUser = jwt.verify(cookies.token, process.env.JWT_SECRET);
    req.user = loggedUser;
    next();
  } catch (exception) {
    console.log("auth:middleware:authenticateUser error: ", exception.message);
    res.status(400).send({ error: "Invalid token, " + exception.message });
  }
};

export default authenticateUser;
