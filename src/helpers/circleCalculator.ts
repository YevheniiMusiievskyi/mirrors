import {ArcMirrorCoordinates, CanvasTextMetrics, CircleCoordinates, CircleDimensions, Quarter} from "../models/circle";

type Coefficient = -1 | 1;

interface Coefficients {
    xCoeff: Coefficient;
    yCoeff: Coefficient;
    clockwise: boolean;
}

const quarterCoefficients = new Map<Quarter, Coefficients>()
    .set(Quarter.FIRST, { xCoeff: 1, yCoeff: -1, clockwise: true})
    .set(Quarter.SECOND, { xCoeff: -1, yCoeff: -1, clockwise: false })
    .set(Quarter.THIRD, { xCoeff: -1, yCoeff: 1, clockwise: true })
    .set(Quarter.FOURTH, { xCoeff: 1, yCoeff: 1, clockwise: false})

export function calculateArcMirrorCoordinates(circleDimensions: CircleDimensions, coordinates: CircleCoordinates, quarter: Quarter): ArcMirrorCoordinates {
    const scale = coordinates.radius / (circleDimensions.diameter / 2);
    const radius = coordinates.radius;
    const width = circleDimensions.width * scale;
    const upperHeight = circleDimensions.upperHeight * scale;

    const coefficients = quarterCoefficients.get(quarter);
    if (!coefficients) {
        throw new Error("Wrong quarter")
    }

    const x = coordinates.x + coefficients.xCoeff * (radius - width);
    const y = coordinates.y + coefficients.yCoeff * (radius - upperHeight);

    const x2 = coefficients.xCoeff * Math.sqrt(Math.pow(radius, 2) - Math.pow(y - coordinates.y, 2)) + coordinates.x
    const y2 = coefficients.yCoeff * Math.sqrt(Math.pow(radius, 2) - Math.pow(x - coordinates.x, 2)) + coordinates.y

    const startAngle = Math.atan2(y - coordinates.y, x2 - coordinates.x)
    const endAngle = Math.atan2(y2 - coordinates.y, x - coordinates.x);

    return {
        x,
        y,
        x2,
        y2,
        startAngle,
        endAngle,
        clockwise: coefficients.clockwise
    }
}