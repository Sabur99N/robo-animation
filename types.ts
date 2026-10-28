export interface StorySection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  animation: string;
  camera: {
    position: [number, number, number];
    lookAt: [number, number, number];
  };
  lighting: {
    ambientIntensity: number;
    keyIntensity: number;
    keyColor: string;
    rimIntensity: number;
    rimColor: string;
    flicker?: boolean;
  };
}

export enum AnimationState {
  IDLE = 'Standing',
  STANCE = 'Walking',
  ACTION = 'Jump',
  LEGACY = 'Wave',
}

export const THEME = {
  bg: '#F5F3EF',
  bgSecondary: '#EDE9E3',
  text: '#2D2A26',
  textMuted: '#8A8279',
  orange: '#D9A043',
  orangeLight: '#E8C06A',
  metal: '#A4B3C1',
  metalDark: '#7A8E9E',
} as const;
