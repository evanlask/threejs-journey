import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import './style.css';

// Debug
const gui = new dat.GUI();

// Textures
const textureLoader = new THREE.TextureLoader();

const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

const brickAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg');
const brickColorTexture = textureLoader.load('/textures/bricks/color.jpg');
const brickNormalTexture = textureLoader.load('/textures/bricks/normal.jpg');
const brickRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg');

const groundAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg');
groundAmbientOcclusionTexture.repeat.set(10, 10);
groundAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
groundAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;

const groundColorTexture = textureLoader.load('/textures/grass/color.jpg');
groundColorTexture.repeat.set(10, 10);
groundColorTexture.wrapS = THREE.RepeatWrapping;
groundColorTexture.wrapT = THREE.RepeatWrapping;

const groundNormalTexture = textureLoader.load('/textures/grass/normal.jpg');
groundNormalTexture.repeat.set(10, 10);
groundNormalTexture.wrapS = THREE.RepeatWrapping;
groundNormalTexture.wrapT = THREE.RepeatWrapping;

const groundRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg');
groundRoughnessTexture.repeat.set(10, 10);
groundRoughnessTexture.wrapS = THREE.RepeatWrapping;
groundRoughnessTexture.wrapT = THREE.RepeatWrapping;

// Dimensions
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
let aspectRatio = size.width / size.height;

// Renderer
const fogColor = '#262837';
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas,
});
renderer.setClearColor(fogColor);
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Scene
const scene = new THREE.Scene();

// Axes Helper
// const axesHelper = new THREE.AxesHelper(30);
// scene.add(axesHelper);

// Grid Helper
// const gridHelper = new THREE.GridHelper(20, 20);
// scene.add(gridHelper);

// Ground
const groundLength = 20;
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(groundLength, groundLength),
  new THREE.MeshStandardMaterial({
    map: groundColorTexture,
    aoMap: groundAmbientOcclusionTexture,
    normalMap: groundNormalTexture,
    roughnessMap: groundRoughnessTexture,
  })
);
ground.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(ground.geometry.attributes.uv.array, 2));
ground.rotation.x = -Math.PI * 0.5;
ground.position.y = -0.01;
scene.add(ground);

// House
const house = new THREE.Group();

// House - Walls
const wallLength = 4;
const wallHeight = 2.5;
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(wallLength, wallHeight, wallLength),
  new THREE.MeshStandardMaterial({
    map: brickColorTexture,
    aoMap: brickAmbientOcclusionTexture,
    normalMap: brickNormalTexture,
    roughnessMap: brickRoughnessTexture,
  })
);
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2));
walls.position.y = wallHeight / 2;
house.add(walls);

// House - Roof
const roofRadius = wallLength / 2 + 1.5;
const roofHeight = 1;
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(roofRadius, roofHeight, 4),
  new THREE.MeshStandardMaterial({ color: '#b35f45' })
);
roof.position.y = wallHeight + roofHeight / 2;
roof.rotation.y = THREE.MathUtils.degToRad(45);
house.add(roof);

// House - Door
const doorWidth = 2.2;
const doorHeight = 2.2;
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(doorWidth, doorHeight, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.05,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2));
door.position.y = doorHeight / 2 - 0.1;
door.position.z = wallLength / 2;
house.add(door);

// House - Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, wallLength / 2 + 0.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, wallLength / 2 + 0.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, wallLength / 2 + 0.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, wallLength / 2 + 0.6);

house.add(bush1, bush2, bush3, bush4);

// House - Light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7);
doorLight.position.set(0, doorHeight + 0.2, wallLength / 2 + 0.7);
house.add(doorLight);

scene.add(house);

// Graveyard
const graveyard = new THREE.Group();

const graveWidth = 0.6;
const graveHeight = 0.8;
const graveDepth = 0.15;
const graveGeometry = new THREE.BoxBufferGeometry(graveWidth, graveHeight, graveDepth);
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });

for (let i = 0; i < 50; i++) {
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);

  // Position
  const angle = Math.random() * THREE.MathUtils.degToRad(360);
  const minRadius = wallLength / 2 + 1.5;
  const maxRadius = groundLength / 2 - minRadius;
  const radius = minRadius + Math.random() * maxRadius;
  const x = Math.cos(angle) * radius;
  const y = graveHeight / 2 - 0.1;
  const z = Math.sin(angle) * radius;
  grave.position.set(x, y, z);

  // Rotation
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.2;

  grave.castShadow = true;

  graveyard.add(grave);
}

scene.add(graveyard);

// Ghosts
const ghosts = new THREE.Group();

const ghost1 = new THREE.PointLight('#ff00ff', 2, 3);
ghosts.add(ghost1);

const ghost2 = new THREE.PointLight('#00ffff', 2, 3);
ghosts.add(ghost2);

const ghost3 = new THREE.PointLight('#ffff00', 2, 3);
ghosts.add(ghost3);

scene.add(ghosts);

// Lights
const moonLightColor = '#b9d5ff';
const ambientLight = new THREE.AmbientLight(moonLightColor, 0.12);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
scene.add(ambientLight);

const moonLight = new THREE.DirectionalLight(moonLightColor, 0.12);
moonLight.position.set(4, 5, -2);
scene.add(moonLight);
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001);
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001);
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001);
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001);

// Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

moonLight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
roof.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

ground.receiveShadow = true;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;

// Fog
const fog = new THREE.Fog(fogColor, 1, 15);
scene.fog = fog;

// Camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.05, 100);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update ghosts

  // Ghosts
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y = Math.sin(elapsedTime * 3);

  const ghost2Angle = -elapsedTime * 0.32;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  const ghost3Angle = -elapsedTime * 0.18;
  ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
  ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

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
