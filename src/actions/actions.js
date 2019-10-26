import * as actionType from "./actionType";
import callAPI from "../utils/apiCaller";

export const getUser = user => ({
  type: actionType.GET_USER,
  user
});

export const requestUser = () => ({
  type: actionType.REQUEST_USER
});

export const receiveUser = user => ({
  type: actionType.RECEIVE_USER,
  user
});

export function registerUser(user) {
  return function(dispatch) {
    dispatch(requestUser());
    var { username, password, gender, name } = user;

    return callAPI("/user/register", "POST", {
      username: username,
      password: password,
      gender: gender,
      name: name
    })
      .then(res => {
        dispatch(receiveUser(res));
      })
      .catch(err => console.log(err));
  };
}

export function loginUser(user) {
  return function(dispatch) {
    dispatch(requestUser());
    var { username, password } = user;
    return callAPI("/user/login", "POST", {
      username: username,
      password: password
    })
      .then(res => {
        console.log(res);
        dispatch(receiveUser(res.data));
        dispatch({ type: actionType.IS_LOGIN_USER });
      })
      .catch(err => console.log(err));
  };
}
