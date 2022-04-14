export default [
  {
    name: 'environmentMapTexture',
    type: 'TEXTURE_CUBE',
    path: [
      'assets/textures/environmentMap/px.jpg',
      'assets/textures/environmentMap/nx.jpg',
      'assets/textures/environmentMap/py.jpg',
      'assets/textures/environmentMap/ny.jpg',
      'assets/textures/environmentMap/pz.jpg',
      'assets/textures/environmentMap/nz.jpg',
    ],
  },
  {
    name: 'dirtColorTexture',
    type: 'TEXTURE',
    path: 'assets/textures/dirt/color.jpg',
  },
  {
    name: 'dirtNormalTexture',
    type: 'TEXTURE',
    path: 'assets/textures/dirt/normal.jpg',
  },
  {
    name: 'foxModel',
    type: 'GLTF',
    path: 'assets/models/Fox/glTF/Fox.gltf',
  },
  {
    name: 'fontJSON',
    type: 'FONT',
    path: 'assets/fonts/droid_sans_mono_regular.typeface.json',
  },
];
