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
import {goldText, Kicker, RisingWords} from '../components/Text';
import {COLORS} from '../theme';

/**
 * Scene 2 (2.5–7.5s): Unilorin crest + the 41st Convocation announcement.
 * Square layout: crest and 41st badge flank the headline.
 */
export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const crestIn = spring({frame, fps, config: {damping: 14, stiffness: 110}});

  const badgeIn = spring({
    frame: frame - 62,
    fps,
    config: {damping: 13, stiffness: 120},
  });

  const ringRotate = frame / 3;

  const exit = interpolate(frame, [136, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: (t) => t * t,
  });

  return (
    <AbsoluteFill>
      <Backdrop glow="navy" />
      <GoldParticles seed="title" count={30} />

      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          gap: 30,
          opacity: 1 - exit,
          transform: `translateY(${exit * -60}px)`,
          padding: 60,
        }}
      >
        {/* Crest + 41st badge side by side */}
        <div style={{display: 'flex', alignItems: 'center', gap: 70}}>
          <div
            style={{
              position: 'relative',
              width: 230,
              height: 230,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transform: `scale(${crestIn})`,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: -20,
                borderRadius: '50%',
                border: `2px dashed rgba(138,106,31,0.5)`,
                transform: `rotate(${ringRotate}deg)`,
              }}
            />
            <Img
              src={IMAGES.unilorinLogo}
              style={{
                width: 205,
                filter: 'drop-shadow(0 14px 34px rgba(27,42,91,0.3))',
              }}
            />
          </div>

          <div
            style={{
              transform: `scale(${badgeIn}) rotate(${(1 - badgeIn) * -12}deg)`,
              opacity: badgeIn,
            }}
          >
            <Img
              src={IMAGES.convo41Logo}
              style={{
                width: 250,
                filter: 'drop-shadow(0 14px 34px rgba(27,42,91,0.25))',
              }}
            />
          </div>
        </div>

        <Kicker delay={16}>University of Ilorin</Kicker>

        <RisingWords
          text="THE 41ST CONVOCATION"
          delay={26}
          stagger={5}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: 92,
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            textAlign: 'center',
            maxWidth: 900,
          }}
          wordStyle={goldText}
        />

        <RisingWords
          text="Your crowning moment deserves more than a photo."
          delay={46}
          stagger={2}
          style={{
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            fontSize: 36,
            color: COLORS.navy,
            textAlign: 'center',
            maxWidth: 760,
            lineHeight: 1.35,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
