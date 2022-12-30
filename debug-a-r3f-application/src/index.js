import { Leva } from 'leva';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';

import Experience from './Experience';

import './style.css';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
  <StrictMode>
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Experience />
    </Canvas>
    <Leva collapsed />
  </StrictMode>
);