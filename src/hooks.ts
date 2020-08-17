import { useEffect, useRef } from 'react';
import { isEqual, shuffle, sortBy } from 'lodash-es';

const FINGERPRINTS = [
  {
    variant: 1,
    correctElements: [1, 4, 6, 7],
  },
  {
    variant: 2,
    correctElements: [1, 2, 3, 4],
  },
  {
    variant: 3,
    correctElements: [1, 2, 3, 4],
  },
  {
    variant: 4,
    correctElements: [1, 2, 3, 4],
  },
];

const ELEMENTS = [1, 2, 3, 4, 5, 6, 7, 8];

export const modes = ['normal', 'hard'] as const;
type Mode = typeof modes[number];

export interface State {
  shuffledFingerprints: number[];
  shuffledElements: number[];
  selectedElements: number[];
  wrongFlash: boolean;
  startTimestamp: number;
  lastRun: number;
  thisRun: number;
  mode: Mode;
}

export type Action =
  | { type: 'SET_MODE'; mode: Mode }
  | { type: 'ADD_ELEMENT'; number: number }
  | { type: 'REMOVE_ELEMENT'; number: number }
  | { type: 'STOP_WRONG_FLASH' };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_MODE': {
      const { mode } = action;

      if (state.mode === mode) {
        return state;
      }

      return {
        ...initialState(),
        mode,
      };
    }
    case 'ADD_ELEMENT': {
      const selectedElements = [...state.selectedElements, action.number];
      const fingerprint = FINGERPRINTS.find(
        (f) => f.variant === state.shuffledFingerprints[0],
      );

      if (!fingerprint) {
        throw new Error();
      }

      const checkSolution =
        selectedElements.length === fingerprint.correctElements.length;

      if (!checkSolution) {
        return {
          ...state,
          selectedElements,
        };
      }

      const correct = isEqual(
        sortBy(selectedElements),
        fingerprint.correctElements,
      );

      if (!correct) {
        return {
          ...state,
          selectedElements: [],
          wrongFlash: true,
        };
      }

      const solvedAll = state.shuffledFingerprints.length === 1;

      if (!solvedAll) {
        return {
          ...state,
          shuffledFingerprints: state.shuffledFingerprints.slice(1),
          shuffledElements: shuffle(ELEMENTS),
          selectedElements: [],
        };
      }

      const startTimestamp = performance.now();

      return {
        ...state,
        shuffledFingerprints: shuffle(FINGERPRINTS.map((f) => f.variant)),
        shuffledElements: shuffle(ELEMENTS),
        selectedElements: [],
        lastRun: startTimestamp - state.startTimestamp,
        startTimestamp,
      };
    }
    case 'REMOVE_ELEMENT': {
      const selectedElements = state.selectedElements.filter(
        (number) => number !== action.number,
      );

      return {
        ...state,
        selectedElements,
      };
    }
    case 'STOP_WRONG_FLASH': {
      return {
        ...state,
        wrongFlash: false,
      };
    }
    default:
      throw new Error();
  }
};

export const initialState = (): State => ({
  shuffledFingerprints: shuffle(FINGERPRINTS.map((f) => f.variant)),
  shuffledElements: shuffle(ELEMENTS),
  selectedElements: [],
  wrongFlash: false,
  startTimestamp: performance.now(),
  lastRun: 0,
  thisRun: 0,
  mode: 'normal',
});

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
type IntervalFunction = () => void;

export const useInterval = (
  callback: IntervalFunction,
  delay: number,
): void => {
  const savedCallback = useRef<IntervalFunction>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};
