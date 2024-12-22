import React, { useContext, useEffect } from "react";
import type { CardType } from "../interfaces/Card";
import { deleteCard } from "../services/cardsService";
import { UserContext } from "../context/userContext";
import { NavLink } from "react-router-dom";
import LikeButton from "./LikeButton";
// import { useSelector } from "react-redux";

export default function Card({ card }: { card: CardType }) {
  // const [showLike, setShowLike] = React.useState<boolean>(false);
  const { user } = useContext(UserContext);
  // const handleLike = (cardId: string) => {
  //   likeCard(cardId);
  // };

  useEffect(() => {
    // cardLikeStatus(card._id).then((res) => setShowLike(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          src={card.image.url}
          className="card-img-top"
          alt={card.image.alt}
        />
        <div className="card-body">
          <h5 className="card-title">{card.title}</h5>
          <p className="card-text">{card.description}</p>
          <div className="d-flex justify-content-center align-items-end">
            {user?.isAdmin && (
              <NavLink
                to="
            "
                className="btn btn-outline-info me-3"
                onClick={() => {
                  handleDelete(card.bizNumber as number, card._id as string);
                }}
              >
                <i className="bi bi-trash"></i>
              </NavLink>
            )}
            {user && (
              <NavLink
                to="
            "
                className="btn btn-outline-info me-3"
                onClick={() => {
                  handleDelete(card.bizNumber as number, card._id as string);
                }}
              >
                <i className="bi bi-trash"></i>
              </NavLink>
            )}
            <NavLink
              to={`tel:${card.phone}`}
              className="btn btn-outline-info me-3"
            >
              <i className="bi bi-telephone-fill"></i>
            </NavLink>
            {user && card._id && <LikeButton cardId={card._id} />}
          </div>
        </div>
      </div>
    </>
  );
}
