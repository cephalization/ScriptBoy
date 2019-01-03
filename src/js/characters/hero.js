/**
 * HERO player model
 *
 * 1. Load assets for 'hero' by calling loadHeroAssets
 * 2. Create a 'hero' player by calling createHeroPlayer
 */
import Player from '@src/js/player';
import { addImportedSpriteToScene, frameDimensions } from '@src/js/util';

import hero from '@src/assets/images/hero.png';

const CHARACTER_NAME = 'hero';
let assetsLoaded = false;

/**
 * Bind animations to the scene the player lives in and the player itself
 *
 * @param {object} scene the scene that the player has been initialized in
 */
const setupAnimations = (scene, key = CHARACTER_NAME) => {
  scene.anims.create({
    key: 'stand',
    frames: [{ key, frame: 0 }],
  });

  scene.anims.create({
    key: 'walk',
    frames: scene.anims.generateFrameNumbers(key, {
      start: 1,
      end: 2,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'airborn',
    frames: [{ key, frame: 5 }],
  });

  scene.anims.create({
    key: 'jump',
    frames: [{ key, frame: 3 }],
    repeat: -1,
  });

  scene.anims.create({
    key: 'double jump',
    frames: [{ key, frame: 4 }],
    repeat: -1,
  });
};

export const createHeroPlayer = (ctx, x, y) => {
  if (!assetsLoaded) {
    throw new Error("Character 'hero' assets are not loaded!");
  }
  setupAnimations(ctx);
  return new Player(ctx, x, y, CHARACTER_NAME);
};

export const loadHeroAssets = async ctx => {
  await addImportedSpriteToScene(
    CHARACTER_NAME,
    hero,
    frameDimensions(36, 42),
    ctx
  );
  assetsLoaded = true;
};
