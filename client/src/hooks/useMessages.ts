import { useState } from "react";
import {
  ConversationService,
  MessageService,
} from "../service";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useMessages = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const getConversations = async () => {
    setError("");
    setLoading(true);
    try {
      const { data } = await ConversationService.getConversations();
      setLoading(false);
      return data;
    } catch (exception: any) {
      setLoading(false);
      setError(exception.response?.data?.error);
      if (exception.response?.status === 401) {
        navigate("/login");
      }
      return;
    }
  };

  const getConversationWithId = async (conversationId = "") => {
    setError("");
    setLoading(true);
    try {
      const { data } = await ConversationService.getConversationWithId(
        conversationId
      );
      setLoading(false);

      // udpate ChatContext selectedUser
      let selectedUser = data.participants.filter(
        (participant: any) => participant._id != user?._id
      )[0];

      return { messages: data.messages, selectedUser };
    } catch (exception: any) {
      setLoading(false);
      setError(exception.response?.data?.error);
      if (exception.response?.status === 401) {
        navigate("/login");
      }
      return;
    }
  };

  const storeConversation = async (
    receiverId: string,
    messageId = "",
    conversationId = ""
  ) => {
    setError("");
    setLoading(true);
    try {
      const res = await ConversationService.storeConversation({
        receiverId,
        messageId,
        conversationId,
      });
      setLoading(false);
      return res.data;
    } catch (exception: any) {
      setLoading(false);
      setError(exception.response?.data?.error);
      if (exception.response?.status === 401) {
        navigate("/login");
      }
      return;
    }
  };

  const storeMessage = async (
    receiverId: string,
    conversationId: string | undefined,
    content: string
  ) => {
    setError("");
    setLoading(true);
    try {
      const { data } = await MessageService.storeMessage({
        content,
      });
      await storeConversation(receiverId, data._id, conversationId);
      setLoading(false);
    } catch (exception: any) {
      setError(exception.response?.data?.error);
      if (exception.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const destroyConversation = async (id: string) => {
    setError("");
    setLoading(true);
    try {
      await ConversationService.destroyConversation(id);
      setLoading(false);
      return true;
    } catch (exception: any) {
      setError(exception.response?.data?.error);
      if (exception.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  return {
    getConversations,
    getConversationWithId,
    storeConversation,
    storeMessage,
    destroyConversation,
    error,
    loading,
  };
};
