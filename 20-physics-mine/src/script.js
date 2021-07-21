import CANNON from 'cannon';
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
const parameters = {};

parameters.createSphere = () => {
  createSphere(Math.max(0.25, Math.random() * 0.5), {
    x: (Math.random() - 0.5) * 3,
    y: 3,
    z: (Math.random() - 0.5) * 3,
  });
};

parameters.createBox = () => {
  createBox(Math.max(0.25, Math.random()), Math.max(0.25, Math.random()), Math.max(0.25, Math.random()), {
    x: (Math.random() - 0.5) * 3,
    y: 3,
    z: (Math.random() - 0.5) * 3,
  });
};

parameters.reset = () => {
  objectsToUpdate.forEach((object) => {
    // Remove body
    object.body.removeEventListener('collide', playHitSound);
    world.removeBody(object.body);

    // Remove mesh
    scene.remove(object.mesh);
  });
};

const gui = new dat.GUI();
gui.add(parameters, 'createBox');
gui.add(parameters, 'createSphere');
gui.add(parameters, 'reset');

// Sounds
const hitSound = new Audio('/sounds/hit.mp3');

const playHitSound = (collision) => {
  const impactVelocity = collision.contact.getImpactVelocityAlongNormal();

  if (impactVelocity > 1.5) {
    hitSound.volume = Math.random();
    hitSound.currentTime = 0;
    hitSound.play();
  }
};

// Textures
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const environmentMapTexture = cubeTextureLoader.load([
  '/textures/environmentMaps/0/px.png',
  '/textures/environmentMaps/0/nx.png',
  '/textures/environmentMaps/0/py.png',
  '/textures/environmentMaps/0/ny.png',
  '/textures/environmentMaps/0/pz.png',
  '/textures/environmentMaps/0/nz.png',
]);

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

// Physics
var world = new CANNON.World();
world.broadphase = new CANNON.SAPBroadphase(world);
world.allowSleep = true;
world.gravity.set(0, -9.81, 0);

const materialDefault = new CANNON.Material('default');

const contactDefaultMaterial = new CANNON.ContactMaterial(materialDefault, materialDefault, {
  friction: 0.1,
  restitution: 0.5,
});

world.addContactMaterial(contactDefaultMaterial);
world.defaultContactMaterial = contactDefaultMaterial;

const floorShape = new CANNON.Plane();
const floorBody = new CANNON.Body();
floorBody.mass = 0;
floorBody.addShape(floorShape);
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5);
world.addBody(floorBody);

// Sphere

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50),
  new THREE.MeshStandardMaterial({
    color: '#777777',
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
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
camera.position.set(-3, 3, 3);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Sphere
const objectsToUpdate = [];

const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const sphereMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  envMap: environmentMapTexture,
});

const createSphere = (radius, position) => {
  const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  mesh.castShadow = true;
  mesh.position.copy(position);
  mesh.scale.set(radius, radius, radius);
  scene.add(mesh);

  const shape = new CANNON.Sphere(radius);
  const body = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 3, 0),
    shape: shape,
    material: materialDefault,
  });
  body.position.copy(position);
  body.addEventListener('collide', playHitSound);
  world.addBody(body);

  objectsToUpdate.push({
    body,
    mesh,
  });
};

// Box
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  envMap: environmentMapTexture,
});

const createBox = (width, height, depth, position) => {
  const mesh = new THREE.Mesh(boxGeometry, boxMaterial);
  mesh.castShadow = true;
  mesh.position.copy(position);
  mesh.scale.set(width, height, depth);
  scene.add(mesh);

  const shape = new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5));
  const body = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 3, 0),
    shape: shape,
    material: materialDefault,
  });
  body.position.copy(position);
  body.addEventListener('collide', playHitSound);
  world.addBody(body);

  objectsToUpdate.push({
    body,
    mesh,
  });
};

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

  // Update physics
  world.step(1 / 60, deltaElapsedTime, 3);

  objectsToUpdate.forEach((object) => {
    object.mesh.position.copy(object.body.position);
    object.mesh.quaternion.copy(object.body.quaternion);
  });

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
