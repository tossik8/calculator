import { configureStore } from "@reduxjs/toolkit";
import inputSlice from "./inputSlice";
import dipslaySlice from "./displaySlice";

const store = configureStore({
    reducer:{
        inputReducer: inputSlice.reducer,
        displayReducer: dipslaySlice.reducer
    }
})
export default store;
