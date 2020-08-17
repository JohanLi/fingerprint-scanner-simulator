interface RequireContext {
  keys(): string[];
  (id: string): {
    default: string;
  };
}

export const loadAssets = (
  assets: RequireContext,
): Promise<HTMLImageElement[]> => {
  const promises = assets.keys().map(
    (key) =>
      new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.src = assets(key).default;
        img.onload = () => resolve(img);
      }),
  );

  return Promise.all(promises);
};

export const formatTimestamp = (milliseconds: number): string => {
  const seconds = (milliseconds / 1000).toFixed(2);
  return seconds.replace('.', ':');
};
