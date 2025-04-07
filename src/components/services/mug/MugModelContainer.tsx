import ModelCanvas from "../ModelCanvas"
import { MugModel } from "./MugModel"

const MugModelContainer = () => {
  return (
    <ModelCanvas cameraPosition={[0, -1, 2]} cameraZoom={0.9}>
      <MugModel scale={0.1} position={[-0.4, -0.3, 0]} />
    </ModelCanvas>
  )
}

export default MugModelContainer
