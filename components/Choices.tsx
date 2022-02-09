import React, { Dispatch } from 'react';

import { State, Action } from '../lib/hooks';
import { getFingerprintElement } from '../lib/fingerprints';
import { classNames } from '../lib/utils';

interface Props {
  state: State;
  dispatch: Dispatch<Action>;
}

const Choices = (props: Props) => {
  const { shuffledElements, shuffledFingerprints, selectedElements } =
    props.state;

  const choicesJsx = shuffledElements.map((i) => {
    const selected = selectedElements.includes(i);

    const type = selected ? 'REMOVE_ELEMENT' : 'ADD_ELEMENT';

    return (
      <div
        className="col-span-1 flex items-center justify-center"
        key={`${shuffledFingerprints[0]}-${i}`}
      >
        <img
          src={getFingerprintElement(shuffledFingerprints[0], i)}
          onClick={() => props.dispatch({ type, number: i })}
          className={classNames('cursor-pointer', selected ? '' : 'opacity-50')}
          draggable={false}
          width="128"
          height="128"
          alt=""
        />
      </div>
    );
  });

  return <div className="grid grid-cols-4 gap-4 py-12">{choicesJsx}</div>;
};

export default Choices;
