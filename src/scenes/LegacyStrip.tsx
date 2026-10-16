import React from 'react';
import {AbsoluteFill, Img, interpolate, useCurrentFrame} from 'remotion';
import {IMAGES} from '../assets';
import {Backdrop} from '../components/Backdrop';
import {GoldParticles} from '../components/GoldParticles';
import {FadeUp, goldText, Kicker} from '../components/Text';
import {COLORS} from '../theme';

const LEGACY_PHOTOS = [
  IMAGES.legacy1,
  IMAGES.legacy3,
  IMAGES.legacy6,
  IMAGES.legacy2,
  IMAGES.legacy5,
  IMAGES.legacy4,
  IMAGES.legacy7,
];

const CARD_W = 380;
const CARD_H = 500;
const GAP = 34;

/**
 * Scene 4 (13.5–18s): proof of work — a drifting filmstrip of past
 * convocation seasons on warm cards over the light backdrop.
 */
export const LegacyStrip: React.FC = () => {
  const frame = useCurrentFrame();

  const stripWidth = LEGACY_PHOTOS.length * (CARD_W + GAP);
  const xOffset = interpolate(frame, [0, 135], [80, -(stripWidth - 1080 + 80)]);

  const enter = interpolate(frame, [0, 12], [0, 1], {extrapolateRight: 'clamp'});
  const exit = interpolate(frame, [123, 135], [1, 0], {extrapolateLeft: 'clamp'});

  return (
    <AbsoluteFill style={{opacity: enter * exit}}>
      <Backdrop glow="terracotta" />
      <GoldParticles seed="legacy" count={18} intensity={0.6} />

      {/* Header */}
      <AbsoluteFill style={{alignItems: 'center', paddingTop: 80}}>
        <Kicker delay={4}>A trusted tradition</Kicker>
        <FadeUp delay={10} style={{marginTop: 22}}>
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 64,
              textAlign: 'center',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              ...goldText,
            }}
          >
            SEASON AFTER SEASON
          </div>
        </FadeUp>
        <FadeUp delay={18} style={{marginTop: 16}}>
          <div
            style={{
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              fontSize: 31,
              color: COLORS.navy,
              textAlign: 'center',
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Hundreds of Unilorin graduates. One studio they return to.
          </div>
        </FadeUp>
      </AbsoluteFill>

      {/* Drifting filmstrip */}
      <div
        style={{
          position: 'absolute',
          top: 330,
          left: 0,
          display: 'flex',
          gap: GAP,
          transform: `translateX(${xOffset}px)`,
        }}
      >
        {LEGACY_PHOTOS.map((src, i) => {
          const tilt = i % 2 === 0 ? -2 : 2;
          return (
            <div
              key={i}
              style={{
                width: CARD_W,
                height: CARD_H,
                flexShrink: 0,
                borderRadius: 24,
                overflow: 'hidden',
                transform: `rotate(${tilt}deg) translateY(${i % 2 === 0 ? 0 : 30}px)`,
                border: `3px solid ${COLORS.white}`,
                boxShadow: '0 22px 50px rgba(28,26,20,0.3)',
              }}
            >
              <Img
                src={src}
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
