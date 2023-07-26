import { getConversations, store, getConversationWithReceiverId, getConversationsWithId, destroy } from "@/controllers/conversation";
import { Router } from "express";
import authenticateUser from "@/middlewares/auth";
const router = Router();

router.get("/", authenticateUser, getConversations)
router.get("/receiver/:receiverId", authenticateUser, getConversationWithReceiverId)
router.get("/id/:id", authenticateUser, getConversationsWithId)
router.post("/", authenticateUser, store)
router.delete("/:id", authenticateUser, destroy)

export default router;