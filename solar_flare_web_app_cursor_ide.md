# I Am a Solar Flare — Web App Plan (Cursor IDE)

> A kid-friendly interactive story + mini-game + quiz where the **Solar Flare** is the main character. This document is a single-source plan you can copy into Cursor IDE and use while building the web app.

---

## Overview

**Goal:** Create a branching interactive web app (HTML/CSS/JS) that teaches kids (6–10) about solar flares and space weather. The Solar Flare is the narrator and main character. The app includes:

- Introduction + Space Weather explainer
- Branching stories for different people affected (Farmers, Pilots, Astronauts, Power Grid, Auroras)
- A mini-game: *Shield the Earth!* (player controls a magnetic shield)
- A short quiz with badges

The app should be colorful, flat 2D cartoon style, and accessible.

---

## Assets (images you need to generate/import)

### Backgrounds
- **Space Background**: "A colorful outer space cartoon background with stars and glowing nebula clouds. Style: flat 2D cartoon, kid-friendly, vibrant and magical, no characters."

### Solar Flare Character (consistent design across poses)
- **Neutral Pose** (idle)
  - Prompt: "A playful cartoon fireball character with a smiling face, big expressive eyes, and short flame-like arms and legs. Style: glowing orange and red, flat 2D cartoon, child-friendly."
- **Waving Pose**
  - Prompt: "The same cartoon fireball character waving happily with one flaming hand, smiling wide. Style: glowing orange-red, flat 2D cartoon, child-friendly, same design as neutral pose."
- **Sparkling Pose**
  - Prompt: "The same cartoon fireball character surrounded by tiny glowing sparkles ✨, looking calm and friendly. Style: flat 2D cartoon, glowing effect, kid-friendly, same design as neutral pose."
- **Fireworks Burst Pose**
  - Prompt: "The same cartoon fireball character bursting outward like playful fireworks 🎆, with streaks of light and plasma arcs, still smiling and friendly. Style: flat 2D cartoon, colorful, child-friendly, same design as neutral pose."

> Note: keep a *master consistency tag* and add it at the end of each prompt: `"master: cartoon fireball mascot, round glowing body, big eyes, flame arms and legs, consistent across poses"` to ensure uniformity.

---

## Scene Scripts & Visuals

All narration is **first-person** (Solar Flare = narrator). Keep tone curious, apologetic, and playful.

### Scene 0 — Start Screen
- Visuals: Space background, title text, big Start button.
- Copy: **I Am a Solar Flare – My Journey to Earth**
- CTA: Start

### Scene 1 — Introduction (Meet the Solar Flare)
- Visual: Solar Flare (neutral → waving)
- Narration (script):
  > "Hey there! 👋 I’m a Solar Flare. I was born on the surface of the Sun when things got a little… explosive! 💥 I’m made of energy, light, and charged particles rushing through space at super speed. I may look fiery, but I want to tell you my story."
- Animation cues: small bounce and a friendly wave.
- Button: Next (-> Space Weather)

### Scene 2 — What is Space Weather?
- Visual: Solar Flare (sparkling) floating toward Earth with particles visible.
- Narration (script):
  > "I’m part of something called **space weather**. Just like Earth has storms and winds, space has its own storms — but made of energy and particles. Space weather includes: \n• **Solar flares** (that’s me!) \n• **Solar wind** — streams of tiny charged particles always flowing from the Sun 🌬️ \n• **CMEs (Coronal Mass Ejections)** — giant clouds of plasma the Sun sometimes throws out 🌌 \nTogether, these can shake up satellites, power grids, airplanes, and even make beautiful lights in the sky called auroras. But don’t worry — Earth has a magnetic field that acts like a shield 🛡️, protecting people most of the time. Still, when I’m very strong, I can cause some trouble!"
- Animation cues: flowing waves of particles moving toward Earth; magnetic field lines visualized as soft arcs around the planet.
- After narration: show branching prompt (friendly tone):
  > "I don’t always mean to cause trouble… but sometimes people on Earth feel my powerful energy in different ways. Would you like to see whose story I should share first?"

---

## Branch Scenes (scripts + visuals)

> Each branch is short (~20–40 words of narration) and ends with buttons: **Back to Choices** and **Continue Story**.

### Farmers 🌱
- Visual: Farmer with a tablet/GPS; screen shows scrambled icons. Solar Flare looks apologetic.
- Script:
  > "Farmers use satellites to check their crops and plan harvests. But when I burst too strongly, I can scramble satellite signals. Their screens show weird symbols—oops, sorry! It makes farming tricky even though I don’t mean to cause confusion."

### Pilots ✈️
- Visual: Airplane near polar region; radio console shows static. Solar Flare peeks outside window, sad.
- Script:
  > "Pilots use radios to talk to airports and keep flights safe. My energy can make their radios fuzzy. Sometimes planes change course to avoid my stormy side. I never want to spoil their trip—I just shine a little too bright sometimes!"

### Astronauts 🧑‍🚀
- Visual: Spacecraft/ISS with astronaut moving to a shielded compartment.
- Script:
  > "Astronauts are the closest to me in space. My radiation is powerful up there, so they go into shielded rooms. I don’t want to scare them—I just can’t help being full of energy!"

