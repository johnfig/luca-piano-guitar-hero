import { Particle } from '@/types/game';
import { MAX_PARTICLES, PARTICLE_LIFETIME } from '@/constants/timing';
import { randomRange } from '@/utils/math';

class ParticleSystem {
  private particles: Particle[] = [];

  emit(x: number, y: number, color: string, count: number): void {
    for (let i = 0; i < count; i++) {
      if (this.particles.length >= MAX_PARTICLES) break;

      this.particles.push({
        x,
        y,
        vx: randomRange(-150, 150),
        vy: randomRange(-200, -50),
        life: PARTICLE_LIFETIME,
        maxLife: PARTICLE_LIFETIME,
        color,
        size: randomRange(2, 6),
      });
    }
  }

  update(deltaTime: number): void {
    const gravity = 300; // pixels/sec^2 pull downward

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.x += p.vx * deltaTime;
      p.vy += gravity * deltaTime;
      p.y += p.vy * deltaTime;
      p.life -= deltaTime;

      if (p.life <= 0) {
        // Swap-remove for performance
        this.particles[i] = this.particles[this.particles.length - 1];
        this.particles.pop();
      }
    }
  }

  getParticles(): Particle[] {
    return this.particles;
  }

  clear(): void {
    this.particles = [];
  }
}

export default ParticleSystem;
