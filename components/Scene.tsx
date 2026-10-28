import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroModel } from './HeroModel';
import { LabFloor } from './LabFloor';
import { LabBackdrop } from './LabBackdrop';
import { STORY_SECTIONS } from '../constants';
import { THEME } from '../types';

gsap.registerPlugin(ScrollTrigger);

const SceneController: React.FC = () => {
  const { camera } = useThree();
  const lookAtTarget = useRef(new THREE.Vector3(0, 1, 0));

  const ambientRef = useRef<THREE.AmbientLight>(null);
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);
  const [flickerActive, setFlickerActive] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#main-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    });

    STORY_SECTIONS.forEach((section, index) => {
      const position = index;

      tl.to(
        camera.position,
        {
          x: section.camera.position[0],
          y: section.camera.position[1],
          z: section.camera.position[2],
          ease: 'power2.inOut',
          duration: 1,
        },
        position
      );

      tl.to(
        lookAtTarget.current,
        {
          x: section.camera.lookAt[0],
          y: section.camera.lookAt[1],
          z: section.camera.lookAt[2],
          ease: 'power2.inOut',
          duration: 1,
        },
        position
      );

      if (ambientRef.current) {
        tl.to(ambientRef.current, { intensity: section.lighting.ambientIntensity, duration: 1 }, position);
      }

      if (keyLightRef.current) {
        tl.to(keyLightRef.current, { intensity: section.lighting.keyIntensity, duration: 1 }, position);
        tl.to(
          keyLightRef.current.color,
          {
            r: new THREE.Color(section.lighting.keyColor).r,
            g: new THREE.Color(section.lighting.keyColor).g,
            b: new THREE.Color(section.lighting.keyColor).b,
            duration: 1,
          },
          position
        );
      }

      if (rimLightRef.current) {
        tl.to(rimLightRef.current, { intensity: section.lighting.rimIntensity, duration: 1 }, position);
        tl.to(
          rimLightRef.current.color,
          {
            r: new THREE.Color(section.lighting.rimColor).r,
            g: new THREE.Color(section.lighting.rimColor).g,
            b: new THREE.Color(section.lighting.rimColor).b,
            duration: 1,
          },
          position
        );
      }

      ScrollTrigger.create({
        trigger: `[data-section="${section.id}"]`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setFlickerActive(!!section.lighting.flicker),
        onEnterBack: () => setFlickerActive(!!section.lighting.flicker),
        onLeave: () => setFlickerActive(false),
        onLeaveBack: () => setFlickerActive(false),
      });
    });
  }, [camera]);

  useFrame(() => {
    camera.lookAt(lookAtTarget.current);

    if (flickerActive && keyLightRef.current) {
      const baseIntensity = STORY_SECTIONS[2].lighting.keyIntensity;
      const noise = Math.sin(Date.now() * 0.02) * 0.4 + Math.random() * 0.3;
      keyLightRef.current.intensity = baseIntensity + noise;
    }
  });

  return (
    <>
      <color attach="background" args={['#EDE9E3']} />

      <hemisphereLight args={['#FFF8EE', '#C4B8A8', 0.6]} />
      <ambientLight ref={ambientRef} intensity={0.4} color="#FFF5EB" />

      <directionalLight
        ref={keyLightRef}
        position={[5, 8, 5]}
        intensity={2.0}
        color="#FFF5E8"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={20}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0005}
      />

      <directionalLight position={[-4, 5, 3]} intensity={0.6} color="#C8D4DE" />

      <pointLight
        ref={rimLightRef}
        position={[-2, 3, -3]}
        intensity={1.5}
        color="#D9A043"
        distance={15}
        decay={2}
      />

      <spotLight
        position={[1, 6, 4]}
        angle={0.4}
        penumbra={0.8}
        intensity={0.8}
        color={THEME.orangeLight}
      />
    </>
  );
};

interface SceneProps {
  currentAnimation: string;
  mousePos: { x: number; y: number };
}

export const Scene: React.FC<SceneProps> = ({ currentAnimation, mousePos }) => {
  return (
    <div className="fixed inset-0 w-full h-screen z-0">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 1.5, 6]} fov={42} near={0.1} far={50} />

        <SceneController />

        <Suspense fallback={null}>
          <LabBackdrop />
          <LabFloor />

          <HeroModel currentAnimation={currentAnimation} mousePos={mousePos} />

          <ContactShadows
            position={[0, -0.99, 0]}
            opacity={0.45}
            scale={10}
            blur={2.5}
            far={4}
            color="#3D352C"
            resolution={512}
          />

          <Environment preset="warehouse" environmentIntensity={0.7} />
        </Suspense>
      </Canvas>

      <div className="scene-atmosphere" aria-hidden="true" />
    </div>
  );
};
