// =================== PARTICLE SYSTEM ===================
// Beautiful particle effects for transitions and backgrounds

class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.warn('Particle canvas not found');
            return;
        }

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationFrame = null;
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // =================== PARTICLE TYPES ===================

    createBurst(x, y, count = 30, color = '#667eea') {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = 2 + Math.random() * 3;
            this.particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: 0.02,
                size: 3 + Math.random() * 3,
                color,
                type: 'burst'
            });
        }
    }

    createRain(count = 50) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: -10,
                vx: 0,
                vy: 2 + Math.random() * 3,
                life: 1,
                decay: 0.005,
                size: 2 + Math.random() * 2,
                color: 'rgba(79, 172, 254, 0.6)',
                type: 'rain'
            });
        }
    }

    createFloating(count = 20) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: -0.5 + Math.random(),
                vy: -0.5 + Math.random(),
                life: 1,
                decay: 0.001,
                size: 4 + Math.random() * 4,
                color: `rgba(${100 + Math.random() * 155}, ${100 + Math.random() * 155}, 255, 0.4)`,
                type: 'floating',
                angle: Math.random() * Math.PI * 2,
                wobble: Math.random() * 0.05
            });
        }
    }

    createSparkles(x, y, count = 15) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 50,
                y: y + (Math.random() - 0.5) * 50,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2 - 1,
                life: 1,
                decay: 0.03,
                size: 2 + Math.random() * 2,
                color: '#ffd700',
                type: 'sparkle'
            });
        }
    }

    createConfetti(count = 100) {
        const colors = ['#667eea', '#764ba2', '#4facfe', '#00f2fe', '#ffd700', '#ff6b6b'];
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: -10 - Math.random() * 100,
                vx: (Math.random() - 0.5) * 4,
                vy: 3 + Math.random() * 2,
                life: 1,
                decay: 0.003,
                size: 4 + Math.random() * 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                type: 'confetti',
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2
            });
        }
    }

    // =================== UPDATE & RENDER ===================

    update() {
        this.particles = this.particles.filter(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Apply gravity for some particle types
            if (particle.type === 'rain' || particle.type === 'confetti') {
                particle.vy += 0.1;
            }

            // Wobble effect for floating particles
            if (particle.type === 'floating') {
                particle.angle += particle.wobble;
                particle.vx += Math.cos(particle.angle) * 0.02;
                particle.vy += Math.sin(particle.angle) * 0.02;
            }

            // Rotation for confetti
            if (particle.type === 'confetti') {
                particle.rotation += particle.rotationSpeed;
            }

            // Decay life
            particle.life -= particle.decay;

            // Remove particles that are off-screen or dead for performance
            const isAlive = particle.life > 0;
            const isOnScreen = particle.x > -50 && particle.x < this.canvas.width + 50 &&
                               particle.y > -50 && particle.y < this.canvas.height + 50;
            return isAlive && isOnScreen;
        });
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Batch rendering for better performance
        this.particles.forEach(particle => {
            // Skip particles that are too faded
            if (particle.life < 0.05) return;

            this.ctx.save();

            // Set opacity based on life
            this.ctx.globalAlpha = particle.life;

            // Move to particle position
            this.ctx.translate(particle.x, particle.y);

            // Rotate if needed
            if (particle.rotation !== undefined) {
                this.ctx.rotate(particle.rotation);
            }

            // Draw particle based on type
            if (particle.type === 'confetti') {
                this.ctx.fillStyle = particle.color;
                this.ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * 2);
            } else if (particle.type === 'sparkle') {
                // Draw simplified star shape
                this.ctx.fillStyle = particle.color;
                this.ctx.shadowBlur = 6;
                this.ctx.shadowColor = particle.color;
                this.ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                    const x = Math.cos(angle) * particle.size;
                    const y = Math.sin(angle) * particle.size;
                    if (i === 0) {
                        this.ctx.moveTo(x, y);
                    } else {
                        this.ctx.lineTo(x, y);
                    }
                }
                this.ctx.closePath();
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
            } else {
                // Draw circle
                this.ctx.fillStyle = particle.color;
                this.ctx.beginPath();
                this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
            }

            this.ctx.restore();
        });
    }

    animate() {
        this.update();
        this.render();
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }

    start() {
        if (!this.animationFrame) {
            this.animate();
        }
    }

    stop() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }

    clear() {
        this.particles = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Create global particle system instance
let particleSystem;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        particleSystem = new ParticleSystem('particleCanvas');
        particleSystem.start();
        window.particleSystem = particleSystem;
    });
} else {
    particleSystem = new ParticleSystem('particleCanvas');
    particleSystem.start();
    window.particleSystem = particleSystem;
}
