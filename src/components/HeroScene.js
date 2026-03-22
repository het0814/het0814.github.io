import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* -----------------------------------------------------------
   Floating Icosahedron – wireframe + distorted glassy surface
   Mouse-reactive rotation for an organic, living feel
   ----------------------------------------------------------- */

const FloatingGeo = () => {
  const meshRef = useRef();
  const wireRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });

  // Track mouse for gentle reactive rotation
  React.useEffect(() => {
    const handleMouse = (e) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Slow autonomous rotation
      meshRef.current.rotation.x = t * 0.08 + mousePos.current.y * 0.3;
      meshRef.current.rotation.y = t * 0.12 + mousePos.current.x * 0.3;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.08 + mousePos.current.y * 0.3;
      wireRef.current.rotation.y = t * 0.12 + mousePos.current.x * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.2} floatingRange={[-0.2, 0.2]}>
      <group>
        {/* Main distorted shape */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.6, 4]} />
          <MeshDistortMaterial
            color="#00d2be"
            emissive="#003d38"
            emissiveIntensity={0.15}
            roughness={0.6}
            metalness={0.3}
            transparent
            opacity={0.12}
            distort={0.25}
            speed={1.5}
          />
        </mesh>

        {/* Wireframe overlay */}
        <mesh ref={wireRef}>
          <icosahedronGeometry args={[1.65, 2]} />
          <meshBasicMaterial
            color="#00d2be"
            wireframe
            transparent
            opacity={0.08}
          />
        </mesh>
      </group>
    </Float>
  );
};

/* -----------------------------------------------------------
   Floating Particles – tiny dots drifting around the geo
   ----------------------------------------------------------- */

const Particles = ({ count = 80 }) => {
  const mesh = useRef();
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.02;
      mesh.current.rotation.x = t * 0.01;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00d2be"
        size={0.015}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

/* -----------------------------------------------------------
   Main 3D Scene wrapper
   ----------------------------------------------------------- */

const HeroScene = () => {
  return (
    <div className="hero-3d-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance" 
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} color="#ffffff" />
        <directionalLight position={[-3, -3, 2]} intensity={0.15} color="#00d2be" />
        
        <FloatingGeo />
        <Particles />
      </Canvas>
    </div>
  );
};

export default HeroScene;
