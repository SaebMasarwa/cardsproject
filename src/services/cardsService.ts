import axios from "axios";
import { CardType } from "../interfaces/Card";

const api: string = `${process.env.REACT_APP_API}/cards`;

// Get all cards
export async function getAllCards() {
  return await axios.get<CardType[]>(api);
}

// Get card by id
export async function getCardById(id: string) {
  return await axios.get<CardType>(`${api}/${id}`);
}

// Get my cards
export async function getMyCards(): Promise<CardType[] | null> {
  const token = localStorage.getItem("token");
  if (!token) return Promise.resolve(null);
  const cards = await axios.get(`${api}/my-cards`, {
    headers: {
      "x-auth-token": token,
    },
  });
  console.log(cards);

  return cards.data;
}

// Like/Unlike a card
export async function likeCard(cardId: string) {
  const token = localStorage.getItem("token");
  if (!token) return Promise.resolve(null);
  const res = await axios.patch(`${api}/${cardId}`, "", {
    headers: {
      "x-auth-token": token,
    },
  });
  return res;
}

// Create card
export async function createCard(card: CardType) {
  const token = localStorage.getItem("token");
  if (!token) return Promise.resolve(null);
  return await axios.post(api, card, {
    headers: {
      "x-auth-token": token,
    },
  });
}
