import { ReactP5Wrapper } from '@p5-wrapper/react';
import * as MathD from './utility.jsx';

const seed = Math.ceil(Math.random() * 100000);
function P5Sketch(props) {
    function sketch(p5) {
        let canvas;
        let roseBuffer;
        let stemBuffer;
        let random = MathD.RNG(seed);

        const height = 400;
        const miniSize = height / 2;
        const pad = (props.width - height) / 2;
        const miniRoses = [];
        let gcd;
        let radius;
        let lastDenominator;
        let lastNumerator;

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
                // let leafColor = [255-props.foreground.current[0],255-props.foreground.current[1],255-props.foreground.current[2]];
                for (let i = pos[1] + miniSize / 2 + size * 4 + 1; i < height; i += size * 4 + 1) {
                    let x = pos[0] + miniSize / 2 + offset;
                    let y = i;
                    // Stem
                    // stemBuffer.stroke(props.background)
                    if (random() > 0.5) {
                        stemBuffer.triangle(x, y + size, x + size, y - size, x - size, y - size);
                    }
                    else {
                        stemBuffer.triangle(x, y - size, x + size, y + size, x - size, y + size);
                    }
                    // Leaves
                    // stemBuffer.stroke(leafColor)
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
            // Check if values have changed
            if (lastNumerator != props.numerator.current || lastDenominator != props.denominator.current) {
                gcd = MathD.gcd(props.numerator.current, props.denominator.current);
                radius = Math.max(
                    2,
                    (props.radius ?? 8) / Math.max(props.denominator.current, props.numerator.current)
                );
                lastNumerator = props.numerator.current;
                lastDenominator = props.denominator.current;
            }
            const spacing = Math.max(11 - props.quality.current, 1);
            roseBuffer.width = height;
            roseBuffer.height = height;
            function x(t) {
                return -height / 2.5 * p5.sin(props.numerator.current / props.denominator.current * t) * p5.cos(t);
            };
            function y(t) {
                return -height / 2.5 * p5.sin(props.numerator.current / props.denominator.current * t) * p5.sin(t);
            };

            roseBuffer.clear();
            p5.clear();
            roseBuffer.stroke(props.foreground.current);
            p5.stroke(props.foreground.current);
            roseBuffer.noFill();
            p5.noFill();
            roseBuffer.strokeWeight(radius);
            p5.strokeWeight(radius);

            const cycle = 360 * props.denominator.current / gcd;
            let step;
            if (props.polygon.current) {
                step = spacing * spacing;
            }
            else {
                step = 1;
            }
            roseBuffer.beginShape();
            function offset(time) {
                return time * 0.5 * (props.speed.current * 1 / p5.max(1, props.numerator.current - props.denominator.current)) / (props.denominator.current / gcd) * (props.denominator.current / gcd)
            }
            let anglei = (offset(p5.frameCount) - step) * p5.PI / 180
            var prevLinePos = [x(anglei), y(anglei)];
            let i = 0;
            for (var s = 0; s < cycle; s += step) {
                let angle = (s + offset(p5.frameCount)) * p5.PI / 180;
                let xPos = x(angle);
                let yPos = y(angle);
                if (props.polygon.current) {
                    roseBuffer.vertex(xPos, yPos);
                }
                else {
                    if (Math.floor(i / (spacing * spacing / 4)) % 2 == 0) {
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
