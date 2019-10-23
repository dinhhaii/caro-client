import * as actionType from "../actions/actionType";
// import callAPI from "../utils/apiCaller";

const initialState = {
  name: "",
  gender: "",
  username: "",
  password: "",
  loading: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_USER:
      var { username, password, gender, name } = action.user;
      return {
        ...state,
        loading: false,
        username: username,
        password: password,
        gender: gender,
        name: name
      };
    case actionType.REQUEST_USER:
      return { ...state, loading: true };
    case actionType.RECIEVE_USER:
      return {
        ...state,
        loading: false,
        username: action.user.username
      };
    default:
      return state;
  }
};

export default user;
