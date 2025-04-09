"use client"

import { ComputerModel } from "./computer/ComputerModel"
import { ConsoleModel } from "./console/ConsoleModel"
import ModelCanvas from "./ModelCanvas"
import { MugModel } from "./mug/MugModel"

type Props = { id: number }

const ModelCanvasSwitcher = ({ id }: Props) => {
  return (
    <ModelCanvas cameraPosition={[-1, 0, 1.8]} cameraZoom={0.8}>
      <ComputerModel visible={id === 1} scale={4} position={[0, -0.5, -0.1]} />
      <ConsoleModel visible={id === 2} scale={3} position={[0, -0.6, -0.1]} />
      <MugModel visible={id === 3} scale={0.1} position={[0, -0.3, -0.1]} />
    </ModelCanvas>
  )
}

export default ModelCanvasSwitcher
