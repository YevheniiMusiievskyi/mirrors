import React from "react";
import {Circle, Layer, Stage} from "react-konva";
import {scaleCircleDimensions} from "../../helpers/circleCalculator";
import {CircleCoordinates, CircleDimensions, Quarter} from "../../models/circle";
import {calculateVerticalAlignLines} from "../../helpers/metricLinesCalculator";
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
    const fontSize = Math.round(radius / 15);
    const font = `${fontSize}px sans-serif`

    const diameterMetricsCoordinates = calculateVerticalAlignLines({
        x1: x,
        y1: y - radius,
        x2: x,
        y2: y + radius,
        toX: x - radius,
        fontSize,
        font,
        align: MetricDirection.VERTICAL,
        arrowPosition: ArrowPosition.LEFT
    })

    return (
        <div>
            <Stage width={1920} height={1080}>
                <Layer>
                    <Circle x={x} y={y} radius={radius} stroke='black' strokeWidth={2} dash={[10]}/>
                    <ArcMirror
                        circleCoordinates={circleCoordinates}
                        circleDimensions={scaledCircleDimensions}
                        quarter={Quarter.FOURTH}
                        font={font}
                        fontSize={fontSize}
                    />
                    {/*<Diameter circleCoordinates={circleCoordinates} />
                    <Line points={[x, y, x - radius, y]} stroke="blue" strokeWidth={2} />*/}
                    <MetricLines metricLinesInput={diameterMetricsCoordinates}/>
                </Layer>

            </Stage>
        </div>
    )
}

export default CircleMirror;