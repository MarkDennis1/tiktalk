import { createContext, useReducer, useEffect, ReactNode } from "react";

export const AuthContext = createContext<{
  dispatch: React.Dispatch<any>;
  user: any;
} | null>(null);

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user") || "");
      if (currentUser) {
        dispatch({ type: "LOGIN", payload: currentUser });
      } else {
        dispatch({ type: "LOGOUT", payload: null });
      }
    } catch (error) {
      dispatch({ type: "LOGOUT", payload: null });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
