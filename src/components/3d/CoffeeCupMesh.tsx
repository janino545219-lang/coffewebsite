import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export const CoffeeCupMesh: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);

  // Gentle float & rotation idle animation
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.05 - 0.2;
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.rotation.z = Math.sin(t * 0.8) * 0.02;
    }
  });

  // Load latte art texture
  const latteArtTexture = useTexture('https://images.unsplash.com/photo-1558402529-d2638a7023e9?auto=format&fit=crop&w=512&q=80');
  latteArtTexture.colorSpace = THREE.SRGBColorSpace;
  // Center texture mapping
  latteArtTexture.wrapS = THREE.ClampToEdgeWrapping;
  latteArtTexture.wrapT = THREE.ClampToEdgeWrapping;
  latteArtTexture.repeat.set(1.1, 1.1);
  latteArtTexture.center.set(0.5, 0.5);
  latteArtTexture.offset.set(-0.05, -0.05);

  // Generate elegant cup profile (LatheGeometry)
  const cupPoints = useMemo(() => {
    const points = [];
    // Outer base
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.65, 0));
    points.push(new THREE.Vector2(0.7, 0.05));
    
    // Outer wall
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      const x = 0.7 + t * 0.2 + Math.pow(t, 2) * 0.1; // Gentle curve outwards
      const y = 0.05 + t * 1.1;
      points.push(new THREE.Vector2(x, y));
    }
    
    // Lip
    points.push(new THREE.Vector2(1.02, 1.18));
    points.push(new THREE.Vector2(0.98, 1.2));
    points.push(new THREE.Vector2(0.95, 1.18));
    
    // Inner wall
    for (let i = 20; i >= 0; i--) {
      const t = i / 20;
      const x = 0.65 + t * 0.25 + Math.pow(t, 2) * 0.05; // Slightly thicker at base
      const y = 0.15 + t * 1.0;
      points.push(new THREE.Vector2(x, y));
    }
    
    // Inner base
    points.push(new THREE.Vector2(0, 0.15));
    return points;
  }, []);

  // Generate saucer profile
  const saucerPoints = useMemo(() => {
    const points = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(1.2, 0));
    // Curve up
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      const x = 1.2 + t * 0.8;
      const y = Math.pow(t, 2) * 0.25;
      points.push(new THREE.Vector2(x, y));
    }
    // Rim
    points.push(new THREE.Vector2(2.02, 0.26));
    points.push(new THREE.Vector2(1.98, 0.28));
    
    // Inner curve down
    for (let i = 10; i >= 0; i--) {
      const t = i / 10;
      const x = 1.18 + t * 0.8;
      const y = 0.05 + Math.pow(t, 2) * 0.2;
      points.push(new THREE.Vector2(x, y));
    }
    points.push(new THREE.Vector2(0, 0.05));
    
    return points;
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* SAUCER */}
      <mesh position={[0, -0.05, 0]} receiveShadow castShadow>
        <latheGeometry args={[saucerPoints, 64]} />
        <meshPhysicalMaterial
          color="#160a06"
          roughness={0.15}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          envMapIntensity={2.0}
        />
      </mesh>
      
      {/* SAUCER GOLD RING ACCENT */}
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.0, 1.03, 64]} />
        <meshStandardMaterial
          color="#e6b800"
          metalness={1.0}
          roughness={0.1}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* CUP */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <latheGeometry args={[cupPoints, 64]} />
        <meshPhysicalMaterial
          color="#180b07"
          roughness={0.08}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* CUP GOLD RIM ACCENT */}
      <mesh position={[0, 1.19, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.99, 0.02, 32, 64]} />
        <meshStandardMaterial
          color="#e6b800"
          metalness={1.0}
          roughness={0.1}
          envMapIntensity={3.0}
        />
      </mesh>

      {/* CUP HANDLE */}
      <mesh position={[0.92, 0.6, 0]} rotation={[0, 0, -Math.PI / 14]} castShadow>
        <torusGeometry args={[0.35, 0.08, 32, 64, Math.PI * 1.2]} />
        <meshPhysicalMaterial
          color="#180b07"
          roughness={0.08}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          envMapIntensity={2.0}
        />
      </mesh>

      {/* COFFEE LIQUID SURFACE */}
      <mesh position={[0, 1.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[0.92, 64]} />
        <meshPhysicalMaterial
          map={latteArtTexture}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.02} // Super smooth liquid surface
          transmission={0.2} // Slight depth
          thickness={0.5}
          ior={1.33} // Water IOR
          envMapIntensity={2.0}
        />
      </mesh>

      {/* SUBTLE BUBBLES/CONDENSATION AT EDGE */}
      <mesh position={[0, 1.052, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.88, 0.92, 64]} />
        <meshPhysicalMaterial
          color="#c48a52"
          transparent
          opacity={0.6}
          roughness={0.3}
          metalness={0.1}
          transmission={0.5}
        />
      </mesh>
    </group>
  );
};
