// Solar Flare Web App - Scene System
let currentScene = 'start';
let visitedBranches = {
    farmers: false,
    pilots: false,
    astronauts: false,
    power: false,
    auroras: false
};

// Scene data
const scenes = {
    start: {
        title: "I Am a Solar Flare",
        subtitle: "My Journey to Earth",
        content: `
            <div class="start-scene-content">
                <div class="cosmic-intro">
                    <div class="floating-stars">
                        <div class="star star-1">✨</div>
                        <div class="star star-2">⭐</div>
                        <div class="star star-3">🌟</div>
                        <div class="star star-4">💫</div>
                    </div>
                    <div class="welcome-text">
                        <h3>Welcome to Space!</h3>
                        <p>Join me on an amazing journey from the Sun to Earth</p>
                    </div>
                </div>
            </div>
        `,
        speech: "Welcome to my cosmic adventure! I'm a Solar Flare, and I want to share my story with you. Are you ready to explore space with me?",
        buttons: [
            { text: "🚀 Start Adventure", action: "intro", class: "btn btn-primary" }
        ]
    },
    
    intro: {
        title: "Meet the Solar Flare",
        content: `
            <div class="intro-scene-content">
                <div class="character-showcase">
                    <div class="sun-surface">
                        <div class="sun-glow"></div>
                        <div class="sun-core">☀️</div>
                    </div>
                    <div class="energy-particles">
                        <div class="particle particle-1">⚡</div>
                        <div class="particle particle-2">✨</div>
                        <div class="particle particle-3">💫</div>
                        <div class="particle particle-4">🌟</div>
                    </div>
                </div>
                <div class="intro-text">
                    <h3>I'm Born from the Sun!</h3>
                    <p>When the Sun gets excited, I burst out with energy, light, and charged particles!</p>
                </div>
            </div>
        `,
        speech: "Hey there! 👋 I'm a Solar Flare. I was born on the surface of the Sun when things got a little… explosive! 💥 I'm made of energy, light, and charged particles rushing through space at super speed. I may look fiery, but I want to tell you my story. I don't aim for Earth on purpose! 🌍 The Sun's magnetic forces and solar wind push me through space. 💨 Sometimes Earth just happens to be in my path — lucky timing! ☀️",
        buttons: [
            { text: "Follow My Journey", action: "journey", class: "btn" }
        ]
    },
    
    journey: {
        title: "My Journey Through Space",
        content: `
            <div class="journey-scene-content">
                <div class="journey-visualization">
                    <div class="sun-start">☀️</div>
                    <div class="journey-path">
                        <div class="path-line"></div>
                        <div class="journey-particles">
                            <div class="particle particle-1">💫</div>
                            <div class="particle particle-2">✨</div>
                            <div class="particle particle-3">🌟</div>
                            <div class="particle particle-4">💫</div>
                        </div>
                    </div>
                    <div class="earth-destination">🌍</div>
                    <div class="magnetic-field">
                        <div class="field-line field-1"></div>
                        <div class="field-line field-2"></div>
                        <div class="field-line field-3"></div>
                    </div>
                    <div class="aurora-effect">
                        <div class="aurora-light aurora-1"></div>
                        <div class="aurora-light aurora-2"></div>
                        <div class="aurora-light aurora-3"></div>
                    </div>
                </div>
                <div class="journey-text">
                    <h3>My Journey Through Space is Wild and Full of Surprises!</h3>
                    <p>Pushed by the Sun's magnetic forces, I race through space and cause Earth's auroras to glow!</p>
                </div>
            </div>
        `,
        speech: "I'm powered by the Sun's magnetic forces and carried across space by the solar wind. Space offers no resistance, so I travel millions of kilometers freely. When I reach Earth, my charged particles strike its atmosphere, causing brilliant auroras to dance near the poles.",
        buttons: [
            { text: "Learn About Space Weather", action: "spaceWeather", class: "btn" }
        ]
    },
    
    spaceWeather: {
        title: "What is Space Weather?",
        content: `
            <div class="space-weather-content">
                <div class="space-weather-diagram">
                    <div class="sun-source clickable-detail" data-detail="sun">☀️</div>
                        <div class="space-phenomena">
                            <div class="phenomenon solar-flare clickable-detail" data-detail="solar-flare">
                                <div class="icon">⚡</div>
                                <div class="label">Solar Flares</div>
                            </div>
                            <div class="phenomenon solar-wind clickable-detail" data-detail="solar-wind">
                                <div class="icon">🌬️</div>
                                <div class="label">Solar Wind</div>
                            </div>
                            <div class="phenomenon cme clickable-detail" data-detail="cme">
                                <div class="icon">🌌</div>
                                <div class="label">CMEs</div>
                            </div>
                            <div class="phenomenon radiation-storm clickable-detail" data-detail="radiation-storm">
                                <div class="icon">☢️</div>
                                <div class="label">Radiation Storms</div>
                            </div>
                            <div class="phenomenon solar-cycle clickable-detail" data-detail="solar-cycle">
                                <div class="icon">🔄</div>
                                <div class="label">Solar Cycle</div>
                            </div>
                            <div class="phenomenon solar-storm clickable-detail" data-detail="solar-storm">
                                <div class="icon">🌪️</div>
                                <div class="label">Solar Storms</div>
                            </div>
                        </div>
                    <div class="earth-target clickable-detail" data-detail="earth">🌍</div>
                    <div class="magnetic-shield clickable-detail" data-detail="magnetic-field">🛡️</div>
                </div>
                <div class="space-weather-text">
                    <h3>Space Has Weather Too!</h3>
                    <p>Touch any element above to learn more! The Solar Flare will explain each part in simple terms.</p>
                </div>
            </div>
        `,
        speech: "I'm part of something called space weather! Touch any part of the diagram above and I'll explain it in simple terms that are easy to understand!",
        buttons: [
            { text: "Choose a Story", action: "branchMenu", class: "btn" }
        ]
    },
    
    branchMenu: {
        title: "Choose a Story",
        content: `
            <div class="branch-menu-content">
                <div class="story-intro">
                    <h3>Whose Story Should I Share?</h3>
                    <p>I don't always mean to cause trouble, but sometimes people on Earth feel my powerful energy in different ways!</p>
                </div>
                <div class="branch-menu">
                    <button class="branch-btn" onclick="goToBranch('farmers')" data-branch="farmers">
                        <div class="branch-icon">🌱</div>
                        <div class="branch-title">Farmers</div>
                        <div class="branch-subtitle">GPS & Farming</div>
                        <div class="branch-status"></div>
                    </button>
                    <button class="branch-btn" onclick="goToBranch('pilots')" data-branch="pilots">
                        <div class="branch-icon">✈️</div>
                        <div class="branch-title">Pilots</div>
                        <div class="branch-subtitle">Radio & Navigation</div>
                        <div class="branch-status"></div>
                    </button>
                    <button class="branch-btn" onclick="goToBranch('astronauts')" data-branch="astronauts">
                        <div class="branch-icon">🧑‍🚀</div>
                        <div class="branch-title">Astronauts</div>
                        <div class="branch-subtitle">Space Radiation</div>
                        <div class="branch-status"></div>
                    </button>
                    <button class="branch-btn" onclick="goToBranch('power')" data-branch="power">
                        <div class="branch-icon">⚡</div>
                        <div class="branch-title">Power Grid</div>
                        <div class="branch-subtitle">Electricity & Cities</div>
                        <div class="branch-status"></div>
                    </button>
                    <button class="branch-btn" onclick="goToBranch('auroras')" data-branch="auroras">
                        <div class="branch-icon">🌌</div>
                        <div class="branch-title">Auroras</div>
                        <div class="branch-subtitle">Beautiful Lights</div>
                        <div class="branch-status"></div>
                    </button>
                </div>
            </div>
        `,
        speech: "Click on any story to learn how I affect people on Earth! Each story shows a different way my energy reaches Earth.",
        buttons: []
    },
    
    farmers: {
        title: "Farmers & GPS",
        content: `
            <div class="farmers-scene-content">
                <div class="farmer-scenario">
                    <div class="farmer-character">👨‍🌾</div>
                    <div class="gps-device">
                        <div class="gps-screen">
                            <div class="gps-signal normal">📡</div>
                            <div class="gps-signal scrambled">⚠️</div>
                            <div class="gps-text">GPS Signal</div>
                        </div>
                    </div>
                    <div class="satellite-disruption">
                        <div class="satellite">🛰️</div>
                        <div class="disruption-waves">
                            <div class="wave wave-1"></div>
                            <div class="wave wave-2"></div>
                            <div class="wave wave-3"></div>
                        </div>
                    </div>
                </div>
                <div class="farmers-text">
                    <h3>GPS Gets Confused!</h3>
                    <p>Farmers rely on satellites to navigate their fields and plan harvests, but my energy can scramble those signals!</p>
                </div>
            </div>
        `,
        speech: "Farmers use satellites to check their crops and plan harvests. But when I burst too strongly, I can scramble satellite signals. Their screens show weird symbols—oops, sorry! It makes farming tricky even though I don't mean to cause confusion.",
        buttons: [
            { text: "Back to Stories", action: "branchMenu", class: "btn btn-secondary" },
            { text: "Next Story", action: "nextBranch", class: "btn" }
        ]
    },
    
    pilots: {
        title: "Pilots & Radio",
        content: `
            <div class="pilots-scene-content">
                <div class="pilot-scenario">
                    <div class="airplane">✈️</div>
                    <div class="radio-console">
                        <div class="radio-screen">
                            <div class="radio-signal clear">📻</div>
                            <div class="radio-signal static">📡</div>
                            <div class="radio-text">Radio Signal</div>
                            <div class="static-bars">
                                <div class="bar bar-1"></div>
                                <div class="bar bar-2"></div>
                                <div class="bar bar-3"></div>
                                <div class="bar bar-4"></div>
                            </div>
                        </div>
                    </div>
                    <div class="pilot-character">👨‍✈️</div>
                </div>
                <div class="pilots-text">
                    <h3>Radio Gets Fuzzy!</h3>
                    <p>Pilots need clear radio communication to stay safe, but my energy can create static and interference!</p>
                </div>
            </div>
        `,
        speech: "Pilots use radios to talk to airports and keep flights safe. My energy can make their radios fuzzy. Sometimes planes change course to avoid my stormy side. I never want to spoil their trip—I just shine a little too bright sometimes!",
        buttons: [
            { text: "Back to Stories", action: "branchMenu", class: "btn btn-secondary" },
            { text: "Next Story", action: "nextBranch", class: "btn" }
        ]
    },
    
    astronauts: {
        title: "Astronauts in Space",
        content: `
            <div class="astronauts-scene-content">
                <div class="astronaut-scenario">
                    <div class="space-station">🚀</div>
                    <div class="radiation-shield">
                        <div class="shield-visual">
                            <div class="shield-layer layer-1"></div>
                            <div class="shield-layer layer-2"></div>
                            <div class="shield-layer layer-3"></div>
                        </div>
                        <div class="radiation-particles">
                            <div class="particle particle-1">⚡</div>
                            <div class="particle particle-2">✨</div>
                            <div class="particle particle-3">💫</div>
                        </div>
                    </div>
                    <div class="astronaut-character">🧑‍🚀</div>
                </div>
                <div class="astronauts-text">
                    <h3>Space Radiation Protection!</h3>
                    <p>Astronauts are closest to me in space, so they need special shielded rooms to stay safe from my powerful radiation!</p>
                </div>
            </div>
        `,
        speech: "Astronauts are the closest to me in space. My radiation is powerful up there, so they go into shielded rooms. I don't want to scare them—I just can't help being full of energy!",
        buttons: [
            { text: "Back to Stories", action: "branchMenu", class: "btn btn-secondary" },
            { text: "Next Story", action: "nextBranch", class: "btn" }
        ]
    },
    
    power: {
        title: "Power Grid",
        content: `
            <div class="power-scene-content">
                <div class="power-scenario">
                    <div class="power-lines">
                        <div class="power-line line-1"></div>
                        <div class="power-line line-2"></div>
                        <div class="power-line line-3"></div>
                        <div class="power-tower">🏗️</div>
                    </div>
                    <div class="city-lights">
                        <div class="building building-1">
                            <div class="window window-1"></div>
                            <div class="window window-2"></div>
                            <div class="window window-3"></div>
                        </div>
                        <div class="building building-2">
                            <div class="window window-4"></div>
                            <div class="window window-5"></div>
                            <div class="window window-6"></div>
                        </div>
                        <div class="building building-3">
                            <div class="window window-7"></div>
                            <div class="window window-8"></div>
                            <div class="window window-9"></div>
                        </div>
                    </div>
                    <div class="electrical-surge">
                        <div class="surge-wave wave-1"></div>
                        <div class="surge-wave wave-2"></div>
                        <div class="surge-wave wave-3"></div>
                    </div>
                </div>
                <div class="power-text">
                    <h3>Power Lines Overload!</h3>
                    <p>When I'm super strong, I can overload power lines and cause lights to flicker or even go out!</p>
                </div>
            </div>
        `,
        speech: "Electricity travels on giant power lines to light cities. When I'm super strong, I can overload those lines. That makes lights flicker or even go out for a while. I know blackouts aren't fun—but it's my stormy energy rushing through.",
        buttons: [
            { text: "Back to Stories", action: "branchMenu", class: "btn btn-secondary" },
            { text: "Next Story", action: "nextBranch", class: "btn" }
        ]
    },
    
    auroras: {
        title: "Beautiful Auroras",
        content: `
            <div class="auroras-scene-content">
                <div class="aurora-scenario">
                    <div class="aurora-lights">
                        <div class="aurora-curtain curtain-1"></div>
                        <div class="aurora-curtain curtain-2"></div>
                        <div class="aurora-curtain curtain-3"></div>
                        <div class="aurora-curtain curtain-4"></div>
                    </div>
                    <div class="people-watching">
                        <div class="person person-1">👨‍👩‍👧‍👦</div>
                        <div class="person person-2">👨‍👩‍👦</div>
                    </div>
                    <div class="aurora-particles">
                        <div class="particle particle-1">✨</div>
                        <div class="particle particle-2">💫</div>
                        <div class="particle particle-3">🌟</div>
                        <div class="particle particle-4">⭐</div>
                        <div class="particle particle-5">✨</div>
                    </div>
                </div>
                <div class="auroras-text">
                    <h3>My Gift to Earth!</h3>
                    <p>When my energy dances with Earth's atmosphere, it creates beautiful auroras - my colorful way of saying hello!</p>
                </div>
            </div>
        `,
        speech: "When my energy dances with Earth's atmosphere and magnetic field, the sky glows with colors—green, pink, purple, and blue. People call them auroras. That's my gift to Earth, a colorful way of saying hello!",
        buttons: [
            { text: "Back to Stories", action: "branchMenu", class: "btn btn-secondary" },
            { text: "Play Game", action: "miniGame", class: "btn btn-primary" }
        ]
    },
    
    miniGame: {
        content: `
            <div class="game-content">
                <div class="game-canvas-container">
                    <canvas id="gameCanvas" width="800" height="600"></canvas>
                    <div class="game-ui-overlay">
                        <div class="hud-center">
                            <div id="wave">Wave 1</div>
                        </div>
                        <div class="hud-right">
                            <div id="score">Score: 0</div>
                        </div>
                        <div id="dialogue" aria-live="polite"></div>
                        <button id="pauseBtn" title="Pause / Resume (P)">Pause</button>
                    </div>
                </div>
                <div class="game-controls">
                    <button id="startGame" class="btn btn-primary">Start Game</button>
                    <button id="pauseGame" class="btn btn-secondary" style="display: none;">Pause</button>
                    <button id="resetGame" class="btn btn-secondary">Reset</button>
                </div>
                <div class="game-instructions">
                    <h3>How to Play:</h3>
                    <ul>
                        <li>🖱️ Move your mouse to rotate the magnetic shield</li>
                        <li>⚡ Block solar flares to protect Earth and earn points</li>
                        <li>🛡️ Press Space for temporary full shield (cooldown required)</li>
                        <li>⌨️ Use arrow keys for fine shield control</li>
                        <li>❤️ Keep Earth's health above 0 to survive all waves</li>
                    </ul>
                </div>
            </div>
        `,
        speech: "Now it's your turn to protect Earth! Use the magnetic shield to block my solar flares. Move your mouse to control the shield and keep Earth safe!",
        buttons: [
            { text: "Back to Stories", action: "branchMenu", class: "btn btn-secondary" },
            { text: "Take Quiz", action: "quiz", class: "btn btn-primary" }
        ]
    },
    
    quiz: {
        title: "Space Weather Quiz",
        content: `
            <div class="quiz-content">
                <div class="quiz-header">
                    <h3>Test Your Space Weather Knowledge!</h3>
                    <p>Answer these questions about what you've learned!</p>
                </div>
                <div class="quiz-container">
                    <div class="quiz-question" id="quizQuestion">
                        <h4 id="questionText">Loading question...</h4>
                        <div class="quiz-options" id="quizOptions">
                            <!-- Options will be loaded here -->
                        </div>
                    </div>
                    <div class="quiz-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" id="progressFill"></div>
                        </div>
                        <span id="questionCounter">Question 1 of 10</span>
                    </div>
                    <div class="quiz-score" id="quizScore" style="display: none;">
                        <h3>Quiz Complete!</h3>
                        <div class="score-display">
                            <div class="score-circle">
                                <span id="finalScore">0</span>
                                <small>out of 10</small>
                            </div>
                        </div>
                        <div class="score-message" id="scoreMessage"></div>
                        <div class="quiz-badges" id="quizBadges"></div>
                    </div>
                </div>
                <div class="quiz-controls">
                    <button id="startQuiz" class="btn btn-primary">Start Quiz</button>
                    <button id="nextQuestion" class="btn" style="display: none;">Next Question</button>
                    <button id="restartQuiz" class="btn btn-secondary" style="display: none;">Try Again</button>
                    <button id="backToStories" class="btn btn-secondary" style="display: none;">Back to Stories</button>
                </div>
            </div>
        `,
        speech: "Ready to test your space weather knowledge? I'll ask you some questions about what we've learned together! Don't worry, I'll be here to help if you need it!",
        buttons: [
            { text: "Back to Game", action: "miniGame", class: "btn btn-secondary" }
        ]
    }
};

