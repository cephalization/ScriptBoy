/**
 * ScriptBoy
 *
 * 2019
 */
import Phaser from 'phaser';

import { RESOLUTION, GRAVITY } from './js/constants';
import WorldScene from './js/scenes/world/WorldScene';

const config = {
  type: Phaser.AUTO,
  width: RESOLUTION[0],
  height: RESOLUTION[1],
  scene: [WorldScene],
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: GRAVITY },
      debug: false,
    },
  },
  parent: 'game',
};

// Initialize the game
const game = new Phaser.Game(config);
