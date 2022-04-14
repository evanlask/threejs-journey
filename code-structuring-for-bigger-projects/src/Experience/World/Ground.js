import * as THREE from 'three';

export default class Ground {
  constructor(experience) {
    this.experience = experience;

    this.resourceLoader = this.experience.resourceLoader;
    this.scene = this.experience.scene;

    this.geometry = this.initGeometry();
    this.textures = this.initTextures();
    this.material = this.initMaterial();
    this.mesh = this.initMesh();
  }

  // eslint-disable-next-line class-methods-use-this
  initGeometry() {
    return new THREE.CircleGeometry(10, 64);
  }

  initTextures() {
    const textures = {};

    // Color texture
    textures.color = this.resourceLoader.resources.dirtColorTexture;
    textures.color.encoding = THREE.sRGBEncoding;
    textures.color.repeat.set(1.5, 1.5);
    textures.color.wrapS = THREE.RepeatWrapping;
    textures.color.wrapT = THREE.RepeatWrapping;

    // Normal map
    textures.normal = this.resourceLoader.resources.dirtNormalTexture;
    textures.normal.repeat.set(1.5, 1.5);
    textures.normal.wrapS = THREE.RepeatWrapping;
    textures.normal.wrapT = THREE.RepeatWrapping;

    return textures;
  }

  initMaterial() {
    return new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
      side: THREE.DoubleSide,
    });
  }

  initMesh() {
    const mesh = new THREE.Mesh(this.geometry, this.material);

    // Rotation
    mesh.rotation.x = -Math.PI * 0.5;

    // Shadow configuration
    mesh.receiveShadow = true;

    // Add mesh to the scene
    this.scene.add(mesh);

    return mesh;
  }

  // eslint-disable-next-line class-methods-use-this
  destroy() {
    // TODO
  }
}
