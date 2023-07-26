import { useState } from "react";
import { NotificationService } from "../service";

export const useNotification = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getNotifications = async () => {
    setError("");
    setLoading(true);
    try {
      const { data } = await NotificationService.getNotifications();
      setLoading(false);
      return data;
    } catch (exception: any) {
      setLoading(false);
      setError(exception.response?.data?.error);
      return;
    }
  };

  const storeNotification = async (
    chat_id: string = "",
    receiver: string,
    content: string
  ) => {
    setError("");
    setLoading(true);
    try {
      const { data } = await NotificationService.storeNotification({
        chat_id,
        receiver,
        content,
      });
      setLoading(false);
      return data;
    } catch (exception: any) {
      setLoading(false);
      setError(exception.response?.data?.error);
      return;
    }
  };

  const destroyNotification = async (chat_id: string = "") => {
    setError("");
    setLoading(true);
    try {
      const { data } = await NotificationService.destroyNotifByConversationId(
        chat_id
      );
      setLoading(false);
      return data;
    } catch (exception: any) {
      setLoading(false);
      setError(exception.response?.data?.error);
      return;
    }
  };

  return {
    getNotifications,
    storeNotification,
    destroyNotification,
    error,
    loading,
  };
};
