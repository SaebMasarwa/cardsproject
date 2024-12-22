import { FunctionComponent, useEffect } from "react";
import { getMyCards } from "../services/cardsService";
import React from "react";
import { CardType } from "../interfaces/Card";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { CardsAction, setMyCardsAction } from "../redux/CardsState";

interface MyCardsProps {}

const MyCards: FunctionComponent<MyCardsProps> = () => {
  // const [myCards, setMyCards] = React.useState<CardType[] | null>(null);
  let myCards = useSelector((state: any) => state.cardsState.cards);
  const dispatch = useDispatch<Dispatch<CardsAction>>();

  useEffect(() => {
    getMyCards().then((res) => {
      dispatch(setMyCardsAction(res as CardType[]));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
