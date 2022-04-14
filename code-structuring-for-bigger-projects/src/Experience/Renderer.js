import * as THREE from 'three';

export default class Renderer {
  constructor(experience) {
    this.experience = experience;

    this.camera = this.experience.camera;
    this.canvas = this.experience.canvas;
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;

    this.renderer = this.initRenderer();

    this.initDebug();
  }

  initRenderer() {
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.CineonToneMapping;
    renderer.toneMappingExposure = 1.75;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(this.sizes.width, this.sizes.height);
    renderer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));

    return renderer;
  }

  initDebug() {
    if (!this.debug.enabled) {
      return;
    }

    const interval = 250;

    // FPS (Always Visible)
    this.fpsGraph = this.debug.pane.addBlade({
      label: 'fps',
      lineCount: 2,
      view: 'fpsgraph',
    });

    // Folder
    const folder = this.debug.pane.addFolder({
      expanded: false,
      title: 'Renderer Details',
    });

    // Renderer Memory
    Object.keys(this.renderer.info.memory).forEach((key) => {
      folder.addMonitor(this.renderer.info.memory, key, {
        bufferSize: 1,
        format: (v) => Math.round(v),
        interval,
      });
    });

    // Separator
    folder.addSeparator();

    // Renderer Render
    ['calls', 'frame', 'lines', 'points', 'triangles'].forEach((key) => {
      folder.addMonitor(this.renderer.info.render, key, {
        bufferSize: 1,
        format: (v) => Math.round(v),
        interval,
      });
    });
  }

  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  update() {
    if (this.debug.enabled) {
      this.fpsGraph.begin();
    }

    this.renderer.render(this.scene, this.camera.camera);

    if (this.debug.enabled) {
      this.fpsGraph.end();
    }
  }

  destroy() {
    this.renderer.dispose();
  }
}
