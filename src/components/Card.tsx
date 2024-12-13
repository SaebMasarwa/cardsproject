import React from "react";
import type { CardType } from "../interfaces/Card";
import { likeCard } from "../services/cardsService";

export default function Card({ card }: { card: CardType }) {
  // const [like, setLike] = React.useState<boolean>(false);

  const handleLike = (cardId: string) => {
    likeCard(cardId);
  };
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
          <a href={`tel:${card.phone}`} className="btn btn-outline-primary">
            <i className="bi bi-telephone-fill"></i>
          </a>
          <a
            href="#"
            className="btn btn-outline-primary ms-3"
            onClick={() => handleLike(card._id)}
          >
            <i className="bi bi-heart-fill"></i>
          </a>
        </div>
      </div>
    </>
  );
}
