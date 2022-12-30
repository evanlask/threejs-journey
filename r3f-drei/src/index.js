import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

import Experience from './Experience';

import './style.css';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
  <Canvas
    camera={{
      far: 200,
      fov: 45,
      near: 0.1,
      position: [-3, 2, 6],
    }}
    dpr={[1, 2]}
    gl={{
      antialias: true,
      outputEncoding: THREE.sRGBEncoding,
      toneMapping: THREE.ACESFilmicToneMapping,
    }}
  >
    <Experience />
  </Canvas>
);
