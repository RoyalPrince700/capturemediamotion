import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {IMAGES} from '../assets';
import {Backdrop} from '../components/Backdrop';
import {GoldParticles} from '../components/GoldParticles';
import {COLORS} from '../theme';

/**
 * Scene 1 (0–2.5s): red lens dot ignites → the white wordmark reveals
 * on a navy brand card (keeps the white logo visible on the light theme).
 */
export const LogoIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();

  const dotScale = spring({frame, fps, config: {damping: 11, stiffness: 140}});
  const dotPulse = 1 + 0.12 * Math.sin(frame / 4);
  const dotFade = interpolate(frame, [12, 22], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cardIn = spring({
    frame: frame - 10,
    fps,
    config: {damping: 14, stiffness: 110, mass: 0.8},
  });

  const sweepX = interpolate(frame, [18, 48], [-width, width], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const tagIn = interpolate(frame, [34, 48], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const exit = interpolate(frame, [62, 75], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: (t) => t * t,
  });

  return (
    <AbsoluteFill>
      <Backdrop glow="gold" />
      <GoldParticles seed="intro" count={20} intensity={0.8} />

      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${1 + exit * 0.3})`,
          opacity: 1 - exit,
        }}
      >
        {/* Red lens dot */}
        <div
          style={{
            position: 'absolute',
            width: 40 * dotScale * dotPulse,
            height: 40 * dotScale * dotPulse,
            borderRadius: '50%',
            backgroundColor: COLORS.red,
            boxShadow: `0 0 50px ${COLORS.red}`,
            opacity: dotFade,
          }}
        />

        {/* Navy brand card with white logo */}
        <div
          style={{
            position: 'relative',
            width: 640,
            borderRadius: 40,
            padding: '70px 60px',
            background: `linear-gradient(160deg, ${COLORS.navy} 0%, ${COLORS.navyDeep} 80%)`,
            border: `2px solid ${COLORS.gold}`,
            boxShadow: '0 30px 80px rgba(27,42,91,0.35)',
            overflow: 'hidden',
            opacity: cardIn,
            transform: `scale(${0.85 + cardIn * 0.15})`,
          }}
        >
          <Img
            src={IMAGES.cmlLogo}
            style={{
              width: '100%',
              filter: 'drop-shadow(0 6px 24px rgba(0,0,0,0.4))',
            }}
          />
          {/* Light sweep */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(105deg, transparent 40%, rgba(255,246,214,0.5) 50%, transparent 60%)',
              transform: `translateX(${sweepX}px)`,
            }}
          />
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 30,
            fontFamily: 'Inter, sans-serif',
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            color: COLORS.goldDeep,
            opacity: tagIn,
            transform: `translateY(${(1 - tagIn) * 20}px)`,
          }}
        >
          Every moment, captured
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
