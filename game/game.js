// Shield the Earth - Minimal Playable Demo

// DOM references
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const waveEl = document.getElementById('wave');
const dialogueEl = document.getElementById('dialogue');
const pauseBtn = document.getElementById('pauseBtn');

// Assets (masked drawing to avoid square backgrounds)
const assets = {
  earth: new Image(),
  flare: new Image(),
  sun: new Image(),
  heart: new Image(),
  loaded: 0,
  total: 2, // keep total for earth+flare only (sun/heart don't affect readiness checks)
};
assets.earth.onload = () => { assets.loaded++; };
assets.flare.onload = () => { assets.loaded++; };
assets.earth.src = 'earth.png';
assets.flare.src = 'solar flare.png';
assets.sun.src = 'sun.png';
assets.heart.src = 'health.png';

// Set rotation so the fireball's ball faces Earth; calibrated value from you: 220°
let FLARE_ROTATION_OFFSET = 220 * Math.PI / 180;

// Canvas size and responsive resize
function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Utility math helpers
function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
function lerp(a, b, t) { return a + (b - a) * t; }
function distance(x1, y1, x2, y2) { const dx = x2 - x1, dy = y2 - y1; return Math.hypot(dx, dy); }
function angleBetween(x1, y1, x2, y2) { return Math.atan2(y2 - y1, x2 - x1); }
function normAngle(a) { while (a <= -Math.PI) a += Math.PI * 2; while (a > Math.PI) a -= Math.PI * 2; return a; }

// Game state
const game = {
  state: 'intro', // 'intro', 'playing', 'outro', 'paused'
  running: true,
  time: 0,
  score: 0,
  health: 5,
  waveIndex: 0,
  flares: [],
  effects: [],
  introTime: 0,
  outroTime: 0,
  showInstructions: false,
};

// Center (Earth)
function centerX() { return window.innerWidth / 2; }
function centerY() { return window.innerHeight / 2; }
const earth = {
  radius: 64,
};

// Shield
const shield = {
  angle: 0,
  arcWidth: (60 * Math.PI) / 180, // start wide, 60 degrees
  radius: earth.radius + 8,
  rotateSpeed: (140 * Math.PI) / 180, // deg/s via keyboard
  fullShield: { active: false, duration: 2200, cooldown: 7000, remaining: 0, cdRemaining: 0 },
  covers(angle) {
    if (this.fullShield.active) return true;
    const diff = Math.abs(normAngle(angle - this.angle));
    return diff <= this.arcWidth / 2;
  },
};

// Input
let keys = new Set();
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'Left') keys.add('left');
  if (e.key === 'ArrowRight' || e.key === 'Right') keys.add('right');
  if (e.key.toLowerCase() === 'p') togglePause();
  if (e.code === 'Space') triggerFullShield();
  if (e.key === '[') {
    FLARE_ROTATION_OFFSET -= Math.PI / 36; // -5°
    setDialogue(`Flare offset: ${Math.round(FLARE_ROTATION_OFFSET * 180 / Math.PI)}°`, 800);
  }
  if (e.key === ']') {
    FLARE_ROTATION_OFFSET += Math.PI / 36; // +5°
    setDialogue(`Flare offset: ${Math.round(FLARE_ROTATION_OFFSET * 180 / Math.PI)}°`, 800);
  }
});
window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'Left') keys.delete('left');
  if (e.key === 'ArrowRight' || e.key === 'Right') keys.delete('right');
});

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  shield.angle = angleBetween(centerX(), centerY(), x, y);
});

canvas.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    const t = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = t.clientX - rect.left;
    const y = t.clientY - rect.top;
    shield.angle = angleBetween(centerX(), centerY(), x, y);
  }
}, { passive: true });

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  if (game.state === 'intro') {
    handleIntroClick(x, y);
  } else if (game.state === 'outro') {
    handleOutroClick(x, y);
  }
});

canvas.addEventListener('touchstart', (e) => {
  if (e.touches.length > 0) {
    const t = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = t.clientX - rect.left;
    const y = t.clientY - rect.top;
    
    if (game.state === 'intro') {
      handleIntroClick(x, y);
    } else if (game.state === 'outro') {
      handleOutroClick(x, y);
    }
  }
}, { passive: true });

pauseBtn.addEventListener('click', () => togglePause());

