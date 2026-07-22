import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const CoffeeCupMesh: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);

  // Gentle float & rotation idle animation
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.08 - 0.2;
      groupRef.current.rotation.y = t * 0.12;
      groupRef.current.rotation.z = Math.sin(t * 0.8) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* SAUCER PLATE */}
      <mesh position={[0, -0.65, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.8, 1.2, 0.12, 48]} />
        <meshStandardMaterial
          color="#1c0d08"
          roughness={0.25}
          metalness={0.2}
        />
      </mesh>
      {/* Saucer Inner Ring Accent */}
      <mesh position={[0, -0.58, 0]}>
        <ringGeometry args={[1.0, 1.08, 48]} />
        <meshStandardMaterial
          color="#d4a373"
          roughness={0.3}
          metalness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* CUP BODY */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.1, 0.75, 1.3, 48, 1, true]} />
        <meshStandardMaterial
          color="#1c0d08"
          roughness={0.2}
          metalness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* CUP BASE BOTTOM */}
      <mesh position={[0, -0.64, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.02, 48]} />
        <meshStandardMaterial color="#1c0d08" roughness={0.2} />
      </mesh>

      {/* GOLD RIM ACCENT */}
      <mesh position={[0, 0.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.04, 16, 48]} />
        <meshStandardMaterial
          color="#e6b800"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* COFFEE LIQUID SURFACE */}
      <mesh position={[0, 0.52, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.05, 48]} />
        <meshStandardMaterial
          color="#3d2314"
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* CREMA & FOAM ART PATTERN */}
      <mesh position={[0, 0.53, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 0.7, 32]} />
        <meshStandardMaterial
          color="#d4a373"
          transparent
          opacity={0.65}
          roughness={0.4}
        />
      </mesh>

      <mesh position={[0, 0.535, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.25, 32]} />
        <meshStandardMaterial
          color="#f7f1e5"
          transparent
          opacity={0.8}
          roughness={0.4}
        />
      </mesh>

      {/* CUP HANDLE */}
      <mesh position={[1.25, 0, 0]} rotation={[0, 0, -Math.PI / 8]} castShadow>
        <torusGeometry args={[0.42, 0.09, 16, 32, Math.PI * 1.2]} />
        <meshStandardMaterial
          color="#1c0d08"
          roughness={0.2}
          metalness={0.15}
        />
      </mesh>
    </group>
  );
};
