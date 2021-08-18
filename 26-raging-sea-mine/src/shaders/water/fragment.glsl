uniform vec3 uColorDepth;
uniform vec3 uColorSurface;
uniform float uColorOffset;
uniform float uColorMultiplier;

uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;

varying float vElevation;

void main() {
  // Wave Color
  float mixStrength = (vElevation + uColorOffset) * uColorMultiplier ;
  vec3 color = mix(uColorDepth, uColorSurface, mixStrength);
  gl_FragColor = vec4(color, 1.0);

  // Apply Fog
  #ifdef USE_FOG
    #ifdef USE_LOGDEPTHBUF_EXT
      float depth = gl_FragDepthEXT / gl_FragCoord.w;
    #else
      float depth = gl_FragCoord.z / gl_FragCoord.w;
    #endif
    float fogFactor = smoothstep(fogNear, fogFar, depth);
    gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fogFactor);
  #endif
}