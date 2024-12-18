import { FunctionComponent, useContext, useEffect } from "react";
import {
  NavigateFunction,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { ThemeContext } from "../context/themeContext";
import { UserContext } from "../context/userContext";
import React from "react";
import { searchCards } from "../services/cardsService";
import { CardType } from "../interfaces/Card";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const navigate: NavigateFunction = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { user, loggedIn, setLoggedIn, searchResults, setSearchResults } =
    useContext(UserContext);

  // const [cards, setCards] = React.useState<CardType[] | null>(null);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      // navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, darkMode, loggedIn]);

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const form = e.target as HTMLFormElement;
  //   const input = form.querySelector("input[type='text']") as HTMLInputElement;
  //   navigate("/search?q=" + input.value);
  // };

  const handleSearch = (searchQuery: string) => {
    // const searchQuery = searchParams.get("q") || "";
    // console.log(searchQuery);

    searchCards(searchQuery)
      .then((res) => {
        if (res) {
          // setCards(res);
          setSearchResults(res);
        } else {
          // setCards([]);
          setSearchResults([]);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossOrigin="anonymous"
      ></script>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <NavLink className="navbar-brand text-info" to="/">
            BCard
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/about">
                  About
                </NavLink>
              </li>
              {user?.isAdmin === false && user?.isBusiness === true && (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/favcards"
                    >
                      Fav Cards
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/mycards"
                    >
                      My Cards
                    </NavLink>
                  </li>
                </>
              )}
              {user?.isAdmin === false && user.isBusiness === false && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/favcards"
                  >
                    Fav Cards
                  </NavLink>
                </li>
              )}
              {user?.isAdmin && user.isBusiness && (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/favcards"
                    >
                      Fav Cards
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/mycards"
                    >
                      My Cards
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/sandbox"
                    >
                      Sandbox
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div>
            <ul className="d-flex navbar-nav  mb-2 mb-lg-0 align-items-center">
              {/* <form className="d-flex" role="search" onSubmit={handleSubmit}> */}
              <input
                className="form-control me-2"
                type="text"
                // value={searchResults}
                // onChange={(e) => setSearchResults(e.target.value)}
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
              {/* <button
                  className="btn btn-outline-success me-3"
                  type="submit"
                  // onClick={() => {
                  //   navigate("/search?q=" + searchResults);
                  // }}
                >
                  Search
                </button> */}
              {/* </form> */}
              <li className="nav-item">
                {localStorage.getItem("darkMode") === "true" ? (
                  <i
                    className="bi bi-moon-fill nav-link"
                    onClick={() => toggleDarkMode(false)}
                    title="Dark Mode"
                  ></i>
                ) : (
                  <i
                    className="bi bi-moon nav-link"
                    onClick={() => toggleDarkMode(true)}
                    title="Light Mode"
                  ></i>
                )}
              </li>
              {user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/profile">
                      <i className="bi bi-person-circle"></i>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-info"
                      type="submit"
                      onClick={() => {
                        navigate("/login");
                        localStorage.removeItem("token");
                        setLoggedIn(false);
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
