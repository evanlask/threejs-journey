import { BlendFunction, GlitchMode } from 'postprocessing';
import { Perf } from 'r3f-perf';
import { OrbitControls } from '@react-three/drei';
import { Bloom, DepthOfField, EffectComposer, Glitch, Noise, Vignette } from '@react-three/postprocessing';

export default function Experience() {
  return (
    <>
      <color args={['#ffffff']} attach="background" />

      <EffectComposer multisampling={0}>
        {/*<Vignette blendFunction={BlendFunction.NORMAL} darkness={0.9} offset={0.3} />*/}
        {/*<Glitch delay={[0.5, 1]} duration={[0.1, 0.3]} mode={GlitchMode.CONSTANT_WILD} strength={[0.2, 0.4]} />*/}
        {/*<Noise blendFunction={BlendFunction.SOFT_LIGHT} premultiply />*/}
        {/*<Bloom intensity={1} luminanceThreshold={1} mipmapBlur />*/}
        <DepthOfField bokehScale={6} focalLength={0.025} focusDistance={0.025} />
      </EffectComposer>

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow intensity={1.5} position={[1, 2, 3]} />
      <ambientLight intensity={0.5} />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} receiveShadow rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
