import { useRef } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import CustomObject from './CustomObject';

extend({ OrbitControls });

const Experience = () => {
  const { camera, gl } = useThree();

  const groupRef = useRef();
  const boxRef = useRef();

  useFrame((state, delta) => {
    // groupRef.current.rotation.y += delta;
    boxRef.current.rotation.y += delta;
  });

  const wireframe = false;

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <group>
        <directionalLight intensity={1.5} position={[1, 2, 3]} />
        <ambientLight intensity={0.25} />
      </group>

      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" wireframe={wireframe} />
        </mesh>
        <mesh position-x={2} ref={boxRef} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" wireframe={wireframe} />
        </mesh>
        <CustomObject />
      </group>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" wireframe={wireframe} />
      </mesh>
    </>
  );
};

export default Experience;
