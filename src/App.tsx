import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PageNotFound from "./components/PageNotFound";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";
import About from "./routes/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FavCards from "./routes/FavCards";
import { ThemeContext } from "./context/themeContext";
import { UserContext } from "./context/userContext";
import { getCurrentUserById } from "./services/usersService";
import MyCards from "./routes/MyCards";
import { User } from "./interfaces/User";
import AddCard from "./components/AddCard";
import { ToastContainer } from "react-toastify";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("darkMode") === "true" ? true : false
  );
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any>(null);
  const htmlElement = document.querySelector("html");

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
          setUser(res.data);
          setLoggedIn(true);
          // dispatch(setUserAction(res.data));
        }
      })
      .catch((err) => console.log(err));

    if (localStorage.getItem("darkMode") === "true") {
      htmlElement?.setAttribute("data-bs-theme", "dark");
    } else {
      htmlElement?.setAttribute("data-bs-theme", "light");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode, searchResults]);
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
          user,
          setUser,
          loggedIn,
          setLoggedIn,
          searchResults,
          setSearchResults,
        }}
      >
        <div className="App">
          <ToastContainer />
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favcards" element={<FavCards />} />
              <Route path="/mycards" element={<MyCards />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register />} />
              <Route path="/addcard" element={<AddCard />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
          </Router>
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
