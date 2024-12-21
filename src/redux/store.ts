import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cardsReducer } from "./CardsState";
// import { usersReducer } from "./UsersState";

const reducer = combineReducers({
  cardsState: cardsReducer,
});

const store = configureStore({ reducer });

export default store;
