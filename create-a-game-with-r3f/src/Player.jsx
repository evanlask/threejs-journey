import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRapier, RigidBody } from '@react-three/rapier';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { useGame } from './stores/useGame';

export const Player = () => {
  const body = useRef();

  const smoothedCamera = useRef({
    target: new THREE.Vector3(),
    position: new THREE.Vector3(10, 10, 10),
  });

  const blockCount = useGame((state) => state.blockCount);
  const end = useGame((state) => state.end);
  const restart = useGame((state) => state.restart);
  const start = useGame((state) => state.start);

  const { rapier, world } = useRapier();
  const [subscribeKeys, getKeys] = useKeyboardControls();

  const jump = () => {
    const origin = body.current.translation();
    origin.y -= 0.31; // TODO: ball radius no magic numbers
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = world.raw().castRay(ray, 10, true);

    if (hit && hit.toi < 0.15) {
      body.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }
  };

  const reset = () => {
    body.current.setTranslation({ x: 0, y: 1, z: 0 });
    body.current.setLinvel({ x: 0, y: 0, z: 0 });
    body.current.setAngvel({ x: 0, y: 0, z: 0 });
  };

  useEffect(() => {
    const unsubscribeAny = subscribeKeys(() => {
      start();
    });

    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value === true) {
          jump();
        }
      }
    );

    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (phase) => {
        if (phase === 'ready') {
          reset();
        }
      }
    );

    return () => {
      unsubscribeAny();
      unsubscribeJump();
      unsubscribeReset();
    };
  }, []);

  useFrame((state, delta) => {
    // Controls
    const { forward, rightward, backward, leftward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    body.current.applyImpulse(impulse);
    body.current.applyTorqueImpulse(torque);

    // Follow camera
    const bodyPosition = body.current.translation();

    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    const { position, target } = smoothedCamera.current;

    position.lerp(cameraPosition, 10 * delta);
    target.lerp(cameraTarget, 10 * delta);

    state.camera.position.copy(position);
    state.camera.lookAt(target);

    // Phases
    if (bodyPosition.z < -(blockCount * 4 + 2)) {
      end();
    }

    if (bodyPosition.y < -5) {
      restart();
    }
  });

  return (
    <RigidBody
      angularDamping={0.5}
      colliders="ball"
      friction={1}
      linearDamping={0.5}
      position={[0, 1, 0]}
      ref={body}
      restitution={0.2}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial color="mediumpurple" flatShading />
      </mesh>
    </RigidBody>
  );
};
