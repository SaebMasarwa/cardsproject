import { FunctionComponent, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import Card from "./Card";
import { CardType } from "../interfaces/Card";
import { searchCards } from "../services/cardsService";
import React from "react";
import { useSearchParams } from "react-router-dom";

interface SearchResultsProps {}

const SearchResults: FunctionComponent<SearchResultsProps> = () => {
  const [cards, setCards] = React.useState<CardType[] | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSearch = () => {
    const searchQuery = searchParams.get("q") || "";
    console.log(searchQuery);

    searchCards(searchQuery)
      .then((res) => {
        if (res) {
          setCards(res);
        } else {
          setCards([]);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="display-3">Search Results</div>
      {cards?.map((card: CardType) => (
        <Card card={card} />
      ))}
    </>
  );
};

export default SearchResults;
