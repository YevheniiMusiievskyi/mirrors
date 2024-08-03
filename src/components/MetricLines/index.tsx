import {MetricDirection, MetricLinesCoordinates} from "../../models/metric";
import {Arrow, Line, Text} from "react-konva";
import React from "react";

interface MetricLinesProps {
    metricLinesInput: MetricLinesCoordinates
}

const strokeWidth = 0.5;
const stroke = "black"

const MetricLines: React.FC<MetricLinesProps> = ({metricLinesInput}) => {
    const {x1, y1, x2, y2} = metricLinesInput
    const {arrowX1, arrowY1, arrowX2, arrowY2} = metricLinesInput.arrow
    const toX = metricLinesInput.toX ? metricLinesInput.toX : -1;
    const toY = metricLinesInput.toY ? metricLinesInput.toY : -1;

    return (
        <>
            {
                metricLinesInput.direction === MetricDirection.VERTICAL
                    ? (
                        <>
                            <Line points={[x1, y1, toX, y1]} strokeWidth={strokeWidth} stroke={stroke}/>
                            <Line points={[x2, y2, toX, y2]} strokeWidth={strokeWidth} stroke={stroke}/>
                        </>
                    )
                    : (
                        <>
                            <Line points={[x1, y1, x1, toY]} strokeWidth={strokeWidth} stroke={stroke}/>
                            <Line points={[x2, y2, x2, toY]} strokeWidth={strokeWidth} stroke={stroke}/>
                        </>
                    )
            }
            <Arrow
                points={[arrowX1, arrowY1, arrowX2, arrowY2]}
                pointerAtBeginning={true}
                pointerAtEnding={true}
                strokeWidth={strokeWidth}
                stroke={stroke}
                fill={stroke}
            />
            <Text x={metricLinesInput.textX} y={metricLinesInput.textY} fontSize={metricLinesInput.fontSize}
                  text={metricLinesInput.text} rotation={metricLinesInput.textRotation}/>
        </>
    )
}

export default MetricLines;