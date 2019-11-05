import * as actionType from "../actions/actionType";
import * as constant from "../utils/constants";
import socketIOClient from "socket.io-client";

const initialState = {
  socket: socketIOClient(constant.API_URL),
  partner: null,
  isLoading: false
};

const socket = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_PARTNER:
      return { ...state, partner: action.partner, isLoading: false };
    case actionType.REMOVE_PARTNER:
      return { ...state, partner: null };
    case actionType.REQUEST_PARTNER:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export default socket;
