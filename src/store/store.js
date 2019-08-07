import { createStore, combineReducers } from "redux";
import { columnReducer, tableReducer, profileReducer } from "../reducers";

export default createStore(
    combineReducers({
        columnCount: columnReducer,
        tableData: tableReducer,
        profileLength: profileReducer,
    }),
);
