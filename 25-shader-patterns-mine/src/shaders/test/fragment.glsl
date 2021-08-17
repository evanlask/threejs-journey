#define PI 3.1415926535897932384626433832795

varying vec2 vUv;
varying float vAmplitude;
varying float vFrequency;
varying float vLimit;

// Random
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// Rotate
vec2 rotate(vec2 uv, float rotation, vec2 mid) {
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

//  Classic Perlin 2D Noise by Stefan Gustavson
vec2 fade(vec2 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

vec4 permute(vec4 x) {
    return mod(((x*34.0)+1.0)*x, 289.0);
}

float cnoise(vec2 P) {
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

// Pattern 3
// void main() {
//     float strength = vUv.x;

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 4
// void main() {
//     float strength = vUv.y;

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 5
// void main() {
//     float strength = 1.0 - vUv.y;

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 6
// void main() {
//     float strength = vUv.y * 10.0;

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 7
// void main() {
//     float strength = mod(vUv.y * 10.0, 1.0);

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 8
// void main() {
//     float strength = mod(vUv.y * 10.0, 1.0);

//     strength  = step(0.5, strength);

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 9
// void main() {
//     float strength = mod(vUv.y * 10.0, 1.0);

//     strength  = step(0.8, strength);

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 10
// void main() {
//     float strength = mod(vUv.x * 10.0, 1.0);

//     strength  = step(0.8, strength);

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 11
// void main() {
//     float strength  = step(0.8, mod(vUv.x * 10.0, 1.0));
//     strength += step(0.8, mod(vUv.y * 10.0, 1.0));

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 12
// void main() {
//     float strength  = step(0.8, mod(vUv.x * 10.0, 1.0));
//     strength *= step(0.8, mod(vUv.y * 10.0, 1.0));

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 13
// void main() {
//     float strength  = step(0.4, mod(vUv.x * 10.0, 1.0));
//     strength *= step(0.8, mod(vUv.y * 10.0, 1.0));

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 14
// void main() {
//     float barX  = step(0.4, mod(vUv.x * 10.0, 1.0));
//     barX *= step(0.8, mod(vUv.y * 10.0, 1.0));

//     float barY  = step(0.8, mod(vUv.x * 10.0, 1.0));
//     barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

//     float strength = barX + barY;

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 15
// void main() {
//     float barX  = step(0.4, mod(vUv.x * 10.0, 1.0));
//     barX *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));

//     float barY  = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
//     barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

//     float strength = barX + barY;

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 16
// void main() {
//     float strength = abs(vUv.x - 0.5);

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 17
// void main() {
//     float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 18
// void main() {
//     float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 19
// void main() {
//     float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 20
// void main() {
//     float squareOne = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
//     float squareTwo = 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
//     float strength = squareOne * squareTwo;

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 21
// void main() {
//     float strength = floor(vUv.x * 10.0) / 10.0;

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 22
// void main() {
//     float strength = floor(vUv.x * 10.0) / 10.0;
//     strength *= floor(vUv.y * 10.0) / 10.0;

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 23
// void main() {
//     float strength = random(vUv);

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 24
// void main() {
//     vec2 gridUv = vec2(
//         floor(vUv.x * 10.0) / 10.0,
//         floor(vUv.y * 10.0) / 10.0
//     );

//     float strength = random(gridUv);

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 25
// void main() {
//     vec2 gridUv = vec2(
//         floor(vUv.x * 10.0) / 10.0,
//         floor(vUv.y * 10.0 + vUv.x * 5.0) / 10.0
//     );

//     float strength = random(gridUv);

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 26
// void main() {
//     float strength = length(vUv);

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 27
// void main() {
//     // float strength = length(vUv - 0.5);
//     float strength = distance(vUv, vec2(0.5));

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 28
// void main() {
//     float strength = 1.0 - distance(vUv, vec2(0.5));

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 29
// void main() {
//     float strength = 0.015 / distance(vUv, vec2(0.5));

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 30
// void main() {
//     float strength = 0.15 / (
//         distance(
//             vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5),
//             vec2(0.5)
//         )
//     );

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 31
// void main() {
//     float strength = 0.15 / (distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
//     strength *= 0.15 / (distance(vec2(vUv.y, (vUv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 32
// void main() {
//     vec2 rotatedUv = rotate(vUv, PI * 0.25 ,vec2(0.5));

//     float strength = 0.15 / (distance(vec2(rotatedUv.x, (rotatedUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
//     strength *= 0.15 / (distance(vec2(rotatedUv.y, (rotatedUv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 33
// void main() {
//     float strength = distance(vUv, vec2(0.5));

//     strength = step(0.25, strength);

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 34
// void main() {
//     float strength = abs(distance(vUv, vec2(0.5)) - 0.25);

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 35
// void main() {
//     float strength = abs(distance(vUv, vec2(0.5)) - 0.25);
    
//     strength = step(0.01, strength);

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 36
// void main() {
//     float strength = abs(distance(vUv, vec2(0.5)) - 0.25);
    
//     strength = step(0.01, strength);

//     strength = 1.0 - strength;

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 37
// void main() {
//     vec2 wavedUv = vec2(
//         vUv.x,
//         vUv.y + sin(vUv.x * 30.0) * 0.1
//     );

//     float strength = abs(distance(wavedUv, vec2(0.5)) - 0.25);
    
//     strength = step(0.01, strength);

//     strength = 1.0 - strength;

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 38
// void main() {
//     vec2 wavedUv = vec2(
//         vUv.x + sin(vUv.y * 30.0) * 0.1,
//         vUv.y + sin(vUv.x * 30.0) * 0.1
//     );

//     float strength = abs(distance(wavedUv, vec2(0.5)) - 0.25);
    
//     strength = step(0.01, strength);

//     strength = 1.0 - strength;

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 39
// void main() {
//     vec2 wavedUv = vec2(
//         vUv.x + sin(vUv.y * 100.0) * 0.1,
//         vUv.y + sin(vUv.x * 100.0) * 0.1
//     );

//     float strength = abs(distance(wavedUv, vec2(0.5)) - 0.25);
    
//     strength = step(0.01, strength);

//     strength = 1.0 - strength;

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 40
// void main() {
//     float angle = atan(vUv.x, vUv.y);
//     float strength = angle;

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 41
// void main() {
//     float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
//     float strength = angle;

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 42
// void main() {
//     float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
//     angle /= PI * 2.0;
//     angle += 0.5;
//     float strength = angle;

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 43
// void main() {
//     float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
//     angle /= PI * 2.0;
//     angle += 0.5;
//     angle *= 20.0;
//     angle = mod(angle, 1.0);

//     float strength = angle;

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 44
// void main() {
//     float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
//     angle /= PI * 2.0;
//     angle += 0.5;

//     float strength = sin(angle * 100.0);

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 45
// void main() {
//     float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
//     angle /= PI * 2.0;
//     angle += 0.5;
//     float sinusoid = sin(angle * 100.0);

//     float radius = 0.25 + sinusoid * 0.02;
//     float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - radius));

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 46
// void main() {
//     float strength = cnoise(vUv * 10.0);

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 47
// void main() {
//     float strength = step(0.0, cnoise(vUv * 10.0));

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 48
// void main() {
//     float strength = 1.0 - abs(cnoise(vUv * 10.0));

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 49
// void main() {
//     float strength = sin(cnoise(vUv * 10.0) * 20.0);

//     gl_FragColor = vec4(vec3(strength), 1.0);
// }

// Pattern 50
void main() {
    float strength = step(vLimit, sin(cnoise(vUv * vFrequency) * vAmplitude));

    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 1.0);
    vec3 mixedColor = mix(blackColor, uvColor, clamp(strength, 0.0, 1.0));

    gl_FragColor = vec4(mixedColor, 1.0);

    // gl_FragColor = vec4(vec3(strength), 1.0);
}