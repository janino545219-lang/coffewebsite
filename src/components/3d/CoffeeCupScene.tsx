import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { CoffeeCupMesh } from './CoffeeCupMesh';
import { SteamParticles } from './SteamParticles';
import { FloatingBeans } from './FloatingBeans';

export const CoffeeCupScene: React.FC = () => {
  return (
    <div className="w-full h-[500px] md:h-[650px] relative cursor-grab active:cursor-grabbing">
      <Canvas shadows gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 1.2, 4.5]} fov={45} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 4}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.8}
        />

        {/* LIGHTING SETUP */}
        <ambientLight intensity={0.8} />
        {/* Warm key light */}
        <spotLight
          position={[5, 8, 5]}
          angle={0.4}
          penumbra={0.8}
          intensity={2.5}
          color="#f4ebe1"
          castShadow
          shadow-mapSize={1024}
        />
        {/* Amber rim light */}
        <pointLight position={[-4, 3, -3]} intensity={3.0} color="#d4a373" />
        {/* Warm gold fill light */}
        <pointLight position={[2, -2, 3]} intensity={1.5} color="#e6b800" />

        <Suspense fallback={null}>
          <CoffeeCupMesh />
          <SteamParticles />
          <FloatingBeans />
          <ContactShadows
            position={[0, -0.9, 0]}
            opacity={0.6}
            scale={6}
            blur={2.5}
            far={4}
            color="#0f0704"
          />
        </Suspense>
      </Canvas>

      {/* Decorative Canvas Badges & Hints */}
      <div className="absolute bottom-4 right-4 md:right-8 bg-coffee-900/60 backdrop-blur-md border border-amber-500/20 px-3 py-1.5 rounded-full text-xs text-amber-200/80 flex items-center gap-2 pointer-events-none shadow-lg">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        <span>Interactive 3D • Drag to rotate</span>
      </div>
    </div>
  );
};
