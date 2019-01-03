/**
 * INDUSTRIAL player model
 *
 * 1. Load assets for 'industrial' by calling loadHeroAssets
 * 2. Create a 'industrial' player by calling createHeroPlayer
 */
import Player from '@src/js/player';
import { addImportedSpriteToScene, frameDimensions } from '@src/js/util';

import industrial from '@src/assets/images/industrial_player.png';

const CHARACTER_NAME = 'industrial';
let assetsLoaded = false;

/**
 * Bind animations to the scene the player lives in and the player itself
 *
 * @param {object} scene the scene that the player has been initialized in
 */
const setupAnimations = (scene, key = CHARACTER_NAME) => {
  scene.anims.create({
    key: `${key}_stand`,
    frames: scene.anims.generateFrameNumbers(key, {
      start: 0,
      end: 3,
    }),
    frameRate: 6,
    repeat: -1,
  });

  scene.anims.create({
    key: `${key}_walk`,
    frames: scene.anims.generateFrameNumbers(key, {
      start: 8,
      end: 15,
    }),
    frameRate: 12,
    repeat: -1,
  });

  scene.anims.create({
    key: `${key}_airborn`,
    frames: [{ key, frame: 15 }],
  });

  scene.anims.create({
    key: `${key}_jump`,
    frames: [{ key, frame: 13 }],
    repeat: -1,
  });

  scene.anims.create({
    key: `${key}_double jump`,
    frames: [{ key, frame: 10 }],
    repeat: -1,
  });
};

export const createIndustrialPlayer = (ctx, x, y) => {
  if (!assetsLoaded) {
    throw new Error("Character 'industrial' assets are not loaded!");
  }

  // We need to adjust the hitbox of this particular sprite before returning it
  // https://github.com/mikewesthad/phaser-3-tilemap-blog-posts/blob/ceea0edfc0ad1660393390b8baf0ab41f0cca87e/examples/post-2/03-drawing-platformer/js/player.js#L30-L31
  const industry = new Player(ctx, x, y, CHARACTER_NAME);
  industry.sprite.setSize(18, 24).setOffset(7, 9);

  return industry;
};

export const loadIndustrialAssets = async ctx => {
  await addImportedSpriteToScene(
    CHARACTER_NAME,
    industrial,
    { ...frameDimensions(32, 32), margin: 1, spacing: 2 },
    ctx
  );

  setupAnimations(ctx);
  assetsLoaded = true;
};
