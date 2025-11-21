// =================== CONFIGURATION ===================
const slideDurations = [3000, 7000, 7000, 7000, 6000]; // Durations in milliseconds

// =================== DOM ELEMENTS ===================
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const progressBar = document.getElementById('progressBar');

// =================== STATE ===================
let currentIndex = 0;
let autoPlayTimer = null;
let progressInterval = null;
let isAutoPlaying = true;

// =================== FUNCTIONS ===================

/**
 * Show a specific slide by index
 */
function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Remove active class from all indicators
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });

    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');

    // Update current index
    currentIndex = index;

    // Reset progress bar
    resetProgressBar();

    // Start progress animation for current slide
    if (isAutoPlaying) {
        animateProgressBar(slideDurations[currentIndex]);
    }
}

/**
 * Go to next slide
 */
function nextSlide() {
    if (currentIndex < slides.length - 1) {
        showSlide(currentIndex + 1);

        // Clear existing timer and restart auto-play
        clearAutoPlayTimer();
        if (isAutoPlaying) {
            startAutoPlay();
        }
    } else {
        // We're at the last slide, stop auto-playing
        stopAutoPlay();
        highlightRestartButton();
    }
}

/**
 * Go to previous slide
 */
function prevSlide() {
    if (currentIndex > 0) {
        showSlide(currentIndex - 1);

        // Clear existing timer and restart auto-play
        clearAutoPlayTimer();
        if (isAutoPlaying) {
            startAutoPlay();
        }
    }
}

/**
 * Restart the slideshow from the beginning
 */
function restartSlideshow() {
    isAutoPlaying = true;
    showSlide(0);
    startAutoPlay();
    removeRestartHighlight();
}

/**
 * Start auto-play timer for current slide
 */
function startAutoPlay() {
    if (!isAutoPlaying) return;

    clearAutoPlayTimer();

    autoPlayTimer = setTimeout(() => {
        nextSlide();
    }, slideDurations[currentIndex]);
}

/**
 * Clear auto-play timer
 */
function clearAutoPlayTimer() {
    if (autoPlayTimer) {
        clearTimeout(autoPlayTimer);
        autoPlayTimer = null;
    }
}

/**
 * Stop auto-playing
 */
function stopAutoPlay() {
    isAutoPlaying = false;
    clearAutoPlayTimer();
    clearProgressInterval();
}

/**
 * Animate progress bar
 */
function animateProgressBar(duration) {
    clearProgressInterval();

    let startTime = Date.now();

    progressInterval = setInterval(() => {
        let elapsed = Date.now() - startTime;
        let percentage = Math.min((elapsed / duration) * 100, 100);

        progressBar.style.width = percentage + '%';

        if (percentage >= 100) {
            clearProgressInterval();
        }
    }, 10);
}

/**
 * Reset progress bar
 */
function resetProgressBar() {
    progressBar.style.width = '0%';
}

/**
 * Clear progress interval
 */
function clearProgressInterval() {
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
}

/**
 * Highlight restart button
 */
function highlightRestartButton() {
    restartBtn.style.transform = 'scale(1.1)';
    restartBtn.style.boxShadow = '0 5px 20px rgba(245, 87, 108, 0.6)';
}

/**
 * Remove restart button highlight
 */
function removeRestartHighlight() {
    restartBtn.style.transform = 'scale(1)';
    restartBtn.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
}

// =================== EVENT LISTENERS ===================

// Previous button
prevBtn.addEventListener('click', () => {
    prevSlide();
});

// Next button
nextBtn.addEventListener('click', () => {
    nextSlide();
});

// Restart button
restartBtn.addEventListener('click', () => {
    restartSlideshow();
});

// Indicator clicks
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
        clearAutoPlayTimer();

        // Restart auto-play if we're not on the last slide
        if (index < slides.length - 1) {
            isAutoPlaying = true;
            startAutoPlay();
        } else {
            stopAutoPlay();
            highlightRestartButton();
        }
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevSlide();
    } else if (e.key === 'Home') {
        restartSlideshow();
    }
});

// Touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    // Swipe threshold
    const swipeThreshold = 50;

    if (touchEndX < touchStartX - swipeThreshold) {
        // Swiped left (next slide in RTL)
        prevSlide();
    }

    if (touchEndX > touchStartX + swipeThreshold) {
        // Swiped right (previous slide in RTL)
        nextSlide();
    }
}

// Pause auto-play when window loses focus
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearAutoPlayTimer();
        clearProgressInterval();
    } else {
        if (isAutoPlaying && currentIndex < slides.length - 1) {
            startAutoPlay();
        }
    }
});

// =================== INITIALIZATION ===================

/**
 * Initialize the slideshow
 */
function init() {
    // Show first slide
    showSlide(0);

    // Start auto-play
    startAutoPlay();

    // Add smooth scroll prevention for better UX
    document.body.style.overflow = 'hidden';
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// =================== ACCESSIBILITY ===================

// Announce slide changes for screen readers
function announceSlideChange(index) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = `الشريحة ${index + 1} من ${slides.length}`;
    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Update showSlide to include accessibility announcement
const originalShowSlide = showSlide;
showSlide = function(index) {
    originalShowSlide(index);
    announceSlideChange(index);
};
