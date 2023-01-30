import { BlendFunction, Effect } from 'postprocessing';
import { Uniform } from 'three';

const fragmentShader = /* glsl */ `
  uniform float amplitude;
  uniform float frequency;
  uniform float offset;

  void mainUv(inout vec2 uv) {
    uv.y += sin(uv.x * frequency + offset) * amplitude;
  }

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    outputColor = vec4(0.8, 1.0, 0.5, inputColor.a);
  }
`;

export class DrunkEffect extends Effect {
  constructor({ amplitude = 0.1, blendFunction = BlendFunction.DARKEN, frequency = 10.0 }) {
    super('DrunkEffect', fragmentShader, {
      blendFunction,
      uniforms: new Map([
        ['amplitude', new Uniform(amplitude)], //
        ['frequency', new Uniform(frequency)],
        ['offset', new Uniform(0)],
      ]),
    });
  }

  update(renderer, inputBuffer, deltaTime) {
    this.uniforms.get('offset').value += deltaTime;
  }
}
