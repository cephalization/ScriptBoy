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
    } catch(e) {
      reject(e);
    }
  });
}