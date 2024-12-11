import React, { useEffect, useState } from "react";
import { getMyCards } from "../services/cardsService";
import { CardType } from "../interfaces/Card";

export default function FavCards() {
  const [myFavCards, setMyFavCards] = useState<CardType[] | null>(null);

  useEffect(() => {
    async function fetchCards() {
      const cards = await getMyCards();
      setMyFavCards(cards);
    }
    fetchCards();
  }, []);

  return (
    <>
      <div>Favorite Cards</div>
      <div>
        {myFavCards?.map((card) => {
          return (
            <div key={card._id}>
              <div>{card.title}</div>
              <div>{card.description}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
