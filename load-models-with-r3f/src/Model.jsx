import { useGLTF, Clone } from '@react-three/drei';

const Model = () => {
  const model = useGLTF('./hamburger.glb');

  return (
    <>
      <Clone object={model.scene} position-x={-4} scale={0.35} />
      <Clone object={model.scene} position-x={0} scale={0.35} />
      <Clone object={model.scene} position-x={4} scale={0.35} />
    </>
  );
};

useGLTF.preload('./hamburger.glb');

export default Model;
