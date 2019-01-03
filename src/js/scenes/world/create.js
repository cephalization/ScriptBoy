import {
  log,
  addImportedImageToScene,
  addImportedSpriteToScene,
  frameDimensions,
} from '@src/js/util';

import background from '@src/assets/images/background.png';
import ground from '@src/assets/images/ground.png';
import hero from '@src/assets/images/hero.png';

import Player from '@src/js/player';

/**
 * Asynchronously load data-uri assets into a scene
 *
 * @param {object} ctx desired 'this' to load assets into
 */
const loadAssets = async function(ctx) {
  return new Promise(async (resolve, reject) => {
    try {
      /* Load All Assets Here */
      await addImportedImageToScene('bg', background, ctx);
      await addImportedImageToScene('ground', ground, ctx);
      await addImportedSpriteToScene(
        'player',
        hero,
        frameDimensions(36, 42),
        ctx
      );

      log('assets loaded');
      resolve();
    } catch (e) {
      reject(eval);
    }
  });
};

/**
 * Statically generate some platforms to test with
 * per https://phaser.io/tutorials/making-your-first-phaser-3-game/part3
 *
 * @param {object} ctx desired 'this' to load assets into
 */
const generatePlatforms = ctx => {
  const platforms = ctx.physics.add.staticGroup();
  platforms
    .create(400, 568, 'ground')
    .setScale(1.2)
    .refreshBody();
  platforms.create(770, 375, 'ground');

  return platforms;
};

/**
 * Create the game and additionally load data-uri assets as base64
 */
export default async function() {
  try {
    await loadAssets(this);
    log('Rendering assets');

    // Render background
    this.add.image(0, 0, 'bg').setOrigin(0, 0);

    // Arrange some platforms
    this.platforms = generatePlatforms(this);

    // Setup the player
    this.player = new Player(this, 50, 0);

    // Add collision between player and platforms
    this.physics.add.collider(this.player.sprite, this.platforms);

    // Setup arrow key polling
    this.cursors = this.input.keyboard.createCursorKeys();
  } catch (e) {
    throw new Error(`Could not load game assets! ${e}`);
  }
}
