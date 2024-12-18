import { FunctionComponent, useEffect } from "react";
import { getMyCards } from "../services/cardsService";
import React from "react";
import { CardType } from "../interfaces/Card";
import Card from "./Card";

interface MyCardsProps {}

const MyCards: FunctionComponent<MyCardsProps> = () => {
  const [myCards, setMyCards] = React.useState<CardType[] | null>(null);

  useEffect(() => {
    getMyCards().then((res) => {
      setMyCards(res);
      console.log(res);
    });
  }, []);

  return (
    <>
      <div className="display-3">My Cards Page</div>
      <div className="d-flex flex-wrap">
        {myCards?.map((card: CardType) => {
          return (
            <div className="mx-auto">
              <Card card={card} key={card._id} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyCards;
