import { Router } from "express";
import authenticate from '@/middlewares/auth'
import { currentUser, login, logout } from "@/controllers/auth";
const router = Router();

router.post("/login", login);
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, currentUser);

export default router;