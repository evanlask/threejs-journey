import { useKeyboardControls } from '@react-three/drei';
import { addEffect } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

import { useGame } from './stores/useGame';

export const Interface = () => {
  const time = useRef();

  const phase = useGame((state) => state.phase);
  const restart = useGame((state) => state.restart);

  const forward = useKeyboardControls((state) => state.forward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const jump = useKeyboardControls((state) => state.jump);

  useEffect(() => {
    const unsubscribeTime = addEffect(() => {
      const state = useGame.getState();

      let elapsedTime = 0;

      if (state.phase === 'playing') {
        elapsedTime = Date.now() - state.timeStart;
      } else if (state.phase === 'ended') {
        elapsedTime = state.timeEnd - state.timeStart;
      }

      elapsedTime = elapsedTime / 1000;

      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) {
        time.current.textContent = elapsedTime;
      }
    });

    return () => {
      unsubscribeTime();
    };
  }, []);

  // TODO: classnames to apply active classes
  return (
    <div className="interface">
      <div className="time" ref={time}>
        0.00
      </div>
      {phase === 'ended' && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? 'active' : ''}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${leftward ? 'active' : ''}`}></div>
          <div className={`key ${backward ? 'active' : ''}`}></div>
          <div className={`key ${rightward ? 'active' : ''}`}></div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? 'active' : ''}`}></div>
        </div>
      </div>
    </div>
  );
};
