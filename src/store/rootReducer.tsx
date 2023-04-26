import { combineReducers } from "redux";
import todosReducer from "./todos/todoReducer";

const rootReducer = combineReducers({
  todos: todosReducer,
});

export default rootReducer;
