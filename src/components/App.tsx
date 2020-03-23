import React, { ReactElement, useState, useEffect } from 'react';
import { shuffle, isEqual, sortBy } from 'lodash-es';
import classNames from 'classnames';

import { fingerprints as fingerprintAssets } from '../assets';
import useInterval from '../useInterval';

import styles from './app.scss';

const fingerprints = [1, 2, 3, 4];
const choices = [1, 2, 3, 4, 5, 6, 7, 8];
const answers: { [ key: number ]: number[] } = {
  1: [1, 4, 6, 7],
  2: [1, 2, 3, 4],
  3: [1, 2, 3, 4],
  4: [1, 2, 3, 4],
};

const formatTimestamp = (milliseconds: number) => {
  const seconds = (milliseconds / 1000).toFixed(2);
  return seconds.replace('.', ':');
}

const App = (): ReactElement => {
  const [shuffledFingerprints, setShuffledFingerprints] = useState(shuffle(fingerprints));
  const [shuffledChoices, setShuffledChoices] = useState(shuffle(choices));
  const [selectedChoice, setSelectedChoice] = useState<number[]>([]);
  const [startTimestamp, setStartTimestamp] = useState(0);
  const [lastRun, setLastRun] = useState(0);
  const [thisRun, setThisRun] = useState(0);

  useEffect(() => {
    if (selectedChoice.length !== 4) {
      return;
    }

    if (isEqual(sortBy(selectedChoice), answers[shuffledFingerprints[0]])) {
      if (shuffledFingerprints.length === 1) {
        setShuffledFingerprints(shuffle(fingerprints));
        const newStartTimestamp = performance.now();
        setLastRun(newStartTimestamp - startTimestamp);
        setStartTimestamp(newStartTimestamp);
      } else {
        setShuffledFingerprints(shuffledFingerprints.slice(1));
      }

      setShuffledChoices(shuffle(choices));
    }

    setSelectedChoice([]);
  }, [shuffledFingerprints, selectedChoice]);

  useInterval(() => {
    setThisRun(performance.now() - startTimestamp);
  }, 50);

  const choicesJsx = shuffledChoices
    .map((i) => {
      const selected = selectedChoice.includes(i);

      const className = classNames({
        [styles.choice]: true,
        [styles.selected]: selected,
      });

      return <img
        src={fingerprintAssets(`./finger-${shuffledFingerprints[0]}-${i}.png`).default}
        className={className}
        onClick={() => {
          if (selected) {
            setSelectedChoice(selectedChoice.filter(choice => choice !== i));
          } else {
            setSelectedChoice([...selectedChoice, i]);
          }
        }}
        key={`${shuffledFingerprints[0]}-${i}`}
      />;
    });

  return (
    <div className={styles.app}>
      <div className={styles.fingerStats}>
        <div className={styles.fingerWrapper}>
          <img src={fingerprintAssets(`./finger-${shuffledFingerprints[0]}.png`).default} className={styles.finger} />
        </div>
        <div className={styles.stats}>
          <div className={styles.lastRun}>
            <div className={styles.title}>
              Last run
            </div>
            {lastRun ? formatTimestamp(lastRun) : '-'}
          </div>
          <div className={styles.thisRun}>
            <div className={styles.title}>
              This run
            </div>
            {formatTimestamp(thisRun)}
          </div>
        </div>
      </div>
      <div className={styles.choices}>
        {choicesJsx}
      </div>
      <div className={styles.about}>
        <h1 className={styles.heading}>GTA Online Choice Scanner Simulator</h1>

      </div>
    </div>
  );
};

export default App;
