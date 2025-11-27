import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Moden(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('models/neowifi.glb')
  const { actions } = useAnimations(animations, group);
  

   useEffect(() => {


     actions['luzVerdeAction'].play();
 
  }, []);


  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Cuerpo" position={[-0.183, 0.53, 0.007]} scale={[0.842, 0.752, 0.501]}>
          <mesh
            name="Plano002"
            castShadow
            receiveShadow
            geometry={nodes.Plano002.geometry}
            material={materials.white}
          />
          <mesh
            name="Plano002_1"
            castShadow
            receiveShadow
            geometry={nodes.Plano002_1.geometry}
            material={materials.yellow}
          />
          <mesh
            name="Plano002_2"
            castShadow
            receiveShadow
            geometry={nodes.Plano002_2.geometry}
            material={materials.Upurple}
          />
          <mesh
            name="Plano002_3"
            castShadow
            receiveShadow
            geometry={nodes.Plano002_3.geometry}
            material={materials.black}
          />
          <mesh
            name="Plano002_4"
            castShadow
            receiveShadow
            geometry={nodes.Plano002_4.geometry}
            material={materials.Bronce}
          />
          <mesh
            name="Plano002_5"
            castShadow
            receiveShadow
            geometry={nodes.Plano002_5.geometry}
            material={materials['Material.001']}
          />
          <mesh
            name="Plano002_6"
            castShadow
            receiveShadow
            geometry={nodes.Plano002_6.geometry}
            material={materials.brillo}
          />
          <mesh
            name="Plano002_7"
            castShadow
            receiveShadow
            geometry={nodes.Plano002_7.geometry}
            material={materials.blackCristal}
          />
          <mesh
            name="Plano002_8"
            castShadow
            receiveShadow
            geometry={nodes.Plano002_8.geometry}
            material={materials.BotonON}
          />
          <mesh
            name="Plano002_9"
            castShadow
            receiveShadow
            geometry={nodes.Plano002_9.geometry}
            material={materials.Plata}
          />
          <mesh
            name="Plano002_10"
            castShadow
            receiveShadow
            geometry={nodes.Plano002_10.geometry}
            material={materials.gray}
          />
          <mesh
            name="Plano002_11"
            castShadow
            receiveShadow
            geometry={nodes.Plano002_11.geometry}
            material={materials['Material.004']}
          />
        </group>
        <mesh
          name="Ulogo"
          castShadow
          receiveShadow
          geometry={nodes.Ulogo.geometry}
          material={materials.ucolor}
          position={[0.146, 0.394, 0.033]}
          rotation={[Math.PI / 2, -0.001, -Math.PI / 2]}
          scale={[3.533, 1.82, 3.533]}
        />
        <mesh
          name="cristalSeñal"
          castShadow
          receiveShadow
          geometry={nodes.cristalSeñal.geometry}
          material={materials['blackCristal.001']}
          position={[0.144, 0.574, 0.04]}
          scale={0.633}
        />
        <mesh
          name="luzVerde"
          castShadow
          receiveShadow
          geometry={nodes.luzVerde.geometry}
          material={materials['brillo.001']}
          position={[0.147, 0.329, 0.031]}
          scale={0.633}
        />
      </group>
    </group>
  )
}


useGLTF.preload('models/neowifi.glb');