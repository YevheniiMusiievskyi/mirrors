import {Button, MenuItem, SelectChangeEvent, Stack, TextField} from "@mui/material";
import LengthInput from "../LengthInput";
import {CircleDimensions, CutSide} from "../../models/circle";
import React, {useState} from "react";

interface ICircleMirrorInputProps {
    circleDimensions: CircleDimensions
    setCircleDimensions: (circleDimensions: CircleDimensions) => void;
}

const menuItems = [
    {
        text: "Праворуч",
        value: CutSide.RIGHT
    },
    {
        text: "Ліворуч",
        value: CutSide.LEFT
    }
]

const CircleMirrorInput: React.FC<ICircleMirrorInputProps> = ( { circleDimensions, setCircleDimensions }) => {
    const [cutSide, setCutSide] = useState<CutSide>(CutSide.RIGHT)
    const [diameter, setDiameter] = useState<number>(circleDimensions.diameter)
    const [width, setWidth] = useState<number>(circleDimensions.width)
    const [upperHeight, setUpperHeight] = useState<number | null>(circleDimensions.upperHeight ? circleDimensions.upperHeight : null)
    const [lowerHeight, setLowerHeight] = useState<number | null>(circleDimensions.lowerHeight ? circleDimensions.lowerHeight : null)

    const handleCutSideChange = (value: string | unknown) => {
        setCutSide(value as CutSide)
    }

    const handleDiameterChange = (value: string | unknown) => {
        setDiameter(value as number)
    }

    const handleWidthChange = (value: string | unknown) => {
        setWidth(value as number)
    }

    const handleUpperHeightChange = (value: string | unknown) => {
        setUpperHeight(value as number)
    }

    const handleLowerHeightChange = (value: string | unknown) => {
        setLowerHeight(value as number)
    }

    const handleSetCircleDimensions = () => {
        if (!diameter || !width || !upperHeight || !lowerHeight) {
            return
        }

        setCircleDimensions({
            cutSide,
            diameter,
            width,
            upperHeight,
            lowerHeight
        })
    }

    return (
        <div>
            <Stack>
                <TextField
                    sx={{m: 1, width: '25ch'}}
                    select
                    label="Сторона зрізу"
                    defaultValue={cutSide}
                    value={cutSide}
                    onChange={e => handleCutSideChange(e.target.value)}
                >
                    {menuItems.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                            {item.text}
                        </MenuItem>
                    ))}
                </TextField>
                <LengthInput text="Діаметр" value={diameter} onChange={handleDiameterChange} />
                <LengthInput text="Ширина" value={width} onChange={handleWidthChange} />
                <LengthInput text="Висота зверху" value={upperHeight} onChange={handleUpperHeightChange} />
                <LengthInput text="Висота знизу" value={lowerHeight} onChange={handleLowerHeightChange} />
                <Button variant="contained" onClick={handleSetCircleDimensions}>Розрахувати</Button>
            </Stack>
        </div>
    )
}

export default CircleMirrorInput