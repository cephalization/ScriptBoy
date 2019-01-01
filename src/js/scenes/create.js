import {
  log,
  addImportedImageToScene,
  addImportedSpriteToScene,
  frameDimensions,
} from '@src/js/util';
import background from '@src/assets/images/background.png';
import ground from '@src/assets/images/ground.png';
import hero from '@src/assets/images/hero.png';

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
        'hero',
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
 * @param {object} ctx
 */
const generatePlatforms = ctx => {
  const platforms = ctx.physics.add.staticGroup();
  platforms
    .create(400, 568, 'ground')
    .setScale(1.2)
    .refreshBody();
  platforms.create(770, 375, 'ground');
  platforms.create(200, 200, 'ground');

  return platforms;
};

/**
 * Statically generate a player based off of the 'hero' sprite
 * per https://phaser.io/tutorials/making-your-first-phaser-3-game/part5
 * @param {object} ctx
 */
const generatePlayer = ctx => {
  // Setup player and physics
  const player = ctx.physics.add.sprite(40, 400, 'hero');
  player.setBounce(0.1);
  player.setCollideWorldBounds(true);

  // Setup player animations, gonna need tweaking
  ctx.anims.create({
    key: 'left',
    frames: ctx.anims.generateFrameNumbers('hero', {
      start: 1,
      end: 2,
      frameRate: 10,
      repeat: -1,
    }),
  });

  ctx.anims.create({
    key: 'turn',
    frames: [{ key: 'hero', frame: 0 }],
    frameRate: 20,
  });

  ctx.anims.create({
    key: 'right',
    frames: ctx.anims.generateFrameNumbers('hero', {
      start: 1,
      end: 2,
    }),
    frameRate: 10,
    repeat: -1,
  });

  return player;
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
    window.platforms = generatePlatforms(this);

    // Setup the player
    window.player = generatePlayer(this);

    // Add collision between player and platforms
    this.physics.add.collider(window.player, window.platforms);

    // Setup arrow key polling
    window.cursors = this.input.keyboard.createCursorKeys();
  } catch (e) {
    throw new Error(`Could not load game assets! ${e}`);
  }
}
