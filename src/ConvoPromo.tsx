import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  staticFile,
} from 'remotion';
import {TOTAL_DURATION} from './timing';
import {SFX} from './assets';
import {FilmFinish} from './components/Backdrop';
import {LogoIntro} from './scenes/LogoIntro';
import {TitleScene} from './scenes/TitleScene';
import {HeroMontage} from './scenes/HeroMontage';
import {LegacyStrip} from './scenes/LegacyStrip';
import {Packages} from './scenes/Packages';
import {Outro} from './scenes/Outro';
import {SCENES} from './timing';
import {COLORS} from './theme';

/**
 * Background music: fades in quickly, ducks slightly once the package
 * cards start (so the sfx pops stay crisp), and fades out over the
 * last two seconds.
 */
const BackgroundMusic: React.FC = () => {
  return (
    <Audio
      src={staticFile('bgmusic.mp3')}
      loop
      volume={(f) =>
        interpolate(
          f,
          [0, 20, SCENES.packages.from, TOTAL_DURATION - 60, TOTAL_DURATION],
          [0, 0.35, 0.35, 0.28, 0],
          {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
        )
      }
    />
  );
};

/**
 * Sound design (testmancermotion effects):
 *  chime    → logo ignition
 *  fanfare  → 41st convocation title
 *  swoosh   → each hero shot cut
 *  scroll   → legacy filmstrip drift
 *  pop      → each package card lands
 *  ding     → premium price lands
 *  sparkle  → CTA button
 *  click    → final brand lock (shutter)
 */
const SoundDesign: React.FC = () => {
  return (
    <>
      <Sequence from={2}>
        <Audio src={SFX.chime} volume={0.7} />
      </Sequence>

      <Sequence from={SCENES.title.from}>
        <Audio src={SFX.fanfare} volume={0.65} />
      </Sequence>
      <Sequence from={SCENES.title.from + 62}>
        <Audio src={SFX.sparkle} volume={0.5} />
      </Sequence>

      {/* Hero montage: swoosh on each cut */}
      {[0, 60, 120].map((offset) => (
        <Sequence key={offset} from={SCENES.heroMontage.from + offset}>
          <Audio src={SFX.swoosh} volume={0.55} />
        </Sequence>
      ))}

      <Sequence from={SCENES.legacy.from}>
        <Audio src={SFX.scroll} volume={0.5} />
      </Sequence>

      {/* Packages: pop per card, ding on premium price */}
      {[15, 95, 175].map((offset) => (
        <Sequence key={offset} from={SCENES.packages.from + offset}>
          <Audio src={SFX.pop} volume={0.65} />
        </Sequence>
      ))}
      <Sequence from={SCENES.packages.from + 175 + 10}>
        <Audio src={SFX.ding} volume={0.6} />
      </Sequence>

      {/* Outro: click on logo, sparkle on CTA */}
      <Sequence from={SCENES.outro.from + 2}>
        <Audio src={SFX.click} volume={0.6} />
      </Sequence>
      <Sequence from={SCENES.outro.from + 18}>
        <Audio src={SFX.sparkle} volume={0.6} />
      </Sequence>
    </>
  );
};

export const ConvoPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: COLORS.bg}}>
      <Sequence
        from={SCENES.logoIntro.from}
        durationInFrames={SCENES.logoIntro.duration}
      >
        <LogoIntro />
      </Sequence>

      <Sequence from={SCENES.title.from} durationInFrames={SCENES.title.duration}>
        <TitleScene />
      </Sequence>

      <Sequence
        from={SCENES.heroMontage.from}
        durationInFrames={SCENES.heroMontage.duration}
      >
        <HeroMontage />
      </Sequence>

      <Sequence from={SCENES.legacy.from} durationInFrames={SCENES.legacy.duration}>
        <LegacyStrip />
      </Sequence>

      <Sequence
        from={SCENES.packages.from}
        durationInFrames={SCENES.packages.duration}
      >
        <Packages />
      </Sequence>

      <Sequence from={SCENES.outro.from} durationInFrames={SCENES.outro.duration}>
        <Outro />
      </Sequence>

      <FilmFinish />
      <BackgroundMusic />
      <SoundDesign />

      {/*
        VOICE OVER: once you generate the VO from script.md, drop the file
        at public/voiceover.mp3 and uncomment:

        <Audio src={staticFile('voiceover.mp3')} volume={1} />
      */}
    </AbsoluteFill>
  );
};
