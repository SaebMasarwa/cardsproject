import { FunctionComponent, useContext, useEffect, useState } from "react";
import { getAllCards, searchCards } from "../services/cardsService";
import { CardType } from "../interfaces/Card";
import Card from "../components/Card";
import { UserContext } from "../context/userContext";
import { useDispatch, useSelector } from "react-redux";
import { CardsAction, setAllCardsAction } from "../redux/CardsState";
import { Dispatch } from "redux";
import { NavLink } from "react-router-dom";
import { reactToastifyError } from "../misc/reactToastify";
import { Pagination } from "react-bootstrap";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const { user, searchResults, setSearchResults } = useContext(UserContext);
  let cards = useSelector((state: any) => state.cardsState.cards);
  const dispatch = useDispatch<Dispatch<CardsAction>>();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [cardPaginationStart, setcardPaginationStart] = useState(0);
  const [cardPaginationEnd, setcardPaginationEnd] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    const start = (page - 1) * 10;
    const end = start + 10;
    setcardPaginationStart(start);
    setcardPaginationEnd(end);
  };

  useEffect(() => {
    getAllCards()
      .then((res) => {
        dispatch(setAllCardsAction(res.data));
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
        reactToastifyError("Failed to fetch cards");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardsToDisplay = cards
    .slice(cardPaginationStart, cardPaginationEnd)
    .map((card: CardType) => {
      return (
        <div className="mx-auto d-flex flex-wrap">
          <Card card={card} key={card._id} />
        </div>
      );
    });

  const handleSearch = (searchQuery: string) => {
    searchCards(searchQuery)
      .then((res) => {
        if (res) {
          setSearchResults(res);
        }
      })
      .catch((err) => {
        console.log(err);
        reactToastifyError(err);
      });
  };

  return (
    <>
      {/* Search input */}
      <input
        className="form-control w-50 mx-auto my-3"
        type="text"
        placeholder="Start typing to search"
        aria-label="Search"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      {/* Search results display */}
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
          <Pagination className="d-flex justify-content-center my-3">
            <Pagination.First onClick={() => onPageChange(1)} />
            <Pagination.Prev
              onClick={() =>
                onPageChange(currentPage - 1 > 0 ? currentPage - 1 : 1)
              }
            />
            {Array.from({ length: Math.ceil(cards.length / 10) }).map(
              (el, index) => {
                return (
                  <>
                    <Pagination.Item
                      key={index}
                      active={index + 1 === currentPage}
                      onClick={() => onPageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  </>
                );
              }
            )}
            <Pagination.Next onClick={() => onPageChange(currentPage + 1)} />
            <Pagination.Last
              onClick={() => onPageChange(Math.ceil(cards.length / 10))}
            />
          </Pagination>
          <div className="container-fluid">
            <div className="d-flex flex-wrap">{cardsToDisplay}</div>
          </div>
          <Pagination className="d-flex justify-content-center my-3">
            <Pagination.First onClick={() => onPageChange(1)} />
            <Pagination.Prev
              onClick={() =>
                onPageChange(currentPage - 1 > 0 ? currentPage - 1 : 1)
              }
            />
            {Array.from({ length: Math.ceil(cards.length / 10) }).map(
              (el, index) => {
                return (
                  <>
                    <Pagination.Item
                      key={index}
                      active={index + 1 === currentPage}
                      onClick={() => onPageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  </>
                );
              }
            )}
            <Pagination.Next onClick={() => onPageChange(currentPage + 1)} />
            <Pagination.Last
              onClick={() => onPageChange(Math.ceil(cards.length / 10))}
            />
          </Pagination>
        </>
      )}
    </>
  );
};

export default Home;
