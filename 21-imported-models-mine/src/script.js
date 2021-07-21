import * as dat from 'dat.gui';
import * as Stats from 'stats.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import './style.css';

// Stats
var stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

// Debug
const gui = new dat.GUI();

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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Scene
const scene = new THREE.Scene();

// Axes Helper
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// Grid Helper
// const gridHelperX = new THREE.GridHelper(20, 20);
// scene.add(gridHelperX);
// const gridHelperY = new THREE.GridHelper(20, 20);
// gridHelperY.rotation.x = Math.PI * 0.5;
// scene.add(gridHelperY);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: '#444444',
    metalness: 0,
    roughness: 0.5,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.05, 100);
camera.position.set(2, 2, 2);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.75, 0);
controls.enableDamping = true;

// Animate
const clock = new THREE.Clock();
let lastElapsedTime = clock.getElapsedTime();
let currentIntersect = null;

const tick = () => {
  // Debug stats
  stats.begin();

  const elapsedTime = clock.getElapsedTime();
  const deltaElapsedTime = elapsedTime - lastElapsedTime;
  lastElapsedTime = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Debug stats
  stats.end();

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
