import { useGLTF } from "@react-three/drei"
import { ComponentProps } from "react"
import type { BufferGeometry, Material, Mesh } from "three/src/objects/Mesh"

type GLTFResult = {
  nodes: {
    Object_4: Mesh & { geometry: BufferGeometry }
  }
  materials: {
    MacBookPro: Material
  }
}

type ComputerModelProps = ComponentProps<"group">

export const ComputerModel = (props: ComputerModelProps) => {
  const { nodes, materials } = useGLTF(
    "/computerModel.glb"
  ) as unknown as GLTFResult

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Object_4.geometry}
        material={materials.MacBookPro}
      />
    </group>
  )
}

useGLTF.preload("/computerModel.glb")
