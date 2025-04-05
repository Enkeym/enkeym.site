"use client"

import { OrbitControls, PerspectiveCamera, Stage } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { WebInterfaceModel } from "./WebInterfaceModel"

const WebInterfaceModelContainer = () => {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Stage environment="city" intensity={0.6}>
          <WebInterfaceModel scale={1.2} />
        </Stage>
        <OrbitControls enableZoom={false} autoRotate />
        <PerspectiveCamera position={[0, 0, 2]} makeDefault />
      </Suspense>
    </Canvas>
  )
}

export default WebInterfaceModelContainer
