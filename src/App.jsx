import { useState, useEffect } from 'react'
import P5Sketch from './rosecurve.jsx'
import { Slider, Number, ColorPicker, Toggle } from './widgets.jsx';
import * as MathD from './utility.jsx';
import './App.css'

function App() {
  const [numerator, setNumerator] = useState(7)
  const [denominator, setDenominator] = useState(8)
  const [solid, setSolid] = useState(false)
  const [quality, setQuality] = useState(6)
  const [speed, setSpeed] = useState(3)
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
        <P5Sketch numerator={numerator} denominator={denominator} quality={quality} speed={speed} foreground={foreground} background={[220, 220, 220]} radius={9} width={width} solid={solid} />

        <div className="parameters">
          <div className="equation">
            <div className="math">r = -sin (</div>
            <div className="fraction">
              <Number change={(v) => setNumerator(MathD.clamp(v, 1, 25))} displayValue={numerator} max="25" default={numerator} />
              <div className="fraction-bar" />
              <Number change={(v) => setDenominator(MathD.clamp(v, 1, 25))} displayValue={denominator} max="25" default={denominator} />
            </div>
            <div className="math">&theta;)</div>
          </div>
          <label className="visualizer-input">
            <span className="input-label">Style</span>
            <Toggle on="Polygon" off="Dashed curves" click={() => setSolid(!solid)} active={solid} />
            <span className="input-value"></span>
          </label>
          <Slider change={(v) => setQuality(v)} displayValue={quality} min={1} max={10} default={quality}>Quality</Slider>
          <Slider change={(v) => setSpeed(v)} displayValue={speed} min={0} max={10} default={speed}>Speed</Slider>
          <ColorPicker change={(v) => setFG(v)} initialValue={MathD.arrayToHex(foreground)}>Color</ColorPicker>
        </div>
      </div>
    </>
  )
}

export default App
