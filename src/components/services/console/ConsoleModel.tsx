import { useGLTF } from "@react-three/drei"
import { ComponentProps } from "react"
import { BufferGeometry, Material, Mesh } from "three"

type GLTFResult = {
  nodes: {
    Cube_Material_0: Mesh & { geometry: BufferGeometry }
  }
  materials: {
    Material: Material
  }
}

type ConsoleModelProps = ComponentProps<"group">

export const ConsoleModel = (props: ConsoleModelProps) => {
  const { nodes, materials } = useGLTF(
    "/consoleModel.glb"
  ) as unknown as GLTFResult

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={1.112}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh
            geometry={nodes.Cube_Material_0.geometry}
            material={materials.Material}
            position={[0, 21.93, 0]}
            scale={100}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("/consoleModel.glb")
