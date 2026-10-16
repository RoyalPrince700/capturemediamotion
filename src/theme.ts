export const COLORS = {
  // Light premium base — warm ivory, like fine paper
  bg: '#FBF7EF',
  bgSoft: '#F3EBDC',
  // Gold system (Unilorin regalia + flier gold) — deepened for light bg
  gold: '#C19A2E',
  goldLight: '#E6CE8C',
  goldDeep: '#8A6A1F',
  // Capture Media Lab red (logo lens dot + flier buttons)
  red: '#E8192C',
  redDeep: '#A31220',
  // Unilorin navy (gowns + crest) — primary text color
  navy: '#1B2A5B',
  navyDeep: '#101A3A',
  // Warm terracotta (previous years' backdrops)
  terracotta: '#9C5B35',
  // Neutrals
  white: '#FFFFFF',
  ink: '#1C1A14',
  grey: '#8A8273',
} as const;

export const EASE_OUT_EXPO = (t: number): number =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
