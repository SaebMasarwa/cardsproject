import React, { useEffect, useState } from "react";
import { getAllCards } from "../services/cardsService";
import { CardType } from "../interfaces/Card";
import Card from "./Card";

export default function Home() {
  const [cards, setCards] = useState<CardType[] | null>(null);
  useEffect(() => {
    getAllCards().then((res) => setCards(res.data));
  }, []);

  return (
    <>
      <div className="display-3">Cards Page</div>
      <p>Here you can see featured cards.</p>
      <div className="mx-auto d-flex flex-row">
        {cards ? (
          <div className="mx-auto mt-4 d-flex">
            <Card card={cards[0]} />
            <Card card={cards[1]} />
            <Card card={cards[2]} />
            <Card card={cards[3]} />
          </div>
        ) : (
          <div className="spinner-border text-primary mx-auto" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </>
  );
}
