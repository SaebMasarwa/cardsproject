import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PageNotFound from "./components/PageNotFound";
import Login from "./routes/Login";
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
import AddCard from "./routes/AddCard";
import { ToastContainer } from "react-toastify";
import EditCard from "./routes/EditCard";
import DisplayCard from "./routes/DisplayCard";
import { APIProvider } from "@vis.gl/react-google-maps";
import Sandbox from "./routes/Sandbox";
import Profile from "./routes/Profile";
import Register from "./routes/Register";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("darkMode") === "true" ? true : false
  );
  const [user, setUser] = useState<User | null>(null);
  const [searchResults, setSearchResults] = useState<any>(null);
  const htmlElement = document.querySelector("html");
  const api: string = process.env.REACT_APP_GOOGLE_API_KEY as string;

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
          searchResults,
          setSearchResults,
        }}
      >
        <div className="App">
          <ToastContainer />
          <APIProvider apiKey={api}>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favcards" element={<FavCards />} />
                <Route path="/mycards" element={<MyCards />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/addcard" element={<AddCard />} />
                <Route path="/editcard/:id" element={<EditCard />} />
                <Route path="/displaycard/:id" element={<DisplayCard />} />
                <Route path="/sandbox" element={<Sandbox />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
              <Footer />
            </Router>
          </APIProvider>
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
