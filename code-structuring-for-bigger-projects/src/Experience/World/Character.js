import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

export default class Character {
  constructor(experience) {
    this.experience = experience;
    this.scene = this.experience.scene;
    this.resourceLoader = this.experience.resourceLoader;

    this.geometry = this.initGeometry();
    this.material = this.initMaterial();
    this.mesh = this.initMesh();
  }

  initGeometry() {
    return new TextGeometry('FOXY!', {
      font: this.resourceLoader.resources.fontJSON,
      size: 2,
      height: 0.5,
      curveSegments: 128, // Ahh why not
    });
  }

  // eslint-disable-next-line class-methods-use-this
  initMaterial() {
    return new THREE.MeshStandardMaterial();
  }

  initMesh() {
    const mesh = new THREE.Mesh(this.geometry, this.material);

    // Shadow configuration
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // Position
    mesh.position.set(-1.5, 0.3, 3.7);

    // Rotation
    mesh.rotation.y = Math.PI * 0.5;

    // Add mesh to scene
    this.scene.add(mesh);

    return mesh;
  }

  // eslint-disable-next-line class-methods-use-this
  destroy() {
    // TODO
  }
}
