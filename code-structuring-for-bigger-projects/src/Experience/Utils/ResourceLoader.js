import EventEmitter from 'eventemitter3';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';

export default class ResourceLoader extends EventEmitter {
  constructor(resources) {
    super();

    this.resourcesToLoad = resources;
    this.resources = {};
    this.toLoad = this.resourcesToLoad.length;
    this.loaded = 0;

    this.loaders = {
      cubeTexture: new THREE.CubeTextureLoader(),
      font: new FontLoader(),
      gltf: new GLTFLoader(),
      texture: new THREE.TextureLoader(),
      ttf: new TTFLoader(),
    };

    this.loadResources();
    this.emitLoad();
    this.emitReady();
  }

  loadResources() {
    this.resourcesToLoad.forEach((resource) => {
      const onLoad = (file) => {
        this.resourceLoaded(resource, file);
      };

      const onError = () => {
        this.resourceError(resource);
      };

      switch (resource.type) {
        case 'FONT':
          this.loaders.font.load(resource.path, onLoad, undefined, onError);
          break;
        case 'FONT_TTF':
          this.loaders.ttf.load(resource.path, (file) => {
            const parsedFile = this.loaders.font.parse(file);
            this.resourceLoaded(resource, parsedFile);
          });
          break;
        case 'GLTF':
          this.loaders.gltf.load(resource.path, onLoad, undefined, onError);
          break;
        case 'TEXTURE':
          this.loaders.texture.load(resource.path, onLoad, undefined, onError);
          break;
        case 'TEXTURE_CUBE':
          this.loaders.cubeTexture.load(resource.path, onLoad, undefined, onError);
          break;
        default:
          console.error('Unsupported resource type.'); // eslint-disable-line no-console
      }
    });
  }

  resourceError(resource) {
    this.emitError(resource);
  }

  resourceLoaded(resource, file) {
    this.resources[resource.name] = file;

    this.loaded += 1;

    this.emitLoad();
    this.emitReady();
  }

  emitError(resource) {
    this.emit('error', resource);
  }

  emitLoad() {
    this.emit('load', {
      loaded: this.loaded,
      toLoad: this.toLoad,
    });
  }

  emitReady() {
    if (this.loaded === this.toLoad) {
      this.emit('ready');
    }
  }

  destroy() {
    this.off('error');
    this.off('load');
    this.off('redy');
  }
}
