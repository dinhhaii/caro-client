import * as actionType from "./actionType";
// import * as constant from "../utils/constants";

export const sendData = data => ({
  type: actionType.SEND_DATA_MESSAGE,
  data
});

export const receiveData = data => ({
  type: actionType.RECEIVE_DATA_MESSAGE,
  data
});
