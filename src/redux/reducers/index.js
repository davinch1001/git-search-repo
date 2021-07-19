import {combineReducers} from "redux";
import reposReducer from "./reposReducer";

const rootReducer = () => combineReducers({reposReducer});

export default rootReducer;