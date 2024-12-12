import React, { useEffect, useState } from "react";
import { getMyCards } from "../services/cardsService";
import { CardType } from "../interfaces/Card";
import Card from "./Card";

function FavCards() {
  const [myFavCards, setMyFavCards] = useState<CardType[] | null>(null);

  useEffect(() => {
    getMyCards().then((res) => setMyFavCards(res));
  }, []);

  return (
    <>
      <div className="display-3">Favorite Cards</div>
      <div>
        {myFavCards?.length ? (
          myFavCards.map((card) => {
            return (
              <div className="mx-auto mt-4 d-flex">
                (<Card card={card} />)
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
