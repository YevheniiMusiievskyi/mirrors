import {FormControl, FormHelperText, InputAdornment, OutlinedInput} from "@mui/material";
import React, {ChangeEvent} from "react";

interface ILengthInputProps {
    text: string;
    value: number | null;
    onChange: (event: string | unknown) => void;
}

const LengthInput: React.FC<ILengthInputProps> = ({ text, value, onChange }) => {
    return (
        <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
            <OutlinedInput
                type="number"
                endAdornment={<InputAdornment position="end">см</InputAdornment>}
                aria-describedby="diameter-helper-text"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
            <FormHelperText id="diameter-helper-text">{text}</FormHelperText>
        </FormControl>
    )
}

export default LengthInput;