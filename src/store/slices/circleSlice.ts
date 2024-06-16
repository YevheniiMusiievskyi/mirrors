import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    x: number;
    y: number;
    radius: number;
}

const initialState: InitialState = {
    x: 0,
    y: 0,
    radius: 1
}

export const circleSlice = createSlice({
    name: "circleMirror",
    initialState,
    reducers: {
        setCoordinates(state, { payload }) {
            state.x = payload.x;
            state.y = payload.y;
            state.radius = payload.radius;
        }
    }
})

export default circleSlice.reducer