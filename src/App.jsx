import { useState, useEffect } from 'react'
import P5Sketch from './rosecurve.jsx'
import './App.css'

function arrayToHex(input) {
  return "#" + input[0].toString(16) + input[1].toString(16) + input[2].toString(16);
}

function Slider(props) {
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
function Number(props) {
  return (
    <>
      <input type="number" min={props.min ?? 1} max={props.max ?? 250} onInput={(v) => props.change(v.target.value)} value={props.default} />
    </>
  );
}
function FractionBar(props) {
  return (
    <div className="fraction-bar" />
  )
}
function ColorPicker(props) {
  return (
    <>
      <label className="colorPicker visualizer-input">
        <span>{props.children}</span>
        <input type="color" onInput={(v) => props.change(v.target.value)} />
      </label>
    </>
  )
}

function App() {
  const [numerator, setNumerator] = useState(5)
  const [denominator, setDenominator] = useState(7)
  const [spacing, setSpacing] = useState(1)
  const [speed, setSpeed] = useState(5)
  const [background, setBG] = useState([220, 220, 220])
  const [foreground, setFG] = useState([200, 200, 250])
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    }
  });

  return (
    <>
      <h1 id="title">
        Rose curves
      </h1>
      <div className="visualizer">
        <P5Sketch numerator={numerator} denominator={denominator} spacingParam={spacing} speedParam={speed} foreground={foreground} background={background} radius={9} count={10} width={width}/>
        <div className="parameters">
          <div className="equation">
            <div className="math">r = cos (</div>
            <div className="fraction">
              <Number change={(v) => setNumerator(v)} displayValue={numerator} max="99" default={numerator}></Number>
              <FractionBar />
              <Number change={(v) => setDenominator(v)} displayValue={denominator} max="99" default={denominator}></Number>
            </div>
            <div className="math">
              &theta;)
            </div>
          </div>
          <Slider change={(v) => setSpacing(v)} displayValue={spacing} min={1} max={10} default={spacing}>Spacing</Slider>
          <Slider change={(v) => setSpeed(v)} displayValue={speed} min={0} max={10} default={speed}>Speed</Slider>
          <ColorPicker change={(v) => setFG(v)} initialValue={arrayToHex(foreground)}>Color</ColorPicker>
        </div>
      </div>
    </>
  )
}

export default App
