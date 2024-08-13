import { configureStore } from "@reduxjs/toolkit";
import circleReducer from "./slices/circleMirrorSlice";

export const store = configureStore({
    reducer: {
        circleMirror: circleReducer
    },
})

export type IRootState = ReturnType<typeof store.getState>

