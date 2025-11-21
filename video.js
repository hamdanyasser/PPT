// =================== VIDEO CONFIGURATION ===================
const SECTION_DURATIONS = [4000, 6500, 6500, 6500, 6500]; // Duration for each section in milliseconds (total: 30s)
const TOTAL_DURATION = SECTION_DURATIONS.reduce((a, b) => a + b, 0);

// =================== DOM ELEMENTS ===================
const sections = document.querySelectorAll('.section');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.querySelector('.progress-bar-container');
const currentTimeDisplay = document.getElementById('currentTime');
const totalTimeDisplay = document.getElementById('totalTime');

// =================== STATE ===================
let currentSectionIndex = 0;
let isPlaying = false;
let startTime = null;
let pausedTime = 0;
let animationFrameId = null;
let sectionTimeoutId = null;
let particleIntervals = []; // Store intervals for continuous particles

// =================== INITIALIZATION ===================
function init() {
    // Set total time display
    totalTimeDisplay.textContent = formatTime(TOTAL_DURATION / 1000);

    // Show first section
    showSection(0);

    // Add event listeners
    playBtn.addEventListener('click', play);
    pauseBtn.addEventListener('click', pause);
    restartBtn.addEventListener('click', restart);
    progressContainer.addEventListener('click', handleProgressClick);

    // Sound toggle button
    const soundBtn = document.getElementById('soundBtn');
    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            if (window.audioEngine) {
                const enabled = window.audioEngine.toggle();
                soundBtn.textContent = enabled ? '🔊' : '🔇';
            }
        });
    }

    // Don't auto-play - wait for user to click play button
    // This allows AudioContext to initialize properly
}

// =================== PLAYBACK FUNCTIONS ===================
async function play() {
    if (isPlaying) return;

    isPlaying = true;
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'flex';

    if (startTime === null) {
        startTime = Date.now() - pausedTime;
    } else {
        startTime = Date.now() - pausedTime;
    }

    // Resume AudioContext on user gesture
    if (window.audioEngine) {
        await window.audioEngine.resume();
        window.audioEngine.startBackgroundMusic();
    }

    updateProgress();
    scheduleNextSection();
}

function pause() {
    if (!isPlaying) return;

    isPlaying = false;
    playBtn.style.display = 'flex';
    pauseBtn.style.display = 'none';

    pausedTime = Date.now() - startTime;

    // Clear particle intervals
    particleIntervals.forEach(interval => clearInterval(interval));
    particleIntervals = [];

    if (window.audioEngine) {
        window.audioEngine.stopBackgroundMusic();
    }

    cancelAnimationFrame(animationFrameId);
    clearTimeout(sectionTimeoutId);
}

function restart() {
    pause();
    currentSectionIndex = 0;
    startTime = null;
    pausedTime = 0;

    showSection(0);
    setTimeout(() => {
        play();
    }, 300);
}

function scheduleNextSection() {
    if (!isPlaying) return;

    const elapsed = Date.now() - startTime;
    let accumulatedTime = 0;

    for (let i = 0; i <= currentSectionIndex; i++) {
        accumulatedTime += SECTION_DURATIONS[i];
    }

    const timeToNext = accumulatedTime - elapsed;

    if (timeToNext > 0 && currentSectionIndex < sections.length - 1) {
        sectionTimeoutId = setTimeout(() => {
            nextSection();
        }, timeToNext);
    } else if (currentSectionIndex >= sections.length - 1 && elapsed >= TOTAL_DURATION) {
        // Video ended
        onVideoEnd();
    }
}

function nextSection() {
    if (currentSectionIndex < sections.length - 1) {
        currentSectionIndex++;
        showSection(currentSectionIndex);
        scheduleNextSection();
    }
}

// =================== CONTINUOUS PARTICLE EFFECTS ===================
function startContinuousParticles(index) {
    if (!window.particleSystem || !isPlaying) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    switch(index) {
        case 0: // Title - Continuous sparkles
            const titleInterval = setInterval(() => {
                if (!isPlaying || currentSectionIndex !== 0) return;
                const randomX = centerX + (Math.random() - 0.5) * 400;
                const randomY = centerY + (Math.random() - 0.5) * 300;
                window.particleSystem.createSparkles(randomX, randomY, 5);
            }, 1500);
            particleIntervals.push(titleInterval);
            break;

        case 1: // Processing speed - Data streams
            const speedInterval = setInterval(() => {
                if (!isPlaying || currentSectionIndex !== 1) return;
                window.particleSystem.createRain(12);
                const leftX = centerX - 300;
                const rightX = centerX + 300;
                window.particleSystem.createSparkles(leftX, centerY, 6);
                setTimeout(() => {
                    window.particleSystem.createSparkles(rightX, centerY, 6);
                }, 800);
            }, 3000);
            particleIntervals.push(speedInterval);
            break;

        case 2: // Creativity - Idea bursts
            const creativityInterval = setInterval(() => {
                if (!isPlaying || currentSectionIndex !== 2) return;
                const randomX = centerX + (Math.random() - 0.5) * 500;
                const randomY = centerY + (Math.random() - 0.5) * 400;
                window.particleSystem.createBurst(randomX, randomY, 10, '#ffd700');
                if (window.audioEngine) window.audioEngine.playSparkle();
            }, 2500);
            particleIntervals.push(creativityInterval);
            break;

        case 3: // Learning - Growth patterns
            const learningInterval = setInterval(() => {
                if (!isPlaying || currentSectionIndex !== 3) return;
                window.particleSystem.createFloating(15);
                setTimeout(() => {
                    window.particleSystem.createSparkles(centerX, centerY - 100, 8);
                }, 500);
            }, 3500);
            particleIntervals.push(learningInterval);
            break;

        case 4: // Conclusion - Celebration
            const conclusionInterval = setInterval(() => {
                if (!isPlaying || currentSectionIndex !== 4) return;
                window.particleSystem.createConfetti(30);
                setTimeout(() => {
                    const randomX = centerX + (Math.random() - 0.5) * 600;
                    const randomY = centerY + (Math.random() - 0.5) * 400;
                    window.particleSystem.createBurst(randomX, randomY, 12, ['#4facfe', '#ff6b6b', '#ffd700'][Math.floor(Math.random() * 3)]);
                }, 1000);
            }, 4000);
            particleIntervals.push(conclusionInterval);
            break;
    }
}

