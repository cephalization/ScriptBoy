import { log, addImportedImageToScene } from '@src/js/util';
import { RESOLUTION } from '@src/js/constants';

import background from '@src/assets/images/background.png';
import ground from '@src/assets/images/ground.png';

import { createHeroPlayer, loadHeroAssets } from '@src/js/characters/hero';
import {
  createIndustrialPlayer,
  loadIndustrialAssets,
} from '@src/js/characters/industrial';

const CHARACTERS = {
  hero: (ctx, x, y) => new createHeroPlayer(ctx, x, y),
  industrial: (ctx, x, y) => new createIndustrialPlayer(ctx, x, y),
};
let character = 'hero';
const toggleCharacter = () =>
  (character = character === 'hero' ? 'industrial' : 'hero');
const createCharacter = (ctx, x, y) => CHARACTERS[character](ctx, x, y);

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

      // Load the two player model spritesheets
      await loadHeroAssets(ctx);
      await loadIndustrialAssets(ctx);

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

    const setupCharacter = (x = 50, y = 0) => {
      // Setup the player
      this.player = createCharacter(this, x, y);

      // Add collision between player and platforms
      this.collider = this.physics.add.collider(
        this.player.sprite,
        this.platforms
      );
    };

    const tearDownCharacter = () => {
      this.collider.destroy();
      this.player.sprite.destroy();
    };

    // Hotswap character model when spacebar is pressed
    this.input.keyboard.on(
      'keydown_SPACE',
      () => {
        const {
          playerMeta: { x, y },
        } = this;

        toggleCharacter();
        tearDownCharacter();
        setupCharacter(x, y);
      },
      this
    );

    // Render background
    this.add.image(0, 0, 'bg').setOrigin(0, 0);

    // Arrange some platforms
    this.platforms = generatePlatforms(this);

    // Create default character
    setupCharacter();

    // Setup arrow key polling
    this.cursors = this.input.keyboard.createCursorKeys();

    // Instruction box
    this.add
      .text(
        RESOLUTION[0] - 384,
        16,
        'Arrows to move & jump\nSpacebar to switch characters',
        {
          font: '18px monospace',
          fill: '#000000',
          padding: { x: 20, y: 10 },
          backgroundColor: '#ffffff',
        }
      )
      .setScrollFactor(0);
  } catch (e) {
    throw new Error(`Could not load game assets! ${e}`);
  }
}
