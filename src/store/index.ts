import { configureStore } from "@reduxjs/toolkit";
import circleReducer from "./slices/circleSlice";

export const store = configureStore({
    reducer: {
        circle: circleReducer
    },
})

