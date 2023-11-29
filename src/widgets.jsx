import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Slider from '@mui/material/Slider';
import * as MathD from './utility.jsx';

export function DSlider(props) {
    const [value, setValue] = useState(props.default)
    const handleChange = (_, v) => {
        props.valueRef.current = v;
        setValue(v);
    }
    return (
        <>
            <label className="slider visualizer-input">
                <span className="input-label">{props.name}</span>
                <Slider
                    aria-label={props.name}
                    min={props.min ?? 1}
                    max={props.max ?? 250}
                    value={props.valueRef.current}
                    onChange={handleChange}
                    marks={props.marks ?? true}
                />
                {/* <span className="input-value">{props.valueRef.current}</span> */}
            </label>
        </>
    );
}
export function Number(props) {
    const [value, setValue] = useState(props.default)
    return (
        <>
            <input type="number" min={props.min ?? 1} max={props.max ?? 250} onInput={(v) => {
                let val = Math.floor(MathD.clamp(v.target.value, props.min ?? 1, props.max ?? 250));
                props.change(val);
                setValue(val)
            }} value={value} />
        </>
    );
}
export function ColorPicker(props) {
    const [value, setValue] = useState(props.default)
    return (
        <>
            <label className="colorPicker visualizer-input">
                <span>{props.children}</span>
                <input type="color" onInput={(v) => {
                    props.change(v.target.value);
                    setValue(v.target.value);
                }} value={value} />
            </label>
        </>
    )
}
export function Toggle(props) {
    const [value, setValue] = useState(props.valueRef.current ? "true" : "false")
    const handleChange = (_, v) => {
        if (v !== null) {
            props.valueRef.current = v === "true";
            setValue(v);
        }
    }
    return (
        <label className="visualizer-input">
            <span className="input-label">{props.name}</span>
            <ToggleButtonGroup
                aria-label={props.name}
                exclusive
                value={value}
                onChange={handleChange}
                color="primary"
            >
                <ToggleButton aria-label={props.firstName} value="true">
                    {props.firstName}
                </ToggleButton>
                <ToggleButton aria-label={props.secondName} value="false">
                    {props.secondName}
                </ToggleButton>
            </ToggleButtonGroup>
            {/* <span className="input-value"></span> */}
        </label>
    )
}