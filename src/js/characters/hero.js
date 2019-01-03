/**
 * HERO player model
 *
 * 1. Load assets for 'hero' by calling loadHeroAssets
 * 2. Create a 'hero' player by calling createHeroPlayer
 */
import Player from '@src/js/player';
import { addImportedSpriteToScene, frameDimensions } from '@src/js/util';

import hero from '@src/assets/images/hero.png';
import heroIdle from '@src/assets/images/hero-idle.png';

const CHARACTER_NAME = 'hero';
let assetsLoaded = false;

/**
 * Bind animations to the scene the player lives in and the player itself
 *
 * @param {object} scene the scene that the player has been initialized in
 */
const setupAnimations = (scene, key = CHARACTER_NAME) => {
  scene.anims.create({
    key: `${key}_stand`,
    frames: scene.anims.generateFrameNumbers(`${key}_idle`, {
      start: 1,
      end: 3,
    }),
    frameRate: 5,
    yoyo: true,
  });

  scene.anims.create({
    key: `${key}_walk`,
    frames: scene.anims.generateFrameNumbers(key, {
      start: 1,
      end: 2,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: `${key}_airborn`,
    frames: [{ key, frame: 5 }],
  });

  scene.anims.create({
    key: `${key}_jump`,
    frames: [{ key, frame: 3 }],
    repeat: -1,
  });

  scene.anims.create({
    key: `${key}_double jump`,
    frames: [{ key, frame: 4 }],
    repeat: -1,
  });
};

export const createHeroPlayer = (ctx, x, y) => {
  if (!assetsLoaded) {
    throw new Error("Character 'hero' assets are not loaded!");
  }

  // NOTE: we subtract 15 from desired y position because of the size difference between the two character sprites
  return new Player(ctx, x, y - 15, CHARACTER_NAME);
};

export const loadHeroAssets = async ctx => {
  await addImportedSpriteToScene(
    CHARACTER_NAME,
    hero,
    frameDimensions(36, 42),
    ctx
  );
  await addImportedSpriteToScene(
    `${CHARACTER_NAME}_idle`,
    heroIdle,
    frameDimensions(36, 42),
    ctx
  );
  setupAnimations(ctx);
  assetsLoaded = true;
};
