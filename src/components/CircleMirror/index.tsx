import React from "react";
import {Circle, Layer, Stage} from "react-konva";
import {calculateArcMirrorCoordinates, scaleCircleDimensions} from "../../helpers/circleCalculator";
import {CircleCoordinates, CircleDimensions, Quarter} from "../../models/circle";
import {calculateMetricLines} from "../../helpers/metricLinesCalculator";
import {ArrowPosition, MetricDirection} from "../../models/metric";
import MetricLines from "../MetricLines";
import ArcMirror from "../ArcMirror";

const radius = 300;
const x = 500;
const y = 500;

const circleCoordinates: CircleCoordinates = {x, y, radius}

const circleDimensions: CircleDimensions = {
    diameter: 200,
    width: 80,
    upperHeight: 150,
    lowerHeight: 50
}

const CircleMirror = () => {

    const scaledCircleDimensions = scaleCircleDimensions(circleDimensions, circleCoordinates);
    const arcMirrorCoordinates = calculateArcMirrorCoordinates(circleCoordinates, scaledCircleDimensions, Quarter.FIRST)
    const fontSize = Math.round(radius / 15);
    const font = `${fontSize}px sans-serif`

    const diameterMetricsCoordinates = calculateMetricLines({
        x1: x - radius,
        y1: y - radius,
        distance: 2 * radius,
        length: 2 * radius,
        text: "Діаметер",
        fontSize,
        font,
        align: MetricDirection.VERTICAL,
        arrowPosition: ArrowPosition.LEFT
    })

    const widthMetricsCoordinates = calculateMetricLines({
        x1: arcMirrorCoordinates.x,
        y1: arcMirrorCoordinates.y2,
        distance: scaledCircleDimensions.width,
        length: Math.min(scaledCircleDimensions.upperHeight, radius),
        text: "Ширина",
        fontSize,
        font,
        align: MetricDirection.HORIZONTAL,
        arrowPosition: ArrowPosition.UP
    })

    const upperHeightOuter = calculateMetricLines({
        x1: circleCoordinates.x,
        y1: y - radius,
        distance: Math.max(scaledCircleDimensions.width, radius),
        length: scaledCircleDimensions.upperHeight,
        text: "Висота зверху",
        fontSize,
        font,
        align: MetricDirection.VERTICAL,
        arrowPosition: ArrowPosition.RIGHT
    })

    const upperHeightInner = calculateMetricLines({
        x1: arcMirrorCoordinates.x,
        y1: arcMirrorCoordinates.y2,
        distance: Math.min(scaledCircleDimensions.width, radius),
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
        distance: scaledCircleDimensions.width,
        length: scaledCircleDimensions.upperHeight,
        text: "C",
        fontSize,
        font,
        align: MetricDirection.HORIZONTAL,
        arrowPosition: ArrowPosition.DOWN
    })

    return (
        <div>
            <Stage width={1920} height={1080}>
                <Layer>
                    <Circle x={x} y={y} radius={radius} stroke='black' strokeWidth={2} dash={[10]}/>
                    <ArcMirror
                        circleCoordinates={circleCoordinates}
                        circleDimensions={scaledCircleDimensions}
                        quarter={Quarter.FIRST}
                        font={font}
                        fontSize={fontSize}
                    />
                    {/*<Diameter circleCoordinates={circleCoordinates} />
                    <Line points={[x, y, x - radius, y]} stroke="blue" strokeWidth={2} />*/}
                    <MetricLines metricLinesInput={diameterMetricsCoordinates}/>
                    <MetricLines metricLinesInput={widthMetricsCoordinates}/>
                    <MetricLines metricLinesInput={upperHeightOuter} />
                    <MetricLines metricLinesInput={upperHeightInner} />
                    <MetricLines metricLinesInput={innerWidth} />
                </Layer>

            </Stage>
        </div>
    )
}

export default CircleMirror;