// Render a scene with enhanced transitions
function renderScene(sceneName, direction = 'right') {
    const scene = scenes[sceneName];
    if (!scene) return;
    
    const container = document.getElementById('scene-container');
    const currentSceneElement = container.querySelector('.scene');
    const character = document.getElementById('solarFlareCharacter');
    const speechBubble = document.getElementById('speechBubble');
    
    // If there's a current scene, animate it out
    if (currentSceneElement) {
        // Add transition effects to character and speech bubble
        if (character) character.classList.add('scene-transition');
        if (speechBubble) speechBubble.classList.add('scene-transition');
        
        // Determine exit animation based on direction
        let exitClass;
        if (direction === 'right') {
            exitClass = 'slide-out-left';
        } else if (direction === 'left') {
            exitClass = 'slide-out-right';
        } else {
            exitClass = 'fade-out';
        }
        
        currentSceneElement.classList.add(exitClass);
        
        // Wait for exit animation to complete, then render new scene
        setTimeout(() => {
            renderNewScene(sceneName, direction);
        }, 400);
    } else {
        // No current scene, render immediately
        renderNewScene(sceneName, direction);
    }
}

function renderNewScene(sceneName, direction) {
    const scene = scenes[sceneName];
    currentScene = sceneName;
    const container = document.getElementById('scene-container');
    const character = document.getElementById('solarFlareCharacter');
    const speechBubble = document.getElementById('speechBubble');
    
    let buttonsHTML = '';
    if (scene.buttons) {
        // Filter out back/forward navigation buttons, keep story selection buttons
        const filteredButtons = scene.buttons.filter(btn => 
            btn.action !== 'back' && btn.action !== 'forward'
        );
        
        if (filteredButtons.length > 0) {
            buttonsHTML = filteredButtons.map(btn => 
                `<button class="${btn.class}" onclick="handleButtonClick('${btn.action}')">${btn.text}</button>`
            ).join('');
        }
    }
    
    // Determine enter animation based on direction and scene type
    let enterClass;
    if (direction === 'right') {
        enterClass = 'slide-in-right';
    } else if (direction === 'left') {
        enterClass = 'slide-in-left';
    } else if (sceneName === 'start') {
        enterClass = 'zoom-in';
    } else {
        enterClass = 'fade-in';
    }
    
    // Update the fixed title
    updateSceneTitle(scene.title, scene.subtitle);
    
    container.innerHTML = `
        <div class="scene ${enterClass}" data-scene="${sceneName}">
            ${scene.content ? `<div class="scene-content">${scene.content}</div>` : ''}
            <div class="scene-buttons">
                ${buttonsHTML}
            </div>
        </div>
    `;
    
    // Add character and speech bubble enter animations - simpler
    if (character) {
        character.classList.remove('scene-transition');
        character.classList.add('scene-enter');
        setTimeout(() => character.classList.remove('scene-enter'), 300);
    }
    
    if (speechBubble) {
        speechBubble.classList.remove('scene-transition');
        speechBubble.classList.add('scene-enter');
        setTimeout(() => speechBubble.classList.remove('scene-enter'), 300);
    }
    
    // Update character speech
    updateCharacterSpeech(scene);
    
    // Update branch menu buttons if this is the branch menu
    if (sceneName === 'branchMenu') {
        setTimeout(() => updateBranchMenuButtons(), 100);
    }
}

