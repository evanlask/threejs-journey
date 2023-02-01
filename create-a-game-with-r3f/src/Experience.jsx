import {} from '@react-three/drei';
import { Debug, Physics } from '@react-three/rapier';

import { BlockAxe, BlockLimbo, BlockSpinner, Level } from './Level';
import { Lights } from './Lights';
import { Player } from './Player';

export default function Experience() {
  return (
    <>
      <Physics>
        <Debug />
        <Lights />
        <Level count={7} types={[BlockAxe, BlockLimbo, BlockSpinner]} />
        <Player />
      </Physics>
    </>
  );
}
