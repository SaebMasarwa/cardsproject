import { User } from "../interfaces/User";

// Users state
export class UsersState {
  public users: User | null = null;
}

// action type
export enum UsersActionType {
  AddUser = "AddUser",
  UpdateUser = "UpdateUser",
  DeleteUser = "DeleteUser",
  SetUser = "SetUser",
}

// action = type + payload
export interface UsersAction {
  type: UsersActionType;
  payload: any;
}

// actions creators
// components will use those functions in order to create an action and change the state
export function addUserAction(user: User): UsersAction {
  return { type: UsersActionType.AddUser, payload: user };
}

export function updatePostAction(user: User): UsersAction {
  return { type: UsersActionType.UpdateUser, payload: user };
}

export function deletePostAction(id: number): UsersAction {
  return { type: UsersActionType.DeleteUser, payload: id };
}

export function setUserAction(user: User[] | null): UsersAction {
  return { type: UsersActionType.SetUser, payload: user };
}

// reducer
export function usersReducer(
  currentState: UsersState = new UsersState(),
  action: UsersAction
): UsersState {
  // create a deep copy of currentState
  const newState: UsersState = {
    ...currentState,
    users: currentState.users,
  };
  switch (action.type) {
    case UsersActionType.AddUser:
      newState.users = action.payload;
      break;
    // case UsersActionType.UpdateUser:
    //   let indexToUpdate = newState.users.findIndex(
    //     (user: User) => user._id === action.payload.id
    //   );
    //   newState.users[indexToUpdate] = action.payload;
    //   break;
    // case UsersActionType.DeleteUser:
    //   let indexToDelete = newState.users.findIndex(
    //     (user: User) => user._id === action.payload
    //   );
    //   newState.users.splice(indexToDelete, 1);
    //   break;
    case UsersActionType.SetUser:
      newState.users = action.payload;
      break;
  }
  return newState;
}
