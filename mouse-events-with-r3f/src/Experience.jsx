import { useRef } from 'react';
import { meshBounds, useGLTF, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function Experience() {
  const cube = useRef();

  const hamburger = useGLTF('./hamburger.glb');

  useFrame((_, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight intensity={1.5} position={[1, 2, 3]} />
      <ambientLight intensity={0.5} />

      <mesh
        onClick={(e) => {
          e.stopPropagation();
        }}
        position-x={-2}
      >
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        onClick={() => {
          cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);
        }}
        onPointerEnter={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'default';
        }}
        position-x={2}
        raycast={meshBounds}
        ref={cube}
        scale={1.5}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <primitive
        object={hamburger.scene}
        onClick={(e) => {
          console.log(e.object.name);
          e.stopPropagation();
        }}
        position-y={0.5}
        scale={0.25}
      />

      <mesh rotation-x={-Math.PI * 0.5} position-y={-1} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
