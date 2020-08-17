import * as hooks from './hooks';

const { reducer, initialState } = hooks;

describe('hooks', () => {
  test('changing mode resets state', () => {
    const mode = 'hard';

    const spy = jest.spyOn(hooks, 'initialState');
    const state = reducer({} as any, { type: 'SET_MODE', mode });

    expect(state.mode).toEqual('hard');
    expect(spy).toBeCalledTimes(1);
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
});
