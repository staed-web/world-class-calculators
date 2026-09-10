"use client";

import { Suspense, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

export function ThreeCanvas({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative h-72 w-full overflow-hidden rounded-2xl border border-border bg-[#0b1220] ${className}`}
    >
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center text-sm text-slate-300">
            Loading 3D…
          </div>
        }
      >
        <Canvas camera={{ position: [4.2, 3.2, 4.2], fov: 42 }} dpr={[1, 1.75]}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[5, 8, 3]} intensity={1.1} />
          <Environment preset="city" />
          {children}
          <OrbitControls enablePan={false} minDistance={2} maxDistance={12} />
        </Canvas>
      </Suspense>
      <p className="pointer-events-none absolute bottom-2 right-3 text-[10px] text-white/50">
        Drag to orbit · scroll to zoom
      </p>
    </div>
  );
}
