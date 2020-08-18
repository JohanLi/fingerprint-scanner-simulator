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

export const random = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const isCorrect = (
  selectedElements: number[],
  correctElements: number[],
): boolean => {
  if (!selectedElements.length) {
    return false;
  }

  if (selectedElements.length !== correctElements.length) {
    return false;
  }

  return selectedElements
    .sort((a, b) => a - b)
    .every((s, i) => s === correctElements[i]);
};
