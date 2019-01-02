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
    this.playerStatus = {
      // Track which jump the character is on 'single', 'double', etc
      jump: 'none',
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
