import dynamic from "next/dynamic"
import { MugModel } from "./MugModel"

const ModelCanvas = dynamic(() => import("../ModelCanvas"), { ssr: false })

const MugModelContainer = () => {
  return (
    <ModelCanvas cameraPosition={[0, -1, 2]} cameraZoom={0.9}>
      <MugModel scale={0.1} position={[-0.4, -0.3, 0]} />
    </ModelCanvas>
  )
}

export default MugModelContainer
