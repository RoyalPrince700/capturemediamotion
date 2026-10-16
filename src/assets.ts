import {staticFile} from 'remotion';

export const IMAGES = {
  cmlLogo: staticFile('images/capturemedialablogo.png'),
  unilorinLogo: staticFile('images/unilorinlogopng.png'),
  convo41Logo: staticFile('images/41stconvologo.png'),
  flier: staticFile('images/convolabflierpackages.jpeg'),
  // Recent (41st convocation season) editorial shots
  recent1: staticFile('images/IMG_5277.jpg.jpeg'),
  recent2: staticFile('images/IMG_5280.jpg.jpeg'),
  recent3: staticFile('images/IMG_5290.jpg.jpeg'),
  // Previous years (37th–39th) — warm terracotta classics
  legacy1: staticFile('images/a2 copy (1).jpg'),
  legacy2: staticFile('images/a9 copy.jpg'),
  legacy3: staticFile('images/Iyanu 2.jpg'),
  legacy4: staticFile('images/m2 copy (1).jpg'),
  legacy5: staticFile('images/n2 copy (1).jpg'),
  legacy6: staticFile('images/r1 copy.jpg'),
  legacy7: staticFile('images/s1 copy.jpg'),
} as const;

export const SFX = {
  chime: staticFile('sfx/chime.wav'),
  click: staticFile('sfx/click.wav'),
  ding: staticFile('sfx/ding.wav'),
  fanfare: staticFile('sfx/fanfare.wav'),
  pop: staticFile('sfx/pop.wav'),
  scroll: staticFile('sfx/scroll.wav'),
  sparkle: staticFile('sfx/sparkle.wav'),
  swoosh: staticFile('sfx/swoosh.wav'),
} as const;
