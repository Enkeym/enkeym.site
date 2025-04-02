"use client"

import { MeshDistortMaterial, Sphere } from "@react-three/drei"
import { FC } from "react"

const Shape: FC = () => {
  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight position={[1, 2, 3]} />
      <Sphere args={[1, 100, 200]} scale={2.4}>
        <MeshDistortMaterial color="#DB8B9B" distort={0.5} speed={2} />
      </Sphere>
    </>
  )
}

export default Shape
