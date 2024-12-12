import { FunctionComponent, useEffect } from "react";
import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";
import { userManagement } from "../hooks/useUser";
import { User } from "../interfaces/User";

interface NavbarProps {
  toggleDarkMode: (mode: boolean) => void;
  user?: User;
  renderControl: boolean;
  setRenderControl: (control: boolean) => void;
}

const Navbar: FunctionComponent<NavbarProps> = ({
  toggleDarkMode,
  user,
  renderControl,
  setRenderControl,
}) => {
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [toggleDarkMode, user, userManagement.renderControl]);

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
              {user?.isBusiness && (
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
            </ul>
          </div>
          <div>
            <ul className="d-flex navbar-nav  mb-2 mb-lg-0 align-items-center">
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
              {userManagement.loggedIn ? (
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
                        navigate("/");
                        localStorage.removeItem("token");
                        userManagement.renderControl = false;
                        setRenderControl(false);
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
