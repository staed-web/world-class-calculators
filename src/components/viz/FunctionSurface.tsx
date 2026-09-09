"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { ThreeCanvas } from "./ThreeCanvas";

function SurfaceMesh({
  mode,
}: {
  mode: "ripple" | "saddle" | "gaussian";
}) {
  const geo = useMemo(() => {
    const size = 48;
    const positions: number[] = [];
    const colors: number[] = [];
    const indices: number[] = [];
    const color = new THREE.Color();

    for (let i = 0; i <= size; i++) {
      for (let j = 0; j <= size; j++) {
        const u = (i / size) * 2 - 1;
        const v = (j / size) * 2 - 1;
        const x = u * 2.4;
        const y = v * 2.4;
        let z = 0;
        if (mode === "ripple") {
          const r = Math.hypot(x, y);
          z = Math.sin(r * 3.2) * Math.exp(-r * 0.35) * 1.1;
        } else if (mode === "saddle") {
          z = 0.35 * (x * x - y * y);
        } else {
          z = Math.exp(-(x * x + y * y) * 0.55) * 1.6;
        }
        positions.push(x, z, y);
        color.setHSL(0.45 + z * 0.12, 0.7, 0.55);
        colors.push(color.r, color.g, color.b);
      }
    }
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const a = i * (size + 1) + j;
        const b = a + size + 1;
        indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    g.setIndex(indices);
    g.computeVertexNormals();
    return g;
  }, [mode]);

  return (
    <mesh geometry={geo} rotation={[0, 0, 0]}>
      <meshStandardMaterial vertexColors wireframe={false} metalness={0.15} roughness={0.45} side={THREE.DoubleSide} />
    </mesh>
  );
}

export function FunctionSurfaceViz({
  mode = "ripple",
}: {
  mode?: "ripple" | "saddle" | "gaussian";
}) {
  return (
    <ThreeCanvas>
      <gridHelper args={[8, 16, "#334155", "#1e293b"]} position={[0, -1.2, 0]} />
      <SurfaceMesh mode={mode} />
    </ThreeCanvas>
  );
}
