import React, {useMemo} from 'react';
import {AbsoluteFill, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../theme';

type Particle = {
  x: number;
  size: number;
  speed: number;
  phase: number;
  drift: number;
  opacity: number;
};

/**
 * Floating gold dust, tuned for the light ivory background —
 * deeper gold tones at lower opacity so it reads as elegant confetti.
 * Deterministic (seeded) so renders are stable.
 */
export const GoldParticles: React.FC<{
  count?: number;
  seed?: string;
  intensity?: number;
}> = ({count = 34, seed = 'gold', intensity = 1}) => {
  const frame = useCurrentFrame();
  const {height, width} = useVideoConfig();

  const particles = useMemo<Particle[]>(
    () =>
      new Array(count).fill(0).map((_, i) => ({
        x: random(`${seed}-x-${i}`) * width,
        size: 3 + random(`${seed}-s-${i}`) * 12,
        speed: 0.35 + random(`${seed}-v-${i}`) * 1.1,
        phase: random(`${seed}-p-${i}`) * Math.PI * 2,
        drift: 16 + random(`${seed}-d-${i}`) * 44,
        opacity: 0.1 + random(`${seed}-o-${i}`) * 0.35,
      })),
    [count, seed, width]
  );

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {particles.map((p, i) => {
        const y =
          height + 60 - ((frame * p.speed * 2.2 + p.phase * 160) % (height + 180));
        const x = p.x + Math.sin(frame / 40 + p.phase) * p.drift;
        const twinkle = 0.65 + 0.35 * Math.sin(frame / 9 + p.phase * 3);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: COLORS.gold,
              opacity: p.opacity * twinkle * intensity,
              filter: `blur(${p.size > 8 ? 3 : 1}px)`,
              boxShadow: `0 0 ${p.size * 1.5}px ${COLORS.goldLight}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
