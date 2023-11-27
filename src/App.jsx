import { useState, useEffect } from 'react'
import P5Sketch from './rosecurve.jsx'
import { Slider, Number, ColorPicker } from './widgets.jsx';
import * as MathD from './utility.jsx';
import './App.css'

function App() {
  const [numerator, setNumerator] = useState(5)
  const [denominator, setDenominator] = useState(7)
  const [solid, setSolid] = useState(true)
  const [spacing, setSpacing] = useState(1)
  const [speed, setSpeed] = useState(5)
  const [foreground, setFG] = useState([200, 200, 250])

  // Track window width
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
      <div id="bg" />
      <h1 id="title">
        Rose curves
      </h1>
      <div className="visualizer">
        <P5Sketch numerator={numerator} denominator={denominator} spacing={spacing} speed={speed} foreground={foreground} background={[220, 220, 220]} radius={9} width={width} solid={solid} />

        <div className="parameters">
          <div className="equation">
            <div className="math">r = sin (</div>
            <div className="fraction">
              <Number change={(v) => setNumerator(MathD.clamp(v, 1, 25))} displayValue={numerator} max="25" default={numerator} />
              <div className="fraction-bar" />
              <Number change={(v) => setDenominator(MathD.clamp(v, 1, 25))} displayValue={denominator} max="25" default={denominator} />
            </div>
            <div className="math">&theta;)</div>
          </div>
          <label className="visualizer-input">
            <span className="input-label">Solid</span>
            <input type="checkbox" checked={solid} onChange={(e) => setSolid(!solid)} />
          </label>
          <Slider change={(v) => setSpacing(v)} displayValue={spacing} min={1} max={10} default={spacing}>Spacing</Slider>
          <Slider change={(v) => setSpeed(v)} displayValue={speed} min={0} max={10} default={speed}>Speed</Slider>
          <ColorPicker change={(v) => setFG(v)} initialValue={MathD.arrayToHex(foreground)}>Color</ColorPicker>
        </div>
      </div>
    </>
  )
}

export default App
