import Phaser from 'phaser';

import create from './create';
import update from './update';
import preload from './preload';

/**
 * World Scene is responsible for rendering the level, the player, and the world physics
 */
export default class WorldScene extends Phaser.Scene {
  constructor() {
    super('world');
  }

  create() {
    create.bind(this)();
  }

  update() {
    update.bind(this)();
  }

  preload() {
    preload.bind(this)();
  }
}
