import { button, useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { OrbitControls } from '@react-three/drei';

const Experience = () => {
  const { perfVisible } = useControls({
    perfVisible: false,
  });

  const { color, position, visible } = useControls('Sphere', {
    choice: {
      options: ['a', 'b', 'c'],
      value: 'b',
    },
    clickMe: button(() => {
      console.log('clicked');
    }),
    color: 'orange',
    position: {
      joystick: 'invertY',
      step: 0.01,
      value: {
        x: -2,
        y: 0,
      },
    },
    visible: true,
  });

  const { scale } = useControls('Cube', {
    scale: {
      max: 5,
      min: 0,
      step: 0.01,
      value: 1.5,
    },
  });

  return (
    <>
      {perfVisible && <Perf position="top-left" />}

      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh position={[position.x, position.y, 0]} visible={visible}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position-x={2} scale={scale}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
};

export default Experience;
