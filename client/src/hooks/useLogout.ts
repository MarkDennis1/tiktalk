import { useAuthContext } from "./useAuthContext";
import { AuthService } from "../service";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await AuthService.logout();

      // remove any key value pairs on local storage
      localStorage.clear();

      setUser(null);
    } catch (exception: any) {
      if (exception.response?.status === 401) {
        navigate("/login");
      }
      return;
    }
  };

  return { logout };
};
