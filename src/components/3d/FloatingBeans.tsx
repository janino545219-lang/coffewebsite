import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const FloatingBeans: React.FC = () => {
  const count = 24; // More beans
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const beans = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 6 + 1,
      z: (Math.random() - 0.5) * 6 - 1.5,
      rx: Math.random() * Math.PI,
      ry: Math.random() * Math.PI,
      rz: Math.random() * Math.PI,
      rotSpeedX: (Math.random() - 0.5) * 0.02,
      rotSpeedY: (Math.random() - 0.5) * 0.025,
      floatSpeed: 0.5 + Math.random() * 1.5,
      floatOffset: Math.random() * Math.PI * 2,
      scale: 0.15 + Math.random() * 0.15, // More size variation for depth of field illusion
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    beans.forEach((b, i) => {
      b.rx += b.rotSpeedX;
      b.ry += b.rotSpeedY;

      // Complex floating path (figure-8-like)
      const floatY = b.y + Math.sin(t * b.floatSpeed + b.floatOffset) * 0.3;
      const floatX = b.x + Math.cos(t * b.floatSpeed * 0.5 + b.floatOffset) * 0.2;

      dummy.position.set(floatX, floatY, b.z);
      dummy.rotation.set(b.rx, b.ry, b.rz);
      
      // Elongated shape to look more like coffee beans
      dummy.scale.set(b.scale * 0.9, b.scale * 1.4, b.scale * 0.7);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow receiveShadow>
      <sphereGeometry args={[0.5, 24, 24]} />
      <meshStandardMaterial
        color="#2b1408"
        roughness={0.6}
        metalness={0.1}
        bumpScale={0.02}
      />
    </instancedMesh>
  );
};
