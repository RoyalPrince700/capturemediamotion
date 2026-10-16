import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {IMAGES} from '../assets';
import {Flash} from '../components/Backdrop';
import {COLORS} from '../theme';

const SHOT_DURATION = 60;

type Shot = {
  src: string;
  word: string;
  sub: string;
  fromScale: number;
  toScale: number;
  fromX: number;
  toX: number;
};

const SHOTS: Shot[] = [
  {
    src: IMAGES.recent1,
    word: 'YOUR MOMENT.',
    sub: 'Editorial studio portraits',
    fromScale: 1.16,
    toScale: 1.0,
    fromX: -24,
    toX: 16,
  },
  {
    src: IMAGES.recent2,
    word: 'YOUR STORY.',
    sub: 'Directed. Lit. Perfected.',
    fromScale: 1.0,
    toScale: 1.14,
    fromX: 20,
    toX: -16,
  },
  {
    src: IMAGES.recent3,
    word: 'YOUR LEGACY.',
    sub: 'Studio-grade lighting',
    fromScale: 1.14,
    toScale: 1.0,
    fromX: 0,
    toX: 24,
  },
];

const HeroShot: React.FC<{shot: Shot; index: number}> = ({shot, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const scale = interpolate(frame, [0, SHOT_DURATION], [shot.fromScale, shot.toScale]);
  const x = interpolate(frame, [0, SHOT_DURATION], [shot.fromX, shot.toX]);

  const fadeIn = interpolate(frame, [0, 7], [0, 1], {extrapolateRight: 'clamp'});
  const fadeOut = interpolate(frame, [SHOT_DURATION - 8, SHOT_DURATION], [1, 0], {
    extrapolateLeft: 'clamp',
  });

  const wordIn = spring({
    frame: frame - 8,
    fps,
    config: {damping: 14, stiffness: 130, mass: 0.7},
  });
  const subIn = interpolate(frame, [18, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const counter = `0${index + 1} — 03`;

  return (
    <AbsoluteFill style={{opacity: fadeIn * fadeOut, backgroundColor: COLORS.bg}}>
      <AbsoluteFill style={{overflow: 'hidden'}}>
        <Img
          src={shot.src}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '50% 20%',
            transform: `scale(${scale}) translateX(${x}px)`,
          }}
        />
        {/* Legibility gradient at the base of the photo */}
        <AbsoluteFill
          style={{
            background:
              'linear-gradient(180deg, transparent 50%, rgba(16,26,58,0.85) 100%)',
          }}
        />
      </AbsoluteFill>

      {/* Kinetic word */}
      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          padding: '0 70px 92px',
        }}
      >
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 900,
            fontSize: 92,
            letterSpacing: '-0.02em',
            color: COLORS.white,
            lineHeight: 1,
            transform: `translateY(${(1 - wordIn) * 90}px)`,
            opacity: wordIn,
            textShadow: '0 8px 40px rgba(0,0,0,0.7)',
          }}
        >
          {shot.word}
        </div>
        <div
          style={{
            marginTop: 18,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            opacity: subIn,
          }}
        >
          <div style={{width: 46, height: 3, backgroundColor: COLORS.red}} />
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: 27,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: COLORS.goldLight,
            }}
          >
            {shot.sub}
          </div>
        </div>
      </AbsoluteFill>

      {/* Slide counter */}
      <div
        style={{
          position: 'absolute',
          top: 54,
          right: 60,
          fontFamily: 'Inter, sans-serif',
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: '0.3em',
          color: 'rgba(255,255,255,0.85)',
          textShadow: '0 2px 12px rgba(0,0,0,0.6)',
          opacity: subIn,
        }}
      >
        {counter}
      </div>

      <Flash at={0} />
    </AbsoluteFill>
  );
};

/**
 * Scene 3 (7.5–13.5s): the recent 41st-season editorial shots, full
 * bleed, Ken Burns moves, one power word per shot.
 */
export const HeroMontage: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: COLORS.bg}}>
      {SHOTS.map((shot, i) => (
        <Sequence key={i} from={i * SHOT_DURATION} durationInFrames={SHOT_DURATION}>
          <HeroShot shot={shot} index={i} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
