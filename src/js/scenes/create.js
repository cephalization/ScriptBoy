import { RESOLUTION } from '@src/js/constants';
import { log, addImportedImageToScene } from '@src/js/util';
import background from '@src/assets/images/background.png';

/**
 * Asynchronously load data-uri assets into a scene
 *
 * @param {Object} ctx desired 'this' to load assets into
 */
const loadAssets = async function(ctx) {
  return new Promise(async (resolve, reject) => {
    try {
      await addImportedImageToScene('bg', background, ctx);

      log('assets loaded');
      resolve();
    } catch(e) {
      reject();
    }
  });
}

/**
 * Create the game and additionally load data-uri assets as base64
 *
 * This link describes how to use data-uri as base64
 * https://supernapie.com/blog/loading-assets-as-data-uri-in-phaser-3
 */
export default async function() {
  await loadAssets(this);
  log('Rendering assets');

  // Render background
  this.add.image(0, 0, 'bg').setOrigin(0, 0);
};
