import { createContext, useEffect, useState } from "react";
import { getCurrentUserById } from "../services/usersService";
import { User } from "../interfaces/User";

const themes = {
  light: {
    color: "black",
    background: "white",
  },
  dark: {
    color: "white",
    background: "black",
  },
};

export let userManagement = {
  token: localStorage.getItem("token") ?? "",
  loggedIn: localStorage.getItem("token") ? true : false,
  renderControl: false,
  themes: themes,
};

export const UserContext = createContext(userManagement);

export const useUser = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    if (userManagement.token !== "") {
      getCurrentUserById()
        .then((res) => {
          setUser(res?.data);
          userManagement.renderControl = true;
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return { user, setUser };
};
