import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import LockModel from "./LockModel"

import { Bounds } from '@react-three/drei';

export default function Login3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [3, 1.5, 5], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />

        <Bounds fit clip observe margin={1.2}>
          <LockModel />
        </Bounds>

        <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
      </Canvas>
    </div>
  );
}

