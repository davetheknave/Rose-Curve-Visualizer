import React, { useState } from 'react'
import { ReactP5Wrapper } from '@p5-wrapper/react'

function P5Sketch(props) {
    const [spacing, setSpacing] = useState(0);
    const [angularSpeed, setSpeed] = useState(0);
    const count = props.count ?? 10;
    const radius = props.radius ?? 8;
    const a = 175;
    
    function sketch(p5) {
        var buffer;
        var canvas;
        const fgSize = 400;
        const padH = 400;
        const bgSize = 200;
        const backPos = [];

        // Fill the surrounding space with flowers
        let space = 0;
        while(space < padH/2){
            backPos.push([0+space,Math.random()*fgSize/2]);
            backPos.push([fgSize+padH-space-bgSize,Math.random()*fgSize/2]);
            space+=bgSize;
        }
        p5.setup = () => {
            canvas = p5.createCanvas(fgSize+padH, fgSize, p5.P2D);
            buffer = p5.createGraphics(fgSize, fgSize, p5.P2D);
            buffer.translate(fgSize / 2, fgSize / 2);
            setSpacing(props.spacingParam);
            setSpeed(props.speedParam * 1 / p5.max(1, props.numerator - props.denominator));
        }
        p5.draw = () => {
            buffer.width = fgSize;
            buffer.height = fgSize;
            function x(t) {
                return a * p5.cos(props.numerator / props.denominator * t) * p5.cos(t);
            };
            function y(t) {
                return a * p5.cos(props.numerator / props.denominator * t) * p5.sin(t);
            };

            buffer.clear();
            p5.clear();
            buffer.noStroke();
            buffer.ellipseMode(p5.CENTER);
            buffer.fill(props.foreground);
            for (var i = 0; i < count; i++) {
                let angle = i * spacing + p5.frameCount * angularSpeed;
                angle = angle * p5.PI / 180;
                buffer.ellipse(x(angle), y(angle), radius, radius);
            }
            p5.image(buffer,0+padH/2,0);
            buffer.width = bgSize;
            buffer.height = bgSize;
            for(let pos of backPos){
                p5.image(buffer,pos[0],pos[1])
            }
        }
    }
    return (
        <ReactP5Wrapper sketch={sketch} />
    )
}

export default P5Sketch;
