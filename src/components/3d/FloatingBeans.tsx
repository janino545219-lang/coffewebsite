import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const FloatingBeans: React.FC = () => {
  const count = 18;
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const beans = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 7,
      y: (Math.random() - 0.5) * 5 + 0.5,
      z: (Math.random() - 0.5) * 5 - 1,
      rx: Math.random() * Math.PI,
      ry: Math.random() * Math.PI,
      rz: Math.random() * Math.PI,
      rotSpeedX: (Math.random() - 0.5) * 0.015,
      rotSpeedY: (Math.random() - 0.5) * 0.02,
      floatSpeed: 0.8 + Math.random() * 1.2,
      floatOffset: Math.random() * Math.PI * 2,
      scale: 0.18 + Math.random() * 0.12,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    beans.forEach((b, i) => {
      b.rx += b.rotSpeedX;
      b.ry += b.rotSpeedY;

      const floatY = b.y + Math.sin(t * b.floatSpeed + b.floatOffset) * 0.25;

      dummy.position.set(b.x, floatY, b.z);
      dummy.rotation.set(b.rx, b.ry, b.rz);
      dummy.scale.set(b.scale, b.scale * 1.5, b.scale * 0.8);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow>
      <sphereGeometry args={[0.5, 12, 12]} />
      <meshStandardMaterial
        color="#2b1810"
        roughness={0.4}
        metalness={0.1}
      />
    </instancedMesh>
  );
};
