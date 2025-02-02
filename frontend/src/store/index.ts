import { combineReducers } from "redux";
import { todoReducer } from "./modules/todo";

// src/index.js에서 쓰려고 export
export default combineReducers({
  todo: todoReducer,
});
