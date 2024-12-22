import { FunctionComponent, useContext, useEffect } from "react";
import { getAllCards, searchCards } from "../services/cardsService";
import { CardType } from "../interfaces/Card";
import Card from "../components/Card";
import { UserContext } from "../context/userContext";
import { useDispatch, useSelector } from "react-redux";
import { CardsAction, setAllCardsAction } from "../redux/CardsState";
import { Dispatch } from "redux";
import { NavLink } from "react-router-dom";
import { reactToastifyError } from "../misc/reactToastify";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const { user, searchResults, setSearchResults } = useContext(UserContext);
  let cards = useSelector((state: any) => state.cardsState.cards);
  const dispatch = useDispatch<Dispatch<CardsAction>>();

  useEffect(() => {
    getAllCards().then((res) => dispatch(setAllCardsAction(res.data)));
  }, []);

  const handleSearch = (searchQuery: string) => {
    searchCards(searchQuery)
      .then((res) => {
        if (res) {
          setSearchResults(res);
        }
        // else {
        //   // setSearchResults([]);
        // }
      })
      .catch((err) => {
        console.log(err);
        reactToastifyError(err);
      });
  };

  return (
    <>
      <input
        className="form-control w-50 mx-auto my-3"
        type="text"
        placeholder="Start typing to search"
        aria-label="Search"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
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
      {cards?.length && searchResults === null && (
        <>
          <div className="display-3">Cards Page</div>
          {user?.isBusiness && (
            <NavLink to="/addcard" className="my-3 btn btn-info">
              Add Card
            </NavLink>
          )}
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
      )}
    </>
  );
};

export default Home;
