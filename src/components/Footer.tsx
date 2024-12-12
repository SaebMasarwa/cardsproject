import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
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
    </div>
  );
}
