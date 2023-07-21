import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

export const NotifContext = createContext<{
  setNotifications: Dispatch<any>;
  notifications: Array<any>;
} | null>(null);

const NotifContextProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState([]);

  return (
    <NotifContext.Provider
      value={{
        setNotifications,
        notifications,
      }}
    >
      {children}
    </NotifContext.Provider>
  );
};

export default NotifContextProvider;
