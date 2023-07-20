import { store } from "@/controllers/message";
import { Router } from "express";
import authenticateUser from "@/middlewares/auth";
const router = Router();

router.post("/", authenticateUser, store)

export default router;