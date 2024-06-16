import {ArcMirrorCoordinates, CircleDimensions, CircleCoordinates} from "../models/circle";

export function calculateArcMirrorCoordinates(circleDimensions: CircleDimensions, coordinates: CircleCoordinates): ArcMirrorCoordinates {
    const scale = coordinates.radius / (circleDimensions.diameter / 2);
    const radius = coordinates.radius;
    const diameter = circleDimensions.diameter * scale;
    const width = circleDimensions.width * scale;
    const upperHeight = circleDimensions.upperHeight * scale;
    const lowerHeight = circleDimensions.lowerHeight * scale;

    const x2 = coordinates.x + radius;
    const y2 = coordinates.y - radius;
    const x = x2 - width;
    const y = y2 + upperHeight;


    const startAngle = Math.atan2(y2 - coordinates.y, x - coordinates.x);
    const endAngle = Math.atan2(y - coordinates.y, x2 - coordinates.x)

    return {
        x,
        y,
        x2,
        y2,
        startAngle,
        endAngle
    }
}