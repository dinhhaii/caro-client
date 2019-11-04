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
        const data = res.data;
        if (!data.username) {
          dispatch({ type: actionType.RESET_USER });
        }
        dispatch(receiveUser(data));
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
    const authString = "Bearer ".concat(token);
    const authUrlLocalStrategy = constant.API_URL.concat("/me");
    const authUrlGoogleStrategy = constant.OAUTH_GOOGLE.concat(token);
    const authUrlFacebookStrategy = constant.API_URL.concat(
      `/auth/facebook?token=${token}`
    );
    return axios
      .get(authUrlLocalStrategy, {
        headers: {
          Authorization: authString
        }
      })
      .then(resultLS => {
        console.log(resultLS);
        if (resultLS.data) {
          dispatch(receiveUser(resultLS.data));
          dispatch({ type: actionType.IS_LOGIN_USER });
        }
      })
      .catch(err => {
        axios
          .get(authUrlGoogleStrategy)
          .then(resultGS => {
            console.log(resultGS);
            if (resultGS.data) {
              dispatch(receiveUser(resultGS.data));
              dispatch({ type: actionType.IS_LOGIN_USER });
            }
          })
          .catch(err => {
            axios.get(authUrlFacebookStrategy).then(resultFS => {
              console.log(resultFS.data);
              if (resultFS.data) {
                dispatch(receiveUser(resultFS.data));
                dispatch({ type: actionType.IS_LOGIN_USER });
              }
            });
          });
      });
  };
}

export function loginGoogleAndFacebook(user) {
  return function(dispatch) {
    if (user) {
      localStorage.setItem(constant.TOKEN_USER, user.token);
      dispatch(receiveUser(user));
      dispatch({ type: actionType.IS_LOGIN_USER });
    }
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
