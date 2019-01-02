/**
 * ScriptBoy
 *
 * 2019
 */
import Phaser from 'phaser';

import { RESOLUTION, GRAVITY } from './js/constants';
import preload from './js/scenes/preload';
import create from './js/scenes/create';
import update from './js/scenes/update';

const config = {
  type: Phaser.AUTO,
  width: RESOLUTION[0],
  height: RESOLUTION[1],
  scene: {
    preload,
    create,
    update,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: GRAVITY },
      debug: false,
    },
  },
  parent: 'game',
};

// Initialize the game and certain globals
const game = new Phaser.Game(config);
