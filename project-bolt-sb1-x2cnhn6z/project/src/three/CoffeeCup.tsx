import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * A stylised 3D coffee cup built from primitives — ceramic body, espresso
 * surface, a handle, and rising steam. Designed to read as "coffee" at a
 * glance without loading external GLTF models (keeps the bundle light and
 * guarantees it renders in every environment).
 */

interface CoffeeCupProps {
  position?: [number, number, number];
  scale?: number;
}

function Steam({ x = 0, z = 0, offset = 0 }: { x?: number; z?: number; offset?: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + offset;
    const cycle = (t % 3) / 3; // 0 → 1 over 3s
    ref.current.position.y = 0.55 + cycle * 1.6;
    const fade = Math.sin(cycle * Math.PI);
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.opacity = fade * 0.35;
    const sway = Math.sin(t * 1.5) * 0.15;
    ref.current.position.x = x + sway;
    ref.current.scale.setScalar(0.18 + cycle * 0.22);
  });

  return (
    <mesh ref={ref} position={[x, 0.55, z]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color="#ffffff"
        transparent
        opacity={0.3}
        depthWrite={false}
      />
    </mesh>
  );
}

export function CoffeeCup({ position = [0, 0, 0], scale = 1 }: CoffeeCupProps) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    // Gentle idle rotation + mouse-following tilt
    group.current.rotation.y = state.clock.elapsedTime * 0.25;
    const mx = state.pointer.x;
    const my = state.pointer.y;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, my * 0.18, 0.05);
    void mx;
  });

  const cupMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#F4EDE3',
        roughness: 0.35,
        metalness: 0.05,
      }),
    []
  );
  const coffeeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#3a2317',
        roughness: 0.25,
        metalness: 0.1,
      }),
    []
  );
  const handleMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#E8DDD0',
        roughness: 0.4,
        metalness: 0.05,
      }),
    []
  );

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Saucer */}
      <mesh position={[0, -0.34, 0]} material={cupMat}>
        <cylinderGeometry args={[0.62, 0.66, 0.05, 48]} />
      </mesh>

      {/* Cup body — hollow cylinder */}
      <mesh position={[0, 0, 0]} material={cupMat}>
        <cylinderGeometry args={[0.45, 0.34, 0.7, 48, 1, true]} />
      </mesh>

      {/* Cup bottom (inside cap) */}
      <mesh position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]} material={cupMat}>
        <circleGeometry args={[0.33, 48]} />
      </mesh>

      {/* Coffee surface */}
      <mesh position={[0, 0.18, 0]} rotation={[-Math.PI / 2, 0, 0]} material={coffeeMat}>
        <circleGeometry args={[0.43, 48]} />
      </mesh>

      {/* Handle */}
      <mesh position={[0.52, 0.04, 0]} rotation={[0, 0, Math.PI / 2]} material={handleMat}>
        <torusGeometry args={[0.2, 0.05, 16, 32]} />
      </mesh>

      {/* Gold rim accent */}
      <mesh position={[0, 0.35, 0]}>
        <torusGeometry args={[0.45, 0.012, 12, 64]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Steam */}
      <Steam x={-0.12} z={0.05} offset={0} />
      <Steam x={0.1} z={-0.08} offset={1} />
      <Steam x={0.02} z={0.1} offset={2} />
    </group>
  );
}
