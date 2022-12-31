import { useControls } from 'leva';
import * as THREE from 'three';
import { Perf } from 'r3f-perf';
import { useRef } from 'react';
import {
  softShadows,
  useHelper,
  AccumulativeShadows,
  BakeShadows,
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
  RandomizedLight,
  Sky,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// softShadows({
//   frustum: 3.75,
//   size: 0.005,
//   near: 9.5,
//   samples: 17,
//   rings: 11,
// });

export default function Experience() {
  const { blur, color, opacity } = useControls('Contact Shadows', {
    blur: {
      value: 2.6,
      min: 0,
      max: 10,
      step: 0.01,
    },
    color: '#316d39',
    opacity: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  // const { sunPosition } = useControls('Sky', {
  //   sunPosition: {
  //     value: [1, 2, 3],
  //   },
  // });

  const { envMapIntensity, envMapPreset } = useControls('Environment Map', {
    envMapIntensity: {
      value: 1.7,
      min: 0,
      max: 12,
      step: 0.01,
    },
    envMapPreset: {
      options: [
        'none',
        'sunset',
        'dawn',
        'night',
        'warehouse',
        'forest',
        'apartment',
        'studio',
        'city',
        'park',
        'lobby',
      ],
      value: 'none',
    },
  });

  const cube = useRef();
  const directionalLight = useRef();

  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    cube.current.rotation.y += delta * 0.2;
    cube.current.position.x = 2 + Math.sin(time);
    cube.current.position.y = 1 + Math.sin(time);
  });

  return (
    <>
      <Perf position="top-left" />

      {/*<BakeShadows />*/}

      <OrbitControls makeDefault />

      <color args={['ivory']} attach="background" />

      {/*<AccumulativeShadows
        blend={100}
        color="#316d39"
        frames={Infinity}
        opacity={0.8}
        position={[0, -0.99, 0]}
        scale={10}
        temporal
      >
        <RandomizedLight ambient={0.5} amount={8} bias={0.0001} intensity={1} position={[1, 2, 3]} radius={1} />
      </AccumulativeShadows>*/}

      <ContactShadows
        blur={blur}
        color={color}
        far={5}
        frames={Infinity}
        opacity={opacity}
        position={[0, -0.99, 0]}
        resolution={1024}
        scale={10}
      />

      {/*<directionalLight
        intensity={1.5}
        position={[1, 2, 3]}
        ref={directionalLight}
        castShadow
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={2}
        shadow-camera-right={2}
        shadow-camera-bottom={-2}
        shadow-camera-left={-2}
        shadow-mapSize={[1024, 1024]}
      />*/}
      {/*<directionalLight
        intensity={1.5}
        position={sunPosition}
        ref={directionalLight}
        castShadow
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-mapSize={[1024, 1024]}
      />
      <ambientLight intensity={0.5} />*/}

      {/*<Sky sunPosition={sunPosition} />*/}

      <Environment background preset={envMapPreset === 'none' ? undefined : envMapPreset}>
        {envMapPreset === 'none' && (
          <>
            <color args={['black']} attach="background" />
            <Lightformer color="red" form="ring" intensity={10} position-z={[-5]} scale={5} />
            {/*<mesh position-z={[-5]} scale={10}>
              <planeGeometry />
              <meshBasicMaterial color={[100, 0, 0]} />
            </mesh>*/}
          </>
        )}
      </Environment>

      {/*<Environment background files={'./environmentMAPS/hilly_terrain_01_puresky_4k.hdr'} />*/}
      {/*<Environment
        background
        files={[
          './environmentMAPS/2/px.jpg',
          './environmentMAPS/2/nx.jpg',
          './environmentMAPS/2/py.jpg',
          './environmentMAPS/2/ny.jpg',
          './environmentMAPS/2/pz.jpg',
          './environmentMAPS/2/nz.jpg',
        ]}
      />*/}

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} roughness={0.1} />
      </mesh>

      <mesh castShadow position-x={2} ref={cube} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} roughness={0.5} />
      </mesh>

      {/*<mesh position-y={-1} receiveShadow rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>*/}
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" envMapIntensity={envMapIntensity} />
      </mesh>
    </>
  );
}
