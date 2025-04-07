"use client"

import { MeshDistortMaterial, Sphere } from "@react-three/drei"
import { FC } from "react"

const Shape: FC = () => {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[2, 2, 1]} intensity={0.8} />
      <Sphere args={[1, 64, 64]} scale={2.4}>
        <MeshDistortMaterial
          color="#DB8B9B"
          distort={0.4}
          speed={2}
          roughness={0.1}
        />
      </Sphere>
    </>
  )
}

export default Shape
