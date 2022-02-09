import { getFingerprint } from './fingerprints';
import { classNames } from './utils';
import { Action, modes, State } from './hooks';
import Stats from './Stats';
import Choices from './Choices';
import React, { Dispatch } from 'react';

interface Props {
  state: State;
  dispatch: Dispatch<Action>;
}

export default function Main({ state, dispatch }: Props) {
  return (
    <>
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
            alt=""
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
    </>
  );
}
