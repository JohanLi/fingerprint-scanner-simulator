import React, { ReactElement, useReducer, useEffect } from 'react';
import classNames from 'classnames';

import { reducer, initialState, modes } from '../hooks';
import Stats from './Stats';
import Choices from './Choices';
import About from './About';
import { fingerprints } from '../require';

import styles from './app.scss';

const App = (): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState());

  // TODO: find a method to trigger the flashing without setTimeout()
  useEffect(() => {
    if (state.wrongFlash) {
      setTimeout(() => dispatch({ type: 'STOP_WRONG_FLASH' }), 50);
    }
  }, [state.wrongFlash]);

  const appClass = classNames({
    [styles.app]: true,
    [styles.wrongFlash]: state.wrongFlash,
  });

  return (
    <div className={appClass}>
      <div className={styles.wrapper}>
        <div className={styles.fingerprintModeStats}>
          <div className={styles.fingerprintWrapper}>
            <img
              src={
                fingerprints(`./finger-${state.shuffledFingerprints[0]}.png`)
                  .default
              }
              className={classNames({
                [styles.fingerprint]: true,
                [styles.hidden]: state.mode === 'hard',
              })}
              draggable={false}
              width="400"
              height="512"
            />
          </div>
          <div className={styles.modeStats}>
            <div className={styles.mode}>
              {modes.map((mode) => (
                <div
                  className={classNames({
                    [styles.active]: state.mode === mode,
                  })}
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
