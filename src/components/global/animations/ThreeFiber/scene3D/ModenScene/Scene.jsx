import {Sparkles,  BakeShadows, Environment, PerspectiveCamera, PresentationControls} from '@react-three/drei'
import { Suspense } from 'react'
import { useControls } from 'leva';

import { ToneMapping , ChromaticAberration, Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { enviromentConfig, pointLightConfig } from '../scene_config.js';
import { vignetteConfig, chromaticAberrationConfig, bloomConfig, toneMappingConfig,noiseConfig  } from '../scene_config.js';
import Rainbow from './rainbow.jsx';

import { useThree, useFrame } from '@react-three/fiber';
export default function Scene()
{
    let initCamera={far:2000, near: 0.1, fov: 35, position:[0, 0,20], rotation:[0, 0, 0]}

    const { viewport } = useThree();
  
    let x = 0;
    let y = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;


    const minPolarAngle = Math.PI / 4; 
const maxPolarAngle = Math.PI / 2; 
const minAzimuthAngle = -Math.PI / 4;
const maxAzimuthAngle = Math.PI / 4; 

        useFrame(({ pointer, camera, scene }) => {
           x = (pointer.x / viewport.width) * 3 - 1;
           y = -(pointer.y / viewport.height) * 2 + 1;

           const polarAngle = (maxPolarAngle - minPolarAngle) * pointer.y + minPolarAngle;
           const azimuthAngle = (maxAzimuthAngle - minAzimuthAngle) * pointer.x + minAzimuthAngle;
         
           const radius = 6.5;
           const offsetX = radius * Math.sin(polarAngle) * Math.cos(azimuthAngle);
           const offsetY = radius * Math.cos(polarAngle);
           const lerpFactor = 1;
           camera.position.x += (offsetX * 0.2 - camera.position.x) * lerpFactor;
           camera.position.y += (offsetY * 0.2 - camera.position.y) * lerpFactor;
         
           camera.lookAt(scene.position);
           lastMouseX = pointer.x;
           lastMouseY = pointer.y;
        })
  
    return <> 

    <Suspense fallback={null}>
        <EffectComposer multisampling={1}>
            <ToneMapping {...toneMappingConfig}/>
            <Bloom {...bloomConfig} />
            
            <ChromaticAberration {...chromaticAberrationConfig} />
            <Noise {...noiseConfig} />
            <Vignette {...vignetteConfig} />
          
     
      
         
        </EffectComposer>
    </Suspense>
 
    <PerspectiveCamera  makeDefault {...initCamera} />
   {/*  <Environment {...enviromentConfig}/> */}
{/*     <pointLight {...pointLightConfig} shadow-bias={-0.0003} shadow-mapSize={ [ 512*6,512*6] } shadow-normalBias={0.01}/> */}
   {/*  <ambientLight intensity={0.1} color={"#5d5d5d"} /> */}
   <ambientLight intensity={1} color={"#5d5d5d"} /> 
    <Suspense>

{/*     <PresentationControls
  
    config={{ mass: 2, tension: 500 }}
    snap={{ mass: 4, tension: 1500 }}
    rotation={[0,0,0]}
    polar={[-Math.PI / 10, Math.PI / 10]}
    azimuth={[-Math.PI / 1, Math.PI / 1]}

> */}
<Rainbow  position={[0,-1,-10]} rotation={[0,0,0]}  />
{/* </PresentationControls> */}



    

 
        
     
  
    </Suspense>

    </>
}