export const fingerprints = require.context('./assets/', true, /\.png$/);

export const loadAssets = (): Promise<void[]> => {
  const promises = fingerprints.keys().map(
    (key) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.src = fingerprints(key).default;
        img.onload = () => resolve();
      }),
  );

  return Promise.all(promises);
};
