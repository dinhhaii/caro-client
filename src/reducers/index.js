import reducer from "./games";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  reducer: reducer
});

export default rootReducer;
