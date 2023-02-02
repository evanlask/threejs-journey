import {} from '@react-three/drei';
import { Debug, Physics } from '@react-three/rapier';

import { useGame } from './stores/useGame';

import { Effects } from './Effects';
import { BlockAxe, BlockLimbo, BlockSpinner, Level } from './Level';
import { Lights } from './Lights';
import { Player } from './Player';

export default function Experience() {
  const blockCount = useGame((state) => state.blockCount);
  const blockSeed = useGame((state) => state.blockSeed);

  return (
    <>
      <color args={['#252731']} attach="background" />

      <Lights />
      <Effects />

      <Physics>
        {/*<Debug />*/}
        <Level count={blockCount} seed={blockSeed} types={[BlockAxe, BlockLimbo, BlockSpinner]} />
        <Player />
      </Physics>
    </>
  );
}
