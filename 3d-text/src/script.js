import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import './style.css';

// Debug
const gui = new dat.GUI();

// Textures
const loadingManager = new THREE.LoadingManager();

loadingManager.onError = () => {
  console.log('error');
};

const textureLoader = new THREE.TextureLoader(loadingManager);
const textTexture = textureLoader.load('/textures/matcaps/test2.png');
const donutTexture = textureLoader.load('/textures/matcaps/4.png');

// Fonts
const fontLoader = new THREE.FontLoader();

fontLoader.load('/fonts/gentilis_bold.typeface.json', (font) => {
  // Text
  const bevelSize = 0.01;
  const bevelThickness = 0.01;

  const textGeometry = new THREE.TextGeometry('Mmm… Donuts!', {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness,
    bevelSize,
    bevelOffset: 0,
    bevelSegments: 12,
  });
  textGeometry.center();
  textGeometry.computeBoundingBox();

  console.log(textGeometry.boundingBox);

  const textMaterial = new THREE.MeshMatcapMaterial();
  textMaterial.matcap = textTexture;

  const text = new THREE.Mesh(textGeometry, textMaterial);

  scene.add(text);

  // Donuts
  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
  const donutMaterial = new THREE.MeshMatcapMaterial();
  donutMaterial.matcap = donutTexture;

  const donutCount = 1000;
  const donutRange = 30;
  for (let i = 0; i < donutCount; i++) {
    const donut = new THREE.Mesh(donutGeometry, donutMaterial);

    donut.position.x = (Math.random() - 0.5) * donutRange;
    donut.position.y = (Math.random() - 0.5) * donutRange;
    donut.position.z = (Math.random() - 0.5) * donutRange;

    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();
    donut.scale.x = scale;
    donut.scale.y = scale;
    donut.scale.z = scale;

    scene.add(donut);
  }
});

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

// Axes Helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

// Camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.05, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

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
