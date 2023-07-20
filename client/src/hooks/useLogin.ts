import { useState, Dispatch } from "react";
import { useAuthContext } from "./useAuthContext";
import { AuthService } from "../service";

export const useLogin = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch }: { dispatch: Dispatch<Action> } = useAuthContext();

  const login = async (email: string, password: string) => {
    setError("");
    setLoading(true);
    try {
      const result = await AuthService.login({ email, password });

      // persist the current user to local storage
      localStorage.setItem("user", JSON.stringify(result.data));

      // update the auth context user
      dispatch({ type: "LOGIN", payload: result.data });
      setLoading(false);
    } catch (exception: any) {
      setLoading(false);
      setError(exception.response?.data?.error);
      return;
    }
  };

  return { login, error, loading };
};
