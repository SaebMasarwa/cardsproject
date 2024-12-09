import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PageNotFound from "./components/PageNotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import About from "./components/About";
import { UserContext, userManagement } from "./hooks/useUser";
import Navbar from "./components/Navbar";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("LightMode") === "true" ? true : false
  );
  const [user, setUser] = useState();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", darkMode as unknown as string);
  };

  useEffect(() => {}, [darkMode]);

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
          <Navbar toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
