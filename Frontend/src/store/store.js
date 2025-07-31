import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../autnSlice';
import toggleReducer from "../toggleSlice";
export const store= configureStore({
    reducer:{
        auth:authReducer,
        toggle: toggleReducer,
    },
  
});