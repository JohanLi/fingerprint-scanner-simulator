export const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(' ');

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
