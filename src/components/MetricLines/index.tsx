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
    return (
        <>
            {
                metricLinesInput.direction === MetricDirection.VERTICAL
                    ? (
                        <>
                            <Line points={[x1, y1, x2, y1]} strokeWidth={strokeWidth} stroke={stroke}/>
                            <Line points={[x1, y2, x2, y2]} strokeWidth={strokeWidth} stroke={stroke}/>
                        </>
                    )
                    : (
                        <>
                            <Line points={[x1, y1, x1, y2]} strokeWidth={strokeWidth} stroke={stroke}/>
                            <Line points={[x2, y1, x2, y2]} strokeWidth={strokeWidth} stroke={stroke}/>
                        </>
                    )
            }
            <Arrow
                points={[metricLinesInput.arrowX1, metricLinesInput.arrowY1, metricLinesInput.arrowX2, metricLinesInput.arrowY2]}
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