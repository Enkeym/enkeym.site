"use client"

import type { Vector3 } from "@react-three/fiber"
import dynamic from "next/dynamic"
import ModelCanvas from "./ModelCanvas"

type ModelProps = {
  scale?: number
  position?: Vector3
}

const ComputerModel = dynamic<ModelProps>(
  () => import("./computer/ComputerModel"),
  {
    ssr: false,
    loading: () => null
  }
)

const ConsoleModel = dynamic<ModelProps>(
  () => import("./console/ConsoleModel"),
  {
    ssr: false,
    loading: () => null
  }
)

const MugModel = dynamic<ModelProps>(() => import("./mug/MugModel"), {
  ssr: false,
  loading: () => null
})

// Пропсы свитчера
type Props = {
  id: number
}

const ModelCanvasSwitcher = ({ id }: Props) => {
  const renderModel = () => {
    switch (id) {
      case 1:
        return <ComputerModel scale={4} position={[0, -0.5, -0.1]} />
      case 2:
        return <ConsoleModel scale={3} position={[0, -0.6, -0.1]} />
      case 3:
        return <MugModel scale={0.1} position={[0, -0.3, -0.1]} />
      default:
        return null
    }
  }

  return (
    <ModelCanvas cameraPosition={[-1, 0, 1.8]} cameraZoom={0.8}>
      {renderModel()}
    </ModelCanvas>
  )
}

export default ModelCanvasSwitcher
