import { useContext } from "react";
import { NotifContext } from "../context/NotificationContext";

export const useNotifContext = () => {
  const context = useContext(NotifContext);

  if (!context) {
    throw Error("NotifContext is used outside of NotifContextProvider.");
  }

  return context;
};