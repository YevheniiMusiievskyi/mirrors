import React from "react";
import {Arc, Circle, Layer, Line, Shape, Stage, Wedge} from "react-konva";
import {calculateArcMirrorCoordinates} from "../../helpers/circleCalculator";
import {CircleCoordinates, CircleDimensions} from "../../models/circle";
import Konva from "konva";
import Context = Konva.Context;
import ArcMirror from "../ArcMirror";

const radius = 300;
const x = 500;
const y = 500;

const circleDimensions: CircleDimensions = {
    diameter: 200,
    width: 80,
    upperHeight: 80,
    lowerHeight: 50
}

const CircleMirror = () => {

    const circleCoordinates: CircleCoordinates = {x, y, radius}
    const acrMirrorCoordinates = calculateArcMirrorCoordinates(circleDimensions, circleCoordinates)

    return <div>
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                <Circle x={x} y={y} radius={radius} stroke='black' strokeWidth={2} dash={[10]}/>
                <ArcMirror
                    circleCoordinates={circleCoordinates}
                    arcMirrorCoordinates={acrMirrorCoordinates}
                />

                {/*<Wedge
                    x={acrMirrorCoordinates.upperX}
                    y={acrMirrorCoordinates.upperY}
                    scaleX={acrMirrorCoordinates.scaleX}
                    scaleY={acrMirrorCoordinates.scaleY}
                    radius={radius - 5}
                    stroke="red"
                    strokeWidth={2}
                    angle={90}
                    rotation={-90}
                />*/}
                {/*<Line points={[wedgeX, wedgeY, toWedgeXScaleY, toWedgeYScaleY]} stroke="black" strokeWidth={1}/>*/}
                {/*<Line points={[wedgeX, wedgeY, toWedgeXScaleX, toWedgeYScaleX]} stroke="black" strokeWidth={1}/>*/}
            </Layer>
        </Stage>
    </div>
}

export default CircleMirror;