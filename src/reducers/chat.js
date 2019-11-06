import * as actionType from "../actions/actionType";

const initialState = {
  chatHistory: []
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SEND_DATA_MESSAGE:
      return {
        ...state,
        chatHistory: state.chatHistory.concat(action.data)
      };
    case actionType.RECEIVE_DATA_MESSAGE:
      return {
        ...state,
        chatHistory: state.chatHistory.concat(action.data)
      };
    default:
      return state;
  }
};

export default chat;
