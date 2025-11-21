// =================== AUDIO ENGINE ===================
// Professional audio system using Web Audio API

class AudioEngine {
    constructor() {
        this.context = null;
        this.masterGain = null;
        this.backgroundLoop = null;
        this.enabled = true;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.context.createGain();
            this.masterGain.gain.value = 0.3; // Master volume
            this.masterGain.connect(this.context.destination);
            this.initialized = true;
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.enabled = false;
        }
    }

    async resume() {
        if (!this.context) {
            this.init();
        }

        if (this.context && this.context.state === 'suspended') {
            try {
                await this.context.resume();
            } catch (e) {
                console.warn('Could not resume AudioContext', e);
            }
        }
    }

    // =================== SOUND EFFECTS ===================

    // Whoosh sound for transitions
    playWhoosh() {
        if (!this.enabled) return;
        if (!this.context) this.init();
        if (!this.context) return;

        const now = this.context.currentTime;
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        const filter = this.context.createBiquadFilter();

        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(800, now);
        oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.3);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, now);
        filter.frequency.exponentialRampToValueAtTime(200, now + 0.3);

        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.start(now);
        oscillator.stop(now + 0.3);
    }

    // Pop sound for icons appearing
    playPop() {
        if (!this.enabled) return;
        if (!this.context) this.init();
        if (!this.context) return;

        const now = this.context.currentTime;
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, now);
        oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.08);

        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.start(now);
        oscillator.stop(now + 0.08);
    }

    // Rise sound for cards sliding in
    playRise() {
        if (!this.enabled) return;
        if (!this.context) this.init();
        if (!this.context) return;

        const now = this.context.currentTime;
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();

        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(200, now);
        oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.2);

        gainNode.gain.setValueAtTime(0.12, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.start(now);
        oscillator.stop(now + 0.2);
    }

    // Sparkle sound for creative effects
    playSparkle() {
        if (!this.enabled) return;
        if (!this.context) this.init();
        if (!this.context) return;

        const now = this.context.currentTime;
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(2000, now);
        oscillator.frequency.exponentialRampToValueAtTime(3500, now + 0.1);

        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.start(now);
        oscillator.stop(now + 0.1);
    }

    // Success chime for conclusion
    playSuccess() {
        if (!this.enabled) return;
        if (!this.context) this.init();
        if (!this.context) return;

        const now = this.context.currentTime;
        const frequencies = [523.25, 659.25, 783.99]; // C, E, G major chord

        frequencies.forEach((freq, index) => {
            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq, now);

            gainNode.gain.setValueAtTime(0, now + index * 0.08);
            gainNode.gain.linearRampToValueAtTime(0.1, now + index * 0.08 + 0.04);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + index * 0.08 + 0.5);

            oscillator.connect(gainNode);
            gainNode.connect(this.masterGain);

            oscillator.start(now + index * 0.08);
            oscillator.stop(now + index * 0.08 + 0.5);
        });
    }

    // =================== BACKGROUND MUSIC ===================

    startBackgroundMusic() {
        if (!this.enabled || this.backgroundLoop) return;
        if (!this.context) this.init();

        this.backgroundLoop = true;
        this.playBackgroundLoop();
    }

    playBackgroundLoop() {
        if (!this.backgroundLoop || !this.context) return;

        const now = this.context.currentTime;
        const duration = 8;

        // Create a pleasant chord progression
        const chords = [
            [261.63, 329.63, 392.00], // C-E-G (C major)
            [293.66, 369.99, 440.00], // D-F#-A (D major)
            [246.94, 329.63, 392.00], // B-E-G (Em)
            [261.63, 329.63, 392.00]  // C-E-G (C major)
        ];

        const currentChord = chords[Math.floor(Math.random() * chords.length)];

        currentChord.forEach((freq, index) => {
            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();
            const filter = this.context.createBiquadFilter();

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq, now);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800, now);
            filter.Q.setValueAtTime(1, now);

            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.015, now + 1);
            gainNode.gain.setValueAtTime(0.015, now + duration - 2);
            gainNode.gain.linearRampToValueAtTime(0, now + duration);

            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.masterGain);

            oscillator.start(now);
            oscillator.stop(now + duration);
        });

        // Schedule next chord
        setTimeout(() => this.playBackgroundLoop(), (duration - 1) * 1000);
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
