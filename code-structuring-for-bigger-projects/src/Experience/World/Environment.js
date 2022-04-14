import * as THREE from 'three';

export default class Environment {
  constructor(experience) {
    this.experience = experience;

    this.debug = this.experience.debug;
    this.resourceLoader = this.experience.resourceLoader;
    this.scene = this.experience.scene;

    this.sunlight = this.initSunlight();
    this.environmentMap = this.initEnvironmentMap();

    this.initDebug();
  }

  initSunlight() {
    const sunlight = new THREE.DirectionalLight(0xe2dcce, 4);

    // Shadow configuration
    sunlight.castShadow = true;
    sunlight.shadow.camera.far = 30;
    sunlight.shadow.mapSize.set(2048, 2048);
    sunlight.shadow.normalBias = 0.05;

    // Position
    sunlight.position.set(3.5, 2, -1.25);

    // Add it to the scene
    this.scene.add(sunlight);

    return sunlight;
  }

  initEnvironmentMap() {
    const environmentMap = {};

    // Grab the texture
    environmentMap.texture = this.resourceLoader.resources.environmentMapTexture;
    environmentMap.texture.encoding = THREE.sRGBEncoding;

    // Apply the texture as the environment
    this.scene.environment = environmentMap.texture;

    // Set an intensity
    environmentMap.intensity = 0.4;

    // Applies environment map and intensity to everything in the scene
    environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.envMap = environmentMap.texture;
          child.material.envMapIntensity = environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };

    // First environment map application
    environmentMap.updateMaterials();

    return environmentMap;
  }

  initDebug() {
    if (!this.debug.enabled) {
      return;
    }

    // Debug params that can not be directly modified
    const params = {
      environmentMapVisible: !!this.scene.background,
      sunlightColor: this.sunlight.color.getHex(),
    };

    // Environment map
    const environmentMapfolder = this.debug.pane.addFolder({
      expanded: false,
      title: 'Environment Map',
    });

    environmentMapfolder
      .addInput(this.environmentMap, 'intensity', {
        min: 0,
        max: 3,
        step: 0.001,
      })
      .on('change', () => {
        this.environmentMap.updateMaterials();
      });

    environmentMapfolder
      .addInput(params, 'environmentMapVisible', {
        label: 'visible',
      })
      .on('change', (e) => {
        this.scene.background = e.value ? this.environmentMap.texture : null;
      });

    // Sunlight
    const sunlightFolder = this.debug.pane.addFolder({
      expanded: false,
      title: 'Sunlight',
    });

    sunlightFolder
      .addInput(params, 'sunlightColor', {
        label: 'color',
        view: 'color',
      })
      .on('change', (e) => {
        this.sunlight.color.set(e.value);
      });

    sunlightFolder.addInput(this.sunlight, 'intensity', {
      min: 0,
      max: 10,
      step: 0.1,
    });

    ['x', 'y', 'z'].forEach((axis) => {
      sunlightFolder.addInput(this.sunlight.position, axis, {
        label: axis,
        min: -10,
        max: 10,
        step: 0.01,
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  destroy() {
    // TODO
  }
}
