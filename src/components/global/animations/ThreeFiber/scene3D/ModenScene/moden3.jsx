import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Moden(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('models/moden3.glb')
  const { actions } = useAnimations(animations, group);
  

/*    useEffect(() => {


     actions['luzVerdeAction'].play();
 
  }, []);

 */
  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="body" position={[0, 0.536, 0]} scale={[0.344, 0.57, 0.344]}>
          <mesh
            name="Cilindro001"
            castShadow
            receiveShadow
            geometry={nodes.Cilindro001.geometry}
            material={materials.moden_main}
          />
          <mesh
            name="Cilindro001_1"
            castShadow
            receiveShadow
            geometry={nodes.Cilindro001_1.geometry}
            material={materials.moden_black}
          />
          <mesh
            name="Cilindro001_2"
            castShadow
            receiveShadow
            geometry={nodes.Cilindro001_2.geometry}
            material={materials.usb}
          />
          <mesh
            name="Cilindro001_3"
            castShadow
            receiveShadow
            geometry={nodes.Cilindro001_3.geometry}
            material={materials.cable}
          />
          <mesh
            name="Cilindro001_4"
            castShadow
            receiveShadow
            geometry={nodes.Cilindro001_4.geometry}
            material={materials.patas}
          />
          <mesh
            name="Cilindro001_5"
            castShadow
            receiveShadow
            geometry={nodes.Cilindro001_5.geometry}
            material={materials.metal}
          />
          <mesh
            name="Cilindro001_6"
            castShadow
            receiveShadow
            geometry={nodes.Cilindro001_6.geometry}
            material={materials['metal.001']}
          />
          <mesh
            name="Cilindro001_7"
            castShadow
            receiveShadow
            geometry={nodes.Cilindro001_7.geometry}
            material={materials['moden_main.001']}
          />
          <mesh
            name="Cilindro001_8"
            castShadow
            receiveShadow
            geometry={nodes.Cilindro001_8.geometry}
            material={materials.resalto_boton}
          />
          <mesh
            name="Cilindro001_9"
            castShadow
            receiveShadow
            geometry={nodes.Cilindro001_9.geometry}
            material={materials.texto}
          />
          <mesh
            name="Cilindro001_10"
            castShadow
            receiveShadow
            geometry={nodes.Cilindro001_10.geometry}
            material={materials['texto.001']}
          />
          <mesh
            name="Cilindro001_11"
            castShadow
            receiveShadow
            geometry={nodes.Cilindro001_11.geometry}
            material={materials['texto.002']}
          />
          <mesh
            name="Cilindro001_12"
            castShadow
            receiveShadow
            geometry={nodes.Cilindro001_12.geometry}
            material={materials['texto.003']}
          />
          <mesh
            name="Cilindro001_13"
            castShadow
            receiveShadow
            geometry={nodes.Cilindro001_13.geometry}
            material={materials.green_led}
          />
          <mesh
            name="Cilindro001_14"
            castShadow
            receiveShadow
            geometry={nodes.Cilindro001_14.geometry}
            material={materials.blue_led}
          />
          <mesh
            name="Cilindro001_15"
            castShadow
            receiveShadow
            geometry={nodes.Cilindro001_15.geometry}
            material={materials.UwifiIsoTipo}
          />
        </group>
      </group>
    </group>
  )
}


useGLTF.preload('models/moden3.glb');