function showSection(index) {
    // Clear any existing particle intervals
    particleIntervals.forEach(interval => clearInterval(interval));
    particleIntervals = [];

    // Remove active class from all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Add active class to current section
    sections[index].classList.add('active');
    currentSectionIndex = index;

    // Play transition sound
    if (window.audioEngine && index > 0) {
        window.audioEngine.playWhoosh();
    }

    // Start continuous particle effects for this section
    startContinuousParticles(index);

    // Trigger particle effects based on section
    if (window.particleSystem) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        switch(index) {
            case 0: // Title section - Epic entrance
                window.particleSystem.createBurst(centerX, centerY, 30, '#667eea');
                setTimeout(() => {
                    window.particleSystem.createBurst(centerX - 150, centerY - 100, 20, '#764ba2');
                }, 300);
                setTimeout(() => {
                    window.particleSystem.createBurst(centerX + 150, centerY - 100, 20, '#f093fb');
                }, 600);
                if (window.audioEngine) {
                    setTimeout(() => window.audioEngine.playPop(), 200);
                    setTimeout(() => window.audioEngine.playSparkle(), 500);
                }
                break;

            case 1: // Processing speed - Rain of data
                window.particleSystem.createRain(25);
                setTimeout(() => {
                    window.particleSystem.createSparkles(centerX - 200, centerY, 10);
                }, 1000);
                setTimeout(() => {
                    window.particleSystem.createSparkles(centerX + 200, centerY, 10);
                }, 1500);
                setTimeout(() => {
                    if (window.audioEngine) window.audioEngine.playRise();
                }, 400);
                break;

            case 2: // Creativity - Ideas explosion
                window.particleSystem.createSparkles(centerX, centerY - 100, 18);
                setTimeout(() => {
                    window.particleSystem.createBurst(centerX - 100, centerY, 15, '#ffd700');
                }, 500);
                setTimeout(() => {
                    window.particleSystem.createBurst(centerX + 100, centerY, 15, '#ff69b4');
                }, 1000);
                setTimeout(() => {
                    if (window.audioEngine) window.audioEngine.playSparkle();
                }, 300);
                setTimeout(() => {
                    if (window.audioEngine) window.audioEngine.playPop();
                }, 800);
                break;

            case 3: // Learning - Growth pattern
                window.particleSystem.createFloating(20);
                setTimeout(() => {
                    window.particleSystem.createBurst(centerX, centerY - 50, 15, '#4facfe');
                }, 700);
                setTimeout(() => {
                    window.particleSystem.createSparkles(centerX, centerY + 50, 12);
                }, 1400);
                setTimeout(() => {
                    if (window.audioEngine) window.audioEngine.playPop();
                }, 500);
                setTimeout(() => {
                    if (window.audioEngine) window.audioEngine.playRise();
                }, 1200);
                break;

            case 4: // Conclusion - Grand finale
                setTimeout(() => {
                    window.particleSystem.createConfetti(50);
                    if (window.audioEngine) window.audioEngine.playSuccess();
                }, 300);
                setTimeout(() => {
                    window.particleSystem.createBurst(centerX - 250, centerY, 20, '#4facfe');
                    window.particleSystem.createBurst(centerX + 250, centerY, 20, '#ff6b6b');
                }, 800);
                setTimeout(() => {
                    window.particleSystem.createSparkles(centerX, centerY - 150, 15);
                }, 1300);
                setTimeout(() => {
                    window.particleSystem.createBurst(centerX, centerY + 100, 25, '#ffd700');
                }, 1800);
                setTimeout(() => {
                    if (window.audioEngine) window.audioEngine.playSparkle();
                }, 1500);
                break;
        }
    }
}

function onVideoEnd() {
    pause();
    // Keep showing the last section
}

// =================== PROGRESS BAR ===================
function updateProgress() {
    if (!isPlaying) return;

    const elapsed = Date.now() - startTime;
    const progress = Math.min((elapsed / TOTAL_DURATION) * 100, 100);

    progressBar.style.width = progress + '%';
    currentTimeDisplay.textContent = formatTime(elapsed / 1000);

    // scheduleNextSection handles section transitions - don't interfere here

    if (progress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
    } else {
        onVideoEnd();
    }
}

function handleProgressClick(e) {
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const targetTime = percentage * TOTAL_DURATION;

    // Find which section this time corresponds to
    let accumulatedTime = 0;
    let targetSection = 0;

    for (let i = 0; i < SECTION_DURATIONS.length; i++) {
        accumulatedTime += SECTION_DURATIONS[i];
        if (targetTime <= accumulatedTime) {
            targetSection = i;
            break;
        }
    }

    // Jump to that section
    pausedTime = targetTime;
    showSection(targetSection);

    if (isPlaying) {
        clearTimeout(sectionTimeoutId);
        startTime = Date.now() - pausedTime;
        scheduleNextSection();
    }
}

// =================== UTILITY FUNCTIONS ===================
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
}

// =================== START ===================
init();
