/**
 * Replace console.log so debug can be toggled later on
 */
export const log = console.log;

/**
 * Hook into a scene's TextureManager, add base64 image, once it is loaded resolve a promise
 *
 * This link describes how to use data-uri as base64
 * https://supernapie.com/blog/loading-assets-as-data-uri-in-phaser-3
 *
 * @param {string} name desired texture name to be accessed by the scene
 * @param {string} image data-uri of the image to be loaded
 * @param {object} ctx desired 'this' to load assets into
 */
export const addImportedImageToScene = async (name, image, ctx) => {
  return new Promise(async (resolve, reject) => {
    try {
      ctx.textures.once('onload', resolve, ctx);
      ctx.textures.addBase64(name, image);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * Quickly generate the correct object for storing frame information in a spritesheet
 * @param {number} frameWidth
 * @param {number} frameHeight
 */
export const frameDimensions = (frameWidth, frameHeight) => ({
  frameWidth,
  frameHeight,
});

/**
 * Hook into a scene's TextureManager, add spritesheet, once it is loaded resolve a promise
 *
 * This link describes how to use data-uri as base64
 * https://supernapie.com/blog/loading-assets-as-data-uri-in-phaser-3
 *
 * @param {string} name desired sprite name to be accessed by the scene
 * @param {string} image data-uri of the sprite image to be loaded
 * @param {object} frameDimensions the dimensions of each frame inside the sprite sheet
 * {
 *    frameWidth: {number},
 *    frameHeight: {number}
 * }
 * @param {object} ctx desired 'this' to load assets into
 */
export const addImportedSpriteToScene = async (
  name,
  image,
  frameDimensions,
  ctx
) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Setup image processing handlers
      ctx.textures.once('addtexture', resolve, ctx);
      const sprite = new Image();
      sprite.onload = () => {
        ctx.textures.addSpriteSheet(name, sprite, frameDimensions);
      };

      // Assign the spritesheet to the image object, triggering handlers
      sprite.src = image;
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};
