import axios from "axios";
import { CardType } from "../interfaces/Card";
import { jwtDecode } from "jwt-decode";
import { ExtendedjwrPayload } from "../interfaces/User";

const api: string = `${process.env.REACT_APP_API}/cards`;

// Get all cards
export async function getAllCards() {
  const res = await axios.get<CardType[]>(api);
  return res;
}

// Get my favorite cards
export async function getFavCards() {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode<ExtendedjwrPayload>(token as string);
  const userId = decoded._id;
  try {
    const resAllCards = await getAllCards();
    console.log(resAllCards);

    const allCards = resAllCards.data;
    const favCards = allCards.filter((card) => card.likes.includes(userId));
    console.log(favCards);

    return favCards;
  } catch (error) {
    console.log(error);
  }
}

// Get card by id
export async function getCardById(id: string) {
  return await axios.get<CardType>(`${api}/${id}`);
}

// Get my cards
export async function getMyCards(): Promise<CardType[] | null> {
  const token = localStorage.getItem("token");
  try {
    const cards = await axios.get(`${api}/my-cards`, {
      headers: {
        "x-auth-token": token,
      },
    });

    return cards.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Like/Unlike a card
export async function likeCard(cardId: string) {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.patch(`${api}/${cardId}`, null, {
      headers: {
        "x-auth-token": token,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

// Get like status of a card
export async function cardLikeStatus(cardId: string) {
  try {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode<ExtendedjwrPayload>(token as string);
    const userId = decoded._id;
    const res = await axios.get(`${api}/${cardId}`, {
      headers: {
        "x-auth-token": token,
      },
    });

    const isLiked = await res.data.likes.includes(userId);
    return isLiked;
  } catch (error) {
    console.log(error);
  }
}

// Create card
export async function createCard(card: CardType) {
  const token = localStorage.getItem("token");
  try {
    return await axios.post(api, card, {
      headers: {
        "x-auth-token": token,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

// Search cards
export async function searchCards(query: string) {
  try {
    let res = await getAllCards();
    let cards = res.data;
    let newCards = cards.filter((card: CardType) => card.title.includes(query));
    return newCards;
  } catch (error) {
    console.log(error);
  }
}

// Delete card
export async function deleteCard(bizNumber: number, cardId: string) {
  const token = localStorage.getItem("token");
  try {
    return await axios.delete(`${api}/${cardId}`, {
      headers: {
        "x-auth-token": token,
      },
      data: bizNumber,
    });
  } catch (error) {
    console.log(error);
  }
}
