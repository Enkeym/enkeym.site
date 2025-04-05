import { useGLTF } from "@react-three/drei"
import { ComponentProps } from "react"
import { BufferGeometry, Material, Mesh } from "three"

type GLTFResult = {
  nodes: {
    Object_4: Mesh & { geometry: BufferGeometry }
    Object_6: Mesh & { geometry: BufferGeometry }
    Object_8: Mesh & { geometry: BufferGeometry }
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
      <group position={[0.121, 0.007, 0]}>
        <mesh
          geometry={nodes.Object_6.geometry}
          material={materials.MacBookPro}
        />
        <mesh
          geometry={nodes.Object_8.geometry}
          material={materials.MacBookPro}
        />
      </group>
      <mesh
        geometry={nodes.Object_4.geometry}
        material={materials.MacBookPro}
      />
    </group>
  )
}

useGLTF.preload("/computerModel.glb")