// Handle button clicks with directional transitions
function handleButtonClick(action) {
    switch(action) {
        case 'intro':
            renderScene('intro', 'right');
            break;
        case 'spaceWeather':
            renderScene('spaceWeather', 'right');
            break;
        case 'branchMenu':
            renderScene('branchMenu', 'left');
            break;
        case 'nextBranch':
            // Simple logic to go to next unvisited branch or back to menu
            const unvisited = Object.keys(visitedBranches).find(branch => !visitedBranches[branch]);
            if (unvisited) {
                goToBranch(unvisited, 'right');
            } else {
                renderScene('branchMenu', 'left');
            }
            break;
        case 'miniGame':
            renderScene('miniGame', 'right');
            break;
        default:
            renderScene(action, 'right');
    }
}

// Go to a specific branch
function goToBranch(branchName, direction = 'right') {
    console.log('Going to branch:', branchName); // Debug log
    visitedBranches[branchName] = true;
    renderScene(branchName, direction);
    // Update the branch menu buttons to show visited state
    updateBranchMenuButtons();
}

// Update branch menu button states
function updateBranchMenuButtons() {
    if (currentScene === 'branchMenu') {
        // Update button classes based on visited state
        const buttons = document.querySelectorAll('.branch-btn');
        buttons.forEach((button, index) => {
            const branchNames = ['farmers', 'pilots', 'astronauts', 'power', 'auroras'];
            const branchName = branchNames[index];
            if (visitedBranches[branchName]) {
                button.classList.add('visited');
            } else {
                button.classList.remove('visited');
            }
        });
    }
}

// Character speech functionality
function updateCharacterSpeech(scene) {
    const speechBubble = document.getElementById('speechBubble');
    const character = document.getElementById('solarFlareCharacter');
    
    // Use the speech property from the scene
    if (scene.speech) {
        speechBubble.innerHTML = scene.speech;
        speechBubble.style.display = 'block';
        
        // Position speech bubble to avoid content overlap
        positionSpeechBubble();
        
        // Add talking animation
        if (character) {
            character.classList.add('talking');
            
            // Remove talking animation after a delay
            setTimeout(() => {
                character.classList.remove('talking');
            }, 3000);
        }
    } else {
        if (speechBubble) speechBubble.style.display = 'none';
    }
}

function positionSpeechBubble() {
    // Speech bubble is now positioned with CSS, no dynamic positioning needed
    // This function is kept for compatibility but does nothing
}

// Update the fixed scene title
function updateSceneTitle(title, subtitle) {
    const titleElement = document.querySelector('.scene-title');
    if (titleElement) {
        titleElement.textContent = title;
    } else {
        // Create title element if it doesn't exist
        const titleEl = document.createElement('h1');
        titleEl.className = 'scene-title';
        titleEl.textContent = title;
        document.body.appendChild(titleEl);
    }
    
    // Handle subtitle if it exists
    const subtitleElement = document.querySelector('.scene-subtitle');
    if (subtitle) {
        if (subtitleElement) {
            subtitleElement.textContent = subtitle;
        } else {
            const subtitleEl = document.createElement('h2');
            subtitleEl.className = 'scene-subtitle';
            subtitleEl.textContent = subtitle;
            subtitleEl.style.position = 'fixed';
            subtitleEl.style.top = '100px';
            subtitleEl.style.left = '50%';
            subtitleEl.style.transform = 'translateX(-50%)';
            subtitleEl.style.fontSize = '1.4rem';
            subtitleEl.style.color = 'rgba(255, 255, 255, 0.7)';
            subtitleEl.style.zIndex = '1001';
            subtitleEl.style.textAlign = 'center';
            subtitleEl.style.margin = '0';
            document.body.appendChild(subtitleEl);
        }
    } else if (subtitleElement) {
        subtitleElement.remove();
    }
}

// Character interaction functions
function makeCharacterWave() {
    const character = document.getElementById('solarFlareCharacter');
    character.style.animation = 'none';
    setTimeout(() => {
        character.style.animation = '';
    }, 1000);
}

function makeCharacterExcited() {
    const character = document.getElementById('solarFlareCharacter');
    character.style.transform = 'scale(1.2)';
    setTimeout(() => {
        character.style.transform = 'scale(1)';
    }, 500);
}

// Initialize the app
function init() {
    // Initialize background video
    initBackgroundVideo();
    
    // Initialize touch navigation
    initTouchNavigation();
    
    renderScene('start');
    
    // Add character entrance animation
    setTimeout(() => {
        const character = document.getElementById('solarFlareCharacter');
        character.style.opacity = '0';
        character.style.transform = 'translate(-50%, -50%) scale(0.5)';
        character.style.transition = 'all 1s ease-out';
        
        setTimeout(() => {
            character.style.opacity = '1';
            character.style.transform = 'translate(-50%, -50%) scale(1)';
            
            // Add welcome wave animation
            setTimeout(() => {
                makeCharacterWave();
            }, 500);
        }, 500);
    }, 1000);
}

// Initialize background video
function initBackgroundVideo() {
    const video = document.getElementById('backgroundVideo');
    
    if (video) {
        // Ensure video starts playing
        video.addEventListener('loadeddata', () => {
            video.play().catch(e => {
                console.log('Video autoplay prevented:', e);
            });
        });
        
        // Handle video loading errors
        video.addEventListener('error', (e) => {
            console.log('Video loading error:', e);
            // Fallback to static background if video fails
            document.body.style.background = 'linear-gradient(135deg, #0a0b1e 0%, #16213e 50%, #0f3460 100%)';
        });
        
        // Optimize video performance
        video.preload = 'metadata';
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
    }
}

