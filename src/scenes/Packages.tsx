import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {Backdrop} from '../components/Backdrop';
import {GoldParticles} from '../components/GoldParticles';
import {FadeUp, goldText, Kicker} from '../components/Text';
import {COLORS} from '../theme';

type Tier = {
  name: string;
  price: string;
  features: string[];
  accent: string;
  popular?: boolean;
};

const TIERS: Tier[] = [
  {
    name: 'BASIC',
    price: '₦15,000',
    features: ['3 Retouched Pictures', 'One Outfit'],
    accent: COLORS.grey,
  },
  {
    name: 'STANDARD',
    price: '₦30,000',
    features: ['5 Retouched Pictures', 'Group Combo', 'One Outfit'],
    accent: COLORS.red,
  },
  {
    name: 'PREMIUM',
    price: '₦55,000',
    features: [
      '8 Retouched Pictures',
      'Group Combo',
      'Shoot Reels',
      'Two Outfits',
    ],
    accent: COLORS.gold,
    popular: true,
  },
];

const TIER_DURATION = 80;

const TierCard: React.FC<{tier: Tier; index: number}> = ({tier, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const cardIn = spring({
    frame,
    fps,
    config: {damping: 15, stiffness: 110, mass: 0.8},
  });

  const priceIn = spring({
    frame: frame - 8,
    fps,
    config: {damping: 10, stiffness: 140},
  });

  const isLast = index === TIERS.length - 1;
  const fadeOut = isLast
    ? 1
    : interpolate(frame, [TIER_DURATION - 10, TIER_DURATION], [1, 0], {
        extrapolateLeft: 'clamp',
      });
  const lastExit = isLast
    ? interpolate(frame, [TIER_DURATION + 8, TIER_DURATION + 20], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;

  const shimmer = interpolate(frame % 60, [0, 60], [-500, 1200]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeOut * lastExit,
        paddingTop: 120,
      }}
    >
      <div
        style={{
          width: 700,
          borderRadius: 36,
          padding: '42px 54px',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: COLORS.white,
          border: `3px solid ${tier.popular ? COLORS.gold : 'rgba(27,42,91,0.15)'}`,
          boxShadow: tier.popular
            ? '0 30px 70px rgba(138,106,31,0.3)'
            : '0 30px 70px rgba(28,26,20,0.18)',
          transform: `translateY(${(1 - cardIn) * 120}px) scale(${0.93 + cardIn * 0.07})`,
          opacity: cardIn,
        }}
      >
        {/* Gold shimmer sweep on premium */}
        {tier.popular ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(105deg, transparent 42%, rgba(193,154,46,0.12) 50%, transparent 58%)',
              transform: `translateX(${shimmer}px)`,
            }}
          />
        ) : null}

        {tier.popular ? (
          <div
            style={{
              position: 'absolute',
              top: 30,
              right: -64,
              transform: 'rotate(38deg)',
              backgroundColor: COLORS.red,
              color: COLORS.white,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: '0.16em',
              padding: '8px 80px',
            }}
          >
            MOST LOVED
          </div>
        ) : null}

        {/* Tier label */}
        <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: tier.accent,
              boxShadow: `0 0 16px ${tier.accent}`,
            }}
          />
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: 32,
              letterSpacing: '0.3em',
              color: COLORS.navy,
            }}
          >
            {tier.name}
          </div>
        </div>

        {/* Price */}
        <div
          style={{
            marginTop: 16,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 900,
            fontSize: 108,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            transform: `scale(${0.75 + priceIn * 0.25})`,
            transformOrigin: 'left center',
            opacity: priceIn,
            ...goldText,
          }}
        >
          {tier.price}
        </div>

        {/* Features */}
        <div style={{marginTop: 28, display: 'flex', flexDirection: 'column', gap: 16}}>
          {tier.features.map((f, i) => {
            const featIn = spring({
              frame: frame - 14 - i * 5,
              fps,
              config: {damping: 14, stiffness: 150},
            });
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  opacity: featIn,
                  transform: `translateX(${(1 - featIn) * 50}px)`,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 11,
                    backgroundColor: 'rgba(193,154,46,0.12)',
                    border: `1px solid ${COLORS.gold}`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: COLORS.goldDeep,
                    fontSize: 21,
                    fontWeight: 800,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  ✓
                </div>
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: 31,
                    color: COLORS.ink,
                  }}
                >
                  {f}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress dots */}
      <div style={{display: 'flex', gap: 14, marginTop: 34}}>
        {TIERS.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === index ? 44 : 13,
              height: 13,
              borderRadius: 8,
              backgroundColor:
                i === index ? COLORS.gold : 'rgba(27,42,91,0.2)',
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

/**
 * Scene 5 (18–26.5s): the three packages from the flier, one card at
 * a time. Premium gets the gold treatment.
 */
export const Packages: React.FC = () => {
  const frame = useCurrentFrame();

  const headerIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const headerOut = interpolate(frame, [243, 255], [1, 0], {
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Backdrop glow="gold" />
      <GoldParticles seed="packages" count={22} intensity={0.7} />

      {/* Persistent header */}
      <AbsoluteFill
        style={{
          alignItems: 'center',
          paddingTop: 66,
          opacity: headerIn * headerOut,
        }}
      >
        <Kicker>Convocation Portrait Packages</Kicker>
        <FadeUp delay={6} style={{marginTop: 18}}>
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 62,
              letterSpacing: '-0.01em',
              color: COLORS.navy,
              textAlign: 'center',
            }}
          >
            Choose your tier.
          </div>
        </FadeUp>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: headerOut}}>
        {TIERS.map((tier, i) => (
          <Sequence
            key={tier.name}
            from={15 + i * TIER_DURATION}
            durationInFrames={TIER_DURATION + (i === TIERS.length - 1 ? 20 : 0)}
          >
            <TierCard tier={tier} index={i} />
          </Sequence>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
