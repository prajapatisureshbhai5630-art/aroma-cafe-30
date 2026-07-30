import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, Float } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { CoffeeCup } from './CoffeeCup';
import { FloatingBeans } from './FloatingBeans';
import { Particles, FloatingLights } from './Particles';

/**
 * The full hero 3D scene: a realistic-ish coffee cup with steam, floating
 * coffee beans, drifting gold particles, soft contact shadows, HDR
 * environment lighting, bloom + vignette post-processing, and mouse
 * parallax via the camera. Sits behind the hero content with pointer
 * events disabled so the UI stays interactive.
 */
export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 5], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: 'none' }}
    >
      <color attach="background" args={['#1a110d']} />

      {/* Lighting */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 4]} intensity={1.6} castShadow />
      <pointLight position={[-3, 2, 2]} intensity={1.2} color="#D4AF37" />
      <spotLight
        position={[0, 5, 3]}
        angle={0.5}
        penumbra={1}
        intensity={2}
        color="#fff3d6"
      />

      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
          <CoffeeCup position={[0, 0.1, 0]} scale={1.15} />
        </Float>

        <FloatingBeans count={16} />
        <Particles count={220} />
        <FloatingLights />

        <ContactShadows
          position={[0, -1.1, 0]}
          opacity={0.5}
          scale={10}
          blur={2.6}
          far={4}
          color="#000000"
        />

        <Environment preset="warehouse" />
      </Suspense>

      <EffectComposer>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.55}
          luminanceSmoothing={0.3}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.2} darkness={0.75} />
      </EffectComposer>
    </Canvas>
  );
}
