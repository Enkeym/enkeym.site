import { useGLTF } from "@react-three/drei"
import { ComponentProps } from "react"
import type { BufferGeometry, Material, Mesh } from "three"

type GLTFResult = {
  nodes: {
    Object_4: Mesh<BufferGeometry, Material>
  }
  materials: {
    MacBookPro: Material
  }
}

type ComputerModelProps = ComponentProps<"group">

const ComputerModel = (props: ComputerModelProps) => {
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

export default ComputerModel

useGLTF.preload("/computerModel.glb")
