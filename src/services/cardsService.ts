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
  return cards.data;
}
