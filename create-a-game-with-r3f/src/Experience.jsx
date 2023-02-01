import { OrbitControls } from '@react-three/drei';
import { Debug, Physics } from '@react-three/rapier';

import { BlockAxe, BlockLimbo, BlockSpinner, Level } from './Level';
import { Lights } from './Lights';

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />

      <Physics>
        <Debug />
        <Lights />
        <Level count={3} types={[BlockAxe, BlockLimbo, BlockSpinner]} />
      </Physics>
    </>
  );
}
