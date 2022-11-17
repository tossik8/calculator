import { createSlice } from "@reduxjs/toolkit"

const dipslaySlice = createSlice({
    name: "display",
    initialState:{
        equation: "",
        isEmpty: true,
        isDecimal: false,
        values:[],
        index:0
    },
    reducers:{
        handleInput(state, action){
            state.equation +=action.payload;
        },
        handleEmpty(state, action){
            state.isEmpty = action.payload;
        },
        handleDecimal(state, action){
            state.isDecimal = action.payload;
        },
        changeSign(state, action){
            state.equation = action.payload;
        },
        clearInput(state){
            state.equation = "";
            state.isDecimal = false;
            state.isEmpty = true;
        }
    }
})

export const displayActions = dipslaySlice.actions;
export default dipslaySlice;
