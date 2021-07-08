import * as dat from 'dat.gui';
import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import './style.css';

// Debug
const gui = new dat.GUI();
const parameters = {
  color: 0xffff00,
  spin: () => {
    gsap.to(mesh.rotation, {
      duration: 2,
      y: mesh.rotation.y + Math.PI * 2,
    });
  },
};

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
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Scene
const scene = new THREE.Scene();

// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: parameters.color });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

gui.addColor(parameters, 'color').onChange(() => {
  material.color.set(parameters.color);
});
gui.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('position x');
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('position y');
gui.add(mesh.position, 'z').min(-3).max(3).step(0.01).name('position z');
gui.add(mesh, 'visible');
gui.add(material, 'wireframe');
gui.add(parameters, 'spin');

// Camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// controls.target = mesh.position;
controls.update();

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

// Handle fullscreen
// window.addEventListener('dblclick', () => {
//   // Are we in fullscreen?
//   const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;

//   // Enter fullscreen
//   if (!isFullscreen) {
//     if (renderer.domElement.requestFullscreen) {
//       renderer.domElement.requestFullscreen();
//     } else {
//       renderer.domElement.webkitRequestFullscreen();
//     }
//   }
//   // Exit fullscreen
//   else {
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     } else {
//       document.webkitExitFullscreen();
//     }
//   }
// });
