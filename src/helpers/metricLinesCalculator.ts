import {ArrowPosition, MetricDirection, MetricLinesCoordinates, MetricLinesInput} from "../models/metric";
import {CanvasTextMetrics} from "../models/circle";

export function calculateMetricLines(metricsInput: MetricLinesInput): MetricLinesCoordinates {
    return metricsInput.align === MetricDirection.VERTICAL
        ? calculateVerticalAlignLines(metricsInput)
        : calculateHorizontalAlignLines(metricsInput);
}

function calculateVerticalAlignLines(metricsInput: MetricLinesInput): MetricLinesCoordinates {
    const width = metricsInput.distance;
    const height = metricsInput.length;

    const x1 = metricsInput.x * 0.95;
    const x2 = metricsInput.x + width;
    const y1 = metricsInput.y;
    const y2 = y1 + height;

    const arrowX1 = metricsInput.arrowPosition === ArrowPosition.RIGHT ? x2 : x1;
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
        arrowX1,
        arrowY1,
        arrowX2,
        arrowY2,
        text: metricsInput.text,
        fontSize: metricsInput.fontSize,
        textX,
        textY,
        textRotation,
        direction: MetricDirection.VERTICAL
    }
}

function calculateHorizontalAlignLines(metricsInput: MetricLinesInput): MetricLinesCoordinates {
    const width = metricsInput.distance;
    const height = metricsInput.length;

    const x1 = metricsInput.x;
    const x2 = x1 + width;
    const y1 = metricsInput.y * 0.95;
    const y2 = metricsInput.y + height;

    const arrowX1 = x1;
    const arrowY1 = metricsInput.arrowPosition === ArrowPosition.DOWN ? y2 : y1;
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
        arrowX1,
        arrowY1,
        arrowX2,
        arrowY2,
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
