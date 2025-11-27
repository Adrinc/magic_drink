
import { BlendFunction, Resolution } from 'postprocessing'
import * as THREE from 'three'

 export const enviromentConfig = {
    encoding:THREE.SRGBColorSpace,
    files: [
        './enviroments/px.png',
        './enviroments/nx.png',
        './enviroments/py.png',
        './enviroments/ny.png',
        './enviroments/pz.png',
        './enviroments/nz.png'
    ]
    };

    export const pointLightConfig = {
      name: 'directional_light',
      castShadow: true,
      intensity: 10,
      position: [1.9, 3, 1],
      penumbra: 0.5,
      color: '#fff',
    };

export const vignetteConfig = {
    offset: 0.1,
    darkness: 1,
    blendFunction: BlendFunction.NORMAL,
  };
  
  export const chromaticAberrationConfig = {
    offset: [0.0007, 0.0007],
    blendFunction: BlendFunction.NORMAL,
  };
  
  export const bloomConfig = {
    mipmapBlur: false,
    intensity: 1,
    luminanceThreshold: 0,
    luminanceSmoothing: 1,
    resolutionX: Resolution.AUTO_SIZE,
    resolutionY: Resolution.AUTO_SIZE,
    kernelSize: 1,
    blendFunction: BlendFunction.MULTIPLY,

  };
  
  export const noiseConfig = {
    opacity: 0.6,
    blendingFunction: BlendFunction.NORMAL,
    premultiply: true,
  };
  
  export const toneMappingConfig = {
    blendFunction: BlendFunction.NORMAL,
    mode: 1
    };

