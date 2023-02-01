import { OrbitControls } from '@react-three/drei';
import { Debug, Physics } from '@react-three/rapier';

import { BlockAxe, BlockLimbo, BlockSpinner, Level } from './Level';
import { Lights } from './Lights';
import { Player } from './Player';

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <Physics>
        <Debug />
        <Lights />
        <Level count={2} types={[BlockAxe, BlockLimbo, BlockSpinner]} />
        <Player />
      </Physics>
    </>
  );
}
