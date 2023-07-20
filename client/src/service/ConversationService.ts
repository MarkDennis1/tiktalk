import { apiClient } from ".";

class ConversationService {
  static getConversations() {
    return apiClient.get("/api/conversations");
  }

  static getConversationsWithReceiverId(receiverId: string) {
    return apiClient.get(`/api/conversations/receiver/${receiverId}`);
  }

  static getConversationWithId(id: string) {
    return apiClient.get(`/api/conversations/id/${id}`);
  }

  static storeConversation(payload: object) {
    return apiClient.post("/api/conversations", payload);
  }
}

export default ConversationService;
