import { useState } from 'react'
import P5Sketch from './rosecurve.jsx'
import './App.css'

function arrayToHex(input) {
  return "#" + input[0].toString(16) + input[1].toString(16) + input[2].toString(16);
}

function Slider(props) {
  return (
    <>
      <label className="slider visualizer-input">
        <span className="slider-label">{props.children}</span>
        <input type="range" min={props.min ?? 1} max={props.max ?? 250} onInput={(v) => props.change(v.target.value)} />
        <span className="slider-value">{props.displayValue}</span>
      </label>
    </>
  );
}
function ColorPicker(props) {
  return (
    <>
      <label className="colorPicker visualizer-input">
        <span>{props.children}</span>
        <input type="color" onInput={(v) => props.change(v.target.value)} value={props.initialValue} />
      </label>
    </>
  )
}

function App() {
  const [numerator, setNumerator] = useState(5)
  const [denominator, setDenominator] = useState(9)
  const [spacing, setSpacing] = useState(250)
  const [speed, setSpeed] = useState(10)
  const [background, setBG] = useState([18, 18, 18])
  const [foreground, setFG] = useState([200, 200, 250])

  return (
    <>
      <h1 id="title">
        Rose curve visualizer
      </h1>
      <div className="visualizer">
        <P5Sketch numerator={numerator} denominator={denominator} spacingParam={spacing} speedParam={speed} foreground={foreground} background={background} radius={18} count={10} />
        <div className="parameters">
          <Slider change={(v) => setNumerator(v)} displayValue={numerator} max="99">Numerator</Slider>
          <Slider change={(v) => setDenominator(v)} displayValue={denominator} max="99">Denominator</Slider>
          <Slider change={(v) => setSpacing(v)} displayValue={spacing} min={0} max="999">Spacing</Slider>
          <Slider change={(v) => setSpeed(v)} displayValue={speed} min={0} max="20">Speed</Slider>
          {/* <ColorPicker change={(v) => setBG(v)} initialValue={arrayToHex(background)}>Background</ColorPicker> */}
          <ColorPicker change={(v) => setFG(v)} initialValue={arrayToHex(foreground)}>Color</ColorPicker>
          <button className="bloom-button">Bloom!</button>
        </div>
      </div>
    </>
  )
}

export default App
