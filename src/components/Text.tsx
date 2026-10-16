import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../theme';

/**
 * Word-by-word rising reveal (Apple keynote style).
 */
export const RisingWords: React.FC<{
  text: string;
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
  /**
   * Style applied to each word span. Put background-clip:text gradients
   * here (not on the container) — clipped gradients go invisible when
   * descendant spans carry transforms.
   */
  wordStyle?: React.CSSProperties;
}> = ({text, delay = 0, stagger = 4, style, wordStyle}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = text.split(' ');

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        columnGap: '0.28em',
        ...style,
      }}
    >
      {words.map((word, i) => {
        const s = spring({
          frame: frame - delay - i * stagger,
          fps,
          config: {damping: 16, stiffness: 120, mass: 0.7},
        });
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              transform: `translateY(${(1 - s) * 90}px)`,
              opacity: s,
              ...wordStyle,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

/**
 * Soft fade+rise for secondary lines.
 */
export const FadeUp: React.FC<{
  delay?: number;
  duration?: number;
  distance?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({delay = 0, duration = 18, distance = 40, children, style}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: (x) => 1 - Math.pow(1 - x, 3),
  });
  return (
    <div
      style={{
        opacity: t,
        transform: `translateY(${(1 - t) * distance}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * Gold shimmering headline texture.
 */
export const goldText: React.CSSProperties = {
  background: `linear-gradient(100deg, ${COLORS.goldDeep} 0%, ${COLORS.gold} 35%, #D9B855 50%, ${COLORS.gold} 65%, ${COLORS.goldDeep} 100%)`,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

/**
 * Small uppercase gold kicker label with side rules.
 */
export const Kicker: React.FC<{children: React.ReactNode; delay?: number}> = ({
  children,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [delay, delay + 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        opacity: t,
      }}
    >
      <div
        style={{
          height: 2,
          width: 70 * t,
          background: `linear-gradient(90deg, transparent, ${COLORS.gold})`,
        }}
      />
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: '0.42em',
          textTransform: 'uppercase',
          color: COLORS.goldDeep,
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </div>
      <div
        style={{
          height: 2,
          width: 70 * t,
          background: `linear-gradient(90deg, ${COLORS.gold}, transparent)`,
        }}
      />
    </div>
  );
};
