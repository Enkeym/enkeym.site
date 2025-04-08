"use client"

import { useMemo } from "react"
import { ComputerModel } from "./computer/ComputerModel"
import { ConsoleModel } from "./console/ConsoleModel"
import ModelCanvas from "./ModelCanvas"
import { MugModel } from "./mug/MugModel"

type Props = { id: number }

const ModelCanvasSwitcher = ({ id }: Props) => {
  const model = useMemo(() => {
    if (id === 1) return <ComputerModel scale={4} position={[0, -0.5, -0.1]} />
    if (id === 2) return <ConsoleModel scale={3} position={[0, -0.6, -0.1]} />
    if (id === 3) return <MugModel scale={0.1} position={[0, -0.3, -0.1]} />
  }, [id])

  return (
    <ModelCanvas cameraPosition={[-1, 0, 1.8]} cameraZoom={0.8}>
      {model}
    </ModelCanvas>
  )
}

export default ModelCanvasSwitcher
