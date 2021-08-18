import * as dat from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

import './style.css';

// Debug
const debug = {};
const gui = new dat.GUI();

// Loaders
const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

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
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.physicallyCorrectLights = true;
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 3;

gui
  .add(renderer, 'toneMapping', {
    No: THREE.NoToneMapping,
    Linear: THREE.LinearToneMapping,
    Reinhard: THREE.ReinhardToneMapping,
    Cineon: THREE.CineonToneMapping,
    ACESFilmic: THREE.ACESFilmicToneMapping,
  })
  .onFinishChange((value) => {
    renderer.toneMapping = Number(value);
    updateAllMaterials();
  });

gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.01);

// Scene
const scene = new THREE.Scene();

// Update all materials
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
      // child.material.envMap = environmentMap;
      child.material.envMapIntensity = debug.envMapIntensity;
      child.material.needsUpdate = true;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
};

// Axes Helper
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// Environment map
const environmentMap = cubeTextureLoader.load([
  '/textures/environmentMaps/0/px.jpg',
  '/textures/environmentMaps/0/nx.jpg',
  '/textures/environmentMaps/0/py.jpg',
  '/textures/environmentMaps/0/ny.jpg',
  '/textures/environmentMaps/0/pz.jpg',
  '/textures/environmentMaps/0/nz.jpg',
]);
environmentMap.encoding = THREE.sRGBEncoding;

scene.background = environmentMap;
scene.environment = environmentMap;

debug.envMapIntensity = 5;
gui.add(debug, 'envMapIntensity').min(0).max(10).step(0.001).onFinishChange(updateAllMaterials);

// Models
gltfLoader.load('/models/FlightHelmet/glTF/FlightHelmet.gltf', (gltf) => {
  gltf.scene.scale.set(10, 10, 10);
  gltf.scene.position.set(0, -4, 0);
  gltf.scene.rotation.y = Math.PI * 0.5;

  scene.add(gltf.scene);

  gui.add(gltf.scene.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.0001).name('rotation');

  updateAllMaterials();
});

// Lights
const directionalLight = new THREE.DirectionalLight('#ffffff', 3);
directionalLight.position.set(0.24, 3, -2.25);
directionalLight.castShadow = true;
directionalLight.shadow.camera.far = 10;
directionalLight.shadow.mapSize.set(1024, 1024);
scene.add(directionalLight);

// const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(directionalLightCameraHelper);

gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity');
gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.001).name('lightX');
gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.001).name('lightY');
gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.001).name('lightZ');

// Camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.05, 100);
camera.position.set(4, 1, -4);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Animate
const clock = new THREE.Clock();
let lastElapsedTime = clock.getElapsedTime();
let currentIntersect = null;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaElapsedTime = elapsedTime - lastElapsedTime;
  lastElapsedTime = elapsedTime;

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
