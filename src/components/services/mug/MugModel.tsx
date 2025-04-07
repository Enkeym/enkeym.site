import { useGLTF } from "@react-three/drei"
import { ComponentProps } from "react"
import type { BufferGeometry } from "three/src/core/BufferGeometry"
import type { Material } from "three/src/materials/Material"
import type { Mesh } from "three/src/objects/Mesh"

type MugModelProps = ComponentProps<"group">

type GLTFResult = {
  nodes: {
    Coffee_Coup_0: Mesh & { geometry: BufferGeometry }
    Lid_0: Mesh & { geometry: BufferGeometry }
  }
  materials: {
    Texture: Material
    material: Material
  }
}

export const MugModel = (props: MugModelProps) => {
  const { nodes, materials } = useGLTF("/mugModel.glb") as unknown as GLTFResult

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Coffee_Coup_0.geometry}
          material={materials.Texture}
          position={[0.4, -0.148, 0.221]}
          rotation={[0, 0, -0.852]}
        />
        <mesh
          geometry={nodes.Lid_0.geometry}
          material={materials.material}
          position={[0.4, -0.148, 6.722]}
          rotation={[0, 0, -0.389]}
          scale={[3.404, 3.404, 0.186]}
        />
      </group>
    </group>
  )
}

useGLTF.preload("/mugModel.glb")
