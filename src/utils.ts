export const formatTimestamp = (milliseconds: number): string => {
  const seconds = (milliseconds / 1000).toFixed(2);
  return seconds.replace('.', ':');
};
