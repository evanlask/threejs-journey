import { useGLTF, Float, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

THREE.ColorManagement.legacyMode = false;

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' });
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' });
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategray' });

export const BlockAxe = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef();

  const timeOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const x = Math.sin(time + timeOffset) * 1.25;
    obstacle.current.setNextKinematicTranslation({
      x: position[0] + x,
      y: position[1] + 0.75,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      {/* Floor */}
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        receiveShadow
        scale={[4, 0.2, 4]}
      />

      {/* Obstacle */}
      <RigidBody friction={0} position={[0, 0.3, 0]} ref={obstacle} restitution={0.2} type="kinematicPosition">
        <mesh
          castShadow
          geometry={boxGeometry}
          material={obstacleMaterial}
          position={[0, 0, 0]}
          receiveShadow
          scale={[1.5, 1.4, 0.3]}
        />
      </RigidBody>
    </group>
  );
};

const BlockEnd = ({ position = [0, 0, 0] }) => {
  const hamburger = useGLTF('./hamburger.glb');

  hamburger.scene.children.forEach((mesh) => (mesh.castShadow = true));

  return (
    <group position={position}>
      {/* Title */}

      <Text font="./bebas-neue-v9-latin-regular.woff" position={[0, 2, 0]} scale={1}>
        FINISH
        <meshBasicMaterial toneMapped={false} />
      </Text>

      {/* Floor */}
      <mesh geometry={boxGeometry} material={floor1Material} position={[0, -0, 0]} receiveShadow scale={[4, 0.2, 4]} />

      {/* Hamburger */}
      <RigidBody colliders="hull" friction={0} position={[0, 0.25, 0]} restitution={0.2} type="fixed">
        <primitive object={hamburger.scene} scale={0.2} />
      </RigidBody>
    </group>
  );
};

export const BlockLimbo = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef();

  const timeOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const y = Math.sin(time + timeOffset) + 1.15;
    obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      {/* Floor */}
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        receiveShadow
        scale={[4, 0.2, 4]}
      />

      {/* Obstacle */}
      <RigidBody friction={0} position={[0, 0.3, 0]} ref={obstacle} restitution={0.2} type="kinematicPosition">
        <mesh
          castShadow
          geometry={boxGeometry}
          material={obstacleMaterial}
          position={[0, 0, 0]}
          receiveShadow
          scale={[3.5, 0.3, 0.3]}
        />
      </RigidBody>
    </group>
  );
};

const BlockStart = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      {/* Title */}
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          font="./bebas-neue-v9-latin-regular.woff"
          lineHeight={0.75}
          maxWidth={0.25}
          position={[0.75, 0.65, 0]}
          rotation-y={-0.25}
          scale={0.5}
          textAlign="right"
        >
          Marble Race
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>

      {/* Floor */}
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, -0.1, 0]}
        receiveShadow
        scale={[4, 0.2, 4]}
      />
    </group>
  );
};

export const BlockSpinner = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef();

  const speed = useMemo(() => {
    const speed = Math.max(Math.random(), 0.3);
    const direction = Math.random() < 0.5 ? -1 : 1;

    return speed * direction;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstacle.current.setNextKinematicRotation(rotation);
  });

  return (
    <group position={position}>
      {/* Floor */}
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        receiveShadow
        scale={[4, 0.2, 4]}
      />

      {/* Obstacle */}
      <RigidBody friction={0} position={[0, 0.3, 0]} ref={obstacle} restitution={0.2} type="kinematicPosition">
        <mesh
          castShadow
          geometry={boxGeometry}
          material={obstacleMaterial}
          position={[0, 0, 0]}
          receiveShadow
          scale={[3.5, 0.3, 0.3]}
        />
      </RigidBody>
    </group>
  );
};

const Bounds = ({ length = 1 }) => {
  return (
    <>
      <RigidBody friction={0} restitution={0.2} type="fixed">
        {/* Left */}
        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          position={[-2.15, 0.75, -(length * 2) + 2]}
          receiveShadow
          scale={[0.3, 1.5, 4 * length]}
        />

        {/* Right */}
        <mesh
          castShadow
          geometry={boxGeometry}
          material={wallMaterial}
          position={[2.15, 0.75, -(length * 2) + 2]}
          scale={[0.3, 1.5, 4 * length]}
        />

        {/* End */}
        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          position={[0, 0.75, -(length * 4) + 2]}
          receiveShadow
          scale={[4, 1.5, 0.3]}
        />

        {/* Floor */}
        <CuboidCollider
          args={[2, 0.1, 2 * length]}
          friction={1}
          position={[0, -0.1, -(length * 2) + 2]}
          restitution={0.2}
        />
      </RigidBody>
    </>
  );
};

export const Level = ({ count = 5, seed = 0, types = [BlockAxe, BlockSpinner, BlockLimbo] }) => {
  const blocks = useMemo(() => {
    const blocks = [];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }

    return blocks;
  }, [count, types, seed]);

  return (
    <>
      <BlockStart position={[0, 0, 0]} />

      {blocks.map((Block, index) => (
        <Block key={index} position={[0, 0, -(index + 1) * 4]} />
      ))}

      <BlockEnd position={[0, 0, -(blocks.length + 1) * 4]} />

      <Bounds length={blocks.length + 2} />
    </>
  );
};
