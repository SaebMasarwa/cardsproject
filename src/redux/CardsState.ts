import { CardType } from "../interfaces/Card";

// cards state
export class CardsState {
  public cards: CardType[] = [];
}

// action type
export enum CardsActionType {
  AddCard = "AddCard",
  UpdateCard = "UpdateCard",
  DeleteCard = "DeleteCard",
  SetAllCards = "SetAllCards",
  SetMyFavCards = "SetMyFavCards",
  SetMyCards = "SetMyCards",
}

// action = type + payload
export interface CardsAction {
  type: CardsActionType;
  payload: any;
}

// actions creators
// components will use those functions in order to create an action and change the state
export function addCardAction(card: CardType): CardsAction {
  return { type: CardsActionType.AddCard, payload: card };
}

export function updateCardAction(card: CardType): CardsAction {
  return { type: CardsActionType.UpdateCard, payload: card };
}

export function deleteCardAction(id: number): CardsAction {
  return { type: CardsActionType.DeleteCard, payload: id };
}

export function setAllCardsAction(cards: CardType[]): CardsAction {
  return { type: CardsActionType.SetAllCards, payload: cards };
}
export function setMyFavCardsAction(cards: CardType[]): CardsAction {
  return { type: CardsActionType.SetMyFavCards, payload: cards };
}
export function setMyCardsAction(cards: CardType[]): CardsAction {
  return { type: CardsActionType.SetMyCards, payload: cards };
}

// reducer
export function cardsReducer(
  currentState: CardsState = new CardsState(),
  action: CardsAction
): CardsState {
  // create a deep copy of currentState
  const newState: CardsState = {
    ...currentState,
    cards: [...currentState.cards],
  };
  switch (action.type) {
    case CardsActionType.AddCard:
      newState.cards.push(action.payload);
      break;
    case CardsActionType.UpdateCard:
      let indexToUpdate = newState.cards.findIndex(
        (card: CardType) => card._id === action.payload._id
      );
      newState.cards[indexToUpdate] = action.payload;
      break;
    case CardsActionType.DeleteCard:
      let indexToDelete = newState.cards.findIndex(
        (card: CardType) => card._id === action.payload
      );
      newState.cards.splice(indexToDelete, 1);
      break;
    case CardsActionType.SetAllCards:
      newState.cards = action.payload;
      break;
    case CardsActionType.SetMyFavCards:
      newState.cards = action.payload;
      break;
    case CardsActionType.SetMyCards:
      newState.cards = action.payload;
  }
  return newState;
}
