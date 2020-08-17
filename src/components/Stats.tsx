import React, { ReactElement, useState } from 'react';
import { random } from 'lodash-es';

import { State, useInterval } from '../hooks';
import { formatTimestamp } from '../utils';

import styles from './stats.scss';

interface Props {
  state: State;
}

const Stats = (props: Props): ReactElement => {
  const { startTimestamp, lastRun } = props.state;

  const [thisRun, setThisRun] = useState(0);

  useInterval(() => {
    setThisRun(performance.now() - startTimestamp);
  }, random(40, 60));

  return (
    <div className={styles.stats}>
      <div className={styles.lastRun}>
        <div className={styles.title}>Last run</div>
        {lastRun ? formatTimestamp(lastRun) : '-'}
      </div>
      <div className={styles.thisRun}>
        <div className={styles.title}>This run</div>
        {formatTimestamp(thisRun)}
      </div>
    </div>
  );
};

export default Stats;
