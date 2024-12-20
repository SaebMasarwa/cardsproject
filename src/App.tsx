import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PageNotFound from "./components/PageNotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FavCards from "./components/FavCards";
import { ThemeContext } from "./context/themeContext";
import { UserContext } from "./context/userContext";
import { getCurrentUserById } from "./services/usersService";
import MyCards from "./components/MyCards";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { setUserAction, UsersAction } from "./redux/UsersState";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("darkMode") === "true" ? true : false
  );
  // const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  // localStorage.token !== undefined ? true : false
  const [searchResults, setSearchResults] = useState<any>(null);
  const htmlElement = document.querySelector("html");

  let user = useSelector((state: any) => state.usersState.users);
  const dispatch = useDispatch<Dispatch<UsersAction>>();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", darkMode as unknown as string);
    localStorage.getItem("darkMode") === "true"
      ? htmlElement?.setAttribute("data-bs-theme", "dark")
      : htmlElement?.setAttribute("data-bs-theme", "light");
  };

  useEffect(() => {
    getCurrentUserById()
      .then((res) => {
        if (res) {
          // setUser(res.data);
          dispatch(setUserAction(res.data));
          setLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));

    if (localStorage.getItem("darkMode") === "true") {
      htmlElement?.setAttribute("data-bs-theme", "dark");
    } else {
      htmlElement?.setAttribute("data-bs-theme", "light");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode, loggedIn, searchResults]);
  return (
    // <Provider store={store}>
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
      }}
    >
      <UserContext.Provider
        value={{
          // user,
          // setUser,
          // loggedIn,
          // setLoggedIn,
          searchResults,
          setSearchResults,
        }}
      >
        {/* <Provider store={store}> */}
        <div className="App">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favcards" element={<FavCards />} />
              <Route path="/mycards" element={<MyCards />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
          </Router>
        </div>
        {/* </Provider> */}
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
