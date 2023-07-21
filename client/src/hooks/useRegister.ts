import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { UserService } from "../service";

export const useRegister = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthContext();

  const register = async (name: string, email: string, password: string) => {
    setError("");
    setLoading(true);
    try {
      const result = await UserService.storeUser({ name, email, password });

      // persist the current user to local storage
      localStorage.setItem("user", JSON.stringify(result.data));

      setUser(result.data);
      setLoading(false);
    } catch (exception: any) {
      setLoading(false);
      setError(exception.response?.data?.error);
      return;
    }
  };

  return { register, error, loading };
};
