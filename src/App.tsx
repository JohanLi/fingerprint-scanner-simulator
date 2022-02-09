import React, { useReducer, useEffect } from 'react';

import { reducer, initialState } from './hooks';
import About from './About';
import { load } from './fingerprints';
import { classNames } from './utils';
import Main from './Main';
import Loading from './Loading';

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

  return (
    <div
      className={classNames(
        'pt-6 pb-24 px-2 text-white min-h-screen transition-colors ease-in-out',
        state.wrongFlash ? 'bg-red-600 duration-0' : 'duration-500 bg-black',
      )}
    >
      <div className="max-w-2xl mx-auto">
        {!state.fingerprintsLoaded && <Loading />}
        {state.fingerprintsLoaded && <Main state={state} dispatch={dispatch} />}
        <About />
      </div>
    </div>
  );
};

export default App;
