const assetCache = {};

export const loadAsset = async (path) => {
  if (!assetCache[path]) {
    const asset = await import(`../assets/${path}`);
    assetCache[path] = asset.default;
  }
  return assetCache[path];
};
