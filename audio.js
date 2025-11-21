// =================== AUDIO ENGINE ===================
// Professional audio system using Web Audio API

class AudioEngine {
    constructor() {
        this.context = null;
        this.masterGain = null;
        this.backgroundLoop = null;
        this.enabled = true;
        this.init();
    }

    init() {
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.context.createGain();
            this.masterGain.gain.value = 0.3; // Master volume
            this.masterGain.connect(this.context.destination);
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.enabled = false;
        }
    }

    // =================== SOUND EFFECTS ===================

    // Whoosh sound for transitions
    playWhoosh() {
        if (!this.enabled) return;

        const now = this.context.currentTime;
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        const filter = this.context.createBiquadFilter();

        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(800, now);
        oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.5);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, now);
        filter.frequency.exponentialRampToValueAtTime(200, now + 0.5);

        gainNode.gain.setValueAtTime(0.4, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.start(now);
        oscillator.stop(now + 0.5);
    }

    // Pop sound for icons appearing
    playPop() {
        if (!this.enabled) return;

        const now = this.context.currentTime;
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, now);
        oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.1);

        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.start(now);
        oscillator.stop(now + 0.1);
    }

    // Rise sound for cards sliding in
    playRise() {
        if (!this.enabled) return;

        const now = this.context.currentTime;
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();

        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(200, now);
        oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.3);

        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.start(now);
        oscillator.stop(now + 0.3);
    }

    // Sparkle sound for creative effects
    playSparkle() {
        if (!this.enabled) return;

        const now = this.context.currentTime;
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(2000, now);
        oscillator.frequency.exponentialRampToValueAtTime(4000, now + 0.15);

        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.start(now);
        oscillator.stop(now + 0.15);
    }

    // Success chime for conclusion
    playSuccess() {
        if (!this.enabled) return;

        const now = this.context.currentTime;
        const frequencies = [523.25, 659.25, 783.99]; // C, E, G major chord

        frequencies.forEach((freq, index) => {
            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq, now);

            gainNode.gain.setValueAtTime(0, now + index * 0.1);
            gainNode.gain.linearRampToValueAtTime(0.15, now + index * 0.1 + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + index * 0.1 + 0.8);

            oscillator.connect(gainNode);
            gainNode.connect(this.masterGain);

            oscillator.start(now + index * 0.1);
            oscillator.stop(now + index * 0.1 + 0.8);
        });
    }

    // =================== BACKGROUND MUSIC ===================

    startBackgroundMusic() {
        if (!this.enabled || this.backgroundLoop) return;

        const playAmbientLoop = () => {
            if (!this.backgroundLoop) return;

            const now = this.context.currentTime;

            // Create ambient pad sound
            const oscillator1 = this.context.createOscillator();
            const oscillator2 = this.context.createOscillator();
            const gainNode = this.context.createGain();
            const filter = this.context.createBiquadFilter();

            oscillator1.type = 'sine';
            oscillator1.frequency.setValueAtTime(220, now); // A3
            oscillator2.type = 'sine';
            oscillator2.frequency.setValueAtTime(329.63, now); // E4
            oscillator2.detune.setValueAtTime(5, now); // Slight detune for richness

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800, now);
            filter.Q.setValueAtTime(1, now);

            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.03, now + 1);
            gainNode.gain.setValueAtTime(0.03, now + 6);
            gainNode.gain.linearRampToValueAtTime(0, now + 8);

            oscillator1.connect(filter);
            oscillator2.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.masterGain);

            oscillator1.start(now);
            oscillator2.start(now);
            oscillator1.stop(now + 8);
            oscillator2.stop(now + 8);

            // Schedule next iteration
            setTimeout(playAmbientLoop, 7000);
        };

        this.backgroundLoop = true;
        playAmbientLoop();
    }

    stopBackgroundMusic() {
        this.backgroundLoop = false;
    }

    // =================== UTILITY ===================

    setVolume(value) {
        if (this.masterGain) {
            this.masterGain.gain.value = value;
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

// Create global audio engine instance
window.audioEngine = new AudioEngine();
