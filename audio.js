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
        this.loopCount = 0;
        this.playBackgroundLoop();
    }

    playBackgroundLoop() {
        if (!this.backgroundLoop || !this.context) return;

        const now = this.context.currentTime;
        this.loopCount++;

        // Varied progressions that evolve
        const progressions = [
            [[261.63, 329.63, 392.00], [293.66, 369.99, 440.00]], // C-E-G, D-F#-A
            [[329.63, 415.30, 493.88], [349.23, 440.00, 523.25]], // E-G#-B, F-A-C
            [[392.00, 493.88, 587.33], [440.00, 554.37, 659.25]], // G-B-D, A-C#-E
            [[493.88, 622.25, 739.99], [523.25, 659.25, 783.99]]  // B-D#-F#, C-E-G
        ];

        const progressionIndex = Math.floor(this.loopCount / 4) % progressions.length;
        const chordSet = progressions[progressionIndex];
        const chordIndex = this.loopCount % 2;
        const currentChord = chordSet[chordIndex];

        // Varied rhythm patterns
        const patterns = [
            [0, 0.5, 1, 1.5], // Steady
            [0, 0.25, 0.75, 1.25, 1.75], // Syncopated
            [0, 0.5, 1, 1.25, 1.75], // Mixed
            [0, 0.33, 0.66, 1, 1.33, 1.66] // Triplets
        ];

        const pattern = patterns[Math.floor(this.loopCount / 2) % patterns.length];

        // Bass with varied pattern
        pattern.forEach(timing => {
            const bassOsc = this.context.createOscillator();
            const bassGain = this.context.createGain();
            const bassFilter = this.context.createBiquadFilter();

            bassOsc.type = this.loopCount % 3 === 0 ? 'sine' : 'triangle';
            bassOsc.frequency.setValueAtTime(currentChord[0] / 2, now + timing);

            bassFilter.type = 'lowpass';
            bassFilter.frequency.setValueAtTime(300 + (this.loopCount % 3) * 100, now + timing);

            const accent = timing === 0 ? 1.5 : 1;
            bassGain.gain.setValueAtTime(0, now + timing);
            bassGain.gain.linearRampToValueAtTime(0.03 * accent, now + timing + 0.01);
            bassGain.gain.exponentialRampToValueAtTime(0.001, now + timing + 0.25);

            bassOsc.connect(bassFilter);
            bassFilter.connect(bassGain);
            bassGain.connect(this.masterGain);

            bassOsc.start(now + timing);
            bassOsc.stop(now + timing + 0.25);
        });

        // Melodic chords with variation
        const chordDuration = 1.5 + (this.loopCount % 3) * 0.3;
        currentChord.forEach((freq, index) => {
            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();
            const filter = this.context.createBiquadFilter();

            const waveTypes = ['sine', 'triangle', 'sine'];
            oscillator.type = waveTypes[this.loopCount % 3];
            oscillator.frequency.setValueAtTime(freq, now);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(1500 + (this.loopCount % 5) * 200, now);
            filter.Q.setValueAtTime(1 + index * 0.5, now);

            const volume = 0.02 + (index === 0 ? 0.005 : 0);
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(volume, now + 0.2);
            gainNode.gain.setValueAtTime(volume, now + chordDuration - 0.3);
            gainNode.gain.linearRampToValueAtTime(0, now + chordDuration);

            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.masterGain);

            oscillator.start(now);
            oscillator.stop(now + chordDuration);
        });

        // Varied hi-hat patterns
        const hihatPatterns = [
            [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75],
            [0, 0.5, 1, 1.5],
            [0, 0.25, 0.5, 1, 1.25, 1.5],
            [0, 0.33, 0.66, 1, 1.33, 1.66]
        ];

        const hihatPattern = hihatPatterns[Math.floor(this.loopCount / 3) % hihatPatterns.length];

        hihatPattern.forEach((timing, i) => {
            const hihat = this.context.createOscillator();
            const hihatGain = this.context.createGain();
            const hihatFilter = this.context.createBiquadFilter();

            hihat.type = 'square';
            hihat.frequency.setValueAtTime(7000 + Math.random() * 2000, now + timing);

            hihatFilter.type = 'highpass';
            hihatFilter.frequency.setValueAtTime(6000, now + timing);

            const isAccent = i % 2 === 0;
            hihatGain.gain.setValueAtTime(0, now + timing);
            hihatGain.gain.linearRampToValueAtTime(isAccent ? 0.012 : 0.006, now + timing + 0.005);
            hihatGain.gain.exponentialRampToValueAtTime(0.001, now + timing + 0.06);

            hihat.connect(hihatFilter);
            hihatFilter.connect(hihatGain);
            hihatGain.connect(this.masterGain);

            hihat.start(now + timing);
            hihat.stop(now + timing + 0.06);
        });

        // Add occasional melodic "ping" for variety
        if (this.loopCount % 4 === 0) {
            setTimeout(() => {
                const ping = this.context.createOscillator();
                const pingGain = this.context.createGain();
                const pingTime = this.context.currentTime;

                ping.type = 'sine';
                ping.frequency.setValueAtTime(currentChord[2] * 2, pingTime);

                pingGain.gain.setValueAtTime(0.015, pingTime);
                pingGain.gain.exponentialRampToValueAtTime(0.001, pingTime + 0.3);

                ping.connect(pingGain);
                pingGain.connect(this.masterGain);

                ping.start(pingTime);
                ping.stop(pingTime + 0.3);
            }, 1000);
        }

        // Varied loop timing
        const nextLoopDelay = 1800 + (this.loopCount % 3) * 200;
        setTimeout(() => this.playBackgroundLoop(), nextLoopDelay);
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
