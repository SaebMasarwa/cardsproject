import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function Footer() {
  const { user } = useContext(UserContext);
  // let user = useSelector((state: any) => state.usersState.user);
  return (
    <div className="mt-5">
      <figure className="figure">
        <i className="bi bi-info-circle"></i>
        <figcaption className="figure-caption">
          <NavLink
            className="text-decoration-none"
            aria-current="page"
            to="/about"
          >
            About
          </NavLink>
        </figcaption>
      </figure>
      {user !== null && (
        <>
          <figure className="figure ms-3">
            <i className="bi bi-heart-fill"></i>
            <figcaption className="figure-caption">
              <NavLink
                className="text-decoration-none"
                aria-current="page"
                to="/favcards"
              >
                Favorites
              </NavLink>
            </figcaption>
          </figure>
        </>
      )}
      {user?.isBusiness && (
        <figure className="figure ms-3">
          <i className="bi bi-card-list"></i>
          <figcaption className="figure-caption">
            <NavLink
              className="text-decoration-none"
              aria-current="page"
              to="/mycards"
            >
              My Cards
            </NavLink>
          </figcaption>
        </figure>
      )}
    </div>
  );
}
