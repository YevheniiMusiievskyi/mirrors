import React from "react";
import {Circle, Layer, Line, Stage} from "react-konva";
import {calculateArcMirrorCoordinates} from "../../helpers/circleCalculator";
import {CircleCoordinates, CircleDimensions, Quarter} from "../../models/circle";
import ArcMirror from "../ArcMirror";
import Diameter from "../Diameter";
import {calculateMetricLines} from "../../helpers/metricLinesCalculator";
import {MetricAlign} from "../../models/metric";
import MetricLines from "../MetricLines";

const radius = 300;
const x = 500;
const y = 500;

const circleDimensions: CircleDimensions = {
    diameter: 200,
    width: 100,
    upperHeight: 120,
    lowerHeight: 50
}

const CircleMirror = () => {

    const circleCoordinates: CircleCoordinates = {x, y, radius}
    const scale = radius / (circleDimensions.diameter / 2);
    const scaledCircleDimensions = {
        diameter: circleDimensions.diameter * scale,
        width: circleDimensions.width * scale,
        upperHeight: circleDimensions.upperHeight * scale,
        lowerHeight: circleDimensions.lowerHeight * scale
    }
    const acrMirrorCoordinates = calculateArcMirrorCoordinates(circleDimensions, circleCoordinates, Quarter.FIRST)
    const fontSize = Math.round(radius / 10);
    const font = `${fontSize}px sans-serif`
    const diameterMetricsCoordinates = calculateMetricLines({
        x: x - radius,
        y: y - radius,
        distance: 2 * radius,
        length: 2 * radius,
        text: "Діаметер",
        fontSize,
        font,
        align: MetricAlign.VERTICAL
    })

    const widthMetricsCoordinates = calculateMetricLines({
        x: acrMirrorCoordinates.x,
        y: acrMirrorCoordinates.y2,
        distance: scaledCircleDimensions.width,
        length: scaledCircleDimensions.upperHeight,
        text: "Ширина",
        fontSize,
        font,
        align: MetricAlign.HORIZONTAL
    })

    return (
        <div>
            <Stage width={1920} height={1080}>
                <Layer>
                    <Circle x={x} y={y} radius={radius} stroke='black' strokeWidth={2} dash={[10]}/>
                    <ArcMirror
                        circleCoordinates={circleCoordinates}
                        arcMirrorCoordinates={acrMirrorCoordinates}
                    />
                    {/*<Diameter circleCoordinates={circleCoordinates} />
                    <Line points={[x, y, x - radius, y]} stroke="blue" strokeWidth={2} />*/}
                    <MetricLines metricLinesInput={diameterMetricsCoordinates} />
                    <MetricLines metricLinesInput={widthMetricsCoordinates} />
                </Layer>

            </Stage>
        </div>
    )
}

export default CircleMirror;