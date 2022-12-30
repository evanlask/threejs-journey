import { useRef } from 'react';
import * as THREE from 'three';
import {
  Float,
  Html,
  MeshReflectorMaterial,
  OrbitControls,
  PivotControls,
  Text,
  TransformControls,
} from '@react-three/drei';

const Experience = () => {
  const boxMeshRef = useRef();
  const sphereMeshRef = useRef();

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight intensity={1.5} position={[1, 2, 3]} />
      <ambientLight intensity={0.5} />

      <PivotControls
        anchor={[0, 0, 0]}
        axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
        depthTest={false}
        fixed={false}
        lineWidth={3}
        scale={0.75}
      >
        <mesh position-x={-2} ref={sphereMeshRef}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          <Html
            center
            distanceFactor={8}
            occlude={[boxMeshRef, sphereMeshRef]}
            position={[0.9, 0.9, 0]}
            wrapperClass="label"
          >
            Sphere
          </Html>
        </mesh>
      </PivotControls>

      <mesh position-x={2} ref={boxMeshRef} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <TransformControls mode="translate" object={boxMeshRef} />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <MeshReflectorMaterial blur={[1000, 1000]} color="greenyellow" mirror={0.3} mixBlur={0.8} resolution={1024} />
      </mesh>

      <Float floatIntensity={2} speed={0.5}>
        <Text
          color="salmon"
          font="./bangers-v20-latin-regular.woff"
          fontSize={1}
          lineHeight={0.8}
          maxWidth={1}
          position-y={2}
          textAlign="center"
        >
          Hello World!!!
        </Text>
      </Float>
    </>
  );
};

export default Experience;
