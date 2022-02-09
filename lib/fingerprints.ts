const fingerprintsRequireContext = require.context('./assets/', true, /\.webp/);

const fingerprintI = [1, 2, 3, 4] as const;
export type FingerprintI = typeof fingerprintI[number];

export const fingerprintElementI = [1, 2, 3, 4, 5, 6, 7, 8];
export type FingerprintElementI = typeof fingerprintElementI[number];

export const load = () => {
  const promises = fingerprintsRequireContext.keys().map(
    (key) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.src = fingerprintsRequireContext(key).default.src;
        img.onload = () => resolve();
      }),
  );

  return Promise.all(promises);
};

export const getFingerprint = (i: FingerprintI) =>
  fingerprintsRequireContext(`./finger-${i}.webp`).default.src;

export const getFingerprintElement = (
  i: FingerprintI,
  j: FingerprintElementI,
) => fingerprintsRequireContext(`./finger-${i}-${j}.webp`).default.src;