// Initialize touch navigation
function initTouchNavigation() {
    const leftArea = document.getElementById('touchNavLeft');
    const rightArea = document.getElementById('touchNavRight');
    
    // Define navigation flow
    const navigationFlow = {
        'start': { next: 'intro', prev: null },
        'intro': { next: 'journey', prev: 'start' },
        'journey': { next: 'spaceWeather', prev: 'intro' },
        'spaceWeather': { next: 'branchMenu', prev: 'journey' },
        'branchMenu': { next: null, prev: 'spaceWeather' },
        'farmers': { next: 'nextBranch', prev: 'branchMenu' },
        'pilots': { next: 'nextBranch', prev: 'branchMenu' },
        'astronauts': { next: 'nextBranch', prev: 'branchMenu' },
        'power': { next: 'nextBranch', prev: 'branchMenu' },
        'auroras': { next: 'miniGame', prev: 'branchMenu' },
        'miniGame': { next: null, prev: 'auroras' }
    };
    
    // Left area click (go back)
    leftArea.addEventListener('click', () => {
        const current = navigationFlow[currentScene];
        if (current && current.prev) {
            renderScene(current.prev, 'left');
        }
    });
    
    // Right area click (go forward)
    rightArea.addEventListener('click', () => {
        const current = navigationFlow[currentScene];
        if (current && current.next) {
            if (current.next === 'nextBranch') {
                // Handle nextBranch logic
                const unvisited = Object.keys(visitedBranches).find(branch => !visitedBranches[branch]);
                if (unvisited) {
                    goToBranch(unvisited, 'right');
                } else {
                    renderScene('branchMenu', 'left');
                }
            } else {
                renderScene(current.next, 'right');
            }
        }
    });
    
    // Touch events for mobile
    leftArea.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const current = navigationFlow[currentScene];
        if (current && current.prev) {
            renderScene(current.prev, 'left');
        }
    });
    
    rightArea.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const current = navigationFlow[currentScene];
        if (current && current.next) {
            if (current.next === 'nextBranch') {
                const unvisited = Object.keys(visitedBranches).find(branch => !visitedBranches[branch]);
                if (unvisited) {
                    goToBranch(unvisited, 'right');
                } else {
                    renderScene('branchMenu', 'left');
                }
            } else {
                renderScene(current.next, 'right');
            }
        }
    });
}

// Handle window resize to reposition speech bubble
window.addEventListener('resize', () => {
    const speechBubble = document.getElementById('speechBubble');
    if (speechBubble.style.display !== 'none') {
        positionSpeechBubble();
    }
});

// Shield the Earth - Full Game Implementation
let gameState = {
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
    canvas: null,
    ctx: null
};

// Assets (masked drawing to avoid square backgrounds)
const gameAssets = {
    earth: new Image(),
    flare: new Image(),
    sun: new Image(),
    heart: new Image(),
    loaded: 0,
    total: 2, // keep total for earth+flare only (sun/heart don't affect readiness checks)
};

// Set rotation so the fireball's ball faces Earth; calibrated value from you: 220°
let FLARE_ROTATION_OFFSET = 220 * Math.PI / 180;

// Center (Earth)
function centerX() { return gameState.canvas ? gameState.canvas.width / 2 : 400; }
function centerY() { return gameState.canvas ? gameState.canvas.height / 2 : 300; }
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

// Utility math helpers
function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
function lerp(a, b, t) { return a + (b - a) * t; }
function distance(x1, y1, x2, y2) { const dx = x2 - x1, dy = y2 - y1; return Math.hypot(dx, dy); }
function angleBetween(x1, y1, x2, y2) { return Math.atan2(y2 - y1, x2 - x1); }
function normAngle(a) { while (a <= -Math.PI) a += Math.PI * 2; while (a > Math.PI) a -= Math.PI * 2; return a; }

// Sun lines
const SUN = {
    intro: "Hi, I'm Sunny the Sun! Can you help Earth by spinning the shield?",
    block: "Nice! That's how Earth's magnetic field helps!",
    hit: "Oh no — I didn't mean to!",
    win: "You're a Solar Defender!",
    lose: "I'm sorry. Scientists watch so we can be ready next time.",
};

// Flare factory
let flareId = 0;
function spawnFlare(speedMin, speedMax, sizeMin = 12, sizeMax = 18) {
    const angle = Math.random() * Math.PI * 2;
    const margin = 60;
    const w = gameState.canvas.width + margin * 2;
    const h = gameState.canvas.height + margin * 2;
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
    gameState.flares.push({ id: ++flareId, x: sx, y: sy, vx, vy, angle: angToCenter, size, boss: false });
}

function spawnBossCME() {
    const angle = Math.random() * Math.PI * 2;
    const margin = 60;
    const r = Math.max(gameState.canvas.width, gameState.canvas.height) * 0.6 + margin;
    const cx = centerX();
    const cy = centerY();
    const sx = cx + Math.cos(angle) * r;
    const sy = cy + Math.sin(angle) * r;
    const angToCenter = angleBetween(sx, sy, cx, cy);
    const speed = 55; // slower for easier boss
    const vx = Math.cos(angToCenter) * speed;
    const vy = Math.sin(angToCenter) * speed;
    gameState.flares.push({ id: ++flareId, x: sx, y: sy, vx, vy, angle: angToCenter, size: 60, boss: true, hp: 2 });
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

function initMiniGame() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) return;
    
    gameState.canvas = canvas;
    gameState.ctx = canvas.getContext('2d');
    
    // Load assets
    gameAssets.earth.onload = () => { gameAssets.loaded++; };
    gameAssets.flare.onload = () => { gameAssets.loaded++; };
    gameAssets.earth.src = 'earth.png';
    gameAssets.flare.src = 'solar flare.png'; // Keep the solar flare character image for the main app
    gameAssets.sun.src = 'sun.png';
    gameAssets.heart.src = 'health.png';
    
    // Set up event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('touchstart', handleCanvasTouch);
    
    document.getElementById('startGame').addEventListener('click', startGame);
    document.getElementById('pauseGame').addEventListener('click', togglePause);
    document.getElementById('resetGame').addEventListener('click', resetGame);
    document.getElementById('pauseBtn').addEventListener('click', togglePause);
    
    // Keyboard events
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Start with intro
    startIntro();
}

function handleMouseMove(e) {
    const rect = gameState.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    shield.angle = angleBetween(centerX(), centerY(), x, y);
}

function handleTouchMove(e) {
    if (e.touches.length > 0) {
        const t = e.touches[0];
        const rect = gameState.canvas.getBoundingClientRect();
        const x = t.clientX - rect.left;
        const y = t.clientY - rect.top;
        shield.angle = angleBetween(centerX(), centerY(), x, y);
    }
}

function handleCanvasClick(e) {
    const rect = gameState.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (gameState.state === 'intro') {
        handleIntroClick(x, y);
    } else if (gameState.state === 'outro') {
        handleOutroClick(x, y);
    }
}

function handleCanvasTouch(e) {
    if (e.touches.length > 0) {
        const t = e.touches[0];
        const rect = gameState.canvas.getBoundingClientRect();
        const x = t.clientX - rect.left;
        const y = t.clientY - rect.top;
        
        if (gameState.state === 'intro') {
            handleIntroClick(x, y);
        } else if (gameState.state === 'outro') {
            handleOutroClick(x, y);
        }
    }
}

function handleKeyDown(e) {
    if (e.key === 'ArrowLeft' || e.key === 'Left') keys.add('left');
    if (e.key === 'ArrowRight' || e.key === 'Right') keys.add('right');
    if (e.key.toLowerCase() === 'p') togglePause();
    if (e.code === 'Space') triggerFullShield();
}

function handleKeyUp(e) {
    if (e.key === 'ArrowLeft' || e.key === 'Left') keys.delete('left');
    if (e.key === 'ArrowRight' || e.key === 'Right') keys.delete('right');
}

function triggerFullShield() {
    if (shield.fullShield.active) return;
    if (shield.fullShield.cdRemaining > 0) return;
    shield.fullShield.active = true;
    shield.fullShield.remaining = shield.fullShield.duration;
    setDialogue("Full shield activated!", 1200);
}

function setDialogue(text, ms = 2000) {
    const dialogueEl = document.getElementById('dialogue');
    if (dialogueEl) {
        dialogueEl.textContent = text;
        clearTimeout(setDialogue._t);
        setDialogue._t = setTimeout(() => {
            if (dialogueEl.textContent === text) dialogueEl.textContent = '';
        }, ms);
    }
}

function startGame() {
    gameState.state = 'playing';
    gameState.running = true;
    gameState.time = 0;
    gameState.score = 0;
    gameState.health = 5;
    gameState.waveIndex = 0;
    gameState.flares.length = 0;
    waveTimer = 0;
    spawnTimer = 0;
    shield.fullShield.active = false;
    shield.fullShield.remaining = 0;
    shield.fullShield.cdRemaining = 1200; // short initial cooldown so space not accidental
    gameState.earthZoomTime = 0; // Start zoom animation
    
    // Show HTML UI elements for gameplay
    const scoreEl = document.getElementById('score');
    const waveEl = document.getElementById('wave');
    const pauseBtn = document.getElementById('pauseBtn');
    if (scoreEl) scoreEl.style.display = 'block';
    if (waveEl) waveEl.style.display = 'block';
    if (pauseBtn) pauseBtn.style.display = 'block';
    
    setDialogue(SUN.intro, 3000);
    requestAnimationFrame(gameLoop);
}

function startIntro() {
    gameState.state = 'intro';
    gameState.running = true;
    gameState.introTime = 0;
    gameState.showInstructions = false;
    
    // Reset UI elements for clean intro screen
    const scoreEl = document.getElementById('score');
    const waveEl = document.getElementById('wave');
    const dialogueEl = document.getElementById('dialogue');
    const pauseBtn = document.getElementById('pauseBtn');
    
    if (scoreEl) {
        scoreEl.textContent = '';
        scoreEl.style.display = 'none';
    }
    if (waveEl) {
        waveEl.textContent = '';
        waveEl.style.display = 'none';
    }
    if (dialogueEl) dialogueEl.textContent = '';
    if (pauseBtn) pauseBtn.style.display = 'none';
    
    requestAnimationFrame(gameLoop);
}

