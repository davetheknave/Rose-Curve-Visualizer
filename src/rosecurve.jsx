import React, { useState } from 'react'
import { ReactP5Wrapper } from '@p5-wrapper/react'

function nextRNG(previous){
    let a = 8121;
    let c = 28411;
    let m = 134456;
    return (a * previous + c) % m;
}
function RNG(seed){
    let thisseed = seed;
    return () => {
        let v = nextRNG(thisseed);
        thisseed = v;
        return Number("."+v.toString());
    }
}

function P5Sketch(props) {
    const [spacing, setSpacing] = useState(0);
    const [angularSpeed, setSpeed] = useState(0);
    const count = props.count ?? 10;
    const radius = props.radius ?? 8;
    const a = 175;
    
    function sketch(p5) {
        var buffer;
        var canvas;
        var stemBuffer;
        const fgSize = 400;
        const padH = 400;
        const bgSize = 200;
        const backPos = [];

        // Fill the surrounding space with flowers
        let space = 0;
        let random = RNG(9);
        while(space < padH/2){
            backPos.push([0+space,random()*fgSize/2]);
            backPos.push([fgSize+padH-space-bgSize,random()*fgSize/2]);
            space+=bgSize;
        }
        p5.setup = () => {
            canvas = p5.createCanvas(fgSize+padH, fgSize, p5.P2D);
            buffer = p5.createGraphics(fgSize, fgSize, p5.P2D);
            buffer.translate(fgSize / 2, fgSize / 2);
            setSpacing(props.spacingParam);
            setSpeed(props.speedParam * 1 / p5.max(1, props.numerator - props.denominator));
            stemBuffer = p5.createGraphics(fgSize+padH, fgSize, p5.P2D);
            stemBuffer.fill(props.background);
            stemBuffer.stroke(props.background);
            for(let pos of backPos){
                stemBuffer.ellipse(pos[0]+bgSize/2,pos[1]+bgSize/2,5,5);
                let offset = 0;
                let size = 2;
                for(let i = pos[1]+bgSize/2; i < bgSize*2;i+=size*4+1){
                    stemBuffer.rectMode(p5.CENTER);
                    let x = pos[0]+bgSize/2+offset;
                    let y = i;
                    if(random() > 0.5){
                        stemBuffer.triangle(x,y+size,x+size,y-size,x-size,y-size);
                    }
                    else {
                        stemBuffer.triangle(x,y-size,x+size,y+size,x-size,y+size);
                    }
                    offset += random()*14-7;
                }
            }
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
            if(props.dotmode === "true"){
                buffer.noStroke();
                buffer.fill(props.foreground);
                p5.fill(props.foreground);
                for (var i = 0; i < count; i++) {
                    let angle = i * spacing + p5.frameCount * angularSpeed;
                    angle = angle * p5.PI / 180;
                    buffer.ellipse(x(angle), y(angle), radius*2, radius*2);
                    p5.ellipse(x(angle)+bgSize+padH/2, y(angle)+bgSize, radius*1.25, radius*1.25);
                }
            }
            else {
                buffer.noStroke();
                buffer.ellipseMode(p5.CENTER);
                buffer.fill(props.foreground);
                p5.fill(props.foreground);
                p5.noStroke();
                for(var i = 0; i < 1000; i++){
                    let angle = i * .5 + p5.frameCount * angularSpeed;
                    angle = angle * p5.PI / 180;
                    buffer.ellipse(x(angle), y(angle), radius/2, radius/2);
                    p5.ellipse(x(angle)+bgSize+padH/2, y(angle)+bgSize, radius*1.25, radius*1.25);
                }
            }
            buffer.width = bgSize;
            buffer.height = bgSize;
            p5.image(stemBuffer,0,0);
            for(let pos of backPos){
                p5.image(buffer,pos[0],pos[1])
            }
        }
    }
    return (
        <>
            <ReactP5Wrapper sketch={sketch} />
        </>
    )
}

export default P5Sketch;
