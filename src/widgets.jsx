import React, { useState } from 'react';
import * as MathD from './utility.jsx';

export function Slider(props) {
    const [value, setValue] = useState(props.default)
    return (
        <>
            <label className="slider visualizer-input">
                <span className="input-label">{props.children}</span>
                <input type="range" min={props.min ?? 1} max={props.max ?? 250} onInput={(v) => { props.change(v.target.value); setValue(v.target.value) }} value={value} />
                <span className="input-value">{value}</span>
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
    const [value, setValue] = useState(props.active)
    return (
        <div className="toggle" onClick={() => {
            props.click();
            setValue(!value);
        }}>
            <div className={"toggle-label toggle-label-on" + (value ? " toggle-active" : "")}>{props.on}</div>
            <div className={"toggle-label toggle-label-off" + (!value ? " toggle-active" : "")}>{props.off}</div>
        </div>
    )
}