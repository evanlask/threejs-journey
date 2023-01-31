import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { BallCollider, CuboidCollider, Debug, Physics, RigidBody } from '@react-three/rapier';
import { Perf } from 'r3f-perf';
import { useRef, useState } from 'react';
import * as THREE from 'three';

export default function Experience() {
  const cube = useRef();
  const twister = useRef();

  const hitSound = useRef(new Audio('./hit.mp3'));

  const collisionEnter = (e) => {
    hitSound.current.currentTime = 0;
    hitSound.current.volume = Math.random();
    hitSound.current.play();
  };

  const cubeJump = (e) => {
    console.log(e, cube.current);

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

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Physics gravity={[0, -9.81, 0]}>
        <Debug />

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
          <mesh cashShadow scale={[0.4, 0.4, 3]}>
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
      </Physics>
    </>
  );
}
