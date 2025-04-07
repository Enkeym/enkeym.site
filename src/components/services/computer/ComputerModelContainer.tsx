import dynamic from "next/dynamic"
import { ComputerModel } from "./ComputerModel"

const ModelCanvas = dynamic(() => import("../ModelCanvas"), { ssr: false })

const ComputerModelContainer = () => {
  return (
    <ModelCanvas cameraPosition={[-1, 0, 1.8]} cameraZoom={0.8}>
      <ComputerModel scale={4} position={[0, -0.5, -0.1]} />
    </ModelCanvas>
  )
}

export default ComputerModelContainer
