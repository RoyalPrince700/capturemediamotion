import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../theme';

/**
 * Light premium backdrop: warm ivory with a slowly breathing soft
 * gold wash — fine-paper feel.
 */
export const Backdrop: React.FC<{glow?: 'gold' | 'navy' | 'terracotta'}> = ({
  glow = 'gold',
}) => {
  const frame = useCurrentFrame();
  const breathe = 1 + 0.08 * Math.sin(frame / 55);

  const glowColor =
    glow === 'navy'
      ? 'rgba(27,42,91,0.10)'
      : glow === 'terracotta'
        ? 'rgba(156,91,53,0.14)'
        : 'rgba(193,154,46,0.16)';

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.bg}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse ${95 * breathe}% ${65 * breathe}% at 50% 28%, ${glowColor} 0%, transparent 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 130% 55% at 50% 112%, rgba(230,206,140,0.28) 0%, transparent 60%)`,
        }}
      />
    </AbsoluteFill>
  );
};

/**
 * Soft warm vignette + fine grain so the light gradients read as print.
 */
export const FilmFinish: React.FC = () => {
  const frame = useCurrentFrame();
  const grainShift = (frame * 7919) % 100;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill
        style={{
          boxShadow: 'inset 0 0 220px 40px rgba(138,106,31,0.16)',
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.035,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%272%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")',
          backgroundPosition: `${grainShift}px ${grainShift * 1.3}px`,
        }}
      />
    </AbsoluteFill>
  );
};

/**
 * Quick white flash used on hard cuts (shutter feel).
 */
export const Flash: React.FC<{at: number}> = ({at}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [at, at + 2, at + 10], [0, 0.65, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  if (opacity <= 0.01) return null;
  return <AbsoluteFill style={{backgroundColor: COLORS.white, opacity}} />;
};
