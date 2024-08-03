import {
    ArrowPosition, HorizontalMetricLinesInput,
    MetricDirection,
    MetricLinesCoordinates,
    MetricLinesInput,
    VerticalMetricLinesInput
} from "../models/metric";
import {CanvasTextMetrics} from "../models/circle";

/*export function calculateMetricLines(metricsInput: MetricLinesInput): MetricLinesCoordinates {
    return metricsInput.align === MetricDirection.VERTICAL
        ? calculateVerticalAlignLines(metricsInput)
        : calculateHorizontalAlignLines(metricsInput);
}*/

export function calculateVerticalAlignLines(metricsInput: VerticalMetricLinesInput): MetricLinesCoordinates {
    const x1 = metricsInput.x1;
    const y1 = metricsInput.y1;
    const x2 = metricsInput.x2;
    const y2 = metricsInput.y2;
    const isRight = metricsInput.arrowPosition === ArrowPosition.RIGHT

    const toX = isRight ? metricsInput.toX * 1.1 : metricsInput.toX * 0.9


    const arrowX1 = toX;
    const arrowY1 = y1;
    const arrowX2 = arrowX1;
    const arrowY2 = y2;

    const textMetrics = measureText(metricsInput.text, metricsInput.font);

    const textX = (arrowX1 + arrowX2) / 2 - textMetrics.height;
    const textY = (arrowY1 + arrowY2) / 2 + textMetrics.width / 2;
    const textRotation = -90;

    return {
        x1,
        x2,
        y1,
        y2,
        toX,
        arrow: {
            arrowX1,
            arrowY1,
            arrowX2,
            arrowY2,
        },
        text: metricsInput.text,
        fontSize: metricsInput.fontSize,
        textX,
        textY,
        textRotation,
        direction: MetricDirection.VERTICAL
    }
}

export function calculateHorizontalAlignLines(metricsInput: HorizontalMetricLinesInput): MetricLinesCoordinates {
    const x1 = metricsInput.x1;
    const y1 = metricsInput.y1;
    const x2 = metricsInput.x2;
    const y2 = metricsInput.y2;
    const isUp = metricsInput.arrowPosition === ArrowPosition.UP;

    const toY = isUp ? metricsInput.toY * 0.9 : metricsInput.toY * 1.1
    // const toY = metricsInput.toY

    const arrowX1 = x1;
    const arrowY1 = toY;
    const arrowX2 = x2;
    const arrowY2 = arrowY1;

    const textMetrics = measureText(metricsInput.text, metricsInput.font);
    const textX = (arrowX1 + arrowX2) / 2 - textMetrics.width / 2;
    const textY = (arrowY1 + arrowY2) / 2 - textMetrics.height;
    const textRotation = 0;

    return {
        x1,
        x2,
        y1,
        y2,
        toY,
        arrow: {
            arrowX1,
            arrowY1,
            arrowX2,
            arrowY2,
        },
        text: metricsInput.text,
        fontSize: metricsInput.fontSize,
        textX,
        textY,
        textRotation,
        direction: MetricDirection.HORIZONTAL
    }
}


function measureText(text: string, font: string): CanvasTextMetrics {
    const container = document.createElement('canvas');
    let context = container.getContext('2d');

    if (!context) {
        throw new Error("No canvas context")
    }

    context.font = font
    const textMetrics = context.measureText(text);

    return {
        width: textMetrics.width,
        height: textMetrics.fontBoundingBoxAscent + textMetrics.fontBoundingBoxDescent
    }
}
