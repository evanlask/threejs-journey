import { useGLTF } from '@react-three/drei';

const Model = () => {
  const model = useGLTF('./hamburger.glb');

  return <primitive object={model.scene} scale={0.35} />;
};

export default Model;
