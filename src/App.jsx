import { useState } from 'react'
import P5Sketch from './rosecurve.jsx'
import './App.css'



function Slider(props){
  return (
    <>
      <label className="slider">
        <span>{props.children}</span>
        <input type="range" min={props.min ?? 1} max={props.max ?? 250} onInput={(v)=>props.change(v.target.value)}/>
        <span>{props.displayValue}</span>
      </label>
    </>
  );
}

function App() {
  const [numerator, setNumerator] = useState(5)
  const [denominator, setDenominator] = useState(9)
  const [spacing, setSpacing] = useState(250)
  const [speed, setSpeed] = useState(10)

  return (
    <>
    <div className="container">
      <P5Sketch numerator={numerator} denominator={denominator} spacingParam={spacing} speedParam={speed}/>
      <Slider change={(v)=>setNumerator(v)} displayValue={numerator} max="99">Numerator</Slider>
      <Slider change={(v)=>setDenominator(v)} displayValue={denominator} max="99">Denominator</Slider>
      <Slider change={(v)=>setSpacing(v)} displayValue={spacing} min={0} max="999">Spacing</Slider>
      <Slider change={(v)=>setSpeed(v)} displayValue={speed} min={0} max="20">Speed</Slider>
    </div>
    </>
  )
}

export default App
