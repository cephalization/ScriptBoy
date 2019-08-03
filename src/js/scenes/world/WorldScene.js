import Phaser from 'phaser';

import { createHeroPlayer } from '@src/js/characters/hero';
import { createIndustrialPlayer } from '@src/js/characters/industrial';

import create from './create';
import update from './update';
import load from './load';

/**
 * World Scene is responsible for rendering the level, the player, and the world physics
 */
export default class WorldScene extends Phaser.Scene {
  constructor() {
    super('world');
  }

  /* Initialize general variables for the scene */
  player = null;
  platforms = null;
  playerMeta = {
    // The player's current x position
    x: 0,

    // The player's current y position
    y: 0,
  };
  cursors = null;
  collider = null;

  /* Initialize character swapping logic*/
  // List of available characters as initialization functions
  CHARACTERS = {
    hero: (x, y) => new createHeroPlayer(this, x, y),
    industrial: (x, y) => new createIndustrialPlayer(this, x, y),
  };

  // Default character
  character = 'industrial';

  /**
   * Switch characters, toggle between 'hero' and 'industrial'
   */
  toggleCharacter = () =>
    (this.character = this.character === 'hero' ? 'industrial' : 'hero');

  /**
   * Spawn the current character at the desired x,y coordinates
   */
  createCharacter = (x, y) => this.CHARACTERS[this.character](x, y);

  /**
   * Initialize the character into the scene via create() lifecycle method
   */
  setupCharacter = (x = 50, y = 0) => {
    // Setup the player
    this.player = this.createCharacter(x, y);

    // Add collision between player and platforms
    this.collider = this.physics.add.collider(
      this.player.sprite,
      this.platforms
    );
  };

  /**
   * Destroy a character (they died or you are swapping characters)
   */
  tearDownCharacter = () => {
    this.collider.destroy();
    this.player.sprite.destroy();
  };

  /**
   * Statically generate some platforms to test with
   * per https://phaser.io/tutorials/making-your-first-phaser-3-game/part3
   */
  generateDebugPlatforms = () => {
    // Setup platform group with physics
    this.platforms = this.physics.add.staticGroup();

    // Create the floor of the debug level
    this.platforms
      .create(400, 568, 'ground')
      .setScale(1.2)
      .refreshBody();

    // Create a platform you can jump onto
    this.platforms.create(770, 375, 'ground');
  };

  async create() {
    await this.loadAssets();
    create.bind(this)();
  }

  update() {
    update.bind(this)();
  }

  async loadAssets() {
    await load.bind(this)();
  }
}
