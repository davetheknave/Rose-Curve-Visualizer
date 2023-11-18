import { useState } from 'react'
import P5Sketch from './rosecurve.jsx'
import './App.css'



function Slider(props){
  const [value, setValue] = useState(0);

  return (
    <>
      <label className="slider">
        <span>{props.children}</span>
        <input type="range" min="1" max="99"/>
        <span>Value</span>
      </label>
    </>
  );
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="container">
      <P5Sketch numerator="5" denominator="7" spacingParam="250" speedParam="10"/>
      <Slider>Numerator</Slider>
      <Slider>Denominator</Slider>
      <Slider>Spacing</Slider>
      <Slider>Speed</Slider>
    </div>
    </>
  )
}

export default App
