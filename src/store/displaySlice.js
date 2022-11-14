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
            state.values[state.index]  = action.payload;
        },
        substituteSign(state, action){
            state.values[state.index-1] = action.payload;
        },
        handleSign(state, action){
            state.values[++state.index] = action.payload;
            console.log(state.values[state.index++])
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
