varying vec2 vUv;

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
void main() {
    float strength = mod(vUv.y * 10.0, 1.0);

    strength  = step(0.8, strength);

    gl_FragColor = vec4(vec3(strength), 1.0);
}