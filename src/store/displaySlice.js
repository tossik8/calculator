import { createSlice } from "@reduxjs/toolkit"

const dipslaySlice = createSlice({
    name: "display",
    initialState:{
        equation: "",
        values:[],
        index:0
    },
    reducers:{
        handleInput(state, action){
            state.equation +=action.payload;
        },
        clearInput(state){
            state.equation = "";
        },
        solveEquation(state){

        }
    }
})

export const displayActions = dipslaySlice.actions;
export default dipslaySlice;
