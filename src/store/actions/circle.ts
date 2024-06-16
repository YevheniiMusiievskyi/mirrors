import {CircleDimensions} from "../../models/circle";
import {Dispatch} from "redux";
import {circleSlice} from "../slices/circleSlice";

const { actions } = circleSlice;

export const setCircleCoordinates = (coordinates: CircleDimensions) => (dispatch: Dispatch) =>
    dispatch(actions.setCoordinates(coordinates))