import { StorySection, AnimationState } from './types';

export const STORY_SECTIONS: StorySection[] = [
  {
    id: 'assembly',
    title: 'Assembly',
    subtitle: 'Blueprint Born',
    description:
      'Every rivet placed with precision. From raw alloy to articulated frame — this low-poly sentinel was engineered in the Bot Lab, where form meets function in warm ochre and brushed steel.',
    animation: AnimationState.IDLE,
    camera: {
      position: [0, 1.5, 6],
      lookAt: [0, 1, 0],
    },
    lighting: {
      ambientIntensity: 0.22,
      keyIntensity: 2.2,
      keyColor: '#FFF5E8',
      rimIntensity: 1.8,
      rimColor: '#D9A043',
    },
  },
  {
    id: 'mechanics',
    title: 'Mechanics',
    subtitle: 'Kinetic Framework',
    description:
      'Ball-joint limbs, silver claw grippers, and goggle optics — each component calibrated for fluid motion. Watch the chassis stride forward with mechanical grace.',
    animation: AnimationState.STANCE,
    camera: {
      position: [4, 1.5, 4],
      lookAt: [0, 1.2, 0],
    },
    lighting: {
      ambientIntensity: 0.2,
      keyIntensity: 2.5,
      keyColor: '#FFFFFF',
      rimIntensity: 1.4,
      rimColor: '#A4B3C1',
    },
  },
  {
    id: 'core-power',
    title: 'Core Power',
    subtitle: 'Overdrive Protocol',
    description:
      'When the reactor core surges, gravity becomes optional. A burst of kinetic energy launches the unit skyward — raw power contained in a compact orange shell.',
    animation: AnimationState.ACTION,
    camera: {
      position: [-5, 3, 5],
      lookAt: [0, 2, 0],
    },
    lighting: {
      ambientIntensity: 0.15,
      keyIntensity: 3.5,
      keyColor: '#FFD27D',
      rimIntensity: 3.0,
      rimColor: '#D9A043',
      flicker: true,
    },
  },
  {
    id: 'activation',
    title: 'Activation',
    subtitle: 'Signal Deployed',
    description:
      'Systems online. Optics calibrated. The sentinel raises its claw in a final wave — a friendly mechanical gesture that says: mission ready, standing by.',
    animation: AnimationState.LEGACY,
    camera: {
      position: [0, 1.2, 3.5],
      lookAt: [0, 1.5, 0],
    },
    lighting: {
      ambientIntensity: 0.25,
      keyIntensity: 2.0,
      keyColor: '#FFF5E6',
      rimIntensity: 2.0,
      rimColor: '#E8C06A',
    },
  },
];
