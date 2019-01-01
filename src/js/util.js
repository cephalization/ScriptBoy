export const log = console.log;

export const addImportedImageToScene = async (name, image, ctx) => {
  return new Promise(async (resolve, reject) => {
    ctx.textures.once('onload', resolve, ctx);
    ctx.textures.addBase64(name, image);
  });
}