import * as THREE from 'three';
import gsap from 'gsap';

import './style.css';

// Dimensions
const size = {
  width: 800,
  height: 600,
};

// Scene
const scene = new THREE.Scene();

// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas,
});
renderer.setSize(size.width, size.height);

// Animation - Time
// let time = Date.now();

// const tick = () => {
//   // Time
//   const currentTime = Date.now();
//   const deltaTime = currentTime - time;
//   time = currentTime;
//
//   // Update object position
//   mesh.rotation.y += 0.001 * deltaTime;
//
//   // Render
//   renderer.render(scene, camera);
//
//   window.requestAnimationFrame(tick);
// };

// Animation - Clock
// const clock = new THREE.Clock();

// const tick = () => {
//   const elapsedTime = clock.getElapsedTime();

//   // Update object position
//   // mesh.rotation.y = elapsedTime * Math.PI * 2;
//   // mesh.position.x = Math.cos(elapsedTime);
//   // mesh.position.y = Math.sin(elapsedTime);
//   camera.position.x = Math.cos(elapsedTime);
//   camera.position.y = Math.sin(elapsedTime);
//   camera.lookAt(mesh.position);

//   // Render
//   renderer.render(scene, camera);

//   window.requestAnimationFrame(tick);
// };

// Animation - Library
gsap.to(mesh.position, {
  ease: 'elastic.out(1)',
  delay: 1,
  duration: 1,
  x: 2,
});

const tick = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