function startOutro(won) {
    gameState.state = 'outro';
    gameState.running = true;
    gameState.outroTime = 0;
    gameState.won = won;
    
    // Clear dialogue for clean outro screen
    const dialogueEl = document.getElementById('dialogue');
    if (dialogueEl) dialogueEl.textContent = '';
    
    // Hide HTML UI elements
    const scoreEl = document.getElementById('score');
    const waveEl = document.getElementById('wave');
    const pauseBtn = document.getElementById('pauseBtn');
    if (scoreEl) scoreEl.style.display = 'none';
    if (waveEl) waveEl.style.display = 'none';
    if (pauseBtn) pauseBtn.style.display = 'none';
    
    // Show game controls for outro
    const startBtn = document.getElementById('startGame');
    const pauseBtn2 = document.getElementById('pauseGame');
    const resetBtn = document.getElementById('resetGame');
    if (startBtn) startBtn.style.display = 'none';
    if (pauseBtn2) pauseBtn2.style.display = 'none';
    if (resetBtn) resetBtn.style.display = 'inline-block';
    
    requestAnimationFrame(gameLoop);
}

function togglePause() {
    if (gameState.state === 'playing') {
        gameState.state = 'paused';
        gameState.running = false;
        const pauseBtn = document.getElementById('pauseBtn');
        if (pauseBtn) pauseBtn.textContent = 'Resume';
    } else if (gameState.state === 'paused') {
        gameState.state = 'playing';
        gameState.running = true;
        const pauseBtn = document.getElementById('pauseBtn');
        if (pauseBtn) pauseBtn.textContent = 'Pause';
        requestAnimationFrame(gameLoop);
    }
}

function resetGame() {
    startIntro();
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
        gameState.showInstructions = !gameState.showInstructions;
    }
}

function handleOutroClick(x, y) {
    const cx = centerX();
    const cy = centerY();
    
    if (gameState.won) {
        // Try Again button (win)
        if (isPointInButton(x, y, cx, cy + 40, 140, 50)) {
            startGame();
        }
        // Take Quiz button (win)
        else if (isPointInButton(x, y, cx, cy + 100, 140, 50)) {
            // Navigate to quiz scene
            renderScene('quiz', 'right');
        }
        // Menu button (win)
        else if (isPointInButton(x, y, cx, cy + 160, 140, 50)) {
            startIntro();
        }
    } else {
        // Try Again button (lose)
        if (isPointInButton(x, y, cx, cy + 60, 140, 50)) {
            startGame();
        }
        // Take Quiz button (lose)
        else if (isPointInButton(x, y, cx, cy + 120, 140, 50)) {
            // Navigate to quiz scene
            renderScene('quiz', 'right');
        }
        // Menu button (lose)
        else if (isPointInButton(x, y, cx, cy + 180, 140, 50)) {
            startIntro();
        }
    }
}

function isPointInButton(x, y, bx, by, bw, bh) {
    return x >= bx - bw/2 && x <= bx + bw/2 && y >= by - bh/2 && y <= by + bh/2;
}

let lastTime = 0;
function gameLoop(ts) {
    if (!gameState.running) return;
    if (!lastTime) lastTime = ts;
    const dt = clamp((ts - lastTime) / 1000, 0, 0.05);
    lastTime = ts;
    gameState.time += dt;
    updateGame(dt);
    renderGame();
        requestAnimationFrame(gameLoop);
}

function updateGame(dt) {
    // Handle different game states
    if (gameState.state === 'intro') {
        // No auto-advance, wait for button clicks
        return;
    }
    
    if (gameState.state === 'outro') {
        // No auto-advance, wait for button clicks
        return;
    }
    
    if (gameState.state === 'paused') {
        return;
    }

    // Handle Earth zoom animation during gameplay
    if (gameState.state === 'playing' && gameState.earthZoomTime !== undefined) {
        gameState.earthZoomTime += dt * 1000;
        if (gameState.earthZoomTime > 2000) { // 2 second zoom
            gameState.earthZoomTime = undefined;
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
    const w = waves[gameState.waveIndex];
    const waveEl = document.getElementById('wave');
    if (waveEl) waveEl.textContent = w.name;
    shield.arcWidth = (w.arcWidth * Math.PI) / 180;
    waveTimer += dt * 1000;
    if (w.spawnBoss) {
        if (spawnTimer <= 0 && !gameState.flares.some(f => f.boss)) {
            spawnBossCME();
            spawnTimer = 999999; // stop spawning more
        }
    } else {
        spawnTimer -= dt * 1000;
        if (spawnTimer <= 0) {
            // Occasionally two flares in later waves (reduced chance)
            const multi = gameState.waveIndex >= 2 && Math.random() < 0.2 ? 2 : 1;
            for (let i = 0; i < multi; i++) spawnFlare(w.speedMin, w.speedMax);
            spawnTimer = w.spawnEachMs;
        }
    }

    // Update flares
    const cx = centerX();
    const cy = centerY();
    // Use scaled shield radius for collision
    const earthScale = gameState.earthZoomTime !== undefined ? 0.3 + Math.min(gameState.earthZoomTime / 2000, 1) * 0.7 : 1;
    const collideR = (earth.radius + 8) * earthScale;
    for (let i = gameState.flares.length - 1; i >= 0; i--) {
        const f = gameState.flares[i];
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
                        gameState.score += 100;
                        gameState.flares.splice(i, 1);
                        nextWave();
                    } else {
                        // Push boss slightly back
                        f.x += Math.cos(f.angle) * -40;
                        f.y += Math.sin(f.angle) * -40;
                    }
                } else {
            gameState.score += 10;
                    setDialogue(SUN.block, 900);
                    spawnPulseEffect(f.x, f.y, '#8ef7a7');
                    gameState.flares.splice(i, 1);
                }
            } else {
                // Hit Earth
                gameState.health -= f.boss ? 2 : 1;
                setDialogue(SUN.hit, 900);
                spawnPulseEffect(cx, cy, '#ff6b6b');
                gameState.flares.splice(i, 1);
                if (gameState.health <= 0) {
                    gameState.health = 0;
                    startOutro(false);
                }
            }
        }
        // Remove when past center just in case
        if (d < earth.radius - 6) {
            gameState.flares.splice(i, 1);
        }
    }

    // Advance wave timer
    if (!w.spawnBoss && waveTimer >= w.duration) nextWave();

    // Update UI
    const scoreEl = document.getElementById('score');
    if (scoreEl) scoreEl.textContent = `Score: ${gameState.score}`;
}

function nextWave() {
    gameState.waveIndex++;
    waveTimer = 0;
    spawnTimer = 0;
    if (gameState.waveIndex >= waves.length) {
        // Win
        startOutro(true);
    } else {
        setDialogue(`${waves[gameState.waveIndex].name} begins!`, 1800);
    }
}

function spawnPulseEffect(x, y, color) {
    gameState.effects.push({ x, y, r: 6, color, life: 350 });
}

