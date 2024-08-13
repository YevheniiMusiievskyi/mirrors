import {
    ArcMirrorCoordinates,
    ArcMirrorInput,
    CanvasTextMetrics,
    CircleCoordinates,
    CircleDimensions,
    Quarter
} from "../models/circle";

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

export function scaleCircleDimensions(circleDimensions: CircleDimensions, scale: number): CircleDimensions {
    return {
        cutSide: circleDimensions.cutSide,
        diameter: circleDimensions.diameter * scale,
        width: circleDimensions.width * scale,
        upperHeight: circleDimensions.upperHeight ? circleDimensions.upperHeight * scale : undefined,
        lowerHeight: circleDimensions.lowerHeight ? circleDimensions.lowerHeight * scale : undefined
    }
}

export function calculateArcMirrorCoordinates(coordinates: CircleCoordinates, arcMirror: ArcMirrorInput, quarter: Quarter): ArcMirrorCoordinates {
    const radius = coordinates.radius;
    const { width, height } = arcMirror

    const coefficients = quarterCoefficients.get(quarter);
    if (!coefficients) {
        throw new Error("Wrong quarter")
    }

    const x = coordinates.x + coefficients.xCoeff * (radius - width);
    const y = coordinates.y + coefficients.yCoeff * (radius - height);

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
        clockwise: coefficients.clockwise,
        quarter,
        scale: arcMirror.scale
    }
}