import { useRef } from 'react';
import * as THREE from 'three';
import { shaderMaterial, useGLTF, useTexture, Center, OrbitControls, Sky, Sparkles } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';

import portalVertexShader from './shaders/portal/vertex.glsl';
import portalFragmentShader from './shaders/portal/fragment.glsl';

const PortalMaterial = shaderMaterial(
  {
    uColorEnd: new THREE.Color('#000000'),
    uColorStart: new THREE.Color('#ffffff'),
    uTime: 0,
  },
  portalVertexShader,
  portalFragmentShader
);

extend({ PortalMaterial: PortalMaterial });

export default function Experience() {
  const { nodes } = useGLTF('./model/portal.glb');

  const texture = useTexture('./model/baked.jpg');
  // texture.flipY = false;

  const portalMaterial = useRef();

  useFrame((_, delta) => {
    portalMaterial.current.uTime += delta * 2;
  });

  return (
    <>
      <OrbitControls makeDefault />

      <color args={['#030202']} attach="background" />

      <Sky
        azimuth={0.15}
        inclination={0.48}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
        position={[0, -18, 0]}
        rayleigh={6}
        turbidity={8}
      />

      <Center>
        {/* Scene */}
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={texture} map-flipY={false} />
        </mesh>

        {/* Lights */}
        {['poleLightA', 'poleLightB'].map((node) => (
          <mesh geometry={nodes[node].geometry} key={node} position={nodes[node].position}>
            <meshBasicMaterial color="#ffffe5" />
          </mesh>
        ))}

        {/* Portal */}
        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          <portalMaterial ref={portalMaterial} />
        </mesh>

        {/* Fireflies */}
        <Sparkles count={40} position-y={1} scale={[4, 2, 4]} size={3} speed={0.2} />
      </Center>
    </>
  );
}
