import { Perf } from 'r3f-perf';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';

import Hamburger from './Hamburger';
import Model from './Model';
import Placeholder from './Placeholder';

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow intensity={1.5} shadow-normalBias={0.5} position={[1, 2, 3]} />
      <ambientLight intensity={0.5} />

      <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <Suspense fallback={<Placeholder position-y={0.5} scale={2} />}>
        <Hamburger scale={0.35} />
      </Suspense>
    </>
  );
}
