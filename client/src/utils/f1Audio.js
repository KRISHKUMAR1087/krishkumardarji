// Web Audio API Synthesizer for Authentic F1 Sound Effects (Rev, Flyby, Radio Beep, DRS Activate)
class F1SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  // F1 Engine Flyby / Acceleration Sound Effect
  playEngineRev() {
    try {
      this.init();
      if (!this.ctx || this.isMuted) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      
      // Pitch envelope: low idle -> high scream rev -> shift drop -> high scream
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.exponentialRampToValueAtTime(360, now + 0.3);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.35); // Gear shift
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.7);
      osc.frequency.exponentialRampToValueAtTime(120, now + 1.2);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.linearRampToValueAtTime(3200, now + 0.5);
      filter.frequency.exponentialRampToValueAtTime(600, now + 1.2);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.2);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.7);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.2);
    } catch (e) {
      // Audio fallback
    }
  }

  // Pit Wall Radio Beep
  playRadioBeep() {
    try {
      this.init();
      if (!this.ctx || this.isMuted) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1760, now + 0.05);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {
      // Audio fallback
    }
  }

  // DRS Open / Checkpoint Click
  playDRSOpen() {
    try {
      this.init();
      if (!this.ctx || this.isMuted) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(1040, now + 0.08);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {
      // Audio fallback
    }
  }
}

export const f1Audio = new F1SoundEngine();
