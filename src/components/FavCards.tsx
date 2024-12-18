import React, { useEffect, useState } from "react";
import { getFavCards } from "../services/cardsService";
import { CardType } from "../interfaces/Card";
import Card from "./Card";

function FavCards() {
  const [myFavCards, setMyFavCards] = useState<CardType[] | null>(null);

  useEffect(() => {
    getFavCards().then((res) => setMyFavCards(res || []));
  }, []);

  return (
    <>
      <div className="display-3">Favorite Cards</div>
      <div className="d-flex flex-wrap">
        {myFavCards?.length ? (
          myFavCards.map((card: CardType) => {
            return (
              <div className="mx-auto d-flex">
                <Card card={card} key={card._id} />
              </div>
            );
          })
        ) : (
          <div className="display-3 text-danger">No cards found</div>
        )}
      </div>
    </>
  );
}

export default FavCards;
