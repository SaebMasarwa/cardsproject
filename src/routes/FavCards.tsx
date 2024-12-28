import { useEffect, useState } from "react";
import { getFavCards } from "../services/cardsService";
import { CardType } from "../interfaces/Card";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { CardsAction, setMyFavCardsAction } from "../redux/CardsState";
import { reactToastifyError } from "../misc/reactToastify";
import { Pagination } from "react-bootstrap";

function FavCards() {
  let myFavCards = useSelector((state: any) => state.cardsState.cards);
  const dispatch = useDispatch<Dispatch<CardsAction>>();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [cardPaginationStart, setcardPaginationStart] = useState(0);
  const [cardPaginationEnd, setcardPaginationEnd] = useState(10);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    const start = (page - 1) * 10;
    const end = start + 10;
    setcardPaginationStart(start);
    setcardPaginationEnd(end);
  };

  useEffect(() => {
    getFavCards()
      .then((res) => {
        dispatch(setMyFavCardsAction(res || []));
      })
      .catch((err) => {
        console.log(err);
        reactToastifyError("Failed to fetch favorite cards");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardsToDisplay = myFavCards
    .slice(cardPaginationStart, cardPaginationEnd)
    .map((card: CardType) => {
      return (
        <div className="mx-auto d-flex flex-wrap">
          <Card card={card} key={card._id} />
        </div>
      );
    });

  return (
    <>
      <div className="display-3">Favorite Cards</div>
      <Pagination className="d-flex justify-content-center my-3">
        {Array.from({ length: Math.ceil(myFavCards.length / 10) }).map(
          (el, index) => {
            return (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            );
          }
        )}
      </Pagination>
      <div className="d-flex flex-wrap">
        {myFavCards?.length ? (
          cardsToDisplay
        ) : (
          <div className="display-3 text-danger mx-auto">No cards found</div>
        )}
      </div>

      <Pagination className="d-flex justify-content-center my-3">
        {Array.from({ length: Math.ceil(myFavCards.length / 10) }).map(
          (el, index) => {
            return (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            );
          }
        )}
      </Pagination>
    </>
  );
}

export default FavCards;
