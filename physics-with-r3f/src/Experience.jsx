import { useGLTF, OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import {
  BallCollider,
  CuboidCollider,
  CylinderCollider,
  Debug,
  InstancedRigidBodies,
  Physics,
  RigidBody,
} from '@react-three/rapier';
import { Perf } from 'r3f-perf';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { MeshStandardMaterial } from 'three';

export default function Experience() {
  const cube = useRef();
  const twister = useRef();

  const hitSound = useRef(new Audio('./hit.mp3'));

  const hamburger = useGLTF('./hamburger.glb');

  const collisionEnter = (e) => {
    // hitSound.current.currentTime = 0;
    // hitSound.current.volume = Math.random();
    // hitSound.current.play();
  };

  const cubeJump = (e) => {
    const mass = cube.current.mass();

    cube.current.applyImpulse({
      x: 0,
      y: 5 * mass,
      z: 0,
    });

    cube.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const eulerRotation = new THREE.Euler(0, time * 3, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);

    const angle = time * 0.5;
    const x = Math.cos(angle) * 2;
    const y = Math.sin(angle) * 2;

    twister.current.setNextKinematicRotation(quaternionRotation);
    twister.current.setNextKinematicTranslation({
      x: x,
      y: -0.8,
      z: y,
    });
  });

  const cubes = useRef();
  const cubeCount = 600;

  // useEffect(() => {
  //   for (let i = 0; i < cubeCount; i++) {
  //     const matrix = new THREE.Matrix4();
  //     matrix.compose(
  //       new THREE.Vector3(i * 2, 0, 0), //
  //       new THREE.Quaternion(),
  //       new THREE.Vector3(1, 1, 1)
  //     );
  //     cubes.current.setMatrixAt(i, matrix);
  //   }
  // }, []);

  const cubeTransforms = useMemo(() => {
    const positions = [];
    const rotations = [];
    const scales = [];

    for (let i = 0; i < cubeCount; i++) {
      positions.push([
        (Math.random() - 0.5) * 6, //
        6 + i * 0.5,
        (Math.random() - 0.5) * 6,
      ]);

      rotations.push([
        Math.random(), //
        Math.random(),
        Math.random(),
      ]);

      const scale = 0.2 + Math.random() * 0.8;
      scales.push([scale, scale, scale]);
    }

    return { positions, rotations, scales };
  }, []);

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Physics gravity={[0, -9.81, 0]}>
        {/*<Debug />*/}

        <RigidBody colliders="ball">
          <mesh castShadow position={[-1.5, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody
          colliders={false}
          friction={0.7}
          gravityScale={1}
          onCollisionEnter={collisionEnter}
          onCollisionExit={() => {
            /*console.log('exit');*/
          }}
          onSleep={() => {
            console.log('sleep');
          }}
          onWake={() => {
            console.log('wake');
          }}
          position={[1.5, 2, 0]}
          ref={cube}
          restitution={0}
        >
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          <CuboidCollider args={[0.5, 0.5, 0.5]} mass={5} />
        </RigidBody>

        <RigidBody friction={0} position={[0, -0.8, 0]} ref={twister} type="kinematicPosition">
          <mesh cashShadow scale={[0.4, 0.4, 4]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        {/*<
        RigidBody colliders={false} position={[0, 1, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
          <BallCollider args={[1.5]} />
          <mesh castShadow>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>
        */}

        <RigidBody friction={0.7} type="fixed">
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
        </RigidBody>

        <RigidBody colliders={false} position={[0, 5, 0]}>
          <primitive object={hamburger.scene} scale={0.25} />
          <CylinderCollider args={[0.5, 1.25]} />
        </RigidBody>

        <InstancedRigidBodies
          positions={cubeTransforms.positions}
          rotations={cubeTransforms.rotations}
          scales={cubeTransforms.scales}
        >
          <instancedMesh args={[null, null, cubeCount]} castShadow ref={cubes}>
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
}
