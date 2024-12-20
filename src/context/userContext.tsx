import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUserById } from "../services/usersService";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { User } from "../interfaces/User";

interface UserContextType {
  // user: User | null;
  // setUser: (user: User | null) => void;
  // loggedIn: boolean;
  // setLoggedIn: (mode: boolean) => void;
  searchResults: any;
  setSearchResults: (results: any) => void;
}

export const UserContext = createContext<UserContextType>({
  // user: null,
  // setUser: () => {},
  // loggedIn: false,
  // setLoggedIn: () => {},
  searchResults: null,
  setSearchResults: () => {},
});

// export function useUserContext() {
//   const { user } = useContext(UserContext);
//   if (!user) {
//     throw new Error("useUserContext must be used within a UserProvider");
//   }
//   return user;
// }

// interface UserContextType {
//   user: User | null;
//   setUser: (user: User | null) => void;
//   loggedIn: boolean;
//   setLoggedIn: (mode: boolean) => void;
//   searchResults: any;
//   setSearchResults: (results: any) => void;
// }

// export const UserContext = createContext<UserContextType>({
//   user: null,
//   setUser: () => {},
//   loggedIn: false,
//   setLoggedIn: (mode: boolean) => {},
//   searchResults: null,
//   setSearchResults: (results: any) => {},
// });

// export const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   const navigate: NavigateFunction = useNavigate();
//   const [user, setUser] = useState<User | null>(null);
//   const [loggedIn, setLoggedIn] = useState<boolean>(false);
//   const [searchResults, setSearchResults] = useState<any>(null);

//   useEffect(() => {
//     if (!localStorage.getItem("token")) {
//       navigate("/login");
//     } else {
//       // navigate("/");
//       if (!user) {
//         getCurrentUserById()
//           .then((res) => {
//             if (res) {
//               setUser(res.data);
//               setLoggedIn(true);
//             }
//           })
//           .catch((err) => console.log(err));
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user, loggedIn]);

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         setUser,
//         loggedIn,
//         setLoggedIn,
//         searchResults,
//         setSearchResults,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };
