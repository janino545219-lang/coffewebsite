import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const SteamParticles: React.FC = () => {
  const count = 35;
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 0.7,
        y: 0.8 + Math.random() * 2.2,
        z: (Math.random() - 0.5) * 0.7,
        speed: 0.008 + Math.random() * 0.012,
        scale: 0.08 + Math.random() * 0.12,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        initialY: 0.8 + Math.random() * 0.4,
      });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;

    particles.forEach((p, i) => {
      p.y += p.speed;
      if (p.y > 3.2) {
        p.y = p.initialY;
        p.x = (Math.random() - 0.5) * 0.7;
        p.z = (Math.random() - 0.5) * 0.7;
      }

      // Calculate fade & scale based on height
      const progress = (p.y - 0.8) / 2.4;
      const currentScale = p.scale * (1 + progress * 1.5);
      
      dummy.position.set(p.x + Math.sin(p.y * 3) * 0.15, p.y, p.z + Math.cos(p.y * 2) * 0.15);
      dummy.rotation.set(0.2, p.y * p.rotationSpeed, 0);
      dummy.scale.set(currentScale, currentScale, currentScale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshBasicMaterial
        color="#ede0d4"
        transparent
        opacity={0.12}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
};
