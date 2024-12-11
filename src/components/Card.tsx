import React from "react";
import type { CardType } from "../interfaces/Card";

export default function Card({ card }: { card: CardType }) {
  return (
    <>
      <div className="card m-3" style={{ width: "20rem" }} key={card._id}>
        <img
          src={card.image.url}
          className="card-img-top"
          alt={card.image.alt}
        />
        <div className="card-body">
          <h5 className="card-title">{card.title}</h5>
          <p className="card-text">{card.description}</p>
          {/* <a href="#" className="btn btn-primary">
            Go somewhere
          </a> */}
        </div>
      </div>
    </>
  );
}
