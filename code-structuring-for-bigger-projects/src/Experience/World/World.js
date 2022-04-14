import * as THREE from 'three';

import Character from './Character';
import Environment from './Environment';
import Fox from './Fox';
import Ground from './Ground';

export default class World {
  constructor(experience) {
    this.experience = experience;

    this.scene = this.experience.scene;

    this.ground = new Ground(this.experience);
    this.fox = new Fox(this.experience);
    this.character = new Character(this.experience);
    this.environment = new Environment(this.experience);
  }

  update() {
    this.fox.update();
  }

  destroy() {
    this.ground.destroy();
    this.fox.destroy();
    this.character.destroy();
    this.environment.destroy(); // TODO
  }
}
