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

    // Auto-play on load
    setTimeout(() => {
        play();
    }, 500);
}

// =================== PLAYBACK FUNCTIONS ===================
function play() {
    if (isPlaying) return;

    isPlaying = true;
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'flex';

    if (startTime === null) {
        startTime = Date.now() - pausedTime;
    } else {
        startTime = Date.now() - pausedTime;
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
    // Remove active class from all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Add active class to current section
    sections[index].classList.add('active');
    currentSectionIndex = index;
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
