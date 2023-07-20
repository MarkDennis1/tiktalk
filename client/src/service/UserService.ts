import { apiClient } from ".";

class UserService {
  static getUsers() {
    return apiClient.get("/api/users");
  }

  static searchUser(search: string) {
    return apiClient.get(`/api/users/${search}`);
  }

  static storeUser(payload: object) {
    return apiClient.post("/api/users", payload);
  }


}

export default UserService;
