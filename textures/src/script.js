import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import './style.css';

// Textures
const loadingManager = new THREE.LoadingManager();

loadingManager.onError = () => {
  console.log('error');
};

const textureLoader = new THREE.TextureLoader(loadingManager);
// const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
// const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
// const colorTexture = textureLoader.load('/textures/door/color.jpg');
// const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png');
// const colorTexture = textureLoader.load('/textures/checkerboard-8x8.png');
const colorTexture = textureLoader.load('/textures/minecraft.png');
// const heightTexture = textureLoader.load('/textures/door/height.jpg');
// const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
// const normalTexture = textureLoader.load('/textures/door/normal.jpg');
// const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;
// colorTexture.rotation = Math.PI * 0.25;

colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

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
const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
// console.log(geometry.attributes.uv);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target = mesh.position;
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
