const fingerprintI = [1, 2, 3, 4] as const;
export type FingerprintI = typeof fingerprintI[number];

export const fingerprintElementI = [1, 2, 3, 4, 5, 6, 7, 8];
export type FingerprintElementI = typeof fingerprintElementI[number];

const fingerprints = {} as { [key in FingerprintI]: string };
const fingerprintElements = {} as {
  [key in FingerprintI]: { [key in FingerprintElementI]: string };
};

export const load = () => {
  const promises: Promise<void>[] = [];

  fingerprintI.forEach((i) => {
    promises.push(
      new Promise((resolve) => {
        import(`./assets/finger-${i}.png`).then((value) => {
          const { src } = value.default;

          const img = new Image();
          img.src = src;

          img.onload = () => {
            fingerprints[i] = src;
            resolve();
          };
        });
      }),
    );
  });

  fingerprintI.forEach((i) => {
    fingerprintElementI.forEach((j) => {
      promises.push(
        new Promise((resolve) => {
          import(`./assets/finger-${i}-${j}.png`).then((value) => {
            const { src } = value.default;

            const img = new Image();
            img.src = src;

            img.onload = () => {
              if (!fingerprintElements[i]) {
                fingerprintElements[i] = {};
              }

              fingerprintElements[i][j] = src;
              resolve();
            };
          });
        }),
      );
    });
  });

  return Promise.all(promises);
};

export const getFingerprint = (i: FingerprintI) => fingerprints[i];
export const getFingerprintElement = (
  i: FingerprintI,
  j: FingerprintElementI,
) => fingerprintElements[i][j];
