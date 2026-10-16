export const FPS = 30;

// Scene timings (frames @ 30fps) — total 900 = 30s
export const SCENES = {
  logoIntro: {from: 0, duration: 75}, // 0–2.5s
  title: {from: 75, duration: 150}, // 2.5–7.5s
  heroMontage: {from: 225, duration: 180}, // 7.5–13.5s
  legacy: {from: 405, duration: 135}, // 13.5–18s
  packages: {from: 540, duration: 255}, // 18–26.5s
  outro: {from: 795, duration: 105}, // 26.5–30s
} as const;

export const TOTAL_DURATION = 900;
