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

function App() {
  const { user, setUser, loggedIn, setLoggedIn } =
    React.useContext(UserContext);
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("darkMode") === "true" ? true : false
  );
  const htmlElement = document.querySelector("html");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", darkMode as unknown as string);
    localStorage.getItem("darkMode") === "true"
      ? htmlElement?.setAttribute("data-bs-theme", "dark")
      : htmlElement?.setAttribute("data-bs-theme", "light");
  };

  useEffect(() => {
    getCurrentUserById().then((res) => {
      if (res) {
        setUser(res.data);
        setLoggedIn(true);
        console.log("LoggedIn in App " + loggedIn);
      }
    });

    if (localStorage.getItem("darkMode") === "true") {
      htmlElement?.setAttribute("data-bs-theme", "dark");
    } else {
      htmlElement?.setAttribute("data-bs-theme", "light");
    }
  }, [darkMode, user, loggedIn]);

  console.log("LoggedIn in App " + loggedIn);
  return (
    <div className="App">
      <UserContext.Provider
        value={{
          user,
          setUser,
          loggedIn,
          setLoggedIn,
        }}
      >
        <ThemeContext.Provider
          value={{
            darkMode,
            toggleDarkMode,
          }}
        >
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favcards" element={<FavCards />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
          </Router>
        </ThemeContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
