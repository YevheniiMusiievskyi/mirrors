import React from "react";
import {ArcMirrorCoordinates, CircleCoordinates, CircleDimensions} from "../../models/circle";
import {calculateMetricLines} from "../../helpers/metricLinesCalculator";
import {ArrowPosition, MetricDirection} from "../../models/metric";
import MetricLines from "../MetricLines";

export interface IArcMirrorMetricLines {
    circleCoordinates: CircleCoordinates;
    circleDimensions: CircleDimensions;
    arcMirrorCoordinates: ArcMirrorCoordinates;
    font: string;
    fontSize: number;
}

const ArcMirrorMetricLines: React.FC<IArcMirrorMetricLines> = ({ circleCoordinates, circleDimensions, arcMirrorCoordinates, font, fontSize }) => {
    const {y, radius} = circleCoordinates

    const outerHeight = calculateMetricLines({
        x1: circleCoordinates.x,
        y1: y - radius,
        distance: Math.max(circleDimensions.width, radius),
        length: circleDimensions.upperHeight,
        text: "Висота зверху",
        fontSize,
        font,
        align: MetricDirection.VERTICAL,
        arrowPosition: ArrowPosition.RIGHT
    })

    const innerHeight = calculateMetricLines({
        x1: arcMirrorCoordinates.x,
        y1: arcMirrorCoordinates.y2,
        distance: Math.min(circleDimensions.width, radius),
        length: Math.abs(arcMirrorCoordinates.y - arcMirrorCoordinates.y2),
        text: "D",
        fontSize,
        font,
        align: MetricDirection.VERTICAL,
        arrowPosition: ArrowPosition.LEFT
    })

    const innerWidth = calculateMetricLines({
        x1: arcMirrorCoordinates.x,
        y1: arcMirrorCoordinates.y2,
        distance: circleDimensions.width,
        length: circleDimensions.upperHeight,
        text: "C",
        fontSize,
        font,
        align: MetricDirection.HORIZONTAL,
        arrowPosition: ArrowPosition.DOWN
    })

    return <>
        <MetricLines metricLinesInput={outerHeight} />
        <MetricLines metricLinesInput={innerHeight} />
        <MetricLines metricLinesInput={innerWidth} />
    </>
}

export default ArcMirrorMetricLines;