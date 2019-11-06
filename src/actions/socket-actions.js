import * as constant from "../utils/constants";
import * as actionType from "../actions/actionType";

export const findPartner = (socket, data) => {
  return function(dispatch) {
    dispatch({ type: actionType.REQUEST_PARTNER });
    dispatch({ type: actionType.REMOVE_PARTNER });
    dispatch({ type: actionType.SET_ACTION, name: "turn", value: true });
    socket.emit(constant.SOCKET_FIND_PARTNER, data);
    socket.on(constant.SOCKET_RESPONSE_PARTNER, res => {
      if (res) {
        dispatch({ type: actionType.ADD_PARTNER, partner: res });
      }
      socket.emit(constant.SOCKET_FIND_PARTNER, data);
    });
  };
};
