// =================== VIDEO CONFIGURATION ===================
const SECTION_DURATIONS = [4000, 6000, 6000, 6000, 8000]; // Duration for each section in milliseconds
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

console.log('Video.js loaded, found', sections.length, 'sections');

// =================== STATE ===================
let currentSectionIndex = 0;
let isPlaying = false;
let startTime = null;
let pausedTime = 0;
let animationFrameId = null;
let sectionTimeoutId = null;

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

function showSection(index) {
    console.log('showSection called with index:', index);
    console.log('Total sections found:', sections.length);

    // Remove active class from all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Add active class to current section
    if (sections[index]) {
        sections[index].classList.add('active');
        console.log('Added active class to section', index, sections[index]);
    } else {
        console.error('Section not found at index', index);
    }
    currentSectionIndex = index;

    // Play transition sound
    if (window.audioEngine && index > 0) {
        window.audioEngine.playWhoosh();
    }

    // Trigger particle effects based on section
    if (window.particleSystem) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        switch(index) {
            case 0: // Title section
                window.particleSystem.createBurst(centerX, centerY, 20, '#667eea');
                if (window.audioEngine) {
                    setTimeout(() => window.audioEngine.playPop(), 200);
                }
                break;

            case 1: // Processing speed
                window.particleSystem.createRain(15);
                setTimeout(() => {
                    if (window.audioEngine) window.audioEngine.playRise();
                }, 400);
                break;

            case 2: // Creativity
                window.particleSystem.createSparkles(centerX, centerY - 100, 12);
                setTimeout(() => {
                    if (window.audioEngine) window.audioEngine.playSparkle();
                }, 300);
                break;

            case 3: // Learning
                window.particleSystem.createFloating(15);
                setTimeout(() => {
                    if (window.audioEngine) window.audioEngine.playPop();
                }, 500);
                break;

            case 4: // Conclusion
                setTimeout(() => {
                    window.particleSystem.createConfetti(35);
                    if (window.audioEngine) window.audioEngine.playSuccess();
                }, 300);
                setTimeout(() => {
                    window.particleSystem.createBurst(centerX - 200, centerY, 15, '#4facfe');
                }, 600);
                setTimeout(() => {
                    window.particleSystem.createBurst(centerX + 200, centerY, 15, '#ff6b6b');
                }, 900);
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

    // Check if we need to move to next section
    let accumulatedTime = 0;
    for (let i = 0; i < sections.length; i++) {
        accumulatedTime += SECTION_DURATIONS[i];
        if (elapsed < accumulatedTime && currentSectionIndex !== i) {
            showSection(i);
            break;
        }
    }

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
