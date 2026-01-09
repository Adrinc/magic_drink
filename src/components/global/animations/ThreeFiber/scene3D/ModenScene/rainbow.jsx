import { useRef, useEffect, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import gsap from 'gsap';

export default function Rainbow(props) {
  const group = useRef();
  const cubeRef = useRef();
  const sphereRef = useRef();
  const { nodes, materials, animations } = useGLTF('models/rainbow.glb')
  const { actions } = useAnimations(animations, group);
  
  // Material de vidrio opaco/congelado para el Cilindro
  const frostedGlassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      metalness: 0.15,
      roughness: 0.5,
      transmission: 1, // Transparencia
      thickness: 0.2, // Grosor del vidrio
      clearcoat: 2, // Capa brillante exterior
      clearcoatRoughness: 0.1,
      ior: 1.2, // Índice de refracción del vidrio
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
      // Efecto de vidrio congelado
      envMapIntensity: 0,
      reflectivity: 0.5,
    });
  }, []);

  // Material para el Cubo - MeshStandardMaterial con FrontSide
  const cubeMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color:  '#1a1a1a',
      metalness: 0,
      roughness: 1,
        transmission: 1, // Transparencia
      thickness: 0.2, // Grosor del vidrio
      clearcoat: 2, // Capa brillante exterior
      side: THREE.DoubleSide,
      opacity: 0.7,
      transparent: true,
    });
  }, []);
  
  // Animación parallax suave del Cubo con GSAP
  useEffect(() => {
    if (cubeRef.current) {
      // Animación de flotación sutil
      gsap.to(cubeRef.current.position, {
       /*  y: cubeRef.current.position.y + 1, */
        x: cubeRef.current.position.x + 2,
        duration: 5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Rotación suave continua
 /*      gsap.to(cubeRef.current.rotation, {
        x: cubeRef.current.rotation.x + Math.PI * 0.1,
        duration: 5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      }); */
    }
  }, []);

  // Rotación continua de la esfera sobre su propio eje
  useFrame((state, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.3; // Rotación en Y (horizontal)
      sphereRef.current.rotation.x += delta * 0.3 // Rotación leve en X (vertical)
    }
  });

  // Movimiento parallax basado en tiempo (sutil)
/*   useFrame((state) => {
    if (cubeRef.current) {
      // Oscilación horizontal muy sutil
      cubeRef.current.position.x = -5.95 + Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
  }); */

/*    useEffect(() => {


     actions['luzVerdeAction'].play();
 
  }, []);

 */
  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <mesh
          ref={sphereRef}
          name="Esfera"
       /*    castShadow
          receiveShadow */
          geometry={nodes.Esfera.geometry}
          material={materials.rainbow}
          position={[0, 0, -10]}
          scale={7}
        />
        <mesh
          ref={cubeRef}
          name="Cubo"
   /*        castShadow
          receiveShadow */
          geometry={nodes.Cubo.geometry}
          material={cubeMaterial}
          position={[-5.95, -1, -1.783]}
          scale={[5, 5, 1]}
          
        />
        <mesh
          name="Cilindro"
          castShadow
          receiveShadow
          geometry={nodes.Cilindro.geometry}
          material={frostedGlassMaterial}
          position={[-1.452, 0, 3.919]}
          rotation={[0, 0, Math.PI / 4]}
          scale={[0.775, 14.185, 1.252]}
        />
      </group>
    </group>
  )
}


useGLTF.preload('models/rainbow.glb');