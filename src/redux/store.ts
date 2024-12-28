import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cardsReducer } from "./CardsState";

const reducer = combineReducers({
  cardsState: cardsReducer,
});

const store = configureStore({ reducer });

export default store;
