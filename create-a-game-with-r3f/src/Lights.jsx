import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export const Lights = () => {
  const light = useRef();

  useFrame((state) => {
    light.current.position.z = state.camera.position.z + 1;
    light.current.target.position.z = state.camera.position.z - 4;
    light.current.target.updateMatrixWorld();
  });

  return (
    <>
      <directionalLight
        castShadow
        intensity={1.5}
        position={[4, 4, 1]}
        ref={light}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={0.5} />
    </>
  );
};
