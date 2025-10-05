# Mini-Game 1 — Shield the Earth

> **Format:** Gamified interactive scene — Earth in center, solar flares approach from all directions, player uses a rotating shield (cursor-control) to block them. The Sun is a speaking character who apologizes for flares and explains the magnetic shield story during play.

---

## 1. Overview

**Goal:** Teach young players (kids) what solar flares/CMEs are and how Earth’s magnetic field protects us, by letting them actively defend Earth. The Sun is personified and gives short, friendly commentary (apologies/explanations) as events happen.

**Target platform:** Browser (HTML5 Canvas + JavaScript). Ideal for prototyping in Cursor IDE. Implementation can be done with raw canvas, p5.js, or Phaser.js depending on dev preference.

**Estimated scope for hackathon:** Single-level playable demo with 3 difficulty waves + one small boss/CME event; placeholder art acceptable.

---

## 2. Core Mechanics

- Earth sits at the center of the screen.
- A circular shield (an arc) rotates around Earth. The shield angle follows the mouse/touch or the player can rotate with left/right keys (optional).
- Solar flares spawn at random positions along the screen border and move in straight trajectories toward Earth's center.
- If the shield arc overlaps the incoming flare when it reaches the collision radius, the flare is blocked.
- Hits subtract from Earth health; blocked flares increase score and trigger Sun dialogue.
- Difficulty scales by spawn rate, speed, and number of simultaneous flares.

---

## 3. Story & Educational Integration

- **Narrator / Guide:** The Sun is a friendly character with short lines. The Sun’s tone is apologetic and curious — explains "I didn’t mean to!" rather than lecturing.
- Dialogue triggers:
  - Intro (before wave starts)
  - On block
  - On hit
  - On win/level complete
  - On lose
- Dialogue is short (1–2 sentences) and child-friendly.

**Example Sun Lines**
- Intro: "Hi, I’m Sunny the Sun! Sometimes I sneeze out solar flares... Oops! Can you help Earth by spinning the shield?"
- Block: "Nice! That’s how Earth’s magnetic field helps — like a big, invisible shield!"
- Hit: "Oh no — I didn’t mean to hurt you. That one slipped through."
- Win: "You’re a Solar Defender! Thanks for protecting Earth!"
- Lose: "I’m sorry. Scientists watch for these so we can be ready next time."

---

## 4. Controls / Input

**Primary (recommended):** Mouse / touch drag around circular dial
- The shield angle maps to the cursor angle from screen center.
- On touch devices, moving finger around the screen rotates the shield.

**Fallback / Optional controls:**
- Left / Right arrow keys rotate the shield slowly.
- Space or click could toggle a temporary full-circle shield (limited/charged), optional advanced mechanic.

Accessibility notes: ensure keyboard controls exist for players who can’t use a mouse.

---

## 5. UI Layout

- **Background:** Starfield / simple space gradient.
- **Center:** Earth sprite (circle) with atmosphere glow.
- **Around Earth:** Rotating shield arc (semi-transparent colored arc with glow).
- **Top-left:** Sun sprite (face) with dialogue speech bubble.
- **Top-right:** Score and wave indicator.
- **Bottom-left:** Earth Health bar (hearts or green bar).
- **Bottom-right:** Pause/Menu button.

---

## 6. Visual & Audio Assets (Placeholders OK)

**Sprites / Graphics**
- Sun (cartoon face)
- Earth (simple globe)
- Shield arc (glowing semi-transparent arc)
- Flare (fiery projectile)
- UI icons (heart, star badge)

**Audio**
- Short cheerful confirm sound on successful block
- Gentle "ouch" or low tone when Earth is hit
- Light background ambient space music (looped, low volume)

*Use NASA SVS clips/images only as inspiration unless you check licensing for reuse. Prefer original or freely-licensed art for hackathon demo.*

---

## 7. Level & Difficulty Design

**Wave 1 (Tutorial)**
- Slow flares, spawn interval 2.5–3s, single direction.
- Shield arc wide (60°) to teach basics.
- Short intro dialogue from Sun.

