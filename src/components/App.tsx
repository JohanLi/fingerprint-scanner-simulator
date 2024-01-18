import { useReducer, useEffect } from 'preact/hooks'

import { reducer, initialState, modes } from '../lib/hooks'
import About from './About'
import { getFingerprint, load } from '../lib/fingerprints'
import { classNames } from '../lib/utils'
import Loading from './Loading'
import Stats from './Stats'
import Choices from './Choices'

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState())

  useEffect(() => {
    load().then(() => dispatch({ type: 'FINGERPRINTS_LOADED' }))
  }, [])

  // TODO can this be solved without setTimeout()?
  // https://github.com/facebook/react/issues/7142
  useEffect(() => {
    if (state.wrongFlash) {
      setTimeout(() => dispatch({ type: 'STOP_WRONG_FLASH' }), 100)
    }
  }, [state.wrongFlash])

  return (
    <div
      className={classNames(
        'min-h-screen space-y-12 px-2 pb-24 pt-6 text-white transition-colors ease-in-out',
        state.wrongFlash ? 'bg-red-600 duration-0' : 'bg-black duration-500',
      )}
    >
      <div className="relative mx-auto max-w-2xl space-y-12">
        {!state.fingerprintsLoaded && <Loading />}
        <div className="flex justify-between">
          <div>
            <img
              src={getFingerprint(state.shuffledFingerprints[0])}
              className={classNames(
                'opacity-50',
                state.mode === 'hard' ? 'invisible' : '',
              )}
              draggable={false}
              width="400"
              height="512"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="space-y-4 text-right text-xl uppercase">
              {modes.map((mode) => (
                <div
                  className={classNames(
                    'cursor-pointer',
                    state.mode === mode ? '' : 'opacity-50',
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
      </div>
      <div className="mx-auto max-w-2xl">
        <About />
      </div>
    </div>
  )
}

export default App
