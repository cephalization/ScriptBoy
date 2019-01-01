/**
 * ScriptBoy
 *
 * 2019
 */
import Phaser from 'phaser';

import preload from './js/scenes/preload';
import create from './js/scenes/create';
import update from './js/scenes/update';

const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 600,
  scene: {
      preload,
      create,
      update,
  },
  parent: 'game'
}

// Initialize the game
const game = new Phaser.Game(config);