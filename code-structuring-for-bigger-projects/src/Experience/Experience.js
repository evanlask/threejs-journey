import * as THREE from 'three';

import Camera from './Camera';
import Renderer from './Renderer';
import World from './World/World';
import ResourceLoader from './Utils/ResourceLoader';

import Debug from './Utils/Debug';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';

import resources from './resources';

export default class Experience {
  constructor(canvas) {
    this.canvas = canvas;

    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera(this);
    this.renderer = new Renderer(this);
    this.world = null;

    this.attachListeners();

    // Once resources are finished loading spawn the world
    this.resourceLoader = new ResourceLoader(resources);
    this.resourceLoader.on('ready', () => {
      this.world = new World(this);
    });
  }

  attachListeners() {
    this.sizes.on('resize', this.resize.bind(this));
    this.time.on('tick', this.update.bind(this));
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    if (this.world) {
      this.world.update();
    }

    this.camera.update();
    this.renderer.update();
  }

  destroyScene() {
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        Object.entries(child.material).forEach(([, value]) => {
          if (value && typeof value.dispose === 'function') {
            value.dispose();
          }
        });
      }
    });
  }

  destroy() {
    this.destroyScene();
    this.resourceLoader.destroy();
    this.world.destroy();
    this.camera.destroy();
    this.debug.destroy();
    this.renderer.destroy();
    this.sizes.destroy();
    this.time.destroy();
  }
}
