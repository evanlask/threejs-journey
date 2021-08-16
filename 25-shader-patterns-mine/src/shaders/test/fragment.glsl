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
void main() {
    float strength = 1.0 - vUv.y;

    gl_FragColor = vec4(vec3(strength), 1.0);
}