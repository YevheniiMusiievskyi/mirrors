export interface CircleDimensions {
    cutSide: CutSide;
    diameter: number;
    width: number;
    upperHeight?: number;
    lowerHeight?: number;
}

export interface CircleCoordinates {
    x: number;
    y: number;
    radius: number;
}

export interface ArcMirrorInput {
    diameter: number;
    width: number;
    height: number;
    scale: number;
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
    scale: number;
}

export interface ArcMirrorCorner {
    x: number;
    y: number;
}

export enum ArcMirrorSide {
    UPPER,
    LOWER
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

export enum CutSide {
    LEFT,
    RIGHT
}