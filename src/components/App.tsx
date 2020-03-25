import React, { ReactElement, useState, useEffect } from 'react';
import { shuffle, isEqual, sortBy } from 'lodash-es';
import classNames from 'classnames';

import { fingerprints as fingerprintAssets } from '../assets';
import useInterval from '../useInterval';

import styles from './app.scss';

const fingerprints = [1, 2, 3, 4];
const elements = [1, 2, 3, 4, 5, 6, 7, 8];
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
  const [shuffledElements, setShuffledElements] = useState(shuffle(elements));
  const [selectedElement, setSelectedElement] = useState<number[]>([]);
  const [startTimestamp, setStartTimestamp] = useState(0);
  const [lastRun, setLastRun] = useState(0);
  const [thisRun, setThisRun] = useState(0);
  const [hideFingerprint, setHideFingerprint] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // TODO: find a method to trigger the flashing without setTimeout()
  useEffect(() => {
    if (wrongFlash) {
      setTimeout(() => setWrongFlash(false), 50);
    }
  }, [wrongFlash]);

  useEffect(() => {
    if (selectedElement.length !== 4) {
      return;
    }

    if (isEqual(sortBy(selectedElement), answers[shuffledFingerprints[0]])) {
      if (shuffledFingerprints.length === 1) {
        setShuffledFingerprints(shuffle(fingerprints));
        const newStartTimestamp = performance.now();
        setLastRun(newStartTimestamp - startTimestamp);
        setStartTimestamp(newStartTimestamp);
      } else {
        setShuffledFingerprints(shuffledFingerprints.slice(1));
      }

      setShuffledElements(shuffle(elements));
    } else {
      setWrongFlash(true);
    }

    setSelectedElement([]);
  }, [shuffledFingerprints, selectedElement]);

  useEffect(() => {
    setShuffledFingerprints(shuffle(fingerprints));
    setShuffledElements(shuffle(elements));
    setLastRun(0);
    setStartTimestamp(performance.now());
  }, [hideFingerprint]);

  useInterval(() => {
    setThisRun(performance.now() - startTimestamp);
  }, 50);

  const choicesJsx = shuffledElements
    .map((i) => {
      const selected = selectedElement.includes(i);

      const className = classNames({
        [styles.choice]: true,
        [styles.selected]: selected,
      });

      return (
        <div
          className={className}
          onClick={() => {
            if (selected) {
              setSelectedElement(selectedElement.filter(choice => choice !== i));
            } else {
              setSelectedElement([...selectedElement, i]);
            }
          }}
          key={`${shuffledFingerprints[0]}-${i}`}
        >
          <img
            src={fingerprintAssets(`./finger-${shuffledFingerprints[0]}-${i}.png`).default}
            draggable={false}
            width="128"
            height="128"
          />
        </div>
      );
    });

  const appClass = classNames({
    [styles.app]: true,
    [styles.wrongFlash]: wrongFlash,
  });

  return (
    <div className={appClass}>
      <div className={styles.wrapper}>
        <div className={styles.fingerprintModeStats}>
          <div className={styles.fingerprintWrapper}>
            <img
              src={fingerprintAssets(`./finger-${shuffledFingerprints[0]}.png`).default}
              className={classNames({
                [styles.fingerprint]: true,
                [styles.hidden]: hideFingerprint,
              })}
              draggable={false}
              width="400"
              height="512"
            />
          </div>
          <div className={styles.modeStats}>
            <div className={styles.mode}>
              <div
                className={classNames({
                  [styles.active]: hideFingerprint === false,
                })}
                onClick={() => setHideFingerprint(false)}
              >
                Normal
              </div>
              <div
                className={classNames({
                  [styles.active]: hideFingerprint === true,
                })}
                onClick={() => setHideFingerprint(true)}
              >
                Hard
              </div>
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
        </div>
        <div className={styles.choices}>
          {choicesJsx}
        </div>
        <div className={styles.about}>
          <h2>What’s this?</h2>
          <p>
            <i>The Diamond Casino Heist</i> in GTA Online introduces two hacking minigames, one of them being the
            fingerprint scanner. To maximize your take, you have to be fast. Use this simulator to practice – outside
            the heist, without the loading screens, on your phone!
          </p>
          <p>
            There are 4 fingerprints in total. For each fingerprint, tap/click on the 4 elements (parts, segments)
            that make up the fingerprint.
          </p>
          <h2>Normal, Hard, huh?</h2>
          <p>
            Hard leaves you to select the correct 4 elements without looking at each fingerprint. Once you’ve
            practiced enough, you’ll manage. This is how you hack the fastest in the actual heist!
          </p>
          <p>
            These two modes have no connection to the heist.
          </p>
          <h2>What’s up with the strange website address?</h2>
          <p>
            My name is Johan Li, and this is my personal website. I’m a software developer, and have worked in the
            gaming industry for Paradox Interactive. If you’re also into software development and tech in general,
            I hope you find <a href="https://johan.li">my articles</a> interesting!
          </p>
          <p>
            If you have feedback on this simulator, reach out to me via <a href="mailto:hi@johan.li">hi@johan.li</a>.
            I’ve done the Casino Heist many times – if you’d be interested in me creating a guide with tips and
            tricks on how to do both the heist and set ups quickly, let me know.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
