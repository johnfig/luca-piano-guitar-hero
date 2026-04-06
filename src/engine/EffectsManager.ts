import { HitRating, HitEffect } from '@/types/game';
import { HIT_EFFECT_DURATION } from '@/constants/timing';

class EffectsManager {
  private effects: HitEffect[] = [];

  addHitEffect(lane: number, rating: HitRating, x: number, y: number): void {
    this.effects.push({
      x,
      y,
      time: HIT_EFFECT_DURATION,
      rating,
      lane,
    });
  }

  update(deltaTime: number): void {
    for (let i = this.effects.length - 1; i >= 0; i--) {
      this.effects[i].time -= deltaTime;

      if (this.effects[i].time <= 0) {
        this.effects.splice(i, 1);
      }
    }
  }

  getEffects(): HitEffect[] {
    return this.effects;
  }

  clear(): void {
    this.effects = [];
  }
}

export default EffectsManager;
