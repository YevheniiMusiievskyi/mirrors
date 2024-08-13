import {createSlice} from "@reduxjs/toolkit";
import {ArcMirrorCorner, ArcMirrorSide, CircleDimensions, CutSide} from "../../models/circle";

interface InitialState {
    x: number;
    y: number;
    radius: number;
    circleDimensions: CircleDimensions;
    upperArcMirrorCorner: ArcMirrorCorner;
    lowerArcMirrorCorner: ArcMirrorCorner;
}

const initialState: InitialState = {
    x: 0,
    y: 0,
    radius: 1,
    circleDimensions: {
        cutSide: CutSide.RIGHT,
        diameter: 200,
        width: 80,
        upperHeight: 95,
        lowerHeight: 50
    },
    upperArcMirrorCorner: {
        x: 0,
        y: 0
    },
    lowerArcMirrorCorner: {
        x: 0,
        y: 0
    }
}

export const circleMirrorSlice = createSlice({
    name: "circleMirror",
    initialState,
    reducers: {
        setCoordinates(state, { payload }) {
            state.x = payload.x;
            state.y = payload.y;
            state.radius = payload.radius;
        },
        setCircleDimensions(state, { payload }) {
            state.circleDimensions = payload
        },
        setArcMirrorCorner(state, { payload }) {
            if (payload.arcMirrorSide === ArcMirrorSide.UPPER) {
                state.upperArcMirrorCorner = payload.arcMirrorCorner
            } else {
                state.lowerArcMirrorCorner = payload.arcMirrorCorner
            }
        }
    }
})

export default circleMirrorSlice.reducer;