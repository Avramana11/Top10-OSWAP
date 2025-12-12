import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"

export default function LockModel() {
  const ref = useRef()
  const { scene } = useGLTF("/models/cyber_dragon_chair.glb")   // change file name if needed

//   useFrame(() => {
//     ref.current.rotation.y += 0.01
//   })

  return (
    <primitive ref={ref} object={scene} scale={0.5}
     position={[0, -1, 0]} />
  )
}
