import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Ambient floating gold dust particles + slow-drifting light orbs that give
 * the 3D scene depth and a luxury atmosphere. Uses Points for performance.
 */

export function Particles({ count = 240 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      sizes[i] = Math.random() * 0.08 + 0.02;
    }
    return { positions, sizes };
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
    const pos = points.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 1; i < arr.length; i += 3) {
      arr[i] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.0015;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#D4AF37"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/**
 * A couple of soft glowing orbs that drift slowly to suggest floating light.
 */
export function FloatingLights() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.05;
    group.current.children.forEach((child, i) => {
      child.position.y = Math.sin(state.clock.elapsedTime * 0.4 + i) * 0.4;
    });
  });

  const orbs = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        angle: (i / 3) * Math.PI * 2,
        radius: 2.5 + i * 0.4,
        color: i === 1 ? '#f4e09a' : '#D4AF37',
      })),
    []
  );

  return (
    <group ref={group}>
      {orbs.map((o, i) => (
        <mesh
          key={i}
          position={[Math.cos(o.angle) * o.radius, 0, Math.sin(o.angle) * o.radius]}
        >
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={o.color}
            emissive={o.color}
            emissiveIntensity={2.4}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}