function togglePause() {
  if (game.state === 'playing') {
    game.state = 'paused';
    game.running = false;
    pauseBtn.textContent = 'Resume';
  } else if (game.state === 'paused') {
    game.state = 'playing';
    game.running = true;
    pauseBtn.textContent = 'Pause';
    requestAnimationFrame(loop);
  }
}

function triggerFullShield() {
  if (shield.fullShield.active) return;
  if (shield.fullShield.cdRemaining > 0) return;
  shield.fullShield.active = true;
  shield.fullShield.remaining = shield.fullShield.duration;
  setDialogue("Full shield activated!", 1200);
}

function setDialogue(text, ms = 2000) {
  dialogueEl.textContent = text;
  clearTimeout(setDialogue._t);
  setDialogue._t = setTimeout(() => {
    if (dialogueEl.textContent === text) dialogueEl.textContent = '';
  }, ms);
}

// Sun lines
const SUN = {
  intro: "Hi, I’m Sunny the Sun! Can you help Earth by spinning the shield?",
  block: "Nice! That’s how Earth’s magnetic field helps!",
  hit: "Oh no — I didn’t mean to!",
  win: "You’re a Solar Defender!",
  lose: "I’m sorry. Scientists watch so we can be ready next time.",
};

// Flare factory
let flareId = 0;
function spawnFlare(speedMin, speedMax, sizeMin = 12, sizeMax = 18) {
  const angle = Math.random() * Math.PI * 2;
  const margin = 60;
  const w = window.innerWidth + margin * 2;
  const h = window.innerHeight + margin * 2;
  const r = Math.max(w, h) * 0.5;
  const cx = centerX();
  const cy = centerY();
  const sx = cx + Math.cos(angle) * r;
  const sy = cy + Math.sin(angle) * r;
  const speed = lerp(speedMin, speedMax, Math.random());
  const size = lerp(sizeMin, sizeMax, Math.random());
  const angToCenter = angleBetween(sx, sy, cx, cy);
  const vx = Math.cos(angToCenter) * speed;
  const vy = Math.sin(angToCenter) * speed;
  game.flares.push({ id: ++flareId, x: sx, y: sy, vx, vy, angle: angToCenter, size, boss: false });
}

function spawnBossCME() {
  const angle = Math.random() * Math.PI * 2;
  const margin = 60;
  const r = Math.max(window.innerWidth, window.innerHeight) * 0.6 + margin;
  const cx = centerX();
  const cy = centerY();
  const sx = cx + Math.cos(angle) * r;
  const sy = cy + Math.sin(angle) * r;
  const angToCenter = angleBetween(sx, sy, cx, cy);
  const speed = 55; // slower for easier boss
  const vx = Math.cos(angToCenter) * speed;
  const vy = Math.sin(angToCenter) * speed;
  game.flares.push({ id: ++flareId, x: sx, y: sy, vx, vy, angle: angToCenter, size: 60, boss: true, hp: 2 });
}

// Waves
const waves = [
  { name: 'Wave 1', duration: 14000, spawnEachMs: 3000, speedMin: 90,  speedMax: 130, arcWidth: 70 },
  { name: 'Wave 2', duration: 16000, spawnEachMs: 2200, speedMin: 130, speedMax: 180, arcWidth: 52 },
  { name: 'Wave 3', duration: 18000, spawnEachMs: 1500, speedMin: 180, speedMax: 240, arcWidth: 46 },
  { name: 'CME Boss', duration: 12000, spawnBoss: true, arcWidth: 46 },
];
let waveTimer = 0;
let spawnTimer = 0;

function startGame() {
  game.state = 'playing';
  game.running = true;
  game.time = 0;
  game.score = 0;
  game.health = 5;
  game.waveIndex = 0;
  game.flares.length = 0;
  waveTimer = 0;
  spawnTimer = 0;
  shield.fullShield.active = false;
  shield.fullShield.remaining = 0;
  shield.fullShield.cdRemaining = 1200; // short initial cooldown so space not accidental
  game.earthZoomTime = 0; // Start zoom animation
  // Show HTML UI elements for gameplay
  scoreEl.style.display = 'block';
  waveEl.style.display = 'block';
  pauseBtn.style.display = 'block';
  setDialogue(SUN.intro, 3000);
  requestAnimationFrame(loop);
}

function startIntro() {
  game.state = 'intro';
  game.running = true;
  game.introTime = 0;
  game.showInstructions = false;
  // Reset UI elements for clean intro screen
  scoreEl.textContent = '';
  waveEl.textContent = '';
  dialogueEl.textContent = '';
  // Hide HTML UI elements
  scoreEl.style.display = 'none';
  waveEl.style.display = 'none';
  pauseBtn.style.display = 'none';
  requestAnimationFrame(loop);
}

