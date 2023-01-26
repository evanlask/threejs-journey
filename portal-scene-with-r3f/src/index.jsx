import ReactDOM from 'react-dom/client';

import { Canvas } from '@react-three/fiber';

import Experience from './Experience.jsx';

import './style.css';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
  <Canvas
    camera={{
      far: 200,
      fov: 45,
      near: 0.1,
      position: [0, -0.2, 3.5],
    }}
    flat
  >
    <Experience />
  </Canvas>
);
