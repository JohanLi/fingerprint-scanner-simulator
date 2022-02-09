import React, { useState } from 'react';

import { State, useInterval } from '../lib/hooks';
import { formatTimestamp, random } from '../lib/utils';

interface Props {
  state: State;
}

const Stats = (props: Props) => {
  const { startTimestamp, lastRun } = props.state;

  const [thisRun, setThisRun] = useState(0);

  useInterval(() => {
    setThisRun(performance.now() - startTimestamp);
  }, random(40, 60));

  return (
    <div className="text-right space-y-4">
      <div className="opacity-50">
        <div className="mb-1">Last run</div>
        {lastRun ? formatTimestamp(lastRun) : '-'}
      </div>
      <div>
        <div className="mb-1">This run</div>
        {formatTimestamp(thisRun)}
      </div>
    </div>
  );
};

export default Stats;
