import React, { useReducer, useEffect } from 'react';

import { reducer, initialState, modes } from './hooks';
import Stats from './Stats';
import Choices from './Choices';
import About from './About';
import { getFingerprint, load } from './fingerprints';
import { classNames } from './utils';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState());

  useEffect(() => {
    load().then(() => dispatch({ type: 'FINGERPRINTS_LOADED' }));
  }, []);

  // TODO can this be solved without setTimeout()?
  // https://github.com/facebook/react/issues/7142
  useEffect(() => {
    if (state.wrongFlash) {
      setTimeout(() => dispatch({ type: 'STOP_WRONG_FLASH' }), 100);
    }
  }, [state.wrongFlash]);

  if (!state.fingerprintsLoaded) {
    return <div />;
  }

  return (
    <div
      className={classNames(
        'pt-6 pb-24 px-2 text-white transition-colors ease-in-out',
        state.wrongFlash ? 'bg-red-600 duration-0' : 'duration-500 bg-black',
      )}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between">
          <div>
            <img
              src={getFingerprint(state.shuffledFingerprints[0])}
              className={classNames(
                'opacity-40',
                state.mode === 'hard' ? 'invisible' : '',
              )}
              draggable={false}
              width="400"
              height="512"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="text-right text-xl uppercase space-y-4">
              {modes.map((mode) => (
                <div
                  className={classNames(
                    'cursor-pointer',
                    state.mode === mode ? '' : 'opacity-40',
                  )}
                  onClick={() => dispatch({ type: 'SET_MODE', mode })}
                  key={mode}
                >
                  {mode}
                </div>
              ))}
            </div>
            <Stats state={state} />
          </div>
        </div>
        <Choices state={state} dispatch={dispatch} />
        <About />
      </div>
    </div>
  );
};

export default App;
