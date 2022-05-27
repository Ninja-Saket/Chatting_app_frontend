import { combineReducers } from "redux";
import authReducer from "./auth";
import chatReducer from "./auth";

export default combineReducers({
  authReducer,
  chatReducer,
});
