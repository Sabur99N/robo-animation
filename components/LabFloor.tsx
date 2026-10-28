import React, { useMemo } from 'react';
import { Grid } from '@react-three/drei';
import * as THREE from 'three';

export const LabFloor: React.FC = () => {
  const gridFade = useMemo(() => new THREE.Color('#B8AFA3'), []);

  return (
    <group position={[0, -1, 0]}>
      {/* Main floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#E4DFD6"
          roughness={0.45}
          metalness={0.08}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* Platform under robot */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <circleGeometry args={[2.8, 80]} />
        <meshStandardMaterial
          color="#D9D2C8"
          roughness={0.4}
          metalness={0.15}
          envMapIntensity={0.7}
        />
      </mesh>

      {/* Platform rim */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[2.75, 2.95, 80]} />
        <meshStandardMaterial color="#D9A043" roughness={0.35} metalness={0.4} />
      </mesh>

      {/* Inner accent ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.016, 0]}>
        <ringGeometry args={[1.8, 1.85, 64]} />
        <meshStandardMaterial color="#A4B3C1" roughness={0.3} metalness={0.5} />
      </mesh>

      <Grid
        position={[0, 0.02, 0]}
        args={[14, 14]}
        cellSize={0.45}
        cellThickness={0.7}
        cellColor={gridFade}
        sectionSize={2.25}
        sectionThickness={1.1}
        sectionColor="#D9A043"
        fadeDistance={22}
        fadeStrength={1.4}
        followCamera={false}
        infiniteGrid
      />
    </group>
  );
};
