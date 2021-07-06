import * as THREE from 'three';

import './style.css';

// Dimensions
const size = {
  width: 800,
  height: 600,
};

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
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.set(2, 2, 2);
camera.lookAt(mesh.position);
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas,
});
renderer.setSize(size.width, size.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update object position
  mesh.rotation.y = elapsedTime;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
