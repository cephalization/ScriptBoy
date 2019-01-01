/**
 * ScriptBoy
 *
 * 2019
 */
import Phaser from 'phaser';

import { RESOLUTION } from './js/constants';
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
  parent: 'game'
}

// Initialize the game
const game = new Phaser.Game(config);