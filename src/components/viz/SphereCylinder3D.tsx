"use client";

import { ThreeCanvas } from "./ThreeCanvas";

export function Sphere3DViz({ radius = 1.2 }: { radius?: number }) {
  const r = Math.max(0.2, Math.min(2.4, radius * 0.55));
  return (
    <ThreeCanvas>
      <mesh>
        <sphereGeometry args={[r, 48, 48]} />
        <meshStandardMaterial color="#2dd4bf" metalness={0.35} roughness={0.25} transparent opacity={0.85} />
      </mesh>
      <mesh>
        <sphereGeometry args={[r, 24, 24]} />
        <meshBasicMaterial color="#99f6e4" wireframe transparent opacity={0.25} />
      </mesh>
    </ThreeCanvas>
  );
}

export function Cylinder3DViz({ radius = 1, height = 2 }: { radius?: number; height?: number }) {
  const r = Math.max(0.15, Math.min(1.8, radius * 0.45));
  const h = Math.max(0.3, Math.min(3.2, height * 0.35));
  return (
    <ThreeCanvas>
      <mesh>
        <cylinderGeometry args={[r, r, h, 48]} />
        <meshStandardMaterial color="#818cf8" metalness={0.3} roughness={0.3} transparent opacity={0.88} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[r, r, h, 20]} />
        <meshBasicMaterial color="#c7d2fe" wireframe transparent opacity={0.22} />
      </mesh>
    </ThreeCanvas>
  );
}
