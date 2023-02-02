import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export const useGame = create(
  subscribeWithSelector((set) => {
    return {
      blockCount: 10,
      blockSeed: 0,
      phase: 'ready',
      timeEnd: 0,
      timeStart: 0,

      // Start game
      start: () => {
        set((state) => {
          if (state.phase === 'ready') {
            return {
              phase: 'playing',
              timeStart: Date.now(),
            };
          }

          return {};
        });
      },

      // Restart game
      restart: () => {
        set((state) => {
          if (state.phase === 'playing' || state.phase === 'ended') {
            return {
              blockSeed: Math.random(),
              phase: 'ready',
            };
          }

          return {};
        });
      },

      // End game
      end: () => {
        set((state) => {
          if (state.phase === 'playing') {
            return {
              phase: 'ended',
              timeEnd: Date.now(),
            };
          }

          return {};
        });
      },
    };
  })
);
