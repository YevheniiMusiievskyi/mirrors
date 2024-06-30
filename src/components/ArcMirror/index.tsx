import {Shape} from "react-konva";
import React from "react";
import {ArcMirrorCoordinates, CircleCoordinates} from "../../models/circle";

interface ArcMirrorProps {
    circleCoordinates: CircleCoordinates;
    arcMirrorCoordinates: ArcMirrorCoordinates;
}

const ArcMirror: React.FC<ArcMirrorProps> = ({ circleCoordinates, arcMirrorCoordinates  }) => {
    const { x, y, x2, y2, startAngle, endAngle, clockwise} = arcMirrorCoordinates;

    

    return <Shape
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
}

export default ArcMirror;