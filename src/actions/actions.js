import * as actionType from "./actionType";
// import callAPI from "../utils/apiCaller";

export const getUser = user => ({
  type: actionType.GET_USER,
  user
});

export const requestUser = () => ({
  type: actionType.REQUEST_USER
});

export const receiveUser = user => ({
  type: actionType.RECIEVE_USER,
  user
});

export function fetchUser(user) {
  return function(dispatch) {
    dispatch(requestUser());
    var { username, password, gender, name } = user;
    return fetch("http://localhost:3000/user/register", {
      method: "POST",
      body: {
        username: username,
        password: password,
        gender: gender,
        name: name
      }
    })
      .then(res => {
        console.log(res);
        dispatch(receiveUser(res));
      })
      .catch(err => console.log(err));
  };
}
