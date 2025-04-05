import { useGLTF } from "@react-three/drei"
import { ComponentProps } from "react"
import { BufferGeometry, Mesh } from "three"

type GLTFResult = {
  nodes: {
    geometry_0: Mesh & { geometry: BufferGeometry }
  }
}

type WebInterfaceModelProps = ComponentProps<"group">

export const WebInterfaceModel = (props: WebInterfaceModelProps) => {
  const { nodes } = useGLTF(
    "/models/web_interface_panel.glb"
  ) as unknown as GLTFResult

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.geometry_0.geometry} />
    </group>
  )
}

useGLTF.preload("/models/web_interface_panel.glb")
