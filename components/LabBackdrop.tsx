import React from 'react';

export const LabBackdrop: React.FC = () => {
  return (
    <group>
      {/* Back wall — always behind robot */}
      <mesh position={[0, 3, -7]} receiveShadow>
        <planeGeometry args={[18, 8]} />
        <meshStandardMaterial color="#EDE9E3" roughness={0.95} metalness={0} />
      </mesh>

      {/* Subtle warm glow on back-left wall */}
      <mesh position={[-4, 2.5, -6.8]}>
        <planeGeometry args={[3, 4]} />
        <meshStandardMaterial
          color="#FFF3DC"
          roughness={0.9}
          emissive="#FFE8C0"
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* Subtle cool glow on back-right wall */}
      <mesh position={[4, 2.5, -6.8]}>
        <planeGeometry args={[3, 4]} />
        <meshStandardMaterial
          color="#E8EDF2"
          roughness={0.9}
          emissive="#D0DAE4"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Side pillars — far behind robot, never in front */}
      {[-5.5, 5.5].map((x) => (
        <mesh key={x} position={[x, 1.2, -6]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 2.4, 0.2]} />
          <meshStandardMaterial color="#C8C0B6" roughness={0.7} metalness={0.15} />
        </mesh>
      ))}

      {/* Overhead light fixture — above, not blocking */}
      <group position={[0, 5.5, -1]}>
        <mesh>
          <boxGeometry args={[1.8, 0.06, 0.4]} />
          <meshStandardMaterial color="#2D2A26" roughness={0.5} metalness={0.3} />
        </mesh>
        <pointLight position={[0, -0.4, 0]} intensity={0.5} color="#FFE4B8" distance={10} decay={2} />
      </group>
    </group>
  );
};
