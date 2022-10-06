import { createSlice } from "@reduxjs/toolkit"

export interface CounterState{
    title: string,
    data: number,
}

const initialState :CounterState = {
    title: "This is a dummy title for toolkit .Kindly Adhere to it.",
    data: 44,
}

export const counterSlice = createSlice({
    name : "counter",
    initialState,
    reducers: {
        increment:(state ,action) =>{
            state.data += action.payload;
        },
        decrement:(state ,action) =>{
            state.data -= action.payload;
        }
    }
});

export const {increment,decrement} =counterSlice.actions;