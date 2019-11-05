import games from "./games";
import users from "./users";
import chat from "./chat";
import socket from "./sockets";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  games: games,
  users: users,
  chat: chat,
  sockets: socket
});

export default rootReducer;
