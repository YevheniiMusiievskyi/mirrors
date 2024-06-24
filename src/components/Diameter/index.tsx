import {CircleCoordinates} from "../../models/circle";
import React from "react";
import {Arrow, Line, Text} from "react-konva";
// import {measureText} from "../../helpers/circleCalculator";

interface DiameterProps {
    circleCoordinates: CircleCoordinates;
}

const strokeWidth = 1;
const text = "Діаметер";
const fontSize = 28;
const font = `${fontSize}px sans-serif`;

const Diameter: React.FC<DiameterProps> = ( { circleCoordinates } ) => {
   /* const {x, y, radius} = circleCoordinates;
    const width = Math.round(1.15 * radius)
    const x1 = x - width;
    const x2 = x + width;
    const y1 = y - radius;
    const y2 = y + radius;

    const arrowX = x - Math.round(1.1 * radius)

    const textMetrics = measureText(text, font);
    const textX = arrowX - textMetrics.height;
    const textY = y + textMetrics.width / 2;

    return (
        <>
            <Line points={[ x1, y1, x2, y1 ]} strokeWidth={strokeWidth} stroke="black" />
            <Line points={[ x1, y2, x2, y2 ]} strokeWidth={strokeWidth} stroke="black" />
            <Arrow
                points={[ arrowX, y1, arrowX, y2 ]}
                pointerAtBeginning={true}
                pointerAtEnding={true}
                strokeWidth={strokeWidth}
                stroke="black"
                fill="black"
            />
            <Text id="diameterText" x={textX} y={textY} fontSize={fontSize} text={text} rotation={-90} />
        </>
    )*/
    return <></>
}

export default Diameter