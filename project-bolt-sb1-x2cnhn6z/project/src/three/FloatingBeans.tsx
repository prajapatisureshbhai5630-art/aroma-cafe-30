import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Floating coffee beans drifting around the scene. Each bean is a flattened,
 * dark ellipsoid with a subtle crease line, gently bobbing and rotating.
 */

interface BeanProps {
  position: [number, number, number];
  scale: number;
  speed: number;
  phase: number;
}

function Bean({ position, scale, speed, phase }: BeanProps) {
  const ref = useRef<THREE.Group>(null);
  const base = useRef(position);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + phase;
    ref.current.position.x = base.current[0] + Math.sin(t) * 0.3;
    ref.current.position.y = base.current[1] + Math.cos(t * 0.8) * 0.25;
    ref.current.position.z = base.current[2] + Math.sin(t * 0.6) * 0.2;
    ref.current.rotation.x = t * 0.4;
    ref.current.rotation.z = t * 0.3;
  });

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2b1a0e',
        roughness: 0.5,
        metalness: 0.1,
      }),
    []
  );

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh material={mat} scale={[1, 0.62, 0.5]}>
        <sphereGeometry args={[0.12, 20, 20]} />
      </mesh>
      {/* crease */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
        <torusGeometry args={[0.085, 0.006, 8, 16]} />
        <meshStandardMaterial color="#160a04" roughness={0.6} />
      </mesh>
    </group>
  );
}

export function FloatingBeans({ count = 14 }: { count?: number }) {
  const beans = useMemo(() => {
    const arr: BeanProps[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4 + 0.5,
          (Math.random() - 0.5) * 4 - 1,
        ],
        scale: 0.6 + Math.random() * 0.9,
        speed: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, [count]);

  return (
    <group>
      {beans.map((b, i) => (
        <Bean key={i} {...b} />
      ))}
    </group>
  );
}
