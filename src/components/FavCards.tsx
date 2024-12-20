import React, { useEffect, useState } from "react";
import { getFavCards } from "../services/cardsService";
import { CardType } from "../interfaces/Card";
import Card from "./Card";

import { useDispatch, useSelector } from "react-redux";

import { Dispatch } from "redux";
import { CardsAction, setMyFavCardsAction } from "../redux/CardsState";

function FavCards() {
  // const [myFavCards, setMyFavCards] = useState<CardType[] | null>(null);
  let myFavCards = useSelector((state: any) => state.cardsState.cards);
  const dispatch = useDispatch<Dispatch<CardsAction>>();

  useEffect(() => {
    getFavCards().then((res) => {
      console.log(res);
      dispatch(setMyFavCardsAction(res || []));
    });
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
          <div className="display-3 text-danger mx-auto">No cards found</div>
        )}
      </div>
    </>
  );
}

export default FavCards;
