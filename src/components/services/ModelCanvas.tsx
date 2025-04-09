"use client"

import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei"
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
      camera={{ fov: 35 }}
      gl={{ antialias: false, powerPreference: "default" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("contextlost", (e) => {
          e.preventDefault()
          console.warn("WebGL context lost — prevented freeze")
        })
      }}
    >
      <Suspense
        fallback={
          <Html center>
            <span className="loading">Загрузка модели...</span>
          </Html>
        }
      >
        <ambientLight intensity={2} />
        <directionalLight position={[2, 2, 2]} intensity={2} />

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
