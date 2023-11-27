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
function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
};
const seed = Math.ceil(Math.random() * 100000);
function P5Sketch(props) {
    const [spacing, setSpacing] = useState(0);
    const [angularSpeed, setSpeed] = useState(0);
    const radius = Math.max(2,
        (props.radius ?? 8) / Math.max(props.denominator, props.numerator)
    );

    function sketch(p5) {
        var buffer;
        var canvas;
        var stemBuffer;
        const fgSize = 400;
        const padH = (props.width - fgSize) / 2;
        const bgSize = fgSize / 2;
        const backPos = [];
        const a = fgSize / 2.5;
        const d = gcd(props.numerator, props.denominator);

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
            // Draw stems
            stemBuffer.fill(props.background);
            stemBuffer.stroke(props.background);
            for (let pos of backPos) {
                stemBuffer.circle(pos[0] + bgSize / 2, pos[1] + bgSize / 2, 5);
                let offset = 0;
                let size = 2;
                let counter = 0;
                let counterChanged = false;
                let leafLength = 24;
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
                    if (random() > 0.8) {
                        counter++;
                        counterChanged = true
                    }
                    if (i > (pos[1] + bgSize - 20) && counterChanged) {
                        let length = random() * leafLength * (counter % 2 == 0 ? 1 : -1);
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
                return a * p5.sin(props.numerator / props.denominator * t) * p5.cos(t);
            };
            function y(t) {
                return a * p5.sin(props.numerator / props.denominator * t) * p5.sin(t);
            };

            buffer.clear();
            p5.clear();
            buffer.ellipseMode(p5.CORNER);
            p5.ellipseMode(p5.CORNER);
            buffer.noFill();
            p5.noFill();
            buffer.stroke(props.foreground);
            p5.stroke(props.foreground);
            buffer.strokeWeight(radius);
            p5.strokeWeight(radius);
            const cycle = 360 * props.denominator / d;
            let s;
            if(props.solid){
                s = spacing * spacing;
            }
            else {
                s = 1;
            }
            var before = performance.now();
            buffer.beginShape();
            function offset(time) {
                return time * 0.5 * angularSpeed / (props.denominator / d) * (props.denominator / d)
            }
            let anglei = (offset(p5.frameCount) - s) * p5.PI / 180
            var prevLine = [x(anglei), y(anglei)];
            let c = 0;
            for (var i = 0; i < cycle; i += s) {
                let angle = i + offset(p5.frameCount);
                angle = angle * p5.PI / 180;
                let xPos = x(angle);
                let yPos = y(angle);
                let halfHeight = fgSize * .5;
                if(props.solid){
                    buffer.vertex(xPos, yPos);
                }
                else {
                    if (Math.floor(c / (spacing*spacing/4)) % 2 == 0) {
                        buffer.line(prevLine[0], prevLine[1], xPos, yPos);
                    }
                    prevLine = [xPos, yPos];
                }
                c++;
            }
            buffer.endShape(buffer.CLOSE);
            var after = performance.now();
            console.log(after - before);
            p5.image(buffer, padH, 0)
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
