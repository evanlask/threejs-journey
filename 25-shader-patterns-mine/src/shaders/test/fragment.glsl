#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

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
void main() {
    float strength = distance(vUv, vec2(0.5));

    strength = step(0.25, strength);

    gl_FragColor = vec4(vec3(strength), 1.0);
}