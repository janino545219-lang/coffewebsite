import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  ContactShadows, 
  Environment, 
  PresentationControls,
  Float
} from '@react-three/drei';
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { CoffeeCupMesh } from './CoffeeCupMesh';
import { SteamParticles } from './SteamParticles';
import { FloatingBeans } from './FloatingBeans';
import { gsap } from 'gsap';

const SceneContent: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (groupRef.current) {
      // Cinematic entrance animation
      gsap.fromTo(groupRef.current.scale, 
        { x: 0.1, y: 0.1, z: 0.1 },
        { x: 1, y: 1, z: 1, duration: 2.5, ease: "expo.out", delay: 0.2 }
      );
      gsap.fromTo(groupRef.current.position,
        { y: -3 },
        { y: 0, duration: 2.5, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  return (
    <group ref={groupRef}>
      <Float
        speed={1.5} // Animation speed, defaults to 1
        rotationIntensity={0.2} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[-0.05, 0.05]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <CoffeeCupMesh />
        <SteamParticles />
        <FloatingBeans />
      </Float>
    </group>
  );
};

export const CoffeeCupScene: React.FC = () => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas 
        shadows 
        gl={{ 
          antialias: true, 
          alpha: true, 
          toneMapping: THREE.ACESFilmicToneMapping, 
          toneMappingExposure: 1.0 
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 1.8, 5]} fov={35} />
        
        {/* Presentation controls for smooth, limited rotation on drag */}
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 6, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >

          {/* CINEMATIC LIGHTING SETUP */}
          <ambientLight intensity={0.2} color="#ffe5d9" />
          
          {/* Main Key Light (Warm) */}
          <spotLight
            position={[5, 8, 4]}
            angle={0.5}
            penumbra={1}
            intensity={4}
            color="#ffecd1"
            castShadow
            shadow-mapSize={2048}
            shadow-bias={-0.0001}
          />
          
          {/* Dramatic Rim Light (Gold/Amber) */}
          <pointLight position={[-4, 2, -4]} intensity={5} color="#d4a373" distance={15} decay={2} />
          
          {/* Fill Light (Soft Blue/Cool to contrast the warm) */}
          <pointLight position={[3, -1, 3]} intensity={1.5} color="#a5c4d4" distance={10} decay={2} />

          {/* Environment for PBR reflections */}
          <Environment preset="sunset" />

          <Suspense fallback={null}>
            <SceneContent />
            
            <ContactShadows
              position={[0, -1.0, 0]}
              opacity={0.8}
              scale={8}
              blur={2.5}
              far={4}
              color="#0a0502"
            />
          </Suspense>
          
        </PresentationControls>

        {/* POST PROCESSING EFFECTS */}
        <EffectComposer>
          <DepthOfField target={[0, 1.0, 0]} focalLength={0.03} bokehScale={5} height={480} />
          <Bloom luminanceThreshold={1.2} luminanceSmoothing={0.9} height={300} opacity={0.5} />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>

      {/* Decorative Canvas Badges & Hints */}
      <div className="absolute bottom-6 right-0 bg-coffee-950/80 backdrop-blur-md border border-amber-500/20 px-3 py-1.5 rounded-full text-[10px] text-amber-200/80 flex items-center gap-2 pointer-events-none shadow-xl transform translate-x-4">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
        <span className="uppercase tracking-widest font-semibold">Interactive 3D</span>
      </div>
    </div>
  );
};
