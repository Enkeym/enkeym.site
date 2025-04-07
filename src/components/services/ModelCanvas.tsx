"use client"

import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { ReactNode, Suspense } from "react"

type ModelCanvasProps = {
  children: ReactNode
  cameraPosition?: [number, number, number]
  cameraZoom?: number
  glScale?: [number, number]
}

const ModelCanvas = ({
  children,
  cameraPosition = [0, 0, 2],
  cameraZoom = 1,
  glScale = [1, 1.5]
}: ModelCanvasProps) => {
  return (
    <Canvas
      frameloop="demand"
      dpr={glScale}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      camera={{ fov: 35 }}
    >
      <Suspense fallback={<span className="loading">Загрузка модели...</span>}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />

        {children}

        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={2}
          enableDamping
        />

        <PerspectiveCamera
          position={cameraPosition}
          zoom={cameraZoom}
          makeDefault
        />
      </Suspense>
    </Canvas>
  )
}

export default ModelCanvas
