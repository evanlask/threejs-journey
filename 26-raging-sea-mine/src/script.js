import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

import './style.css';

import waterVertexShader from './shaders/water/vertex.glsl';
import waterFragmentShader from './shaders/water/fragment.glsl';

// Debug
const gui = new dat.GUI({
  width: 400,
});

const debug = {};

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

// Fog
// debug.colorFog = '#262837';
// renderer.setClearColor(debug.colorFog);
// const fog = new THREE.Fog(debug.colorFog, 1, 5);
// scene.fog = fog;

// Axes Helper
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// Geometry
const waterGeometry = new THREE.PlaneGeometry(20, 20, 2048, 2048);

// Color
debug.colorDepth = '#186691';
debug.colorSurface = '#9bd8ff';

// Material
const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: waterVertexShader,
  fragmentShader: waterFragmentShader,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: { value: 0 },

    // Big Waves
    uBigWavesElevation: { value: 0.15 },
    uBigWavesFrequency: { value: new THREE.Vector2(4.0, 1.5) },
    uBigWavesSpeed: { value: 0.75 },

    // Small Waves
    uSmallWavesElevation: { value: 0.1 },
    uSmallWavesFrequency: { value: 3.0 },
    uSmallWavesSpeed: { value: 0.2 },
    uSmallWavesIterations: { value: 4.0 },

    // Color
    uColorDepth: { value: new THREE.Color(debug.colorDepth) },
    uColorSurface: { value: new THREE.Color(debug.colorSurface) },
    uColorOffset: { value: 0.12 },
    uColorMultiplier: { value: 4.2 },
  },
});

// Big Waves
gui.add(waterMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation');
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX');
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY');
gui.add(waterMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed');

// Small Waves
gui.add(waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation');
gui.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency');
gui.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed');
gui.add(waterMaterial.uniforms.uSmallWavesIterations, 'value').min(0).max(10).step(1).name('uSmallWavesIterations');

// Color
gui
  .addColor(debug, 'colorDepth')
  .name('uColorDepth')
  .onChange((value) => (waterMaterial.uniforms.uColorDepth.value = new THREE.Color(value)));
gui
  .addColor(debug, 'colorSurface')
  .name('uColorSurface')
  .onChange((value) => (waterMaterial.uniforms.uColorSurface.value = new THREE.Color(value)));
gui.add(waterMaterial.uniforms.uColorOffset, 'value').min(0).max(0.5).step(0.001).name('uColorOffset');
gui.add(waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier');

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI * 0.5;
scene.add(water);

// Camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.05, 100);
camera.position.set(3, 1, 3);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  waterMaterial.uniforms.uTime.value = elapsedTime;

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
