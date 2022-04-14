import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class Camera {
  constructor(experience) {
    this.experience = experience;

    this.canvas = this.experience.canvas;
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;

    this.camera = this.initCamera();
    this.controls = this.initControls();
  }

  initCamera() {
    // Create the camera
    const camera = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100);

    // Initial position of the camera
    camera.position.set(10.4, 2, 1.4);

    // Add camera to scene
    this.scene.add(camera);

    return camera;
  }

  initControls() {
    // Create the controls
    const controls = new OrbitControls(this.camera, this.canvas);

    // Dampen or smooth control inputs
    controls.enableDamping = true;

    // Configure controls
    // controls.maxPolarAngle = Math.PI * 0.49;

    return controls;
  }

  resize() {
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }

  destroy() {
    this.controls.dispose();
  }
}