function renderGame() {
    renderBackground();

    const cx = centerX();
    const cy = centerY();

    // Render different screens based on game state
    if (gameState.state === 'intro') {
        renderIntro();
            return;
        }
        
    if (gameState.state === 'outro') {
        renderOutro();
        return;
    }
    
    if (gameState.state === 'paused') {
        renderPaused();
        return;
    }

    // Sun portrait (bottom-left), clipped to a circle, with simple bubble using existing dialogue box
    if (gameAssets.sun.complete) {
        const sunSize = 96;
        const sx = 84;
        const sy = gameState.canvas.height - 84;
        // subtle halo
        const sg = gameState.ctx.createRadialGradient(sx, sy, 10, sx, sy, sunSize * 0.7);
        sg.addColorStop(0, 'rgba(255,200,80,0.35)');
        sg.addColorStop(1, 'rgba(255,200,80,0)');
        gameState.ctx.fillStyle = sg;
        gameState.ctx.beginPath();
        gameState.ctx.arc(sx, sy, sunSize * 0.6, 0, Math.PI * 2);
        gameState.ctx.fill();

        gameState.ctx.save();
        gameState.ctx.beginPath();
        gameState.ctx.arc(sx, sy, sunSize * 0.45, 0, Math.PI * 2);
        gameState.ctx.clip();
        gameState.ctx.drawImage(gameAssets.sun, sx - sunSize / 2, sy - sunSize / 2, sunSize, sunSize);
        gameState.ctx.restore();
    }

    // Earth zoom animation
    let earthScale = 1;
    if (gameState.earthZoomTime !== undefined) {
        const progress = Math.min(gameState.earthZoomTime / 2000, 1);
        earthScale = 0.3 + progress * 0.7; // Scale from 0.3 to 1.0
    }
    
    const currentRadius = earth.radius * earthScale;
    const currentShieldRadius = (earth.radius + 8) * earthScale;

    // Earth - minimal subtle glow (reduced to avoid visible gap)
    const grd = gameState.ctx.createRadialGradient(cx, cy, 6, cx, cy, currentRadius + 10);
    grd.addColorStop(0, 'rgba(79, 195, 247, 0.25)');
    grd.addColorStop(1, 'rgba(79, 195, 247, 0)');
    gameState.ctx.fillStyle = grd;
    gameState.ctx.beginPath();
    gameState.ctx.arc(cx, cy, currentRadius + 12, 0, Math.PI * 2);
    gameState.ctx.fill();

    // Earth sprite clipped to circle (fallback to blue circle)
    if (gameAssets.loaded >= gameAssets.total && gameAssets.earth.complete) {
        const size = currentRadius * 2;
        gameState.ctx.save();
        gameState.ctx.beginPath();
        gameState.ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
        gameState.ctx.clip();
        gameState.ctx.drawImage(gameAssets.earth, cx - size / 2, cy - size / 2, size, size);
        gameState.ctx.restore();
    } else {
        gameState.ctx.fillStyle = '#1e90ff';
        gameState.ctx.beginPath();
        gameState.ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
        gameState.ctx.fill();
    }

    // Shield arc or full shield (use scaled radius)
    if (shield.fullShield.active) {
        gameState.ctx.strokeStyle = '#66f7ff';
        gameState.ctx.lineWidth = 8;
        gameState.ctx.globalAlpha = 0.85;
        gameState.ctx.beginPath();
        gameState.ctx.arc(cx, cy, currentShieldRadius, 0, Math.PI * 2);
        gameState.ctx.stroke();
        gameState.ctx.globalAlpha = 1;
    } else {
        gameState.ctx.strokeStyle = '#a7f3d0';
        gameState.ctx.lineWidth = 10;
        const start = shield.angle - shield.arcWidth / 2;
        const end = shield.angle + shield.arcWidth / 2;
        gameState.ctx.beginPath();
        gameState.ctx.arc(cx, cy, currentShieldRadius, start, end);
        gameState.ctx.stroke();
    }

    // Effects
    for (let i = gameState.effects.length - 1; i >= 0; i--) {
        const e = gameState.effects[i];
        e.life -= 16;
        e.r += 2.2;
        if (e.life <= 0) gameState.effects.splice(i, 1);
        gameState.ctx.globalAlpha = clamp(e.life / 350, 0, 1);
        gameState.ctx.strokeStyle = e.color;
        gameState.ctx.lineWidth = 2;
        gameState.ctx.beginPath();
        gameState.ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        gameState.ctx.stroke();
        gameState.ctx.globalAlpha = 1;
    }

    // Flares (simple fireball circles)
    for (const f of gameState.flares) {
        // Draw fireball with gradient effect
        const gradient = gameState.ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size);
        if (f.boss) {
            gradient.addColorStop(0, '#ff6b35');
            gradient.addColorStop(0.5, '#ff8c42');
            gradient.addColorStop(1, '#ffb84d');
        } else {
            gradient.addColorStop(0, '#ff4444');
            gradient.addColorStop(0.5, '#ff6666');
            gradient.addColorStop(1, '#ff884d');
        }
        gameState.ctx.fillStyle = gradient;
        gameState.ctx.beginPath();
        gameState.ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        gameState.ctx.fill();
        
        // Add glow effect
        gameState.ctx.fillStyle = f.boss ? 'rgba(255, 107, 53, 0.3)' : 'rgba(255, 68, 68, 0.3)';
        gameState.ctx.beginPath();
        gameState.ctx.arc(f.x, f.y, f.size + 5, 0, Math.PI * 2);
        gameState.ctx.fill();
    }

    // Only show game UI during gameplay
    if (gameState.state === 'playing') {
        // Hearts (top-left)
        const hx = 12;
        const hy = 12;
        const heartSize = 22;
        for (let i = 0; i < gameState.health; i++) {
            if (gameAssets.heart.complete) {
                gameState.ctx.drawImage(gameAssets.heart, hx + i * (heartSize + 6), hy, heartSize, heartSize);
            } else {
                gameState.ctx.fillStyle = '#ff6b6b';
                gameState.ctx.beginPath();
                gameState.ctx.arc(hx + i * (heartSize + 6) + heartSize / 2, hy + heartSize / 2, heartSize / 2.2, 0, Math.PI * 2);
                gameState.ctx.fill();
            }
        }

        // Full shield stamina bar (under hearts)
        const barW = 120;
        const barH = 8;
        const bx = hx;
        const by = hy + heartSize + 8;
        gameState.ctx.fillStyle = 'rgba(255,255,255,0.15)';
        gameState.ctx.fillRect(bx, by, barW, barH);
        let pct;
        if (shield.fullShield.active) pct = clamp(shield.fullShield.remaining / shield.fullShield.duration, 0, 1);
        else pct = 1 - clamp(shield.fullShield.cdRemaining / shield.fullShield.cooldown, 0, 1);
        gameState.ctx.fillStyle = '#66f7ff';
        gameState.ctx.fillRect(bx, by, Math.max(0, Math.min(barW, barW * pct)), barH);
        gameState.ctx.strokeStyle = 'rgba(255,255,255,0.45)';
        gameState.ctx.strokeRect(bx + 0.5, by + 0.5, barW - 1, barH - 1);
    }
}

function renderBackground() {
    const w = gameState.canvas.width;
    const h = gameState.canvas.height;
    const g = gameState.ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#060a13');
    g.addColorStop(1, '#0a1222');
    gameState.ctx.fillStyle = g;
    gameState.ctx.fillRect(0, 0, w, h);

    // Simple stars
    gameState.ctx.globalAlpha = 0.7;
    gameState.ctx.fillStyle = '#9fb9ff';
    for (let i = 0; i < 40; i++) {
        const x = ((i * 97) % w) + (i * 13 % 11);
        const y = ((i * 71) % h) + (i * 7 % 13);
        gameState.ctx.fillRect(x, y, 1, 1);
    }
    gameState.ctx.globalAlpha = 1;
}

function renderIntro() {
    const cx = centerX();
    const cy = centerY();
    
    // Title
    gameState.ctx.fillStyle = '#ffffff';
    gameState.ctx.font = 'bold 48px system-ui, sans-serif';
    gameState.ctx.textAlign = 'center';
    gameState.ctx.fillText('SHIELD THE EARTH', cx, cy - 100);
    
    // Subtitle
    gameState.ctx.font = '20px system-ui, sans-serif';
    gameState.ctx.fillStyle = '#a7f3d0';
    gameState.ctx.fillText('Protect Earth from Solar Flares!', cx, cy - 60);
    
    // Buttons
    drawButton(cx, cy + 20, 140, 50, '#66f7ff', '#ffffff', 'START');
    drawButton(cx, cy + 80, 140, 50, '#a7f3d0', '#1e293b', 'INSTRUCTIONS');
    
    // Instructions panel
    if (gameState.showInstructions) {
        drawInstructionsPanel(cx, cy + 140);
    }
    
    // Earth preview
    const earthSize = earth.radius * 0.6;
    
    if (gameAssets.loaded >= gameAssets.total && gameAssets.earth.complete) {
        gameState.ctx.save();
        gameState.ctx.beginPath();
        gameState.ctx.arc(cx, cy + 200, earthSize, 0, Math.PI * 2);
        gameState.ctx.clip();
        gameState.ctx.drawImage(gameAssets.earth, cx - earthSize, cy + 200 - earthSize, earthSize * 2, earthSize * 2);
        gameState.ctx.restore();
    } else {
        gameState.ctx.fillStyle = '#1e90ff';
        gameState.ctx.beginPath();
        gameState.ctx.arc(cx, cy + 200, earthSize, 0, Math.PI * 2);
        gameState.ctx.fill();
    }
    
    gameState.ctx.textAlign = 'left';
}

function renderOutro() {
    const cx = centerX();
    const cy = centerY();
    
    if (gameState.won) {
        // Win screen
        gameState.ctx.fillStyle = '#8ef7a7';
        gameState.ctx.font = 'bold 42px system-ui, sans-serif';
        gameState.ctx.textAlign = 'center';
        gameState.ctx.fillText('VICTORY!', cx, cy - 100);
        
        gameState.ctx.font = '24px system-ui, sans-serif';
        gameState.ctx.fillStyle = '#ffffff';
        gameState.ctx.fillText('You are a Solar Defender!', cx, cy - 60);
        
        gameState.ctx.font = '18px system-ui, sans-serif';
        gameState.ctx.fillStyle = '#a7f3d0';
        gameState.ctx.fillText(`Final Score: ${gameState.score}`, cx, cy - 30);
        gameState.ctx.fillText('Thanks for protecting Earth!', cx, cy);
    } else {
        // Lose screen
        gameState.ctx.fillStyle = '#ff6b6b';
        gameState.ctx.font = 'bold 42px system-ui, sans-serif';
        gameState.ctx.textAlign = 'center';
        gameState.ctx.fillText('GAME OVER', cx, cy - 80);
        
        gameState.ctx.font = '24px system-ui, sans-serif';
        gameState.ctx.fillStyle = '#ffffff';
        gameState.ctx.fillText('Earth needs more protection!', cx, cy - 40);
        
        gameState.ctx.font = '18px system-ui, sans-serif';
        gameState.ctx.fillStyle = '#ffb3b3';
        gameState.ctx.fillText(`Score: ${gameState.score}`, cx, cy - 10);
        gameState.ctx.fillText('Try again to become a Solar Defender!', cx, cy + 20);
    }
    
    // Buttons
    if (gameState.won) {
        drawButton(cx, cy + 40, 140, 50, '#66f7ff', '#ffffff', 'TRY AGAIN');
        drawButton(cx, cy + 100, 140, 50, '#ff6b6b', '#ffffff', 'TAKE QUIZ');
        drawButton(cx, cy + 160, 140, 50, '#a7f3d0', '#1e293b', 'MENU');
    } else {
        drawButton(cx, cy + 60, 140, 50, '#66f7ff', '#ffffff', 'TRY AGAIN');
        drawButton(cx, cy + 120, 140, 50, '#ff6b6b', '#ffffff', 'TAKE QUIZ');
        drawButton(cx, cy + 180, 140, 50, '#a7f3d0', '#1e293b', 'MENU');
    }
    
    gameState.ctx.textAlign = 'left';
}

