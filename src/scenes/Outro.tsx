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
import {FadeUp, goldText} from '../components/Text';
import {COLORS} from '../theme';

/**
 * Scene 6 (26.5–30s): booking CTA with contacts, location and the
 * crests. Fast entrances — only 3.5 seconds.
 */
export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const logoIn = spring({frame, fps, config: {damping: 14, stiffness: 120}});

  const ctaIn = spring({
    frame: frame - 16,
    fps,
    config: {damping: 11, stiffness: 130},
  });
  const ctaPulse = 1 + 0.025 * Math.sin((frame - 16) / 6);

  return (
    <AbsoluteFill>
      <Backdrop glow="gold" />
      <GoldParticles seed="outro" count={36} />

      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 70px',
          gap: 30,
        }}
      >
        {/* Navy brand card with white logo */}
        <div
          style={{
            width: 480,
            borderRadius: 28,
            padding: '34px 44px',
            background: `linear-gradient(160deg, ${COLORS.navy} 0%, ${COLORS.navyDeep} 80%)`,
            border: `2px solid ${COLORS.gold}`,
            boxShadow: '0 20px 50px rgba(27,42,91,0.3)',
            transform: `scale(${logoIn})`,
            opacity: logoIn,
          }}
        >
          <Img src={IMAGES.cmlLogo} style={{width: '100%'}} />
        </div>

        {/* CTA button */}
        <div
          style={{
            marginTop: 6,
            transform: `scale(${ctaIn * ctaPulse})`,
            opacity: ctaIn,
            background: `linear-gradient(180deg, ${COLORS.red} 0%, ${COLORS.redDeep} 100%)`,
            borderRadius: 999,
            padding: '26px 64px',
            boxShadow:
              '0 18px 50px rgba(232,25,44,0.35), inset 0 2px 0 rgba(255,255,255,0.25)',
          }}
        >
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 46,
              letterSpacing: '0.04em',
              color: COLORS.white,
              whiteSpace: 'nowrap',
            }}
          >
            BOOK YOUR SLOT NOW
          </div>
        </div>

        {/* Contacts */}
        <FadeUp delay={30} duration={12} style={{textAlign: 'center'}}>
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 46,
              letterSpacing: '0.04em',
              ...goldText,
            }}
          >
            0904 747 2624 · 0814 735 3112
          </div>
          <div
            style={{
              marginTop: 12,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: 27,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: COLORS.navy,
            }}
          >
            MFM Junction · University Road · Ilorin
          </div>
          <div
            style={{
              marginTop: 10,
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              fontSize: 26,
              color: COLORS.grey,
            }}
          >
            Frames available — memories beyond your screen.
          </div>
        </FadeUp>

        {/* Partner crests */}
        <FadeUp delay={44} duration={12}>
          <div style={{display: 'flex', alignItems: 'center', gap: 40}}>
            <Img src={IMAGES.unilorinLogo} style={{height: 95}} />
            <div
              style={{
                width: 2,
                height: 74,
                backgroundColor: 'rgba(138,106,31,0.4)',
              }}
            />
            <Img src={IMAGES.convo41Logo} style={{height: 108}} />
          </div>
        </FadeUp>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
