import { loadAssets, formatTimestamp, isCorrect } from './utils';

test('loadAssets', async () => {
  Object.defineProperty(global.Image.prototype, 'src', {
    set() {
      setTimeout(() => this.onload());
    },
  });

  const map: { [key: string]: string } = {
    '1.png': '/assets/1.png',
    '2.png': '/assets/2.png',
  };

  const assets = (id: string) => ({
    default: map[id],
  });
  assets.keys = () => Object.keys(map);

  const loaded = await loadAssets(assets);

  expect(loaded.every((l) => l instanceof HTMLImageElement)).toEqual(true);
});

test('formatTimestamp', () => {
  expect(formatTimestamp(1234)).toEqual('1:23');
  expect(formatTimestamp(12345)).toEqual('12:35');
  expect(formatTimestamp(123456)).toEqual('123:46');
});

test('isCorrect', () => {
  expect(isCorrect([], [1])).toEqual(false);
  expect(isCorrect([1], [1, 2])).toEqual(false);
  expect(isCorrect([1, 2], [1, 2])).toEqual(true);
  expect(isCorrect([6, 1, 7, 4], [1, 4, 6, 7])).toEqual(true);
});