function renderPaused() {
    const cx = centerX();
    const cy = centerY();
    
    // Dark overlay
    gameState.ctx.fillStyle = 'rgba(0,0,0,0.7)';
    gameState.ctx.fillRect(0, 0, gameState.canvas.width, gameState.canvas.height);
    
    // Paused text
    gameState.ctx.fillStyle = '#ffffff';
    gameState.ctx.font = 'bold 36px system-ui, sans-serif';
    gameState.ctx.textAlign = 'center';
    gameState.ctx.fillText('PAUSED', cx, cy);
    
    gameState.ctx.font = '18px system-ui, sans-serif';
    gameState.ctx.fillStyle = '#a7f3d0';
    gameState.ctx.fillText('Press P or click Resume to continue', cx, cy + 40);
    
    gameState.ctx.textAlign = 'left';
}

function drawButton(x, y, w, h, bgColor, textColor, text, isHovered = false) {
    // Button shadow
    gameState.ctx.fillStyle = 'rgba(0,0,0,0.3)';
    gameState.ctx.fillRect(x - w/2 + 3, y - h/2 + 3, w, h);
    
    // Button background with gradient
    const gradient = gameState.ctx.createLinearGradient(x - w/2, y - h/2, x - w/2, y + h/2);
    gradient.addColorStop(0, bgColor);
    gradient.addColorStop(1, isHovered ? lightenColor(bgColor, 20) : darkenColor(bgColor, 10));
    gameState.ctx.fillStyle = gradient;
    
    // Rounded rectangle
    const radius = 8;
    gameState.ctx.beginPath();
    gameState.ctx.roundRect(x - w/2, y - h/2, w, h, radius);
    gameState.ctx.fill();
    
    // Button border
    gameState.ctx.strokeStyle = isHovered ? '#ffffff' : 'rgba(255,255,255,0.4)';
    gameState.ctx.lineWidth = isHovered ? 3 : 2;
    gameState.ctx.stroke();
    
    // Button text with shadow
    gameState.ctx.fillStyle = 'rgba(0,0,0,0.3)';
    gameState.ctx.font = 'bold 18px system-ui, sans-serif';
    gameState.ctx.textAlign = 'center';
    gameState.ctx.fillText(text, x + 1, y + 8);
    
    gameState.ctx.fillStyle = textColor;
    gameState.ctx.fillText(text, x, y + 7);
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
        (B > 255 ? B < 0 ? 0 : B : 255) * 0x10000 +
        (B > 255 ? B < 0 ? 0 : B : 255)).toString(16).slice(1);
}

function drawInstructionsPanel(x, y) {
    const w = 400;
    const h = 200;
    const panelX = x - w/2;
    const panelY = y - h/2;
    
    // Panel background
    gameState.ctx.fillStyle = 'rgba(0,0,0,0.8)';
    gameState.ctx.fillRect(panelX, panelY, w, h);
    
    // Panel border
    gameState.ctx.strokeStyle = '#66f7ff';
    gameState.ctx.lineWidth = 2;
    gameState.ctx.strokeRect(panelX, panelY, w, h);
    
    // Instructions text
    gameState.ctx.fillStyle = '#ffffff';
    gameState.ctx.font = '14px system-ui, sans-serif';
    gameState.ctx.textAlign = 'left';
    
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
        gameState.ctx.fillText(line, panelX + 20, textY);
        textY += 25;
    }
    
    // Close instruction
    gameState.ctx.fillStyle = '#9fb9ff';
    gameState.ctx.font = '12px system-ui, sans-serif';
    gameState.ctx.textAlign = 'center';
    gameState.ctx.fillText('Click Instructions again to close', x, panelY + h - 15);
}

// Space Weather Details - Kid-friendly explanations
const spaceWeatherDetails = {
    'sun': {
        title: "The Sun ☀️",
        explanation: "The Sun is like a giant ball of fire in space! It's super hot and gives us light and warmth. Sometimes it gets excited and shoots out energy bursts - that's where I come from!"
    },
    'solar-flare': {
        title: "Solar Flares ⚡",
        explanation: "That's me! I'm a burst of energy that shoots out from the Sun when it gets really excited. I'm like a big energy explosion that travels super fast through space!"
    },
    'solar-wind': {
        title: "Solar Wind 🌬️",
        explanation: "Solar wind is like invisible air that blows from the Sun all the time! It's made of tiny particles that flow outward, kind of like how wind blows on Earth, but in space!"
    },
    'cme': {
        title: "CMEs 🌌",
        explanation: "CME stands for Coronal Mass Ejection - that's a fancy name for when the Sun throws out a big cloud of particles! It's like the Sun sneezing out a giant cloud of energy!"
    },
    'radiation-storm': {
        title: "Radiation Storms ☢️",
        explanation: "Radiation storms happen when the Sun shoots out super-fast particles! These particles can travel from the Sun to Earth in just 30 minutes - that's faster than a race car! They're like tiny bullets of energy zooming through space!"
    },
    'solar-cycle': {
        title: "Solar Cycle 🔄",
        explanation: "The Sun has an 11-year cycle, kind of like how seasons change on Earth! Sometimes the Sun is very active with lots of storms (solar maximum), and sometimes it's quiet (solar minimum). It's like the Sun having busy and calm periods!"
    },
    'solar-storm': {
        title: "Solar Storms 🌪️",
        explanation: "A solar storm is when the Sun suddenly explodes and sends out particles, energy, and magnetic fields! It's like the Sun having a big tantrum! These storms can cause radio problems and power outages, but Earth's magnetic shield protects us from the worst parts!"
    },
    'earth': {
        title: "Earth 🌍",
        explanation: "Earth is our home planet! It's where we live, and it has air to breathe and water to drink. Earth is special because it's protected by a magnetic field that acts like a shield!"
    },
    'magnetic-field': {
        title: "Magnetic Field 🛡️",
        explanation: "Earth's magnetic field is like an invisible shield around our planet! It protects us from dangerous space energy, kind of like how an umbrella protects you from rain!"
    }
};

// Handle clicking on space weather details
function handleSpaceWeatherClick(detailType) {
    const detail = spaceWeatherDetails[detailType];
    if (detail) {
        // Update the Solar Flare's speech
        const speechBubble = document.getElementById('speechBubble');
        if (speechBubble) {
            speechBubble.innerHTML = `<strong>${detail.title}</strong><br>${detail.explanation}`;
            speechBubble.style.display = 'block';
            
            // Add talking animation to character
            const character = document.getElementById('solarFlareCharacter');
            if (character) {
                character.classList.add('talking');
                setTimeout(() => character.classList.remove('talking'), 3000);
            }
        }
    }
}

// Initialize space weather click handlers
function initSpaceWeatherClicks() {
    const clickableElements = document.querySelectorAll('.clickable-detail');
    clickableElements.forEach(element => {
        element.addEventListener('click', () => {
            const detailType = element.getAttribute('data-detail');
            handleSpaceWeatherClick(detailType);
        });
        
        // Add hover effect
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.1)';
            element.style.cursor = 'pointer';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
        });
    });
}

// Enhanced scene rendering to initialize mini-game
function renderNewScene(sceneName, direction) {
    const scene = scenes[sceneName];
    currentScene = sceneName;
    const container = document.getElementById('scene-container');
    const character = document.getElementById('solarFlareCharacter');
    const speechBubble = document.getElementById('speechBubble');
    
    let buttonsHTML = '';
    if (scene.buttons) {
        // Filter out back/forward navigation buttons, keep story selection buttons
        const filteredButtons = scene.buttons.filter(btn => 
            btn.action !== 'back' && btn.action !== 'forward'
        );
        
        if (filteredButtons.length > 0) {
            buttonsHTML = filteredButtons.map(btn => 
                `<button class="${btn.class}" onclick="handleButtonClick('${btn.action}')">${btn.text}</button>`
            ).join('');
        }
    }
    
    // Determine enter animation based on direction and scene type
    let enterClass;
    if (direction === 'right') {
        enterClass = 'slide-in-right';
    } else if (direction === 'left') {
        enterClass = 'slide-in-left';
    } else if (sceneName === 'start') {
        enterClass = 'zoom-in';
    } else {
        enterClass = 'fade-in';
    }
    
    // Update the fixed title
    updateSceneTitle(scene.title, scene.subtitle);
    
    container.innerHTML = `
        <div class="scene ${enterClass}" data-scene="${sceneName}">
            ${scene.content ? `<div class="scene-content">${scene.content}</div>` : ''}
            <div class="scene-buttons">
                ${buttonsHTML}
            </div>
        </div>
    `;
    
    // Add character and speech bubble enter animations - simpler
    if (character) {
        character.classList.remove('scene-transition');
        character.classList.add('scene-enter');
        setTimeout(() => character.classList.remove('scene-enter'), 300);
    }
    
    if (speechBubble) {
        speechBubble.classList.remove('scene-transition');
        speechBubble.classList.add('scene-enter');
        setTimeout(() => speechBubble.classList.remove('scene-enter'), 300);
    }
    
    // Update character speech
    updateCharacterSpeech(scene);
    
    // Update branch menu buttons if this is the branch menu
    if (sceneName === 'branchMenu') {
        setTimeout(() => updateBranchMenuButtons(), 100);
    }
    
    // Initialize mini-game if this is the game scene
    if (sceneName === 'miniGame') {
        setTimeout(() => initMiniGame(), 100);
    }
    
    // Initialize space weather click handlers
    if (sceneName === 'spaceWeather') {
        setTimeout(() => initSpaceWeatherClicks(), 100);
    } else if (sceneName === 'quiz') {
        setTimeout(() => initQuiz(), 100);
    }
}

