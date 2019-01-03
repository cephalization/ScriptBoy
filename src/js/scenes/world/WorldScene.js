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
    this.player = null;
    // Track various statuses on the player character
    this.playerMeta = {
      // The player's current x position
      x: 0,

      // The player's current y position
      y: 0,
    };
    this.cursors = null;
    this.platforms = null;
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
