import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import './style.css';

// Debug
const gui = new dat.GUI();

// Textures
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('/textures/particles/2.png');

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
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// Cube
// const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial());
// scene.add(cube);

// Particles

// Particles - Geometry
// const particlesGeometry = new THREE.SphereGeometry(1, 32, 32);
const particlesGeometry = new THREE.BufferGeometry();

const count = 20000;
const vertices = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < vertices.length; i++) {
  vertices[i] = (Math.random() - 0.5) * 10;
  colors[i] = Math.random();
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// Particles - Material
const particlesMaterial = new THREE.PointsMaterial();
particlesMaterial.size = 0.1;
particlesMaterial.sizeAttenuation = true;
// particlesMaterial.color = new THREE.Color('#ff88cc');
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTexture;
// particlesMaterial.alphaTest = 0.001;
// particlesMaterial.depthTest = false;
particlesMaterial.depthWrite = false;
particlesMaterial.blending = THREE.AdditiveBlending;
particlesMaterial.vertexColors = true;

// Particles - Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.05, 100);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update particles
  // particles.rotation.y = elapsedTime * 0.1;
  // particles.scale.x = elapsedTime * 0.1;
  // particles.scale.y = elapsedTime * 0.1;
  // particles.scale.z = elapsedTime * 0.1;

  for (let i = 0; i < particlesGeometry.attributes.position.array.length; i++) {
    const i3 = i * 3;

    const x = particlesGeometry.attributes.position.array[i3 + 0];
    const y = particlesGeometry.attributes.position.array[i3 + 1];
    const z = particlesGeometry.attributes.position.array[i3 + 2];

    particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x);
  }

  particlesGeometry.attributes.position.needsUpdate = true;

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
