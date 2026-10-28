import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

interface HeroModelProps {
  currentAnimation: string;
  mousePos: { x: number; y: number };
}

const MODEL_URL =
  'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/RobotExpressive/RobotExpressive.glb';

useGLTF.preload(MODEL_URL);

export const HeroModel: React.FC<HeroModelProps> = ({ currentAnimation, mousePos }) => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions } = useAnimations(animations, group);
  const activeActionRef = useRef<THREE.AnimationAction | null>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = false;
      }
    });
  }, [scene]);

  useEffect(() => {
    if (!actions || !currentAnimation) return;

    const nextAction = actions[currentAnimation];
    if (!nextAction) return;

    const prevAction = activeActionRef.current;

    if (prevAction && prevAction !== nextAction) {
      prevAction.fadeOut(0.6);
      nextAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(0.6).play();
    } else if (!prevAction) {
      nextAction.reset().fadeIn(0.8).play();
    }

    activeActionRef.current = nextAction;
  }, [currentAnimation, actions]);

  useFrame(() => {
    if (!group.current) return;

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      mousePos.x * 0.12,
      0.04
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      mousePos.y * 0.04,
      0.04
    );
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={[0.6, 0.6, 0.6]}
      position={[0, -1, 0]}
      dispose={null}
    />
  );
};
