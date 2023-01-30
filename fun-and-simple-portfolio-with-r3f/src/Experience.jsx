import { useGLTF, ContactShadows, Environment, Float, Html, PresentationControls, Text } from '@react-three/drei';

export default function Experience() {
  const macbook = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf'
  );

  return (
    <>
      <color args={['#241a1a']} attach="background" />

      <Environment preset="city" />

      <PresentationControls
        azimuth={[-1.0, 0.75]}
        config={{
          mass: 4.0,
          tension: 400,
        }}
        global
        polar={[-0.4, 0.2]}
        rotation={[0.13, 0.1, 0]}
        snap
      >
        <Float rotationIntensity={0.4}>
          <primitive object={macbook.scene} position-y={-1.2}>
            <Html
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
              transform
              wrapperClass="html-screen"
            >
              <iframe src="https://www.zombo.com" />
            </Html>
            <rectAreaLight
              color="#6bc993"
              height={1.56}
              intensity={65}
              position={[0, 0.55, -1.15]}
              rotation={[-0.1, Math.PI, 0]}
              width={2.5}
            />
          </primitive>
          <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={1}
            lineHeight={0.9}
            maxWidth={2}
            position={[2.0, 0.45, 0.15]}
            textAlign="center"
            rotation-y={-1.25}
          >
            ZOMBO COM
          </Text>
        </Float>
      </PresentationControls>

      <ContactShadows blur={2.4} opacity={0.4} position-y={-1.4} scale={5} />
    </>
  );
}
