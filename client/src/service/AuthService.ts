import { apiClient } from ".";

class AuthService {
  static currentUser() {
    return apiClient.get("/api/auth/me");
  }

  static login(payload: object) {
    return apiClient.post("/api/auth/login", payload);
  }

  static logout() {
    return apiClient.post("/api/auth/logout");
  }
}

export default AuthService;
