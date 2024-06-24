export interface MetricLinesInput {
    x: number;
    y: number;
    distance: number;
    length: number;
    text: string;
    fontSize: number;
    font: string;
    align: MetricAlign;
}

export interface MetricLinesCoordinates {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    arrowX1: number;
    arrowY1: number;
    arrowX2: number;
    arrowY2: number;
    text: string;
    fontSize: number;
    textX: number;
    textY: number;
    textRotation: number;
    align: MetricAlign;
}

export enum MetricAlign {
    VERTICAL,
    HORIZONTAL
}