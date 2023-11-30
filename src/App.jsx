import { useState, useEffect, useRef } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as colors from '@mui/material/colors';
import Button from '@mui/material/Button';
import P5Sketch from './rosecurve.jsx'
import * as MathD from './utility.jsx';
import { DSlider as Slider, Number, ColorPicker, Toggle, ShadeSelector } from './widgets.jsx';
import './App.css'

function App() {
  function makeTheme(themeColor) {
    return createTheme({
      palette: {
        mode: 'dark',
        primary: themeColor,
      },
      typography: {
        fontFamily: [
          'Raleway', 'Inter', 'system-ui', 'Helvetica', 'Arial', 'sans-serif'
        ].join(','),
      }
    })
  }
  const [theme, setTheme] = useState(makeTheme(colors.pink));
  const numerator = useRef(7);
  const denominator = useRef(8);
  const polygon = useRef(true);
  const quality = useRef(6);
  const speed = useRef(3);
  const [shade, setShade] = useState("A400");
  const [color, setColor] = useState(colors.pink);
  const [hex, setHex] = useState(colors.pink[shade]);
  const [showColors, setShowColors] = useState(false)

  // Track window width
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    }
  });
  const changeColor = (newColor) => {
    setColor(newColor);
    setHex(MathD.hexToArray(newColor[shade]));
    setTheme(makeTheme(newColor))
  }
  const changeShade = (newShade) => {
    setShade(newShade);
    setHex(color[newShade])
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div id="bg" />
        <div className="visualizer">
          <P5Sketch numerator={numerator} denominator={denominator} quality={quality} speed={speed} foreground={hex} background={[220, 220, 220]} radius={9} width={width} polygon={polygon} />
          <div className="controls">

            <div className={"parameters" + (showColors ? " hidden" : "")}>
              <div className="equation">
                <div className="math">r = &minus;sin(</div>
                <div className="fraction">
                  <Number
                    change={(v) => numerator.current = (MathD.clamp(v, 1, 25))}
                    displayValue={numerator}
                    max="25"
                    default={numerator.current}
                    orientation="bottom"
                  />
                  <div className="fraction-bar" />
                  <Number
                    change={(v) => denominator.current = (MathD.clamp(v, 1, 25))}
                    displayValue={denominator}
                    max="25"
                    default={denominator.current}
                    orientation="top"
                  />
                </div>
                <div className="math">&theta;)</div>
              </div>
              <Toggle
                name="Style"
                firstName="Polygon"
                secondName="Dashed"
                valueRef={polygon}
              />
              <Slider
                name="Quality"
                valueRef={quality}
                min={1}
                max={10}
                marks={[{ value: 1, label: "Low" }, { value: 10, label: "High" }]}
              />
              <Slider
                name="Speed"
                valueRef={speed}
                min={-10}
                max={10}
                marks={[{ value: 0, label: "0" }, { value: -10, label: "-10" }, { value: 10, label: "+10" }]}
              />
            </div>
            <div className={"colorInputs" + (showColors ? "" : " hidden")}>
              <ColorPicker change={changeColor} />
              <ShadeSelector change={changeShade} />
            </div>
            <Button className="colorButton" variant="outlined" onClick={() => setShowColors(!showColors)}>Colors</Button>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
