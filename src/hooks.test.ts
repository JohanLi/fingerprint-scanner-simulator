import * as hooks from './hooks';

// TODO verify that shuffle is called, even though randomness is removed
jest.mock('lodash-es', () => {
  const original = jest.requireActual('lodash-es');

  return {
    __esModule: true,
    ...original,
    shuffle: (array: number[]): number[] => array,
  };
});

const { reducer, initialState } = hooks;

describe('hooks', () => {
  test('changing mode resets state', () => {
    const mode = 'hard';

    const spy = jest.spyOn(hooks, 'initialState');
    const state = reducer({} as any, { type: 'SET_MODE', mode });

    expect(state.mode).toEqual('hard');
    expect(spy).toBeCalledTimes(1);

    spy.mockRestore();
  });

  test('nothing happens when setting mode to existing one', () => {
    const mode = 'normal';

    const state = { mode };
    expect(reducer(state as any, { type: 'SET_MODE', mode })).toBe(state);
  });

  test('adding an element', () => {
    const number = 7;

    const state = {
      ...initialState(),
      selectedElements: [3],
    };

    expect(reducer(state, { type: 'ADD_ELEMENT', number })).toEqual({
      ...state,
      selectedElements: [3, number],
    });
  });

  test('removing an element', () => {
    const state = {
      ...initialState(),
      selectedElements: [1, 2, 3],
    };

    expect(reducer(state, { type: 'REMOVE_ELEMENT', number: 2 })).toEqual({
      ...state,
      selectedElements: [1, 3],
    });
  });

  test('stop flashing', () => {
    const state = {
      ...initialState(),
      wrongFlash: true,
    };

    expect(reducer(state, { type: 'STOP_WRONG_FLASH' })).toEqual({
      ...state,
      wrongFlash: false,
    });
  });

  test('checking a wrong solution', () => {
    const state = {
      ...initialState(),
      selectedElements: [6, 1, 4],
    };

    expect(reducer(state, { type: 'ADD_ELEMENT', number: 2 })).toEqual({
      ...state,
      selectedElements: [],
      wrongFlash: true,
    });
  });

  test('checking a correct solution', () => {
    const state = {
      ...initialState(),
      selectedElements: [1, 6, 4],
    };

    expect(reducer(state, { type: 'ADD_ELEMENT', number: 7 })).toEqual({
      ...state,
      shuffledFingerprints: [2, 3, 4],
      selectedElements: [],
    });
  });

  test('completing a run', () => {
    const startTimestamp = 30000;
    const completedTimestamp = 60000;

    const state = {
      ...initialState(),
      shuffledFingerprints: [1],
      selectedElements: [7, 1, 6],
      startTimestamp,
    };

    global.performance.now = jest.fn().mockReturnValueOnce(completedTimestamp);

    expect(reducer(state, { type: 'ADD_ELEMENT', number: 4 })).toEqual({
      ...state,
      shuffledFingerprints: [1, 2, 3, 4],
      selectedElements: [],
      lastRun: completedTimestamp - startTimestamp,
      startTimestamp: completedTimestamp,
    });
  });
});
