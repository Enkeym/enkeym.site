import ModelCanvas from "../ModelCanvas"
import { ConsoleModel } from "./ConsoleModel"

const ConsoleModelContainer = () => {
  return (
    <ModelCanvas cameraPosition={[-1, 0, 1.8]} cameraZoom={0.8}>
      <ConsoleModel scale={2.1} position={[-0.4, -0.6, 0]} />
    </ModelCanvas>
  )
}

export default ConsoleModelContainer
