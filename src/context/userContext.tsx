import React, { createContext, useEffect } from "react";
import { getCurrentUserById } from "../services/usersService";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface UserContextType {
  user: string;
  setUser: (user: string) => void;
  loggedIn: boolean;
  setLoggedIn: (mode: boolean) => void;
}

export const UserContext = createContext<UserContextType>({
  user: "",
  setUser: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate: NavigateFunction = useNavigate();
  const [user, setUser] = React.useState<string>("");
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      navigate("/");
      if (!user) {
        getCurrentUserById().then((res) => {
          if (res) {
            setUser(res.data);
            setLoggedIn(true);
          }
        });
      }
    }
  }, [user, loggedIn]);

  return (
    <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
