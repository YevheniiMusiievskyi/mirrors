import React from "react";
import {Circle, Layer, Stage} from "react-konva";
import {calculateArcMirrorCoordinates, scaleCircleDimensions} from "../../helpers/circleCalculator";
import {
    ArcMirrorCoordinates,
    CircleCoordinates,
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

const CircleMirror: React.FC<CircleMirrorProps> = ({
                                                       circleDimensions,
                                                       setCircleDimensions,
                                                   }) => {

    const scale = circleCoordinates.radius / (circleDimensions.diameter / 2);
    const fontSize = Math.round(radius / 15);
    const font = `${fontSize}px sans-serif`
    const scaledCircleDimensions = scaleCircleDimensions(circleDimensions, scale)
    const isLeft = circleDimensions.cutSide === CutSide.LEFT;
    let upperArcMirrorCoordinates: ArcMirrorCoordinates | null = null;
    if (scaledCircleDimensions.upperHeight) {
        const upperArcQuarter = isLeft ? Quarter.FIRST : Quarter.SECOND;
        upperArcMirrorCoordinates = calculateArcMirrorCoordinates(circleCoordinates, {
            ...scaledCircleDimensions,
            height: scaledCircleDimensions.upperHeight,
            scale
        }, upperArcQuarter)
    }

    let lowerArcMirrorCoordinates: ArcMirrorCoordinates | null = null;
    if (scaledCircleDimensions.lowerHeight) {
        const lowerArcQuarter = isLeft ? Quarter.FOURTH : Quarter.THIRD;
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
            toX: isLeft ? x + radius : x - radius,
            fontSize,
            font,
            align: MetricDirection.VERTICAL,
            arrowPosition: isLeft ? ArrowPosition.RIGHT : ArrowPosition.LEFT,
            scale
        }, circleCoordinates.radius)
    }

    const diameterMetricsCoordinates = calculateVerticalAlignLines({
        x1: x,
        y1: y - radius,
        x2: x,
        y2: y + radius,
        toX: isLeft ? x - radius : x + radius,
        fontSize,
        font,
        align: MetricDirection.VERTICAL,
        arrowPosition: isLeft ? ArrowPosition.LEFT : ArrowPosition.RIGHT,
        scale
    }, circleCoordinates.radius)

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