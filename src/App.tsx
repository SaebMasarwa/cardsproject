import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PageNotFound from "./components/PageNotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import About from "./components/About";
import { UserContext, userManagement, useUser } from "./hooks/useUser";
import Navbar from "./components/Navbar";
import { getCurrentUserById } from "./services/usersService";
import Footer from "./components/Footer";
import FavCards from "./components/FavCards";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("darkMode") === "true" ? true : false
  );
  const [renderControl, setRenderControl] = useState<boolean>(false);
  const { user, setUser } = useUser();
  const htmlElement = document.querySelector("html");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", darkMode as unknown as string);
    localStorage.getItem("darkMode") === "true"
      ? htmlElement?.setAttribute("data-bs-theme", "dark")
      : htmlElement?.setAttribute("data-bs-theme", "light");
  };

  useEffect(() => {
    if (localStorage.getItem("darkMode") === "true") {
      htmlElement?.setAttribute("data-bs-theme", "dark");
    } else {
      htmlElement?.setAttribute("data-bs-theme", "light");
    }
    getCurrentUserById().then((res) => {
      if (res) {
        setUser(res.data);
      }
    });
  }, [darkMode, renderControl]);

  return (
    <div className="App">
      <UserContext.Provider value={userManagement}>
        <Router>
          <Navbar
            toggleDarkMode={toggleDarkMode}
            user={user}
            renderControl={renderControl}
            setRenderControl={setRenderControl}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favcards" element={<FavCards />} />
            <Route
              path="/login"
              element={<Login setRenderControl={setRenderControl} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
