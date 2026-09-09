"use client";

import { useMemo } from "react";
import { Line, Text } from "@react-three/drei";
import { ThreeCanvas } from "./ThreeCanvas";

export function Pythagoras3DViz({
  a = 3,
  b = 4,
  c = 12,
}: {
  a?: number;
  b?: number;
  c?: number;
}) {
  const scale = useMemo(() => {
    const m = Math.max(a, b, c, 1);
    return 2.6 / m;
  }, [a, b, c]);

  const A = a * scale;
  const B = b * scale;
  const C = c * scale;
  const hyp2 = Math.hypot(A, B);
  const space = Math.hypot(A, B, C);

  return (
    <ThreeCanvas>
      <group position={[-A / 2, 0, -C / 2]}>
        {/* box edges */}
        <Line points={[[0,0,0],[A,0,0],[A,0,C],[0,0,C],[0,0,0]]} color="#94a3b8" />
        <Line points={[[0,B,0],[A,B,0],[A,B,C],[0,B,C],[0,B,0]]} color="#94a3b8" />
        <Line points={[[0,0,0],[0,B,0]]} color="#94a3b8" />
        <Line points={[[A,0,0],[A,B,0]]} color="#94a3b8" />
        <Line points={[[A,0,C],[A,B,C]]} color="#94a3b8" />
        <Line points={[[0,0,C],[0,B,C]]} color="#94a3b8" />
        {/* space diagonal */}
        <Line points={[[0,0,0],[A,B,C]]} color="#2dd4bf" lineWidth={3} />
        {/* face hypotenuse */}
        <Line points={[[0,0,0],[A,B,0]]} color="#818cf8" lineWidth={2} />
        <mesh position={[A / 2, B / 2, C / 2]}>
          <boxGeometry args={[A, B, C]} />
          <meshStandardMaterial color="#0f766e" transparent opacity={0.18} />
        </mesh>
        <Text position={[A / 2, -0.25, 0]} fontSize={0.22} color="#e2e8f0">
          {`a=${a}`}
        </Text>
        <Text position={[-0.35, B / 2, 0]} fontSize={0.22} color="#e2e8f0">
          {`b=${b}`}
        </Text>
        <Text position={[0, -0.25, C / 2]} fontSize={0.22} color="#e2e8f0">
          {`c=${c}`}
        </Text>
      </group>
      <Text position={[0, 2.1, 0]} fontSize={0.28} color="#5eead4" anchorX="center">
        {`diag=${space.toFixed(2)} · face=${hyp2.toFixed(2)}`}
      </Text>
    </ThreeCanvas>
  );
}
