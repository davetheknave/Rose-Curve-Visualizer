import React, { useState } from 'react'
import { ReactP5Wrapper } from '@p5-wrapper/react'

function nextRNG(previous) {
    let a = 8121;
    let c = 28411;
    let m = 134456;
    return (a * previous + c) % m;
}
function RNG(seed) {
    let thisseed = seed;
    return () => {
        let v = nextRNG(thisseed);
        thisseed = v;
        return Number("." + v.toString());
    }
}
const seed = Math.ceil(Math.random() * 100000);
function P5Sketch(props) {
    const [spacing, setSpacing] = useState(0);
    const [angularSpeed, setSpeed] = useState(0);
    const radius = props.radius ?? 8;

    function sketch(p5) {
        var buffer;
        var canvas;
        var stemBuffer;
        const fgSize = 400;
        const padH = (props.width - fgSize) / 2;
        const bgSize = fgSize / 2;
        const backPos = [];
        const a = fgSize / 2.5;

        // Fill the surrounding space with flowers
        let space = 0;
        let random = RNG(seed);
        while ((space + bgSize) < padH) {
            backPos.push([padH - space - bgSize, random() * fgSize / 3]);
            backPos.push([padH + fgSize + space, random() * fgSize / 3]);
            space += bgSize;
        }
        p5.setup = () => {
            canvas = p5.createCanvas(fgSize + padH * 2, fgSize, p5.P2D);
            buffer = p5.createGraphics(fgSize, fgSize, p5.P2D);
            buffer.translate(fgSize / 2, fgSize / 2);
            setSpacing(Number(props.spacingParam));
            setSpeed(props.speedParam * 1 / p5.max(1, props.numerator - props.denominator));
            stemBuffer = p5.createGraphics(fgSize + padH * 2, fgSize, p5.P2D);
            stemBuffer.fill(props.background);
            stemBuffer.stroke(props.background);
            // Draw stems
            for (let pos of backPos) {
                stemBuffer.ellipse(pos[0] + bgSize / 2, pos[1] + bgSize / 2, 5, 5);
                let offset = 0;
                let size = 2;
                let counter = 0;
                let counterChanged = false;
                let leafLength = 22;
                for (let i = pos[1] + bgSize / 2; i < fgSize; i += size * 4 + 1) {
                    stemBuffer.rectMode(p5.CENTER);
                    let x = pos[0] + bgSize / 2 + offset;
                    let y = i;
                    if (random() > 0.5) {
                        stemBuffer.triangle(x, y + size, x + size, y - size, x - size, y - size);
                    }
                    else {
                        stemBuffer.triangle(x, y - size, x + size, y + size, x - size, y + size);
                    }
                    if(random() > 0.8){
                        counter++;
                        counterChanged = true
                    }
                    if (i > (pos[1] + bgSize - 20) && counterChanged) {
                        let length = random() * leafLength * (counter % 2 == 0 ? 1:-1);
                        if (length < 0) {
                            length -= leafLength;
                        }
                        else {
                            length += leafLength;
                        }
                        let height = Math.abs(length) * 0.5;
                        stemBuffer.noFill();
                        stemBuffer.strokeWeight(2)
                        stemBuffer.quad(
                            x + length * 0.3, y,
                            x + length * 0.8, y + height,
                            x + length * 2, y + height * 0.7,
                            x + length, y - height * 0.5
                        );
                        stemBuffer.strokeWeight(1);
                        stemBuffer.fill(props.background);
                    }
                    counterChanged = false;
                    offset += random() * 14 - 7;
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
            buffer.noStroke();
            buffer.ellipseMode(p5.CENTER);
            buffer.fill(props.foreground);
            p5.fill(props.foreground);
            p5.noStroke();
            for (var i = 0; i < 360; i += (spacing * spacing)) {
                let angle = i * .5 + p5.frameCount * angularSpeed;
                angle = angle * p5.PI / 180;
                buffer.ellipse(x(angle), y(angle), radius, radius);
                p5.ellipse(x(angle) + padH + fgSize / 2, y(angle) + fgSize / 2, radius, radius);
            }
            buffer.width = bgSize;
            buffer.height = bgSize;
            p5.image(stemBuffer, 0, 0);
            for (let pos of backPos) {
                p5.image(buffer, pos[0], pos[1])
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
