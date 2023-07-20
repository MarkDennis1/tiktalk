import { apiClient } from ".";

class MessageService {

  static storeMessage(payload: object) {
    return apiClient.post("/api/messages", payload);
  }
}

export default MessageService;
