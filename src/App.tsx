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
import { User } from "./interfaces/User";
import Footer from "./components/Footer";
import FavCards from "./components/FavCards";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("LightMode") === "true" ? true : false
  );
  const [renderControl, setRenderControl] = useState<boolean>(false);
  const { user, setUser } = useUser();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", darkMode as unknown as string);
  };

  useEffect(() => {
    getCurrentUserById().then((res) => {
      if (res) {
        setUser(res.data);
      }
    });
  }, [
    darkMode,

    // renderControl,
    userManagement.renderControl,
  ]);

  return (
    <div
      className="App"
      style={
        localStorage.getItem("darkMode") === "true"
          ? {
              color: userManagement.themes.dark.color,
              background: userManagement.themes.dark.background,
            }
          : {
              color: userManagement.themes.light.color,
              background: userManagement.themes.light.background,
            }
      }
    >
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
