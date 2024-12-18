import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAllCards } from "../services/cardsService";
import { CardType } from "../interfaces/Card";
import Card from "./Card";
import { UserContext } from "../context/userContext";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const navigate: NavigateFunction = useNavigate();
  const { searchResults, setSearchResults } = useContext(UserContext);
  const [cards, setCards] = useState<CardType[] | null>(null);

  useEffect(() => {
    getAllCards().then((res) => setCards(res.data));
  }, [cards]);

  return (
    <>
      {searchResults?.length && (
        <>
          <div className="display-3">Search Results Page</div>
          <div className="container-fluid">
            <div className="d-flex flex-wrap">
              {searchResults.map((card: CardType) => {
                return (
                  <div className="mx-auto d-flex flex-wrap">
                    <Card card={card} key={card._id} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      {
        cards?.length && searchResults === null && (
          <>
            <div className="display-3">Cards Page</div>
            <div className="container-fluid">
              <div className="d-flex flex-wrap">
                {cards.map((card: CardType) => {
                  return (
                    <div className="mx-auto d-flex flex-wrap">
                      <Card card={card} key={card._id} />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )
        // : (
        //   <div className="spinner-border text-primary mx-auto" role="status">
        //     <span className="visually-hidden">Loading...</span>
        //   </div>
        // )
      }
    </>
  );
};

export default Home;
