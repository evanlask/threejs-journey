import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import './style.css';

// Textures
const loadingManager = new THREE.LoadingManager();

loadingManager.onError = () => {
  console.log('error');
};

const textureLoader = new THREE.TextureLoader(loadingManager);
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg');
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;
const matcapTexture = textureLoader.load('/textures/matcaps/3.png');

const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager);
const environmentMapTexture = cubeTextureLoader.load([
  '/textures/environmentMaps/0/px.jpg',
  '/textures/environmentMaps/0/nx.jpg',
  '/textures/environmentMaps/0/py.jpg',
  '/textures/environmentMaps/0/ny.jpg',
  '/textures/environmentMaps/0/pz.jpg',
  '/textures/environmentMaps/0/nz.jpg',
]);

// Debug
const gui = new dat.GUI();

const debug = {
  rotate: false,
};

gui.add(debug, 'rotate');

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

// Objects
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// // material.color = new THREE.Color(0x00ff00);
// // material.wireframe = true;
// material.transparent = true;
// // material.opacity = 0.5;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide;

// const material = new THREE.MeshNormalMaterial();
// material.side = THREE.DoubleSide;
// material.wireframe = true;
// material.flatShading = true;

// const material = new THREE.MeshMatcapMaterial();
// material.side = THREE.DoubleSide;
// material.matcap = matcapTexture;

// const material = new THREE.MeshDepthMaterial();
// material.side = THREE.DoubleSide;

// const material = new THREE.MeshLambertMaterial();
// material.side = THREE.DoubleSide;

// const material = new THREE.MeshPhongMaterial();
// material.side = THREE.DoubleSide;
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff);

// const material = new THREE.MeshToonMaterial();
// material.side = THREE.DoubleSide;
// material.gradientMap = gradientTexture;

// const material = new THREE.MeshStandardMaterial();
// material.side = THREE.DoubleSide;
// material.metalness = 0.7;
// material.roughness = 0.2;
// material.envMap = environmentMapTexture;

const material = new THREE.MeshStandardMaterial();
material.side = THREE.DoubleSide;
material.map = doorColorTexture;
material.aoMap = doorAmbientOcclusionTexture;
material.aoMapIntensity = 1;
material.displacementMap = doorHeightTexture;
material.displacementScale = 0.01;
material.metalnessMap = doorMetalnessTexture;
material.metalness = 0; // Default
material.metalness = 0.45; // Not used with map
material.roughnessMap = doorRoughnessTexture;
material.roughness = 1; // Default
material.roughness = 0.65; // Not used with map
material.normalMap = doorNormalTexture;
material.normalScale.x = 0.5;
material.normalScale.y = 0.5;
material.alphaMap = doorAlphaTexture;
material.transparent = false;
material.envMap = environmentMapTexture;

material.wireframe = false;

gui.add(material, 'metalness').min(0).max(1).step(0.0001);
gui.add(material, 'roughness').min(0).max(1).step(0.0001);
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001);
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001);
gui.add(material.normalScale, 'x').min(0).max(1).step(0.0001).name('normal scale x');
gui.add(material.normalScale, 'y').min(0).max(1).step(0.0001).name('normal scale y');
gui.add(material, 'transparent');
gui.add(material, 'wireframe');

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2));
sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2));

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.2, 64, 64), material);
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2));
torus.position.x = 1.5;

scene.add(sphere, plane, torus);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// Camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
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

  if (debug.rotate) {
    sphere.rotation.x = elapsedTime * 0.15;
    sphere.rotation.y = elapsedTime * 0.1;

    plane.rotation.x = elapsedTime * 0.15;
    plane.rotation.y = elapsedTime * 0.1;

    torus.rotation.x = elapsedTime * 0.15;
    torus.rotation.y = elapsedTime * 0.1;
  }

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
