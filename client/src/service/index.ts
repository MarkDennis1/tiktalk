import axios from "axios";
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// handle requests in the API
apiClient.interceptors.request.use(
  (request) => {
    return request;
  },
  (config) => {
    return config;
  }
);

// handle responses in the API
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    switch (error.response.status) {
      case 401:
        localStorage.clear();
        break;
      // case 403:
      // case 404:
      //   // handle 404 errors
      //   break;
      // case 422:
      //   // handle 422 errors\
      //   break;
      // default:
      //   // handle other errors
      //   break;
    }
    return Promise.reject(error);
  }
);

export { default as AuthService } from "./AuthService";
export { default as UserService } from "./UserService";
export { default as ConversationService } from "./ConversationService";
export { default as MessageService } from "./MessageService";
export { default as NotificationService } from "./NotificationService";
export { apiClient };
