import { FunctionComponent, useEffect } from "react";
import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";
import { userManagement } from "../hooks/useUser";
import { getCurrentUserById } from "../services/usersService";

interface NavbarProps {
  toggleDarkMode: (mode: boolean) => void;
}

const Navbar: FunctionComponent<NavbarProps> = ({ toggleDarkMode }) => {
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      navigate("/");
      const token = localStorage.getItem("token");
      if (token) {
        userManagement.user = getCurrentUserById();
      }
    }
  }, []);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-dark text-light"
        data-bs-theme="dark"
      >
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
            </ul>
          </div>
          <div>
            <ul className="d-flex navbar-nav  mb-2 mb-lg-0">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success me-3" type="submit">
                  Search
                </button>
              </form>
              <li className="nav-link">
                {localStorage.getItem("darkMode") === "true" ? (
                  <i
                    className="bi bi-moon-fill"
                    onClick={() => toggleDarkMode(false)}
                    title="Dark Mode"
                  ></i>
                ) : (
                  <i
                    className="bi bi-moon"
                    onClick={() => toggleDarkMode(true)}
                    title="Light Mode"
                  ></i>
                )}
              </li>
              {userManagement.loggedIn ? (
                <button
                  className="btn btn-outline-info"
                  type="submit"
                  onClick={() => {
                    navigate("/");
                    localStorage.removeItem("token");
                  }}
                >
                  Logout
                </button>
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
