import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from "react";
import { User } from "../interfaces/User";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loggedIn: boolean;
  setLoggedIn: (mode: boolean) => void;

  searchResults: any;
  setSearchResults: (results: any) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
  searchResults: null,
  setSearchResults: () => {},
});

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FunctionComponent<UserProviderProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const navigate: NavigateFunction = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any>(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loggedIn,
        setLoggedIn,
        searchResults,
        setSearchResults,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
