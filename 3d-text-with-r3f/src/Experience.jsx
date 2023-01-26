import { useEffect, useRef } from 'react';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';
import { useMatcapTexture, Center, OrbitControls, Text3D } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
  const donuts = useRef([]);

  const [matcapTexture] = useMatcapTexture('A28766_E4D6C3_D6C4AA_CAB598', 256);

  useEffect(() => {
    matcapTexture.encoding = THREE.sRGBEncoding;
    matcapTexture.needsUpdate = true;

    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, [matcapTexture]);

  useFrame((state, delta) => {
    donuts.current.forEach((donut) => {
      donut.rotation.y += delta * 0.1;
    });
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Center>
        <Text3D
          bevelEnabled
          bevelOffset={0}
          bevelSegments={5}
          bevelSize={0.02}
          bevelThickness={0.02}
          curveSegments={12}
          font="./fonts/helvetiker_regular.typeface.json"
          height={0.2}
          material={material}
          size={0.75}
        >
          DONUTS!!!
        </Text3D>
      </Center>

      {[...Array(100)].map((_, index) => (
        <mesh
          geometry={torusGeometry}
          key={index}
          material={material}
          position={[
            (Math.random() - 0.5) * 15, // x
            (Math.random() - 0.5) * 15, // y
            (Math.random() - 0.5) * 15, // z
          ]}
          ref={(donut) => {
            donuts.current[index] = donut;
          }}
          rotation={[
            Math.random() * Math.PI, // x
            Math.random() * Math.PI, // y
            0, // z
          ]}
          scale={Math.max(0.2, Math.random() * 0.5)}
        />
      ))}
    </>
  );
}
