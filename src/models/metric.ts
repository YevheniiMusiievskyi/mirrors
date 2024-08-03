export interface MetricLinesInput {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    text: string;
    fontSize: number;
    font: string;
    align: MetricDirection;
    arrowPosition?: ArrowPosition
}

export interface VerticalMetricLinesInput extends MetricLinesInput {
    toX: number;
}

export interface HorizontalMetricLinesInput extends MetricLinesInput {
    toY: number;
}

export interface MetricLinesCoordinates {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    toX?: number;
    toY?: number;
    arrow: ArrowCoordinates;
    text: string;
    fontSize: number;
    textX: number;
    textY: number;
    textRotation: number;
    direction: MetricDirection;
}

export interface ArrowCoordinates {
    arrowX1: number;
    arrowY1: number;
    arrowX2: number;
    arrowY2: number;
}

export enum MetricDirection {
    VERTICAL,
    HORIZONTAL
}

export enum ArrowPosition {
    LEFT,
    RIGHT,
    UP,
    DOWN
}