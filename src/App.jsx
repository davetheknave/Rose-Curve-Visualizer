import { useState, useEffect, useRef } from 'react'
import P5Sketch from './rosecurve.jsx'
import { Slider, Number, ColorPicker, Toggle } from './widgets.jsx';
import * as MathD from './utility.jsx';
import './App.css'

function App() {
  const numerator = useRef(7);
  const denominator = useRef(8);
  const polygon = useRef(true);
  const quality = useRef(6);
  const speed = useRef(3);
  const color = useRef([250, 22, 110]);

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
        <P5Sketch numerator={numerator} denominator={denominator} quality={quality} speed={speed} foreground={color} background={[220, 220, 220]} radius={9} width={width} polygon={polygon} />

        <div className="parameters">
          <div className="equation">
            <div className="math">r = -sin (</div>
            <div className="fraction">
              <Number change={(v) => numerator.current = (MathD.clamp(v, 1, 25))} displayValue={numerator} max="25" default={numerator.current} />
              <div className="fraction-bar" />
              <Number change={(v) => denominator.current = (MathD.clamp(v, 1, 25))} displayValue={denominator} max="25" default={denominator.current} />
            </div>
            <div className="math">&theta;)</div>
          </div>
          <label className="visualizer-input">
            <span className="input-label">Style</span>
            <Toggle on="Polygon" off="Dashed curves" click={() => polygon.current = !polygon.current} active={polygon.current} />
            <span className="input-value"></span>
          </label>
          <Slider change={(v) => quality.current = v} displayValue={quality.current} min={1} max={10} default={quality.current}>Quality</Slider>
          <Slider change={(v) => speed.current = v} displayValue={speed} min={0} max={10} default={speed.current}>Speed</Slider>
          <ColorPicker change={(v) => color.current = v} default={MathD.arrayToHex(color.current)}>Color</ColorPicker>
        </div>
      </div>
    </>
  )
}

export default App
