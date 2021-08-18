import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import './style.css';

import galaxyVertexShader from './shaders/galaxy/vertex.glsl';
import galaxyFragmentShader from './shaders/galaxy/fragment.glsl';

// Debug
const gui = new dat.GUI({
  width: 400,
});

// Dimensions
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
let aspectRatio = size.width / size.height;

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Scene
const scene = new THREE.Scene();

// Galaxy
const parameters = {
  branches: 4,
  colorInside: '#ff6030',
  colorOutside: '#1b3984',
  count: 200000,
  radius: 5,
  randomness: 0.2,
  randomnessPower: 3,
  size: 0.01,
};

let geometry = null;
let material = null;
let points = null;

const generateGalaxy = () => {
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);
  const randoms = new Float32Array(parameters.count * 3);
  const scales = new Float32Array(parameters.count);

  const colorInside = new THREE.Color(parameters.colorInside);
  const colorOutside = new THREE.Color(parameters.colorOutside);

  geometry = new THREE.BufferGeometry();

  for (let i = 0; i < parameters.count / 3; i++) {
    const i3 = i * 3;

    // Position
    const radius = Math.random() * parameters.radius;
    const branchAngle = ((i % parameters.branches) / parameters.branches) * (Math.PI * 2);

    positions[i3 + 0] = Math.cos(branchAngle) * radius; // x
    positions[i3 + 1] = 0; // y
    positions[i3 + 2] = Math.sin(branchAngle) * radius; // z

    // Randomness
    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;

    randoms[i3 + 0] = randomX;
    randoms[i3 + 1] = randomY;
    randoms[i3 + 2] = randomZ;

    // Color
    const colorInterpolated = colorInside.clone();
    colorInterpolated.lerp(colorOutside, radius / parameters.radius);
    colors[i3 + 0] = colorInterpolated.r; // r
    colors[i3 + 1] = colorInterpolated.g; // g
    colors[i3 + 2] = colorInterpolated.b; // b

    // Scale
    scales[i] = Math.random();
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

  material = new THREE.PointsMaterial();
  material = new THREE.ShaderMaterial({
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    vertexShader: galaxyVertexShader,
    fragmentShader: galaxyFragmentShader,
    uniforms: {
      uSize: { value: 30.0 * renderer.getPixelRatio() },
      uTime: { value: 0.0 },
    },
  });

  points = new THREE.Points(geometry, material);
  scene.add(points);
};

generateGalaxy();

gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy);
gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy);
gui.add(parameters, 'branches').min(2).max(10).step(1).onFinishChange(generateGalaxy);
gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy);
gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy);
gui.addColor(parameters, 'colorInside').onFinishChange(generateGalaxy);
gui.addColor(parameters, 'colorOutside').onFinishChange(generateGalaxy);

// Camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.05, 20);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  material.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// Handle resize
window.addEventListener('resize', () => {
  // Update dimensions
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  aspectRatio = size.width / size.height;

  // Update camera
  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
