import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const SteamParticles: React.FC = () => {
  const count = 60; // Increased particle count for denser steam
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 0.9,
        y: 0.8 + Math.random() * 2.5,
        z: (Math.random() - 0.5) * 0.9,
        speed: 0.005 + Math.random() * 0.015,
        scale: 0.1 + Math.random() * 0.2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        initialY: 0.8 + Math.random() * 0.5,
        driftX: (Math.random() - 0.5) * 0.005, // Add wind drift
        driftZ: (Math.random() - 0.5) * 0.005,
      });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;

    particles.forEach((p, i) => {
      p.y += p.speed;
      p.x += p.driftX;
      p.z += p.driftZ;

      if (p.y > 3.8) {
        p.y = p.initialY;
        p.x = (Math.random() - 0.5) * 0.9;
        p.z = (Math.random() - 0.5) * 0.9;
      }

      // Smooth fade and scale curve
      const progress = (p.y - 0.8) / 3.0;
      // Start small, grow in middle, shrink slightly at end
      const scaleMultiplier = Math.sin(progress * Math.PI) * 2.5; 
      const currentScale = Math.max(0.01, p.scale * scaleMultiplier);
      
      dummy.position.set(
        p.x + Math.sin(p.y * 2) * 0.2, 
        p.y, 
        p.z + Math.cos(p.y * 1.5) * 0.2
      );
      dummy.rotation.set(progress * Math.PI, p.y * p.rotationSpeed, 0);
      dummy.scale.set(currentScale, currentScale, currentScale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshBasicMaterial
        color="#fff1e6"
        transparent
        opacity={0.06} // Lower opacity per particle for softer look when layered
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
};
