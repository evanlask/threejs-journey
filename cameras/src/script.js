import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import './style.css';

// Dimensions
const size = {
  width: 800,
  height: 600,
};

// Mouse position
const mouse = {
  x: 0,
  y: 0,
};

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX / size.width - 0.5;
  mouse.y = -(e.clientY / size.height - 0.5);
});

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas,
});
renderer.setSize(size.width, size.height);

// Scene
const scene = new THREE.Scene();

// Cube
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
  })
);
scene.add(mesh);

// Camera
const aspectRatio = size.width / size.height;
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
// console.log(aspectRatio);
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);
// camera.position.set(2, 2, 2);
camera.position.set(0, 0, 2);
// console.log(camera.position.length());
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target = mesh.position;
// controls.target.y = 1;
// controls.update();

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update object position
  // mesh.rotation.y = elapsedTime;

  // Update camera
  // camera.position.x = Math.sin(mouse.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(mouse.x * Math.PI * 2) * 3;
  // camera.position.y = mouse.y * 5;
  // camera.lookAt(mesh.position);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
