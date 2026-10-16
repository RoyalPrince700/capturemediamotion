# Capture Media Lab — Unilorin 41st Convocation Promo

A 30-second, 1080×1080 (square, WhatsApp-friendly) Remotion motion-design
video promoting the Capture Media Lab convocation shoot packages.
Light ivory/gold theme with navy brand cards.

## Commands

```bash
npm start        # open Remotion Studio (live preview + scrub timeline)
npm run render   # render the final video to out/convo-promo.mp4
npm run still    # export a poster frame to out/poster.png
```

## Adding the voice-over

1. Open `script.md`, copy the script, and generate the VO online
   (ElevenLabs, PlayHT, etc.).
2. Save the audio as `public/voiceover.mp3`.
3. In `src/ConvoPromo.tsx`, uncomment the voice-over `<Audio>` tag at the
   bottom (and add `staticFile` to the `remotion` import).
4. Re-render: `npm run render`.

## Structure

- `src/timing.ts` — scene start frames/durations (everything syncs off this)
- `src/theme.ts` — brand colors (black/gold/red + Unilorin navy)
- `src/scenes/` — the six scenes in order:
  1. `LogoIntro` — red lens dot ignites, logo light-sweep (chime)
  2. `TitleScene` — Unilorin crest + "THE 41ST CONVOCATION" (fanfare)
  3. `HeroMontage` — recent editorial shots, Ken Burns + power words (swoosh)
  4. `LegacyStrip` — drifting filmstrip of past seasons (scroll)
  5. `Packages` — Basic ₦15k / Standard ₦30k / Premium ₦55k cards (pop, ding)
  6. `Outro` — CTA button, phone numbers, location, crests (sparkle, click)
- `public/images/` — your photos and logos
- `public/sfx/` — sound effects pulled from the testmancermotion repo

## Tweaking

- Prices/features: edit the `TIERS` array in `src/scenes/Packages.tsx`.
- Phone numbers/location: `src/scenes/Outro.tsx`.
- Which photos appear: `src/assets.ts` and the `SHOTS` / `LEGACY_PHOTOS`
  arrays in the hero and legacy scenes.
