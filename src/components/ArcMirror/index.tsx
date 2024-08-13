import {Shape, Text} from "react-konva";
import React, {useEffect, useState} from "react";
import {
    ArcMirrorCoordinates,
    ArcMirrorCorner,
    ArcMirrorInput,
    ArcMirrorSide,
    CircleCoordinates,
    CircleDimensions,
    Quarter
} from "../../models/circle";
import ArcMirrorMetricLines from "../ArcMirrorMetricLines";

interface ArcMirrorProps {
    circleCoordinates: CircleCoordinates;
    arcMirrorCoordinates: ArcMirrorCoordinates;
    font: string;
    fontSize: number;
}

const ArcMirror: React.FC<ArcMirrorProps> = ({circleCoordinates, arcMirrorCoordinates, font, fontSize}) => {
    const {x, y, x2, y2, startAngle, endAngle, clockwise} = arcMirrorCoordinates;

    return <>
        <Shape
            stroke="red"
            strokeWidth={2}
            sceneFunc={(context, shape) => {
                context.beginPath()
                context.arc(circleCoordinates.x, circleCoordinates.y, circleCoordinates.radius, startAngle, endAngle, clockwise)
                context.moveTo(x, y)
                context.lineTo(x, y2)
                context.moveTo(x, y)
                context.lineTo(x2, y)

                context.strokeShape(shape);
            }}
        />
        <ArcMirrorMetricLines
            circleCoordinates={circleCoordinates}
            arcMirrorCoordinates={arcMirrorCoordinates}
            font={font}
            fontSize={fontSize}
        />
        {/*<Text x={x} y={y} fontSize={fontSize} text="X Y"/>
        <Text x={x} y={y2} fontSize={fontSize} text="X Y2"/>
        <Text x={x2} y={y} fontSize={fontSize} text="X2 Y"/>
        <Text x={x2} y={y2} fontSize={fontSize} text="X2 Y2"/>*/}
    </>

}

export default ArcMirror;