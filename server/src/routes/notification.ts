import { store, destroyByConversationId, getNotifications } from "@/controllers/notification";
import { Router } from "express";
import authenticateUser from "@/middlewares/auth";
const router = Router();

router.get("/", authenticateUser, getNotifications)
router.post("/", authenticateUser, store)
router.delete("/:chat_id", authenticateUser, destroyByConversationId)

export default router;