### Power Grid ⚡
- Visual: City at night, some lights flickering off and on.
- Script:
  > "Electricity travels on giant power lines to light cities. When I’m super strong, I can overload those lines. That makes lights flicker or even go out for a while. I know blackouts aren’t fun—but it’s my stormy energy rushing through."

### Auroras 🌌 (positive branch)
- Visual: Kids watching curtains of green/purple lights; Solar Flare twirling happily.
- Script:
  > "When my energy dances with Earth’s atmosphere and magnetic field, the sky glows with colors—green, pink, purple, and blue. People call them auroras. That’s my gift to Earth, a colorful way of saying hello!"

---

## Transitions & Branching UX

- After Scene 2 show a **choice menu** (5 buttons). Selecting a branch loads that scene.
- Keep the UI consistent: Title, image area (left or center), narration text box (bottom), nav buttons (Back to Choices / Continue Story).
- Mark branches visited. Unlock the **Cosmic Goodbye** and **Play Game** only after all branches are visited OR show the greeting even if not all branches are seen but encourage exploration.

---

## Mini-Game — Shield the Earth!

**Concept:** Player controls a semicircular magnetic shield orbiting/rotating around Earth to block incoming Solar Flare projectiles. Each blocked flare = +1 point. Missed flares damage Earth (health bar). Timer-based level or wave-based.

**Basic mechanics (suggested):**
- Controls: mouse drag (rotate shield) or left/right arrow keys.
- Spawn: fireball projectiles with varying speeds/angles.
- Scoring: +1 per block; combos for multiple blocks in a row.
- Difficulty: increases with time (more frequent projectiles).
- Win/lose: Reach target score before Earth health runs out OR survive until timer ends.

**Assets needed:** small projectile sprites (mini solar flares), Earth sprite, shield sprite. Optionally sound effects for block/hit.

---

## Quiz (Learning Reinforcement)

- 4–6 multiple-choice questions (simplified). Example:
  1. What is a solar flare? (A burst of energy from the Sun) ✅
  2. What protects Earth from many solar flares? (Earth’s magnetic field) ✅
  3. Which of these can be caused by solar flares? (Satellite GPS disruption / Power outages)
  4. What beautiful event can solar flares cause? (Auroras) ✅

- Show score and a badge with encouraging copy: "Well done, Space Explorer!".

---

## Implementation Plan (Milestones)

1. **Scaffold app & scene system** (HTML/CSS + JS) — navigation, scene templates, placeholder images.
2. **Import final images** (space bg + flare poses) and wire them to scenes.
3. **Add simple CSS transitions** (fade, slide) and small JS animations (bouncing, sparks).
4. **Implement branching menu** + visited-state logic.
5. **Build mini-game** (simple canvas or div-based physics).
6. **Add quiz** and scoring.
7. **Polish UI**: sound effects, accessibility (alt text, readable fonts), responsive layout.
8. **Testing & iteration**.

---

## Suggested File Structure

```
/solar-flare-webapp
  /assets
    space-bg.png
    flare-neutral.png
    flare-wave.png
    flare-sparkle.png
    flare-burst.png
    earth.png
    shield.png
    flare-projectile.png
  index.html
  style.css
  app.js
  game.js
  quiz.js
```

---

## Starter Code Snippets

### index.html (skeleton)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>I Am a Solar Flare</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <main id="app">
    <!-- Scenes container -->
    <div id="scene-container"></div>
  </main>
  <script src="app.js"></script>
</body>
</html>
```

### app.js (scene system outline)

```js
const scenes = {}; // store scene renderers or templates
let visited = { farmers:false, pilots:false, astronauts:false, power:false, auroras:false };
let currentScene = 'start';

function renderScene(name) {
  // basic switch to inject HTML into #scene-container
}

// wire up Next / Back buttons with event listeners
```

> Use this skeleton as the Cursor IDE starting point and expand each scene into its own template or function.

---

## UX Notes & Accessibility

- Keep narration text short and readable. Use a large sans-serif font for kids.
- Provide an option to **play narration audio** for younger users.
- Ensure buttons are big and spaced, high contrast.
- Provide keyboard navigation for the game (left/right arrows).

---

## To Do / Next Steps (for you)

- [ ] Generate/import all image assets using the prompts in the Assets section.
- [ ] Create the Cursor IDE project and paste this markdown into the project README.
- [ ] Build the scene scaffolding (Start, Intro, Space Weather, Branch menu).
- [ ] Wire one branch (e.g., Farmers) to test navigation and animations.
- [ ] Implement the game skeleton (canvas) and test controls.

---

## Credits & Notes

- Story and script inspired by your earlier content and refined for child-friendly tone.
- Keep iterations small — test early with kids if possible.

---

If you want, I can now:
- Generate the **HTML/CSS/JS starter files** for Scene 0–Scene 2 (Intro + Space Weather + branching menu) and put them into the document as code blocks, or
- Generate the image prompts again with a consistent master tag, or
- Begin writing the **game.js** canvas code for the Shield the Earth mini-game.

Which next step would you like?

