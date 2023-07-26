import { apiClient } from ".";

class NotificationService {
  static getNotifications() {
    return apiClient.get("/api/notifications");
  }

  static storeNotification(payload: object) {
    return apiClient.post(`/api/notifications`, payload);
  }

  static destroyNotifByConversationId(chat_id: string) {
    return apiClient.delete(`/api/notifications/${chat_id}`);
  }


}

export default NotificationService;