function startOutro(won) {
  game.state = 'outro';
  game.running = true;
  game.outroTime = 0;
  game.won = won;
  // Clear dialogue for clean outro screen
  dialogueEl.textContent = '';
  // Hide HTML UI elements
  scoreEl.style.display = 'none';
  waveEl.style.display = 'none';
  pauseBtn.style.display = 'none';
  requestAnimationFrame(loop);
}

function handleIntroClick(x, y) {
  const cx = centerX();
  const cy = centerY();
  
  // Start button
  if (isPointInButton(x, y, cx, cy + 20, 140, 50)) {
    startGame();
  }
  // Instructions button
  else if (isPointInButton(x, y, cx, cy + 80, 140, 50)) {
    game.showInstructions = !game.showInstructions;
  }
}

function handleOutroClick(x, y) {
  const cx = centerX();
  const cy = centerY();
  
  // Try Again button
  if (isPointInButton(x, y, cx, cy + 60, 140, 50)) {
    startGame();
  }
  // Menu button
  else if (isPointInButton(x, y, cx, cy + 120, 140, 50)) {
    startIntro();
  }
}

function isPointInButton(x, y, bx, by, bw, bh) {
  return x >= bx - bw/2 && x <= bx + bw/2 && y >= by - bh/2 && y <= by + bh/2;
}

function drawButton(x, y, w, h, bgColor, textColor, text, isHovered = false) {
  // Button shadow
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(x - w/2 + 3, y - h/2 + 3, w, h);
  
  // Button background with gradient
  const gradient = ctx.createLinearGradient(x - w/2, y - h/2, x - w/2, y + h/2);
  gradient.addColorStop(0, bgColor);
  gradient.addColorStop(1, isHovered ? lightenColor(bgColor, 20) : darkenColor(bgColor, 10));
  ctx.fillStyle = gradient;
  
  // Rounded rectangle
  const radius = 8;
  ctx.beginPath();
  ctx.roundRect(x - w/2, y - h/2, w, h, radius);
  ctx.fill();
  
  // Button border
  ctx.strokeStyle = isHovered ? '#ffffff' : 'rgba(255,255,255,0.4)';
  ctx.lineWidth = isHovered ? 3 : 2;
  ctx.stroke();
  
  // Button text with shadow
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.font = 'bold 18px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(text, x + 1, y + 8);
  
  ctx.fillStyle = textColor;
  ctx.fillText(text, x, y + 7);
}

function lightenColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

function darkenColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = (num >> 8 & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;
  return "#" + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
    (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
    (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1);
}

function drawInstructionsPanel(x, y) {
  const w = 400;
  const h = 200;
  const panelX = x - w/2;
  const panelY = y - h/2;
  
  // Panel background
  ctx.fillStyle = 'rgba(0,0,0,0.8)';
  ctx.fillRect(panelX, panelY, w, h);
  
  // Panel border
  ctx.strokeStyle = '#66f7ff';
  ctx.lineWidth = 2;
  ctx.strokeRect(panelX, panelY, w, h);
  
  // Instructions text
  ctx.fillStyle = '#ffffff';
  ctx.font = '14px system-ui, sans-serif';
  ctx.textAlign = 'left';
  
  const instructions = [
    '• Move mouse to rotate the shield',
    '• Block solar flares with the shield arc',
    '• Press Space for temporary full shield',
    '• Survive all waves to win',
    '• Hearts show your health',
    '• Press P to pause'
  ];
  
  let textY = panelY + 30;
  for (const line of instructions) {
    ctx.fillText(line, panelX + 20, textY);
    textY += 25;
  }
  
  // Close instruction
  ctx.fillStyle = '#9fb9ff';
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Click Instructions again to close', x, panelY + h - 15);
}

function nextWave() {
  game.waveIndex++;
  waveTimer = 0;
  spawnTimer = 0;
  if (game.waveIndex >= waves.length) {
    // Win
    startOutro(true);
  } else {
    setDialogue(`${waves[game.waveIndex].name} begins!`, 1800);
  }
}

function update(dt) {
  // Handle different game states
  if (game.state === 'intro') {
    // No auto-advance, wait for button clicks
    return;
  }
  
  if (game.state === 'outro') {
    // No auto-advance, wait for button clicks
    return;
  }
  
  if (game.state === 'paused') {
    return;
  }

  // Handle Earth zoom animation during gameplay
  if (game.state === 'playing' && game.earthZoomTime !== undefined) {
    game.earthZoomTime += dt * 1000;
    if (game.earthZoomTime > 2000) { // 2 second zoom
      game.earthZoomTime = undefined;
    }
  }

  // Keyboard rotation
  if (keys.has('left')) shield.angle -= shield.rotateSpeed * dt;
  if (keys.has('right')) shield.angle += shield.rotateSpeed * dt;

  // Full shield timer & cooldown
  if (shield.fullShield.active) {
    shield.fullShield.remaining -= dt * 1000;
    if (shield.fullShield.remaining <= 0) {
      shield.fullShield.active = false;
      shield.fullShield.cdRemaining = shield.fullShield.cooldown;
      setDialogue("Full shield cooling down...", 1000);
    }
  } else if (shield.fullShield.cdRemaining > 0) {
    shield.fullShield.cdRemaining -= dt * 1000;
    if (shield.fullShield.cdRemaining < 0) shield.fullShield.cdRemaining = 0;
  }

  // Waves
  const w = waves[game.waveIndex];
  waveEl.textContent = w.name;
  shield.arcWidth = (w.arcWidth * Math.PI) / 180;
  waveTimer += dt * 1000;
  if (w.spawnBoss) {
    if (spawnTimer <= 0 && !game.flares.some(f => f.boss)) {
      spawnBossCME();
      spawnTimer = 999999; // stop spawning more
    }
  } else {
    spawnTimer -= dt * 1000;
    if (spawnTimer <= 0) {
      // Occasionally two flares in later waves (reduced chance)
      const multi = game.waveIndex >= 2 && Math.random() < 0.2 ? 2 : 1;
      for (let i = 0; i < multi; i++) spawnFlare(w.speedMin, w.speedMax);
      spawnTimer = w.spawnEachMs;
    }
  }

  // Update flares
  const cx = centerX();
  const cy = centerY();
  // Use scaled shield radius for collision
  const earthScale = game.earthZoomTime !== undefined ? 0.3 + Math.min(game.earthZoomTime / 2000, 1) * 0.7 : 1;
  const collideR = (earth.radius + 8) * earthScale;
  for (let i = game.flares.length - 1; i >= 0; i--) {
    const f = game.flares[i];
    f.x += f.vx * dt;
    f.y += f.vy * dt;
    const d = distance(f.x, f.y, cx, cy);
    if (d <= collideR) {
      // Use the flare's polar angle around Earth (center->flare) so it matches the shield's angle basis
      const incomingAngle = angleBetween(cx, cy, f.x, f.y);
      const covered = shield.covers(incomingAngle);
      if (covered) {
        // Boss takes multiple blocks
        if (f.boss) {
          f.hp -= 1;
          spawnPulseEffect(cx, cy, '#66f7ff');
          setDialogue(SUN.block, 900);
          if (f.hp <= 0) {
            game.score += 100;
            game.flares.splice(i, 1);
            nextWave();
          } else {
            // Push boss slightly back
            f.x += Math.cos(f.angle) * -40;
            f.y += Math.sin(f.angle) * -40;
          }
        } else {
          game.score += 10;
          setDialogue(SUN.block, 900);
          spawnPulseEffect(f.x, f.y, '#8ef7a7');
          game.flares.splice(i, 1);
        }
      } else {
        // Hit Earth
        game.health -= f.boss ? 2 : 1;
        setDialogue(SUN.hit, 900);
        spawnPulseEffect(cx, cy, '#ff6b6b');
        game.flares.splice(i, 1);
        if (game.health <= 0) {
          game.health = 0;
          startOutro(false);
        }
      }
    }
    // Remove when past center just in case
    if (d < earth.radius - 6) {
      game.flares.splice(i, 1);
    }
  }

  // Advance wave timer
  if (!w.spawnBoss && waveTimer >= w.duration) nextWave();

  // Update UI
  scoreEl.textContent = `Score: ${game.score}`;
}

function spawnPulseEffect(x, y, color) {
  game.effects.push({ x, y, r: 6, color, life: 350 });
}

function renderBackground() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, '#060a13');
  g.addColorStop(1, '#0a1222');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // Simple stars
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = '#9fb9ff';
  for (let i = 0; i < 40; i++) {
    const x = ((i * 97) % w) + (i * 13 % 11);
    const y = ((i * 71) % h) + (i * 7 % 13);
    ctx.fillRect(x, y, 1, 1);
  }
  ctx.globalAlpha = 1;
}

