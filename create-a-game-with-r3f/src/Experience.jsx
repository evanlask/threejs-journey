import {} from '@react-three/drei';
import { Debug, Physics } from '@react-three/rapier';

import { useGame } from './stores/useGame';

import { BlockAxe, BlockLimbo, BlockSpinner, Level } from './Level';
import { Lights } from './Lights';
import { Player } from './Player';

export default function Experience() {
  const blockCount = useGame((state) => state.blockCount);
  const blockSeed = useGame((state) => state.blockSeed);

  return (
    <>
      <color args={['#bdedfc']} attach="background" />

      <Physics>
        <Debug />
        <Lights />
        <Level count={blockCount} seed={blockSeed} types={[BlockAxe, BlockLimbo, BlockSpinner]} />
        <Player />
      </Physics>
    </>
  );
}