// Quiz System
const quizQuestions = [
    {
        question: "What is a Solar Flare?",
        options: [
            "A burst of energy from the Sun",
            "A type of wind on Earth",
            "A planet in our solar system",
            "A type of aurora"
        ],
        correct: 0,
        explanation: "A solar flare is a burst of energy that shoots out from the Sun when it gets excited!"
    },
    {
        question: "What protects Earth from solar flares?",
        options: [
            "The Moon",
            "Earth's magnetic field",
            "The atmosphere only",
            "Nothing protects us"
        ],
        correct: 1,
        explanation: "Earth's magnetic field acts like an invisible shield that protects us from dangerous space energy!"
    },
    {
        question: "What beautiful lights can solar flares create?",
        options: [
            "Rainbows",
            "Auroras",
            "Lightning",
            "Fireworks"
        ],
        correct: 1,
        explanation: "When solar flare energy dances with Earth's atmosphere, it creates beautiful auroras!"
    },
    {
        question: "What can solar flares affect on Earth?",
        options: [
            "Only the weather",
            "GPS, radios, and power grids",
            "Only plants",
            "Nothing at all"
        ],
        correct: 1,
        explanation: "Solar flares can affect GPS signals, radio communication, and even power grids!"
    },
    {
        question: "How fast can solar flare particles travel from the Sun to Earth?",
        options: [
            "1 hour",
            "30 minutes or less",
            "1 day",
            "1 week"
        ],
        correct: 1,
        explanation: "The fastest solar flare particles can travel from the Sun to Earth in about 30 minutes or less!"
    },
    {
        question: "What is the Sun's role in creating solar flares?",
        options: [
            "The Sun is completely calm and never changes",
            "The Sun has magnetic activity that can cause explosive energy bursts",
            "The Sun only creates light, not energy particles",
            "The Sun is too far away to affect Earth"
        ],
        correct: 1,
        explanation: "The Sun has intense magnetic activity that can cause explosive energy bursts called solar flares!"
    },
    {
        question: "What happens when solar flares hit Earth's magnetic field?",
        options: [
            "Nothing happens at all",
            "The magnetic field deflects most dangerous particles away from Earth",
            "The magnetic field gets destroyed",
            "The magnetic field makes the flares stronger"
        ],
        correct: 1,
        explanation: "Earth's magnetic field acts like a shield, deflecting most dangerous solar particles away from our planet!"
    },
    {
        question: "Why do astronauts need special protection from solar flares?",
        options: [
            "Because they're closer to the Sun in space",
            "Because there's no magnetic field protection in space",
            "Because solar radiation is stronger in space",
            "All of the above"
        ],
        correct: 3,
        explanation: "Astronauts need special protection because they're closer to the Sun, have no magnetic field protection, and solar radiation is much stronger in space!"
    },
    {
        question: "What is space weather?",
        options: [
            "Regular weather like rain and snow in space",
            "The conditions in space caused by the Sun's activity",
            "Weather that only happens on other planets",
            "A type of storm that happens in Earth's atmosphere"
        ],
        correct: 1,
        explanation: "Space weather refers to the conditions in space caused by the Sun's activity, including solar flares, solar wind, and other space phenomena!"
    },
    {
        question: "What can happen to power grids during strong solar flares?",
        options: [
            "Nothing, power grids are completely safe",
            "They can experience power surges and even blackouts",
            "They get stronger and more efficient",
            "They automatically shut down forever"
        ],
        correct: 1,
        explanation: "Strong solar flares can cause power surges in electrical grids, potentially leading to blackouts and power outages!"
    }
];

let quizState = {
    currentQuestion: 0,
    score: 0,
    selectedAnswer: null,
    isQuizActive: false
};

function initQuiz() {
    const startBtn = document.getElementById('startQuiz');
    const nextBtn = document.getElementById('nextQuestion');
    const restartBtn = document.getElementById('restartQuiz');
    const backBtn = document.getElementById('backToStories');
    
    if (startBtn) startBtn.addEventListener('click', startQuiz);
    if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
    if (restartBtn) restartBtn.addEventListener('click', restartQuiz);
    if (backBtn) backBtn.addEventListener('click', () => renderScene('branchMenu', 'left'));
}

function startQuiz() {
    quizState = {
        currentQuestion: 0,
        score: 0,
        selectedAnswer: null,
        isQuizActive: true
    };
    
    // Clear any previous explanations
    const speechBubble = document.getElementById('speechBubble');
    if (speechBubble) {
        speechBubble.style.display = 'none';
    }
    
    document.getElementById('startQuiz').style.display = 'none';
    document.getElementById('nextQuestion').style.display = 'inline-block';
    document.getElementById('quizScore').style.display = 'none';
    document.getElementById('quizQuestion').style.display = 'block';
    
    loadQuestion();
}

function loadQuestion() {
    const question = quizQuestions[quizState.currentQuestion];
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('quizOptions');
    const counter = document.getElementById('questionCounter');
    const progressFill = document.getElementById('progressFill');
    
    // Clear any previous explanations
    const speechBubble = document.getElementById('speechBubble');
    if (speechBubble) {
        speechBubble.style.display = 'none';
    }
    
    questionText.textContent = question.question;
    counter.textContent = `Question ${quizState.currentQuestion + 1} of ${quizQuestions.length}`;
    progressFill.style.width = `${((quizState.currentQuestion + 1) / quizQuestions.length) * 100}%`;
    
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'quiz-option';
        optionBtn.textContent = option;
        optionBtn.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(optionBtn);
    });
    
    quizState.selectedAnswer = null;
}

function selectAnswer(answerIndex) {
    quizState.selectedAnswer = answerIndex;
    
    // Remove previous selections
    document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Highlight selected answer
    const selectedBtn = document.querySelectorAll('.quiz-option')[answerIndex];
    selectedBtn.classList.add('selected');
    
    // Check if correct
    const question = quizQuestions[quizState.currentQuestion];
    if (answerIndex === question.correct) {
        selectedBtn.classList.add('correct');
        quizState.score++;
    } else {
        selectedBtn.classList.add('incorrect');
        // Show correct answer
        document.querySelectorAll('.quiz-option')[question.correct].classList.add('correct');
    }
    
    // Show explanation
    setTimeout(() => {
        const speechBubble = document.getElementById('speechBubble');
        if (speechBubble) {
            speechBubble.innerHTML = `<strong>Explanation:</strong><br>${question.explanation}`;
            speechBubble.style.display = 'block';
        }
    }, 500);
    
    // Show next button or finish quiz
    if (quizState.currentQuestion < quizQuestions.length - 1) {
        document.getElementById('nextQuestion').textContent = 'Next Question';
    } else {
        document.getElementById('nextQuestion').textContent = 'Finish Quiz';
    }
}

function nextQuestion() {
    if (quizState.currentQuestion < quizQuestions.length - 1) {
        quizState.currentQuestion++;
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    quizState.isQuizActive = false;
    
    document.getElementById('quizQuestion').style.display = 'none';
    document.getElementById('nextQuestion').style.display = 'none';
    document.getElementById('quizScore').style.display = 'block';
    document.getElementById('restartQuiz').style.display = 'inline-block';
    document.getElementById('backToStories').style.display = 'inline-block';
    
    const finalScore = document.getElementById('finalScore');
    const scoreMessage = document.getElementById('scoreMessage');
    const badges = document.getElementById('quizBadges');
    
    finalScore.textContent = quizState.score;
    
    // Score messages
    if (quizState.score === 5) {
        scoreMessage.innerHTML = '🌟 Perfect! You\'re a Space Weather Expert! 🌟';
        badges.innerHTML = '<div class="badge gold">🏆 Space Weather Master</div>';
    } else if (quizState.score >= 4) {
        scoreMessage.innerHTML = '🎉 Excellent! You know a lot about space weather! 🎉';
        badges.innerHTML = '<div class="badge silver">🥈 Space Weather Pro</div>';
    } else if (quizState.score >= 3) {
        scoreMessage.innerHTML = '👍 Good job! You\'re learning about space weather! 👍';
        badges.innerHTML = '<div class="badge bronze">🥉 Space Weather Explorer</div>';
    } else {
        scoreMessage.innerHTML = '📚 Keep learning! Space weather is fascinating! 📚';
        badges.innerHTML = '<div class="badge">🌱 Space Weather Student</div>';
    }
    
    // Update Solar Flare speech
    const speechBubble = document.getElementById('speechBubble');
    if (speechBubble) {
        speechBubble.innerHTML = `Great job! You got ${quizState.score} out of ${quizQuestions.length} questions correct! ${quizState.score >= 4 ? 'You really understand space weather!' : 'Keep exploring and you\'ll learn even more!'}`;
        speechBubble.style.display = 'block';
    }
}

function restartQuiz() {
    startQuiz();
}

// Start the app when page loads
document.addEventListener('DOMContentLoaded', init);