function render() {
  renderBackground();

  const cx = centerX();
  const cy = centerY();

  // Render different screens based on game state
  if (game.state === 'intro') {
    renderIntro();
    return;
  }
  
  if (game.state === 'outro') {
    renderOutro();
    return;
  }
  
  if (game.state === 'paused') {
    renderPaused();
    return;
  }

  // Sun portrait (bottom-left), clipped to a circle, with simple bubble using existing dialogue box
  if (assets.sun.complete) {
    const sunSize = 96;
    const sx = 84;
    const sy = window.innerHeight - 84;
    // subtle halo
    const sg = ctx.createRadialGradient(sx, sy, 10, sx, sy, sunSize * 0.7);
    sg.addColorStop(0, 'rgba(255,200,80,0.35)');
    sg.addColorStop(1, 'rgba(255,200,80,0)');
    ctx.fillStyle = sg;
    ctx.beginPath();
    ctx.arc(sx, sy, sunSize * 0.6, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.arc(sx, sy, sunSize * 0.45, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(assets.sun, sx - sunSize / 2, sy - sunSize / 2, sunSize, sunSize);
    ctx.restore();
  }

  // Earth zoom animation
  let earthScale = 1;
  if (game.earthZoomTime !== undefined) {
    const progress = Math.min(game.earthZoomTime / 2000, 1);
    earthScale = 0.3 + progress * 0.7; // Scale from 0.3 to 1.0
  }
  
  const currentRadius = earth.radius * earthScale;
  const currentShieldRadius = (earth.radius + 8) * earthScale;

  // Earth - minimal subtle glow (reduced to avoid visible gap)
  const grd = ctx.createRadialGradient(cx, cy, 6, cx, cy, currentRadius + 10);
  grd.addColorStop(0, 'rgba(79, 195, 247, 0.25)');
  grd.addColorStop(1, 'rgba(79, 195, 247, 0)');
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(cx, cy, currentRadius + 12, 0, Math.PI * 2);
  ctx.fill();

  // Earth sprite clipped to circle (fallback to blue circle)
  if (assets.loaded >= assets.total && assets.earth.complete) {
    const size = currentRadius * 2;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(assets.earth, cx - size / 2, cy - size / 2, size, size);
    ctx.restore();
  } else {
    ctx.fillStyle = '#1e90ff';
    ctx.beginPath();
    ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Shield arc or full shield (use scaled radius)
  if (shield.fullShield.active) {
    ctx.strokeStyle = '#66f7ff';
    ctx.lineWidth = 8;
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.arc(cx, cy, currentShieldRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  } else {
    ctx.strokeStyle = '#a7f3d0';
    ctx.lineWidth = 10;
    const start = shield.angle - shield.arcWidth / 2;
    const end = shield.angle + shield.arcWidth / 2;
    ctx.beginPath();
    ctx.arc(cx, cy, currentShieldRadius, start, end);
    ctx.stroke();
  }

  // Effects
  for (let i = game.effects.length - 1; i >= 0; i--) {
    const e = game.effects[i];
    e.life -= 16;
    e.r += 2.2;
    if (e.life <= 0) game.effects.splice(i, 1);
    ctx.globalAlpha = clamp(e.life / 350, 0, 1);
    ctx.strokeStyle = e.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // Flares (sprite clipped to circle; fallback to colored circle)
  for (const f of game.flares) {
    if (assets.loaded >= assets.total && assets.flare.complete) {
      const size = f.boss ? f.size * 3.6 : f.size * 3.2;
      ctx.save();
      ctx.beginPath();
      ctx.arc(f.x, f.y, size / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.translate(f.x, f.y);
      // face toward Earth each frame; add offset so the ball side is toward Earth
      ctx.rotate(angleBetween(f.x, f.y, cx, cy) + FLARE_ROTATION_OFFSET);
      ctx.drawImage(assets.flare, -size / 2, -size / 2, size, size);
      ctx.restore();
    } else {
      ctx.fillStyle = f.boss ? '#ffb84d' : '#ff884d';
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Only show game UI during gameplay
  if (game.state === 'playing') {
    // Hearts (top-left)
    const hx = 12;
    const hy = 12;
    const heartSize = 22;
    for (let i = 0; i < game.health; i++) {
      if (assets.heart.complete) {
        ctx.drawImage(assets.heart, hx + i * (heartSize + 6), hy, heartSize, heartSize);
      } else {
        ctx.fillStyle = '#ff6b6b';
        ctx.beginPath();
        ctx.arc(hx + i * (heartSize + 6) + heartSize / 2, hy + heartSize / 2, heartSize / 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Full shield stamina bar (under hearts)
    const barW = 120;
    const barH = 8;
    const bx = hx;
    const by = hy + heartSize + 8;
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(bx, by, barW, barH);
    let pct;
    if (shield.fullShield.active) pct = clamp(shield.fullShield.remaining / shield.fullShield.duration, 0, 1);
    else pct = 1 - clamp(shield.fullShield.cdRemaining / shield.fullShield.cooldown, 0, 1);
    ctx.fillStyle = '#66f7ff';
    ctx.fillRect(bx, by, Math.max(0, Math.min(barW, barW * pct)), barH);
    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.strokeRect(bx + 0.5, by + 0.5, barW - 1, barH - 1);
  }
}

function renderIntro() {
  const cx = centerX();
  const cy = centerY();
  
  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SHIELD THE EARTH', cx, cy - 100);
  
  // Subtitle
  ctx.font = '20px system-ui, sans-serif';
  ctx.fillStyle = '#a7f3d0';
  ctx.fillText('Protect Earth from Solar Flares!', cx, cy - 60);
  
  // Buttons
  drawButton(cx, cy + 20, 140, 50, '#66f7ff', '#ffffff', 'START');
  drawButton(cx, cy + 80, 140, 50, '#a7f3d0', '#1e293b', 'INSTRUCTIONS');
  
  // Instructions panel
  if (game.showInstructions) {
    drawInstructionsPanel(cx, cy + 140);
  }
  
  // Earth preview
  const earthSize = earth.radius * 0.6;
  
  if (assets.loaded >= assets.total && assets.earth.complete) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy + 200, earthSize, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(assets.earth, cx - earthSize, cy + 200 - earthSize, earthSize * 2, earthSize * 2);
    ctx.restore();
  } else {
    ctx.fillStyle = '#1e90ff';
    ctx.beginPath();
    ctx.arc(cx, cy + 200, earthSize, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.textAlign = 'left';
}

function renderOutro() {
  const cx = centerX();
  const cy = centerY();
  
  if (game.won) {
    // Win screen
    ctx.fillStyle = '#8ef7a7';
    ctx.font = 'bold 42px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('VICTORY!', cx, cy - 80);
    
    ctx.font = '24px system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('You are a Solar Defender!', cx, cy - 40);
    
    ctx.font = '18px system-ui, sans-serif';
    ctx.fillStyle = '#a7f3d0';
    ctx.fillText(`Final Score: ${game.score}`, cx, cy - 10);
    ctx.fillText('Thanks for protecting Earth!', cx, cy + 20);
  } else {
    // Lose screen
    ctx.fillStyle = '#ff6b6b';
    ctx.font = 'bold 42px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', cx, cy - 80);
    
    ctx.font = '24px system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Earth needs more protection!', cx, cy - 40);
    
    ctx.font = '18px system-ui, sans-serif';
    ctx.fillStyle = '#ffb3b3';
    ctx.fillText(`Score: ${game.score}`, cx, cy - 10);
    ctx.fillText('Try again to become a Solar Defender!', cx, cy + 20);
  }
  
  // Buttons
  drawButton(cx, cy + 60, 140, 50, '#66f7ff', '#ffffff', 'TRY AGAIN');
  drawButton(cx, cy + 120, 140, 50, '#a7f3d0', '#1e293b', 'MENU');
  
  ctx.textAlign = 'left';
}

function renderPaused() {
  const cx = centerX();
  const cy = centerY();
  
  // Dark overlay
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  
  // Paused text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('PAUSED', cx, cy);
  
  ctx.font = '18px system-ui, sans-serif';
  ctx.fillStyle = '#a7f3d0';
  ctx.fillText('Press P or click Resume to continue', cx, cy + 40);
  
  ctx.textAlign = 'left';
}

let lastTime = 0;
function loop(ts) {
  if (!game.running) return;
  if (!lastTime) lastTime = ts;
  const dt = clamp((ts - lastTime) / 1000, 0, 0.05);
  lastTime = ts;
  game.time += dt;
  update(dt);
  render();
  requestAnimationFrame(loop);
}

// Start with intro
startIntro();


