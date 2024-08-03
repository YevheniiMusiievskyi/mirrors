export interface CircleDimensions {
    diameter: number;
    width: number;
    upperHeight: number;
    lowerHeight: number;
}

export interface CircleCoordinates {
    x: number;
    y: number;
    radius: number;
}

export interface ArcMirrorCoordinates {
    x: number;
    y: number;
    x2: number;
    y2: number;
    startAngle: number;
    endAngle: number;
    clockwise: boolean;
    quarter: Quarter;
}

export interface CanvasTextMetrics {
    width: number;
    height: number;
}

export enum Quarter {
    FIRST,
    SECOND,
    THIRD,
    FOURTH
}