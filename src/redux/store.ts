import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cardsReducer } from "./CardsState";
import { usersReducer } from "./UsersState";

const reducer = combineReducers({
  cardsState: cardsReducer,
  usersState: usersReducer,
});
// const reducer = combineReducers({postsState: postsReducer, usersState: usersReducer})
const store = configureStore({ reducer });

export default store;
