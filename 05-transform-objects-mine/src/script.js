import * as THREE from 'three';

import './style.css';

// Dimensions
const size = {
  width: 800,
  height: 600,
};

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
// camera.position.x = 1;
// camera.position.y = 1;
camera.position.z = 3;
scene.add(camera);

// Axes helper
const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);

const group = new THREE.Group();
group.position.y = 1;
group.scale.y = 2;
group.rotation.y = 1;
scene.add(group);

const cubeOne = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
group.add(cubeOne);

const cubeTwo = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cubeTwo.position.x = -2;
group.add(cubeTwo);

const cubeThree = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cubeThree.position.x = 2;
group.add(cubeThree);

// Cube
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// Cube - Position
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;
// mesh.position.set(0.7, -0.6, 1);

// Cube - Scale
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;
// mesh.scale.set(2, 0.5, 0.5);

// Cube - Rotation
// mesh.rotation.y = 3.14159;
// mesh.rotation.reorder('YXZ');
// mesh.rotation.x = Math.PI * 0.25;
// mesh.rotation.y = Math.PI * 0.25;

 // Cube - Misc
// mesh.position.normalize(camera.position);
// console.log('Length:', mesh.position.length());
// console.log('Distance to camera:', mesh.position.distanceTo(camera.position));

// Camera - Look At
//camera.lookAt(new THREE.Vector3(3, 0, 0));
// camera.lookAt(mesh.position);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas,
});
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);
