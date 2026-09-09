"use client";

import { useMemo } from "react";
import { Text } from "@react-three/drei";
import { ThreeCanvas } from "./ThreeCanvas";

export function CompoundBars3DViz({
  values,
}: {
  values: number[];
}) {
  const bars = useMemo(() => {
    const max = Math.max(...values, 1);
    return values.slice(0, 16).map((v, i) => ({
      x: i * 0.55 - ((Math.min(values.length, 16) - 1) * 0.55) / 2,
      h: Math.max(0.15, (v / max) * 2.4),
      label: String(i + 1),
    }));
  }, [values]);

  return (
    <ThreeCanvas>
      <group position={[0, -1.1, 0]}>
        {bars.map((b, i) => (
          <group key={i} position={[b.x, b.h / 2, 0]}>
            <mesh>
              <boxGeometry args={[0.4, b.h, 0.4]} />
              <meshStandardMaterial
                color={i === bars.length - 1 ? "#2dd4bf" : "#6366f1"}
                metalness={0.2}
                roughness={0.4}
              />
            </mesh>
            {i % Math.max(1, Math.floor(bars.length / 6)) === 0 && (
              <Text position={[0, -b.h / 2 - 0.2, 0.3]} fontSize={0.16} color="#cbd5e1">
                Y{b.label}
              </Text>
            )}
          </group>
        ))}
      </group>
    </ThreeCanvas>
  );
}
