import React from 'react'
import { useState } from 'react'
import { ReactP5Wrapper } from '@p5-wrapper/react'

function P5Sketch(props) {
    const [spacing, setSpacing] = useState(0);
    const [angularSpeed, setSpeed] = useState(0);
    const count = 10;
    const radius = 17;
    const a = 200;
    function sketch(p5){
        p5.setup = () => {
            p5.createCanvas(800,800,p5.WEBGL);
            setSpacing(props.spacingParam);
            setSpeed(props.speedParam * 1/p5.max(1,props.numerator-props.denominator));
        }
        p5.draw = () => {
            function x(t) {
                return a * p5.cos(props.numerator / props.denominator * t) * p5.cos(t);
            };
            function y(t) {
                return a * p5.cos(props.numerator / props.denominator * t) * p5.sin(t)
            };
    
            p5.background(20,20,100);
            // p5.translate(p5.width/2,p5.height/2);
            p5.noStroke();
            p5.ellipseMode(p5.CENTER);
            p5.fill(200,200,250);
            for (var i = 0; i < count; i++) {
                let angle = i * spacing + p5.frameCount * angularSpeed;
                angle = angle * p5.PI / 180;
                p5.ellipse(x(angle), y(angle), radius, radius);
            }
        }
    }
    return (
      <ReactP5Wrapper sketch={sketch}/>
    )
  }

export default P5Sketch;
