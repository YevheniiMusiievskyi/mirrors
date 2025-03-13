import React from "react";
import {ArcMirrorCoordinates, CircleCoordinates, CutForm, Quarter} from "../../models/circle";
import {calculateHorizontalAlignLines, calculateVerticalAlignLines} from "../../helpers/metricLinesCalculator";
import {ArrowPosition, MetricDirection} from "../../models/metric";
import MetricLines from "../MetricLines";

export interface IArcMirrorMetricLines {
    circleCoordinates: CircleCoordinates;
    arcMirrorCoordinates: ArcMirrorCoordinates;
    font: string;
    fontSize: number;
}

interface VerticalQuarterSpecificCoordinates {
    arrowPosition: ArrowPosition;
}

interface HorizontalQuarterSpecificCoordinates {
    arrowPosition: ArrowPosition;
}

interface OuterWidthQuarterSpecificCoordinates {
    x2: number;
    arrowPosition: ArrowPosition;
}

interface OuterHeightQuarterSpecificCoordinates {
    y1: number;
    toX: number;
    arrowPosition: ArrowPosition;
}


interface QuarterSpecificCoordinates {
    outerWidth: OuterWidthQuarterSpecificCoordinates,
    innerWidth: HorizontalQuarterSpecificCoordinates
    outerHeight: OuterHeightQuarterSpecificCoordinates,
    innerHeight: VerticalQuarterSpecificCoordinates,
}

const getQuarterSpecificCoordinates = (quarter: Quarter, circleCoordinates: CircleCoordinates): QuarterSpecificCoordinates => {
    const upperQuarter = quarter === Quarter.FIRST || quarter === Quarter.SECOND
    const rightQuarter = quarter === Quarter.FIRST || quarter === Quarter.FOURTH
    const {x, radius} = circleCoordinates
    return {
        outerWidth: {
            x2: rightQuarter ? x + radius : x - radius,
            arrowPosition: upperQuarter ? ArrowPosition.UP : ArrowPosition.DOWN
        },
        innerWidth: {
            arrowPosition: upperQuarter ? ArrowPosition.UP : ArrowPosition.DOWN
        },
        outerHeight: {
            y1: upperQuarter ? x - radius : x + radius,
            toX: rightQuarter ? x + radius : x - radius,
            arrowPosition: rightQuarter ? ArrowPosition.RIGHT : ArrowPosition.LEFT
        },
        innerHeight: {
            arrowPosition: rightQuarter ? ArrowPosition.LEFT : ArrowPosition.RIGHT
        }
    }
}

const ArcMirrorMetricLines: React.FC<IArcMirrorMetricLines> = ({
                                                                   circleCoordinates,
                                                                   arcMirrorCoordinates,
                                                                   font,
                                                                   fontSize
                                                               }) => {
    const quarterSpecificCoordinates = getQuarterSpecificCoordinates(arcMirrorCoordinates.quarter, circleCoordinates)

    const outerWidth = arcMirrorCoordinates.cutForm !== CutForm.HORIZONTAL_ARC && calculateHorizontalAlignLines({
        x1: arcMirrorCoordinates.x,
        y1: arcMirrorCoordinates.y2,
        x2: quarterSpecificCoordinates.outerWidth.x2,
        y2: circleCoordinates.y,
        toY: arcMirrorCoordinates.y2,
        fontSize,
        font,
        align: MetricDirection.HORIZONTAL,
        arrowPosition: quarterSpecificCoordinates.outerWidth.arrowPosition,
        scale: arcMirrorCoordinates.scale
    }, circleCoordinates.radius)

    const innerWidth = arcMirrorCoordinates.cutForm !== CutForm.VERTICAL_ARC && calculateHorizontalAlignLines({
        x1: arcMirrorCoordinates.x,
        y1: arcMirrorCoordinates.y,
        x2: arcMirrorCoordinates.x2,
        y2: arcMirrorCoordinates.y,
        toY: arcMirrorCoordinates.y,
        fontSize,
        font,
        align: MetricDirection.HORIZONTAL,
        arrowPosition: quarterSpecificCoordinates.innerWidth.arrowPosition,
        scale: arcMirrorCoordinates.scale
    }, circleCoordinates.radius)

    const outerHeight = arcMirrorCoordinates.cutForm !== CutForm.VERTICAL_ARC && calculateVerticalAlignLines({
        x1: circleCoordinates.x,
        y1: quarterSpecificCoordinates.outerHeight.y1,
        x2: arcMirrorCoordinates.x2,
        y2: arcMirrorCoordinates.y,
        toX: quarterSpecificCoordinates.outerHeight.toX,
        fontSize,
        font,
        align: MetricDirection.VERTICAL,
        arrowPosition: quarterSpecificCoordinates.outerHeight.arrowPosition,
        scale: arcMirrorCoordinates.scale
    }, circleCoordinates.radius)

    const innerHeight = arcMirrorCoordinates.cutForm !== CutForm.HORIZONTAL_ARC && calculateVerticalAlignLines({
        x1: arcMirrorCoordinates.x,
        y1: arcMirrorCoordinates.y,
        x2: arcMirrorCoordinates.x,
        y2: arcMirrorCoordinates.y2,
        toX: arcMirrorCoordinates.x,
        fontSize,
        font,
        align: MetricDirection.VERTICAL,
        arrowPosition: quarterSpecificCoordinates.innerHeight.arrowPosition,
        scale: arcMirrorCoordinates.scale
    }, circleCoordinates.radius)

    return <>
        {outerWidth && <MetricLines metricLinesInput={outerWidth}/>}
        {innerWidth && <MetricLines metricLinesInput={innerWidth}/>}
        {outerHeight && <MetricLines metricLinesInput={outerHeight}/>}
        {innerHeight && <MetricLines metricLinesInput={innerHeight}/>}
    </>
}

export default ArcMirrorMetricLines;