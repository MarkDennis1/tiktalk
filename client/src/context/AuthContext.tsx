import { Dispatch, ReactNode, createContext, useEffect, useState } from "react";

export const AuthContext = createContext<{
  setUser: Dispatch<any>;
  user: any;
} | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user") || "");
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
