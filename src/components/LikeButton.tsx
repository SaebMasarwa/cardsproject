import { FunctionComponent, useEffect } from "react";
import { cardLikeStatus, likeCard } from "../services/cardsService";
import React from "react";
import { NavLink } from "react-router-dom";

interface LikeButtonProps {
  cardId: string;
}

const LikeButton: FunctionComponent<LikeButtonProps> = ({ cardId }) => {
  const [showLike, setShowLike] = React.useState<boolean>();
  const handleLike = (cardId: string) => {
    likeCard(cardId);
  };

  useEffect(() => {
    cardLikeStatus(cardId).then((res) => setShowLike(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLike]);

  return (
    <>
      {showLike ? (
        <NavLink
          to="
            "
          className="btn btn-outline-info me-3"
          onClick={() => {
            handleLike(cardId);
            setShowLike(false);
          }}
        >
          <i className="bi bi-heart-fill"></i>
        </NavLink>
      ) : (
        <NavLink
          to="
            "
          className="btn btn-outline-info me-3"
          onClick={() => {
            handleLike(cardId);
            setShowLike(true);
          }}
        >
          <i className="bi bi-heart"></i>
        </NavLink>
      )}
    </>
  );
};

export default LikeButton;
