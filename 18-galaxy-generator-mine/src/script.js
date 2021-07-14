import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import './style.css';

// Debug
const gui = new dat.GUI({
  width: 400,
});

// Textures
const textureLoader = new THREE.TextureLoader();

// Dimensions
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
let aspectRatio = size.width / size.height;

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas,
});
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Scene
const scene = new THREE.Scene();

// Axes Helper
// const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper);

// Cube
// const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial());
// scene.add(cube);

// Galaxy
const parameters = {
  branches: 4,
  colorInside: '#ff6030',
  colorOutside: '#1b3984',
  count: 500000,
  radius: 5,
  randomness: 0.4,
  randomnessPower: 3,
  size: 0.01,
  spin: 1,
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

  const vertices = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);

  const colorInside = new THREE.Color(parameters.colorInside);
  const colorOutside = new THREE.Color(parameters.colorOutside);

  geometry = new THREE.BufferGeometry();

  for (let i = 0; i < parameters.count / 3; i++) {
    const i3 = i * 3;

    // Position
    const radius = Math.random() * parameters.radius;
    const spinAngle = radius * parameters.spin;
    const branchAngle = ((i % parameters.branches) / parameters.branches) * (Math.PI * 2);

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

    vertices[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX; // x
    vertices[i3 + 1] = randomY; // y
    vertices[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ; // z

    // Color
    const colorInterpolated = colorInside.clone();
    colorInterpolated.lerp(colorOutside, radius / parameters.radius);
    colors[i3 + 0] = colorInterpolated.r; // r
    colors[i3 + 1] = colorInterpolated.g; // g
    colors[i3 + 2] = colorInterpolated.b; // b
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  material = new THREE.PointsMaterial();
  material.size = parameters.size;
  material.sizeAttenuation = true;
  material.depthWrite = false;
  material.blending = THREE.AdditiveBlending;
  material.vertexColors = true;

  points = new THREE.Points(geometry, material);
  scene.add(points);
};

generateGalaxy();

gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy);
gui.addColor(parameters, 'colorInside').onFinishChange(generateGalaxy);
gui.addColor(parameters, 'colorOutside').onFinishChange(generateGalaxy);
gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy);
gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy);
gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy);
gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy);
gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy);
gui.add(parameters, 'spin').min(-2).max(2).step(0.001).onFinishChange(generateGalaxy);

// Camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.05, 100);
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
