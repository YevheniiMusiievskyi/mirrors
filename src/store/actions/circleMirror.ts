import {ArcMirrorCorner, ArcMirrorSide, CircleDimensions} from "../../models/circle";
import {Dispatch} from "redux";
import {circleMirrorSlice} from "../slices/circleMirrorSlice";

const { actions } = circleMirrorSlice;

export const setCircleCoordinates = (coordinates: CircleDimensions) => (dispatch: Dispatch) =>
    dispatch(actions.setCoordinates(coordinates))

export const setCircleDimensions = (circleDimensions: CircleDimensions) => (dispatch: Dispatch) =>
    dispatch(actions.setCircleDimensions(circleDimensions))

export const setArcMirrorCorner = (arcMirrorCorner: ArcMirrorCorner, arcMirrorSide: ArcMirrorSide) => (dispatch: Dispatch) =>
    dispatch(actions.setArcMirrorCorner({ arcMirrorCorner, arcMirrorSide }))