import { useGLTF } from "@react-three/drei"
import type { ComponentProps } from "react"
import type { BufferGeometry, Material, Mesh } from "three"

type GLTFResult = {
  nodes: {
    Cube_Material_0: Mesh<BufferGeometry, Material>
  }
  materials: {
    Material: Material
  }
}

type ConsoleModelProps = ComponentProps<"group">

const ConsoleModel = (props: ConsoleModelProps) => {
  const { nodes, materials } = useGLTF(
    "/consoleModel.glb"
  ) as unknown as GLTFResult

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
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

export default ConsoleModel

useGLTF.preload("/consoleModel.glb")
