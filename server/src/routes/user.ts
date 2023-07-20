import { getUsers, searchUsers, store } from "@/controllers/user";
import { Router } from "express";
import authenticateUser from "@/middlewares/auth";
const router = Router();

router.post("/", store);
router.get("/", authenticateUser, getUsers);
router.get("/:search", authenticateUser, searchUsers);

export default router;
