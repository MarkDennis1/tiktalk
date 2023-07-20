import { useState } from "react";
import { UserService } from "../service";
import { useNavigate } from "react-router-dom";

export const useUsers = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const getUsers = async () => {
    setError("");
    setLoading(true);
    try {
      const { data } = await UserService.getUsers();
      setLoading(false);
      return data;
    } catch (exception: any) {
      setLoading(false);
      setError(exception.response?.data?.error);
      if (exception.response?.status === 401) {
        navigate("/login");
      }
      return;
    }
  };

  return { getUsers, error, loading };
};
