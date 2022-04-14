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
const gui = new dat.GUI();

// Textures
const textureLoader = new THREE.TextureLoader();

// Dimensions
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
let aspectRatio = size.width / size.height;

// Mouse
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('click', (e) => {
  if (currentIntersect) {
    switch (currentIntersect.object) {
      case object1:
        console.log('click on object 1');
        break;
      case object2:
        console.log('click on object 2');
        break;
      case object3:
        console.log('click on object 3');
        break;
    }
  }
});

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas,
});
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Scene
const scene = new THREE.Scene();

// Axes Helper
// const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper);

// Grid Helper
const gridHelperX = new THREE.GridHelper(20, 20);
scene.add(gridHelperX);
const gridHelperY = new THREE.GridHelper(20, 20);
gridHelperY.rotation.x = Math.PI * 0.5;
scene.add(gridHelperY);

// Objects
const object1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: '#ff0000' })
);
object1.position.x = -2;

const object2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: '#ff0000' })
);

const object3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: '#ff0000' })
);
object3.position.x = 2;

scene.add(object1, object2, object3);

// Raycaster
const raycaster = new THREE.Raycaster();

// const rayOrigin = new THREE.Vector3(-3, 10, 0);
// const rayDirection = new THREE.Vector3(10, 0, 0);
// rayDirection.normalize();

// raycaster.set(rayOrigin, rayDirection);

// const intersect = raycaster.intersectObject(object2);
// console.log(intersect);

// const intersects = raycaster.intersectObjects([object1, object2, object3]);
// console.log(intersects);

// Camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.05, 100);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Animate
const clock = new THREE.Clock();
let currentIntersect = null;

const tick = () => {
  // Debug stats
  stats.begin();

  const elapsedTime = clock.getElapsedTime();

  // Animate objects
  object1.position.y = Math.sin(elapsedTime) * 1.5;
  object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
  object3.position.y = Math.sin(elapsedTime * 1.5) * 1.5;

  // Cast a ray
  raycaster.setFromCamera(mouse, camera);

  const objectsToTest = [object1, object2, object3];
  const intersects = raycaster.intersectObjects(objectsToTest);

  if (intersects.length) {
    if (!currentIntersect) {
      console.log('mouse enter');
    }

    currentIntersect = intersects[0];
  } else {
    if (currentIntersect) {
      console.log('mouse leave');
    }

    currentIntersect = null;
  }

  objectsToTest.forEach((object) => {
    object.material.color.set('#ff0000');
  });

  intersects.forEach((intersect) => {
    intersect.object.material.color.set('#0000ff');
  });

  // const rayOrigin = new THREE.Vector3(-3, 0, 0);
  // const rayDirection = new THREE.Vector3(10, 0, 0);
  // rayDirection.normalize();

  // raycaster.set(rayOrigin, rayDirection);

  // const objectsToTest = [object1, object2, object3];
  // const intersects = raycaster.intersectObjects(objectsToTest);

  // objectsToTest.forEach((object) => {
  //   object.material.color.set('#ff0000');
  // });

  // intersects.forEach((intersect) => {
  //   intersect.object.material.color.set('#0000ff');
  // });

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
