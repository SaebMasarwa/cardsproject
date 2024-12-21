import React, { useContext, useEffect } from "react";
import type { CardType } from "../interfaces/Card";
import { cardLikeStatus, deleteCard, likeCard } from "../services/cardsService";
import { UserContext } from "../context/userContext";
// import { useSelector } from "react-redux";

export default function Card({ card }: { card: CardType }) {
  const [showLike, setShowLike] = React.useState<boolean>(false);
  const { user } = useContext(UserContext);
  const handleLike = (cardId: string) => {
    likeCard(cardId);
  };

  useEffect(() => {
    cardLikeStatus(card._id).then((res) => setShowLike(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLike]);

  const handleDelete = (bizNumber: number, cardId: string) => {
    deleteCard(bizNumber, cardId);
  };

  return (
    <>
      <div
        className="card m-3 d-flex"
        style={{ width: "18rem" }}
        key={card._id}
      >
        <img
          src={card.image.url ? card.image.url : ""}
          className="card-img-top"
          alt={card.image.alt}
        />
        <div className="card-body">
          <h5 className="card-title">{card.title}</h5>
          <p className="card-text">{card.description}</p>
          <div className="d-flex justify-content-center align-items-end">
            {user?.isAdmin && (
              <a
                href="
            "
                className="btn btn-outline-info me-3"
                onClick={() => {
                  handleDelete(card.bizNumber, card._id);
                }}
              >
                <i className="bi bi-trash"></i>
              </a>
            )}
            <a href={`tel:${card.phone}`} className="btn btn-outline-info me-3">
              <i className="bi bi-telephone-fill"></i>
            </a>
            {user?.isBusiness && showLike ? (
              <a
                href="
            "
                className="btn btn-outline-info me-3"
                onClick={() => {
                  handleLike(card._id);
                  setShowLike(false);
                }}
              >
                <i className="bi bi-heart-fill"></i>
              </a>
            ) : (
              <a
                href="
            "
                className="btn btn-outline-info me-3"
                onClick={() => {
                  handleLike(card._id);
                  setShowLike(true);
                }}
              >
                <i className="bi bi-heart"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
