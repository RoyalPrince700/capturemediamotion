import React from 'react';
import {Composition} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Inter';
import {ConvoPromo} from './ConvoPromo';
import {FPS, TOTAL_DURATION} from './timing';

loadFont('normal', {
  weights: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ConvoPromo"
      component={ConvoPromo}
      durationInFrames={TOTAL_DURATION}
      fps={FPS}
      width={1080}
      height={1080}
    />
  );
};