**Wave 2 (Intermediate)**
- Faster flares, spawn interval 1.5–2s.
- Shield arc narrows (40°) or rotates slightly slower.
- Randomized spawn angles.

**Wave 3 (Advanced)**
- Multiple flares spawn (2 at once), faster speed.
- Occasionally a "split" flare that divides mid-flight.

**Boss: CME Wave**
- A larger CME object arrives: it is wide (covers big angle) and moves slower but requires either rapid tapping to maintain shield or a charged full-circle shield toggle.

**Win condition:** Survive through all waves with at least 1 health remaining.
**Loss condition:** Earth health reaches 0.

---

## 8. Scoring & Rewards

- +10 points per blocked flare.
- +25 points for blocking rapid sequence (combo multiplier).
- +100 points for blocking the boss/CME.
- Show final "Solar Defender" badge and a short summary of what the Sun said / learned.

---

## 9. Pseudocode / Implementation Notes

**Data Structures**
- `Game` { state, score, health, waveIndex, flares[] }
- `Flare` { position, velocity, size, id }
- `Shield` { angle, arcWidth, active }
- `Sun` { dialogueQueue }

**Main Loop**
```js
function update(dt) {
  spawnLogic(dt);
  flares.forEach(f => f.update(dt));
  shield.angle = getAngleFromInput();
  flares.forEach(f => {
    if (distance(f.position, earth.position) <= collisionRadius) {
      if (shield.coversAngle(f.angle)) blockFlare(f);
      else hitEarth(f);
    }
  });
  render();
}
```

**Key functions**
- `spawnFlare()` — choose spawn angle, position outside screen, set velocity toward center.
- `getAngleFromInput()` — compute angle between cursor/touch and center.
- `shield.coversAngle(angle)` — returns true if the flare's incoming angle is within the shield arc.
- `blockFlare(f)` — remove flare, add score, trigger Sun.block dialogue.
- `hitEarth(f)` — remove flare, decrement health, trigger Sun.hit dialogue.

---

## 10. UX & Feedback

- Provide instant visual feedback when flares are blocked (shield pulse, small shockwave).
- Show Sun speech bubbles for short durations (2–3s) with friendly voice if you plan to add voice later.
- Show a quick "Did you know?" micro summary on level complete (optional).

---

## 11. Testing & Tuning

- Tune spawn rates so the first wave is clearly winnable without much practice.
- Playtest for 5–10 runs and adjust shield arc width and flare speeds.
- Ensure controls are responsive on desktop and touch devices.

---

## 12. Accessibility & Safety

- Keyboard control alternative (left/right to rotate, space to toggle shield).
- Large fonts and high-contrast UI for visibility.
- Avoid flashing lights that could trigger photosensitive users; use gentle transitions.

---

## 13. Future Enhancements (Post-hackathon)

- Add localized narration and voice-overs for the Sun.
- Add more characters (farmer, pilot) that appear after certain waves.
- Track player progress and unlock illustrated "aurora postcards" as rewards.
- Integrate real-time space weather data (NOAA SWPC) for an advanced mode.

---

## 14. Resources & Attribution

- Use the NASA / NOAA resources for factual accuracy and inspiration. Cite them on the final slide or credits page.
  - NASA Space Weather: https://science.nasa.gov/heliophysics/focus-areas/space-weather
  - Solar storms & flares: https://science.nasa.gov/sun/solar-storms-and-flares/
  - NOAA SWPC: https://www.swpc.noaa.gov/
  - SVS visualizations: https://svs.gsfc.nasa.gov/

---

## 15. Quick Implementation Checklist (for Cursor IDE)

- [ ] Create project files: `index.html`, `style.css`, `game.js`.
- [ ] Implement canvas setup and main loop.
- [ ] Draw Earth and shield; map mouse/touch to shield angle.
- [ ] Implement flare spawning and movement toward center.
- [ ] Implement collision detection and block/hit logic.
- [ ] Add Sun dialogue system and UI elements (score, health).
- [ ] Polish visuals and add sounds.

---

If you want, I can now generate a ready-to-paste `index.html`, `style.css`, and `game.js` starter template tailored for Cursor IDE — or a more detailed storyboard with exact UI pixel placements. Which would you like next?

