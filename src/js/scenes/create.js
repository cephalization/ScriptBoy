import { log, addImportedImageToScene } from '@src/js/util';
import background from '@src/assets/images/background.png';

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

      log('assets loaded');
      resolve();
    } catch(e) {
      reject(eval);
    }
  });
}

/**
 * Create the game and additionally load data-uri assets as base64
 */
export default async function() {
  try {
    await loadAssets(this);
    log('Rendering assets');

    // Render background
    this.add.image(0, 0, 'bg').setOrigin(0, 0);
  } catch(e) {
    throw new Error(`Could not load game assets! ${e}`);
  }
};
