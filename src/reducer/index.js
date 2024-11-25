import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import teamSlice from "../slice/teamSlice";
import fileSlice from "../slice/fileSlice";


const rootReducer = combineReducers({
    auth: authSlice
});

export default rootReducer;