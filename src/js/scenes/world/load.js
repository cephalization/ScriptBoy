import { log, addImportedImageToScene } from '@src/js/util';

import background from '@src/assets/images/background.png';
import ground from '@src/assets/images/ground.png';

import { loadHeroAssets } from '@src/js/characters/hero';
import { loadIndustrialAssets } from '@src/js/characters/industrial';

/**
 * Asynchronously load data-uri assets into a scene
 */
export default async function() {
  try {
    /* Load All Assets Here */
    await addImportedImageToScene('bg', background, this);
    await addImportedImageToScene('ground', ground, this);

    // Load the two player model spritesheets
    await loadHeroAssets(this);
    await loadIndustrialAssets(this);

    log('assets loaded');
  } catch (e) {
    throw new Error(`Could not preload assets! ${e}`);
  }
}
