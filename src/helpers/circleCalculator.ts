import {
    ArcMirrorCoordinates,
    ArcMirrorInput,
    CircleCoordinates,
    CircleDimensions,
    CutForm,
    Quarter
} from "../models/circle";

type Coefficient = -1 | 1;

interface Coefficients {
    xCoeff: Coefficient;
    yCoeff: Coefficient;
    clockwise: boolean;
}

const quarterCoefficients = new Map<Quarter, Coefficients>()
    .set(Quarter.FIRST, {xCoeff: 1, yCoeff: -1, clockwise: true})
    .set(Quarter.SECOND, {xCoeff: -1, yCoeff: -1, clockwise: false})
    .set(Quarter.THIRD, {xCoeff: -1, yCoeff: 1, clockwise: true})
    .set(Quarter.FOURTH, {xCoeff: 1, yCoeff: 1, clockwise: false})

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
    const coefficients = getCoefficients(quarter)
    const {x, y, x2, y2, cutForm} = getArcCoordinates(coordinates, arcMirror, coefficients)
    console.log(JSON.stringify(cutForm))

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
        scale: arcMirror.scale,
        cutForm
    }
}

function getCoefficients(quarter: Quarter): Coefficients {
    const coefficients = quarterCoefficients.get(quarter);
    if (!coefficients) {
        throw new Error("Wrong quarter")
    }
    return coefficients;
}

function getArcCoordinates(circle: CircleCoordinates, arcMirror: ArcMirrorInput, coefficients: Coefficients) {
    const {width, height} = arcMirror

    let x = getX(circle, width, coefficients)
    let y = getY(circle, height, coefficients)
    let x2 = 0
    let y2 = 0

    let cutForm = getCutForm(circle, x, y)

    if (cutForm === CutForm.SEMI_ARC) {
        ({x, y} = adjustPointToCircle(circle, x, y))
        x2 = getX2(circle, y, coefficients)
        y2 = getY2(circle, x, coefficients)
    } else if (cutForm === CutForm.HORIZONTAL_ARC) {
        ({x, x2} = findXBounds(circle, y, coefficients))
        y2 = y
    } else if (cutForm === CutForm.VERTICAL_ARC) {
        ({y, y2} = findYBounds(circle, x, coefficients))
        x2 = x
    }

    return {x, y, x2, y2, cutForm}
}

function getX(coordinates: CircleCoordinates, width: number, coefficients: Coefficients): number {
    return coordinates.x + coefficients.xCoeff * (coordinates.radius - width)
}

function getY(coordinates: CircleCoordinates, height: number, coefficients: Coefficients): number {
    return coordinates.y + coefficients.yCoeff * (coordinates.radius - height);
}

// getX2 for point on circle
function getX2(circle: CircleCoordinates, y: number, coefficients: Coefficients): number {
    return coefficients.xCoeff * Math.sqrt(Math.pow(circle.radius, 2) - Math.pow(y - circle.y, 2)) + circle.x
}

// getY2 for point on circle
function getY2(circle: CircleCoordinates, x: number, coefficients: Coefficients) {
    return coefficients.yCoeff * Math.sqrt(Math.pow(circle.radius, 2) - Math.pow(x - circle.x, 2)) + circle.y
}

function getCutForm(circle: CircleCoordinates, x: number, y: number): CutForm {
    const dx = x - circle.x;
    const dy = y - circle.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    const radiusSquaredDX = Math.pow(circle.radius, 2) - dx * dx;
    const radiusSquaredDY = Math.pow(circle.radius, 2) - dy * dy;

    // if both x and y beyond the square it's also SEMI_ARC with adjusted coordinates
    if (d <= circle.radius || (radiusSquaredDX < 0 && radiusSquaredDY < 0)) {
        return CutForm.SEMI_ARC;
    }

    return Math.abs(dx) >= Math.abs(dy) ? CutForm.HORIZONTAL_ARC : CutForm.VERTICAL_ARC
}

// adjust both x and y coordinate to circle
function adjustPointToCircle(circle: CircleCoordinates, x: number, y: number) {
    const dx = x - circle.x;
    const dy = y - circle.y;
    const d = Math.sqrt(dx * dx + dy * dy);

    if (d <= circle.radius) {
        return { x, y };
    }

    let x_new = circle.x + (dx * circle.radius) / d;
    let y_new = circle.y + (dy * circle.radius) / d;

    return { x: x_new, y: y_new };
}

// find x coordinates if horizontal coordinates beyond circle
function findXBounds(coordinates: CircleCoordinates, y: number, coefficients: Coefficients) {
    const dy = Math.abs(coordinates.y - y);
    const radiusSquaredDY = Math.pow(coordinates.radius, 2) - dy * dy;

    // Якщо значення під коренем від'ємне, y виходить за межі кола
    if (radiusSquaredDY < 0) {
        throw new Error("y beyond the circle"); // Немає значень x, при такому y
    }

    const sqrtVal = Math.sqrt(radiusSquaredDY);
    const x = coordinates.x - coefficients.xCoeff * sqrtVal;
    const x2 = coordinates.x + coefficients.xCoeff * sqrtVal;

    return {x, x2};
}

// find y coordinates if horizontal coordinates beyond circle
function findYBounds(coordinates: CircleCoordinates, x: number, coefficients: Coefficients) {
    const dx = coordinates.x - x;
    const radiusSquaredDX = Math.pow(coordinates.radius, 2) - dx * dx;

    // Якщо значення під коренем від'ємне, y виходить за межі кола
    if (radiusSquaredDX < 0) {
        throw new Error("x beyond the circle"); // Немає значень y, при такому x
    }

    const sqrtVal = Math.sqrt(radiusSquaredDX);
    const y = coordinates.y - coefficients.yCoeff * sqrtVal;
    const y2 = coordinates.y + coefficients.yCoeff * sqrtVal;

    return {y, y2};
}