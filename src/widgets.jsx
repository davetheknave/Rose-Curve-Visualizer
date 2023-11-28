import { useState, useEffect } from 'react'


export function Slider(props) {
    return (
        <>
            <label className="slider visualizer-input">
                <span className="input-label">{props.children}</span>
                <input type="range" min={props.min ?? 1} max={props.max ?? 250} onInput={(v) => props.change(v.target.value)} value={props.default} />
                <span className="input-value">{props.displayValue}</span>
            </label>
        </>
    );
}
export function Number(props) {
    return (
        <>
            <input type="number" min={props.min ?? 1} max={props.max ?? 250} onInput={(v) => props.change(v.target.value)} value={props.default} />
        </>
    );
}
export function ColorPicker(props) {
    return (
        <>
            <label className="colorPicker visualizer-input">
                <span>{props.children}</span>
                <input type="color" onInput={(v) => props.change(v.target.value)} />
            </label>
        </>
    )
}
export function Toggle(props) {
    return (
        <div className="toggle" onClick={props.click}>
            <div className={"toggle-label toggle-label-on" + (props.active ? " toggle-active" : "")}>{props.on}</div>
            <div className={"toggle-label toggle-label-off" + (!props.active ? " toggle-active" : "")}>{props.off}</div>
        </div>
    )
}