import * as actionType from "./actionType";
import * as constant from "../utils/constants";
import callAPI from "../utils/apiCaller";
import axios from "axios";

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
        dispatch(receiveUser(res.data));
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
        const data = res.data;
        if (res) {
          localStorage.setItem(constant.TOKEN_USER, data.token);
          dispatch(receiveUser(data));
          dispatch({ type: actionType.IS_LOGIN_USER });
        }
      })
      .catch(err => console.log(err));
  };
}

export function checkLoginUser(token) {
  return function(dispatch) {
    // const token = localStorage.getItem(constant.TOKEN_USER);
    const authString = "Bearer ".concat(token);
    const url = constant.API_URL + "/me";
    return axios
      .get(url, {
        headers: {
          Authorization: authString
        }
      })
      .then(res => {
        console.log(res);
        if (res) {
          dispatch(receiveUser(res.data));
          dispatch({ type: actionType.IS_LOGIN_USER });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function logoutUser() {
  return function(dispatch) {
    const data_user = localStorage.getItem(constant.TOKEN_USER);
    if (data_user) {
      localStorage.removeItem(constant.TOKEN_USER);
    }
    dispatch({ type: actionType.RESET_USER });
  };
}
