import games from "./games";
import users from "./users";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  games: games,
  users: users
});

export default rootReducer;
