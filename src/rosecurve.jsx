import React, { useState } from 'react';
import { ReactP5Wrapper } from '@p5-wrapper/react';
import * as MathD from './utility.jsx';

const seed = Math.ceil(Math.random() * 100000);
function P5Sketch(props) {
    const [angularSpeed, setSpeed] = useState(0);

    function sketch(p5) {
        var canvas;
        var roseBuffer;
        var stemBuffer;
        let random = MathD.RNG(seed);
        
        const height = 400;
        const miniSize = height / 2;
        const pad = (props.width - height) / 2;
        const miniRoses = [];
        const gcd = MathD.gcd(props.numerator, props.denominator);
        const radius = Math.max(
            2,
            (props.radius ?? 8) / Math.max(props.denominator, props.numerator)
        );

        // Fill the surrounding space with flowers
        let space = 0;
        while ((space + miniSize) < pad) {
            miniRoses.push([pad - space - miniSize, random() * height / 3]);
            miniRoses.push([pad + height + space, random() * height / 3]);
            space += miniSize;
        }
        p5.setup = () => {
            canvas = p5.createCanvas(height + pad * 2, height, p5.P2D);
            roseBuffer = p5.createGraphics(height, height, p5.P2D);
            roseBuffer.translate(height / 2, height / 2);
            stemBuffer = p5.createGraphics(height + pad * 2, height, p5.P2D);
            setSpeed(props.speed * 1 / p5.max(1, props.numerator - props.denominator));
            
            // Draw stems
            stemBuffer.fill(props.background);
            stemBuffer.stroke(props.background);
            for (let pos of miniRoses) {
                // stemBuffer.circle(pos[0] + miniSize / 2, pos[1] + miniSize / 2, 5);
                let offset = 0;
                let size = 2;
                let counter = 0;
                let counterChanged = false;
                let leafLength = 24;
                for (let i = pos[1] + miniSize / 2 + size * 4 + 1; i < height; i += size * 4 + 1) {
                    stemBuffer.rectMode(p5.CENTER);
                    let x = pos[0] + miniSize / 2 + offset;
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
                    if (i > (pos[1] + miniSize - 20) && counterChanged) {
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
            roseBuffer.width = height;
            roseBuffer.height = height;
            function x(t) {
                return height/2.5 * p5.sin(props.numerator / props.denominator * t) * p5.cos(t);
            };
            function y(t) {
                return height/2.5 * p5.sin(props.numerator / props.denominator * t) * p5.sin(t);
            };

            roseBuffer.clear();
            p5.clear();
            roseBuffer.stroke(props.foreground);
            p5.stroke(props.foreground);
            roseBuffer.noFill();
            p5.noFill();
            roseBuffer.strokeWeight(radius);
            p5.strokeWeight(radius);

            const cycle = 360 * props.denominator / gcd;
            let step;
            if (props.solid) {
                step = props.spacing * props.spacing;
            }
            else {
                step = 1;
            }
            roseBuffer.beginShape();
            function offset(time) {
                return time * 0.5 * angularSpeed / (props.denominator / gcd) * (props.denominator / gcd)
            }
            let anglei = (offset(p5.frameCount) - step) * p5.PI / 180
            var prevLinePos = [x(anglei), y(anglei)];
            let i = 0;
            for (var s = 0; s < cycle; s += step) {
                let angle = (s + offset(p5.frameCount)) * p5.PI / 180;
                let xPos = x(angle);
                let yPos = y(angle);
                if (props.solid) {
                    roseBuffer.vertex(xPos, yPos);
                }
                else {
                    if (Math.floor(i / (props.spacing * props.spacing / 4)) % 2 == 0) {
                        roseBuffer.line(prevLinePos[0], prevLinePos[1], xPos, yPos);
                    }
                    prevLinePos = [xPos, yPos];
                }
                i++;
            }
            roseBuffer.endShape(roseBuffer.CLOSE);
            p5.image(roseBuffer, pad, 0)

            p5.image(stemBuffer, 0, 0);
            
            roseBuffer.width = miniSize;
            roseBuffer.height = miniSize;
            for (let pos of miniRoses) {
                p5.image(roseBuffer, pos[0], pos[1])
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
