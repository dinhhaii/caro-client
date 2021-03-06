import * as actionType from "../actions/actionType";

const initialState = {
  name: "",
  gender: "male",
  username: "",
  password: "",
  picture: "",
  type: "",
  loading: false,
  success: false,
  isLogin: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_USER:
      var { username, password, gender, name, type } = action.user;
      return {
        ...state,
        loading: false,
        username: username,
        password: password,
        gender: gender,
        name: name,
        type: type
      };
    case actionType.REQUEST_USER:
      return { ...state, loading: true, success: false };
    case actionType.RECEIVE_USER:
      return {
        ...state,
        username: action.user.username,
        gender: action.user.gender,
        name: action.user.name,
        picture: action.user.picture,
        type: action.user.type,
        loading: false,
        success: true
      };
    case actionType.RESET_USER:
      return { ...initialState };
    case actionType.SET_INFO_USER:
      return { ...state, [action.name]: action.value };
    case actionType.IS_LOGIN_USER:
      return { ...state, isLogin: true };
    default:
      return state;
  }
};

export default user;
