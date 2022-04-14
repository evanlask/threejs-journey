import * as THREE from 'three';

export default class Fox {
  constructor(experience) {
    this.experience = experience;

    this.debug = this.experience.debug;
    this.resourceLoader = this.experience.resourceLoader;
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    this.resource = this.resourceLoader.resources.foxModel;

    this.model = this.initModel();
    this.animation = this.initAnimation();

    this.initDebug();
  }

  initModel() {
    const model = this.resource.scene;

    // Shadow configuration
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // Scale
    model.scale.set(0.02, 0.02, 0.02);

    // Add model to scene
    this.scene.add(model);

    return model;
  }

  initAnimation() {
    const animation = {};

    // Create an animation mixer to run animations
    animation.mixer = new THREE.AnimationMixer(this.model);

    // Add and name animations from model
    animation.actions = {};
    animation.actions.idle = animation.mixer.clipAction(this.resource.animations[0]);
    animation.actions.walk = animation.mixer.clipAction(this.resource.animations[1]);
    animation.actions.run = animation.mixer.clipAction(this.resource.animations[2]);

    // Set initial animation
    animation.current = animation.actions.idle;

    // Play the initial animation
    animation.current.play();

    // Play an animation by name
    animation.play = (name, duration = 1) => {
      const oldAction = animation.current;
      const newAction = animation.actions[name];

      newAction.reset();
      newAction.play();

      if (oldAction) {
        newAction.crossFadeFrom(oldAction, duration);
      } else {
        newAction.fadeIn(duration);
      }

      animation.current = newAction;
    };

    // Stop running animation
    animation.stop = (duration = 1) => {
      if (!animation.current) {
        return;
      }

      animation.current.halt(duration);
      animation.current = null;
    };

    return animation;
  }

  initDebug() {
    if (!this.debug.enabled) {
      return;
    }

    // Folder
    const folder = this.debug.pane.addFolder({
      expanded: false,
      title: 'Fox',
    });

    // Animations
    const options = Object.keys(this.animation.actions).map((action) => ({
      text: action,
      value: action,
    }));

    folder
      .addBlade({
        label: 'animation',
        options,
        value: options[0].value,
        view: 'list',
      })
      .on('change', (e) => {
        this.animation.play(e.value);
      });
  }

  update() {
    this.animation.mixer.update(this.time.delta / 1000);
  }

  // eslint-disable-next-line class-methods-use-this
  destroy() {
    // TODO
  }
}
