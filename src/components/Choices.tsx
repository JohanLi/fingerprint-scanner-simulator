import React, { ReactElement, Dispatch } from 'react';
import classNames from 'classnames';

import { State, Action } from '../hooks';
import { fingerprints } from '../require';

import styles from './choices.scss';

interface Props {
  state: State;
  dispatch: Dispatch<Action>;
}

const Choices = (props: Props): ReactElement => {
  const {
    shuffledElements,
    shuffledFingerprints,
    selectedElements,
  } = props.state;

  const choicesJsx = shuffledElements.map((i) => {
    const selected = selectedElements.includes(i);

    const className = classNames({
      [styles.choice]: true,
      [styles.selected]: selected,
    });
    const type = selected ? 'REMOVE_ELEMENT' : 'ADD_ELEMENT';
    const key = `${shuffledFingerprints[0]}-${i}`;

    return (
      <div
        className={className}
        onClick={() => props.dispatch({ type, number: i })}
        key={key}
      >
        <img
          src={fingerprints(`./finger-${key}.png`).default}
          draggable={false}
          width="128"
          height="128"
        />
      </div>
    );
  });

  return <div className={styles.choices}>{choicesJsx}</div>;
};

export default Choices;
