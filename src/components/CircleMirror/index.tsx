import React from "react";
import {Circle, Layer, Stage} from "react-konva";
import {calculateArcMirrorCoordinates, scaleCircleDimensions} from "../../helpers/circleCalculator";
import {
    ArcMirrorCoordinates,
    ArcMirrorSide,
    CircleCoordinates,
    CircleDimensions,
    CutSide,
    Quarter
} from "../../models/circle";
import {calculateVerticalAlignLines} from "../../helpers/metricLinesCalculator";
import {ArrowPosition, MetricDirection, MetricLinesCoordinates} from "../../models/metric";
import MetricLines from "../MetricLines";
import ArcMirror from "../ArcMirror";
import CircleMirrorInput from "../CircleMirrorInput";
import {Grid} from "@mui/material";
import {IRootState} from "../../store";
import {connect, ConnectedProps} from "react-redux";
import {setArcMirrorCorner, setCircleDimensions} from "../../store/actions/circleMirror";

const radius = 300;
const x = 400;
const y = 400;

const circleCoordinates: CircleCoordinates = {x, y, radius}

const circleDimensions: CircleDimensions = {
    cutSide: CutSide.RIGHT,
    diameter: 200,
    width: 80,
    upperHeight: 95,
    lowerHeight: 50
}

const CircleMirror: React.FC<CircleMirrorProps> = ({
                                                       circleDimensions,
                                                       setCircleDimensions,
                                                   }) => {

    const scale = circleCoordinates.radius / (circleDimensions.diameter / 2);
    const fontSize = Math.round(radius / 15);
    const font = `${fontSize}px sans-serif`
    const scaledCircleDimensions = scaleCircleDimensions(circleDimensions, scale)
    const isRight = circleDimensions.cutSide === CutSide.RIGHT;
    let upperArcMirrorCoordinates: ArcMirrorCoordinates | null = null;
    if (scaledCircleDimensions.upperHeight) {
        const upperArcQuarter = isRight ? Quarter.FIRST : Quarter.SECOND;
        upperArcMirrorCoordinates = calculateArcMirrorCoordinates(circleCoordinates, {
            ...scaledCircleDimensions,
            height: scaledCircleDimensions.upperHeight,
            scale
        }, upperArcQuarter)
    }

    let lowerArcMirrorCoordinates: ArcMirrorCoordinates | null = null;
    if (scaledCircleDimensions.lowerHeight) {
        const lowerArcQuarter = isRight ? Quarter.FOURTH : Quarter.THIRD;
        lowerArcMirrorCoordinates = calculateArcMirrorCoordinates(circleCoordinates, {
            ...scaledCircleDimensions,
            height: scaledCircleDimensions.lowerHeight,
            scale
        }, lowerArcQuarter)
    }

    let arcsDistanceMetrics: MetricLinesCoordinates | null = null;
    if (upperArcMirrorCoordinates && lowerArcMirrorCoordinates) {
        const x1 = upperArcMirrorCoordinates.x2;
        const x2 = lowerArcMirrorCoordinates.x2;

        arcsDistanceMetrics = calculateVerticalAlignLines({
            x1: x1,
            y1: upperArcMirrorCoordinates.y,
            x2: x2,
            y2: lowerArcMirrorCoordinates.y,
            toX: isRight ? Math.max(x1, x2) : Math.min(x1, x2),
            fontSize,
            font,
            align: MetricDirection.VERTICAL,
            arrowPosition: isRight ? ArrowPosition.RIGHT : ArrowPosition.LEFT,
            scale
        })
    }

    const diameterMetricsCoordinates = calculateVerticalAlignLines({
        x1: x,
        y1: y - radius,
        x2: x,
        y2: y + radius,
        toX: isRight ? x - radius : x + radius,
        fontSize,
        font,
        align: MetricDirection.VERTICAL,
        arrowPosition: isRight ? ArrowPosition.LEFT : ArrowPosition.RIGHT,
        scale
    })

    return (
        <div>
            <Grid container>
                <Grid>
                    <Stage x={x - radius} y={y - radius} width={3 * radius} height={3 * radius}>
                        <Layer>
                            <Circle x={x} y={y} radius={radius} stroke='black' strokeWidth={2} dash={[10]}/>
                            {upperArcMirrorCoordinates &&
                                <ArcMirror
                                    circleCoordinates={circleCoordinates}
                                    arcMirrorCoordinates={upperArcMirrorCoordinates}
                                    font={font}
                                    fontSize={fontSize}
                                />
                            }
                            {lowerArcMirrorCoordinates &&
                                <ArcMirror
                                    circleCoordinates={circleCoordinates}
                                    arcMirrorCoordinates={lowerArcMirrorCoordinates}
                                    font={font}
                                    fontSize={fontSize}
                                />
                            }
                            {/*<Diameter circleCoordinates={circleCoordinates} />
                    <Line points={[x, y, x - radius, y]} stroke="blue" strokeWidth={2} />*/}
                            <MetricLines metricLinesInput={diameterMetricsCoordinates}/>
                            {arcsDistanceMetrics &&
                                <MetricLines metricLinesInput={arcsDistanceMetrics}/>
                            }
                        </Layer>
                    </Stage>
                </Grid>
                <Grid>
                    <CircleMirrorInput circleDimensions={circleDimensions} setCircleDimensions={setCircleDimensions}/>
                </Grid>
            </Grid>

        </div>
    )
}

const mapStateToProps = (state: IRootState) => ({
    circleDimensions: state.circleMirror.circleDimensions,
    upperArcMirrorCorner: state.circleMirror.upperArcMirrorCorner,
    lowerArcMirrorCorner: state.circleMirror.lowerArcMirrorCorner
})

const mapDispatchToProps = {
    setCircleDimensions,
    setArcMirrorCorner
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type CircleMirrorProps = ConnectedProps<typeof connector>

export default connector(CircleMirror);