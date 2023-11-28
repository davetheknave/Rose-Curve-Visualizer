const nextRNG = function (previous) {
    let a = 8121;
    let c = 28411;
    let m = 134456;
    return (a * previous + c) % m;
}
export const RNG = function (seed) {
    let thisseed = seed;
    return () => {
        let v = nextRNG(thisseed);
        thisseed = v;
        return Number("." + v.toString());
    }
}
export const gcd = function (a, b) {
    return b ? gcd(b, a % b) : a;
};
export const clamp = function (v, min, max) {
    return Math.min(Math.max(v, min), max);
}
export const arrayToHex = function (input) {
    return "#" + input[0].toString(16) + input[1].toString(16) + input[2].toString(16);
}
export const hexToArray = function (input) {
    var rgb = parseInt(input.substring(1), 16);    
    var red   = (rgb >> 16) & 0xFF;   
    var green = (rgb >> 8) & 0xFF;     
    var blue  = rgb & 0xFF;   
    return [red,green,blue];
}