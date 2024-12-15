import React, { createContext, useEffect } from "react";
import { getCurrentUserById } from "../services/usersService";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { User } from "../interfaces/User";

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  loggedIn: boolean;
  setLoggedIn: (mode: boolean) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loggedIn: false,
  setLoggedIn: (mode: boolean) => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate: NavigateFunction = useNavigate();
  const [user, setUser] = React.useState<User | null>(null);
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      navigate("/");
      if (!user) {
        getCurrentUserById()
          .then((res) => {
            if (res) {
              setUser(res.data);
              setLoggedIn(true);
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }, [user, loggedIn]);

  return (
    <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
