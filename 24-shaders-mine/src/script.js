import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

import './style.css';

import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

// Debug
const gui = new dat.GUI();

// Textures
const textureLoader = new THREE.TextureLoader();

const flagTexture = textureLoader.load('/textures/flag-french.jpg');

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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Scene
const scene = new THREE.Scene();

// Axes Helper
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 64, 64);

// const count = geometry.attributes.position.count;
// const randoms = new Float32Array(count);

// for (let i = 0; i < count; i++) {
//   randoms[i] = Math.random();
// }

// geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

// console.log(geometry.attributes);

// Material
const material = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
  // wireframe: true,
  side: THREE.DoubleSide,
  uniforms: {
    uColor: { value: new THREE.Color('salmon') },
    uFrequency: { value: new THREE.Vector2(10, 5) },
    uTexture: { value: flagTexture },
    uTime: { value: 0 },
  },
});

gui.add(material.uniforms.uFrequency.value, 'x').min(0).max(20).step(0.01).name('frequencyX');
gui.add(material.uniforms.uFrequency.value, 'y').min(0).max(20).step(0.01).name('frequencyY');

// Mesh
const mesh = new THREE.Mesh(geometry, material);
mesh.scale.y = 2 / 3;
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.05, 100);
camera.position.set(0.25, -0.25, 1);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Animate
const clock = new THREE.Clock();
let lastElapsedTime = clock.getElapsedTime();
let currentIntersect = null;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaElapsedTime = elapsedTime - lastElapsedTime;
  lastElapsedTime = elapsedTime;

  // Update uniform
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
