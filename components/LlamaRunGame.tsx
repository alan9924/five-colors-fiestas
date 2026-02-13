
import React, { useEffect, useRef, useState } from 'react';
import { X, Trophy, Play, RotateCcw, Volume2, VolumeX, ArrowLeft, ArrowRight, ArrowUp, Zap, Shield as ShieldIcon, Magnet as MagnetIcon, Music, Star, Flame } from 'lucide-react';

type Difficulty = 'EASY' | 'NORMAL' | 'HARD';

const DIFFICULTY_CONFIG = {
  EASY: {
    label: 'EASY',
    startSpeed: 10,
    maxSpeed: 22,
    acceleration: 0.0015,
    gapMod: 1.3,
    scoreMult: 1,
    color: 'bg-brand-green',
    text: 'text-brand-green'
  },
  NORMAL: {
    label: 'NORMAL',
    startSpeed: 14,
    maxSpeed: 32,
    acceleration: 0.004,
    gapMod: 1.0,
    scoreMult: 1.5,
    color: 'bg-brand-blue',
    text: 'text-brand-blue'
  },
  HARD: {
    label: 'HARD',
    startSpeed: 20,
    maxSpeed: 45,
    acceleration: 0.007,
    gapMod: 0.85,
    scoreMult: 2.5,
    color: 'bg-brand-pink',
    text: 'text-brand-pink'
  }
};

const AVAILABLE_CHARACTERS = [
  { id: 'blue', name: 'DJ Blue', color: '#3B82F6', headColor: '#3B82F6', torsoColor: '#1D4ED8', legsColor: '#1F2937', accessory: 'headphones' },
  { id: 'white', name: 'Angel White', color: '#FFFFFF', headColor: '#FFFFFF', torsoColor: '#D1D5DB', legsColor: '#1F2937', accessory: 'halo' },
  { id: 'yellow', name: 'King Yellow', color: '#EAB308', headColor: '#EAB308', torsoColor: '#A16207', legsColor: '#1F2937', accessory: 'crown' },
  { id: 'purple', name: 'Wizard Purple', color: '#A855F7', headColor: '#A855F7', torsoColor: '#7E22CE', legsColor: '#1F2937', accessory: 'wizard_hat' },
  { id: 'red', name: 'Red Racer', color: '#EF4444', headColor: '#EF4444', torsoColor: '#B91C1C', legsColor: '#1F2937', accessory: 'helmet' },
];

const drawLlama = (
  ctx: CanvasRenderingContext2D,
  charConfig: typeof AVAILABLE_CHARACTERS[0],
  x: number,
  y: number,
  scale: number,
  isJumping: boolean,
  tilt: number,
  tick: number,
  isIdle: boolean,
  faceFront: boolean = false,
  opacity: number = 1
) => {
  if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(scale) || scale <= 0) return;

  const w = 40 * scale;
  const h = 40 * scale;

  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.translate(x, y);

  if (!faceFront) ctx.rotate(tilt);

  // Bobbing animation
  const runCycle = tick * 0.5;
  const bobY = isIdle ? Math.sin(tick * 0.1) * (5 * scale) : Math.abs(Math.sin(runCycle * 2)) * (10 * scale);
  const jumpY = isJumping ? -20 * scale : 0;

  ctx.translate(0, jumpY - bobY);

  // --- MODEL DIMENSIONS (Humanoid Llama) ---
  const HEAD_SZ = 34 * scale;    // Cube head
  const TORSO_W = 38 * scale;
  const TORSO_H = 38 * scale;
  const LIMB_W = 14 * scale;
  const LIMB_H = 38 * scale;
  const NECK_W = 12 * scale;     // Visible Neck!
  const NECK_H = 14 * scale;     // Tall Neck!

  const OUTLINE_COLOR = '#111827';
  const OUTLINE_WIDTH = 3;

  // Colors
  const C_HEAD = charConfig.headColor || '#FCD34D';
  const C_TORSO = charConfig.torsoColor || '#3B82F6';
  const C_LEGS = charConfig.legsColor || '#1F2937';
  const C_NECK = C_HEAD; // Neck matches head usually (fur)

  // Animation Angles
  const lArmAngle = isIdle ? Math.sin(tick * 0.1) * 0.05 : Math.sin(runCycle) * 0.8;
  const rArmAngle = isIdle ? -Math.sin(tick * 0.1) * 0.05 : Math.sin(runCycle + Math.PI) * 0.8;
  const lLegAngle = isIdle ? 0 : Math.sin(runCycle + Math.PI) * 0.8;
  const rLegAngle = isIdle ? 0 : Math.sin(runCycle) * 0.8;

  // Helper to draw a block (rectangle)
  const drawBlock = (bx: number, by: number, bw: number, bh: number, color: string, anchorX: number = 0, anchorY: number = 0, rotation: number = 0) => {
    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(rotation);
    ctx.translate(-anchorX, -anchorY); // Pivot point

    // Projection Depth (Side/Top)
    const dX = 8 * scale;
    const dY = -6 * scale;

    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';

    // 1. SIDE FACE (Right)
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(bw, 0);
    ctx.lineTo(bw + dX, dY);
    ctx.lineTo(bw + dX, bh + dY);
    ctx.lineTo(bw, bh);
    ctx.closePath();
    ctx.fill();
    // Darken side
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fill();
    ctx.strokeStyle = OUTLINE_COLOR;
    ctx.stroke();

    // 2. TOP FACE
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(dX, dY);
    ctx.lineTo(bw + dX, dY);
    ctx.lineTo(bw, 0);
    ctx.closePath();
    ctx.fill();
    // Lighten top
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fill();
    ctx.stroke();

    // 3. FRONT FACE (Main)
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, bw, bh);
    ctx.strokeRect(0, 0, bw, bh);

    // Inner bevel for plastic look
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(2, 2, bw - 4, bh * 0.2);

    ctx.restore();
  };

  const legOffX = TORSO_W / 4;

  // --- SHADOW (Ground) ---
  if (opacity === 1) {
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    const shadowScale = isJumping ? 0.6 : 1.0 + (bobY / 50);
    ctx.ellipse(0, 0, TORSO_W * shadowScale, TORSO_W * 0.4 * shadowScale, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // --- LEGS ---
  // Left Leg
  drawBlock(-legOffX - LIMB_W / 2, -LIMB_H, LIMB_W, LIMB_H, C_LEGS, LIMB_W / 2, 0, lLegAngle);
  // Right Leg
  drawBlock(legOffX - LIMB_W / 2, -LIMB_H, LIMB_W, LIMB_H, C_LEGS, LIMB_W / 2, 0, rLegAngle);

  // --- TORSO ---
  const torsoY = -LIMB_H - TORSO_H;
  drawBlock(-TORSO_W / 2, torsoY, TORSO_W, TORSO_H, C_TORSO);

  if (faceFront) {
    // Chest details (Bib)
    ctx.fillStyle = '#FFFFFF';
    const chestSize = TORSO_W * 0.5;
    const chestH = TORSO_H * 0.6;
    ctx.beginPath();
    ctx.rect(-chestSize / 2, torsoY + TORSO_H * 0.1, chestSize, chestH * 0.7);
    ctx.fill();
  } else {
    // BACK DETAILS (Tail)
    const TAIL_SZ = 10 * scale;
    drawBlock(-TAIL_SZ / 2, torsoY + TORSO_H - TAIL_SZ, TAIL_SZ, TAIL_SZ, '#FFFFFF');
  }

  // --- NECK ( The Llama Key Feature!) ---
  const neckY = torsoY - NECK_H + 4 * scale; // Overlap slightly
  drawBlock(-NECK_W / 2, neckY, NECK_W, NECK_H, C_NECK);

  // --- ARMS ---
  const shoulderY = torsoY + 5 * scale;
  // Left Arm
  drawBlock(-TORSO_W / 2 - LIMB_W, shoulderY, LIMB_W, LIMB_H, C_TORSO, LIMB_W, 0, lArmAngle);
  // Right Arm
  drawBlock(TORSO_W / 2, shoulderY, LIMB_W, LIMB_H, C_TORSO, 0, 0, rArmAngle);

  // --- HEAD ---
  // Head sits on top of Neck
  const headY = neckY - HEAD_SZ + 4 * scale;
  const headAngle = isIdle ? 0 : Math.sin(runCycle * 2) * 0.05;

  ctx.save();
  ctx.translate(0, headY + HEAD_SZ / 2); // Pivot center of head areaish
  ctx.rotate(headAngle);
  ctx.translate(0, -HEAD_SZ / 2);

  // Draw Head Block
  drawBlock(-HEAD_SZ / 2, 0, HEAD_SZ, HEAD_SZ, C_HEAD);

  // --- SNOUT (Prominent Block) ---
  const SNOUT_W = HEAD_SZ * 0.6;
  const SNOUT_H = HEAD_SZ * 0.45;
  const snoutColor = '#FFE4C4'; // Biscuit/Cream color

  if (faceFront) {
    // Front view snout - centered, lower half of face
    const snY = HEAD_SZ * 0.4;
    drawBlock(-SNOUT_W / 2, snY, SNOUT_W, SNOUT_H, snoutColor);

    // Nostrils (Y shape split illusion or just dots)
    ctx.fillStyle = '#374151';
    // Left nostril
    ctx.beginPath();
    ctx.ellipse(-SNOUT_W * 0.2, snY + SNOUT_H * 0.3, 3 * scale, 2 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    // Right nostril
    ctx.beginPath();
    ctx.ellipse(SNOUT_W * 0.2, snY + SNOUT_H * 0.3, 3 * scale, 2 * scale, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mouth Split
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, snY + SNOUT_H * 0.5);
    ctx.lineTo(0, snY + SNOUT_H * 0.8);
    ctx.moveTo(-SNOUT_W * 0.15, snY + SNOUT_H * 0.8);
    ctx.lineTo(SNOUT_W * 0.15, snY + SNOUT_H * 0.8);
    ctx.stroke();

  }

  // --- EARS (Tall & Bunny-like for Llama) ---
  const EAR_W = HEAD_SZ * 0.28;
  const EAR_H = HEAD_SZ * 0.6; // Taller eyes

  const drawEar = (xPos: number, rots: number) => {
    ctx.save();
    ctx.translate(xPos, 0); // Top of head
    ctx.rotate(rots);

    // Ear Shape (Capsule/Banana)
    ctx.fillStyle = C_HEAD;
    ctx.strokeStyle = OUTLINE_COLOR;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-EAR_W / 2, 0);
    ctx.bezierCurveTo(-EAR_W / 2, -EAR_H * 0.5, -EAR_W, -EAR_H, 0, -EAR_H); // Outer curve
    ctx.bezierCurveTo(EAR_W, -EAR_H, EAR_W / 2, -EAR_H * 0.5, EAR_W / 2, 0); // Inner curve
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Inner Ear (only show if facing front)
    if (faceFront) {
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.beginPath();
      ctx.ellipse(0, -EAR_H * 0.4, EAR_W * 0.25, EAR_H * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  // Ears stick up from top
  drawEar(-HEAD_SZ * 0.3, -0.15);
  drawEar(HEAD_SZ * 0.3, 0.15);

  if (faceFront) {
    ctx.fillStyle = '#1F2937';
    const faceY = HEAD_SZ * 0.25;
    const eyeSz = HEAD_SZ * 0.14;
    const eyeOff = HEAD_SZ * 0.22;

    // Eyes
    ctx.beginPath();
    ctx.arc(-eyeOff, faceY, eyeSz, 0, Math.PI * 2);
    ctx.arc(eyeOff, faceY, eyeSz, 0, Math.PI * 2);
    ctx.fill();

    // Shine
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.arc(-eyeOff - 2 * scale, faceY - 2 * scale, eyeSz * 0.4, 0, Math.PI * 2);
    ctx.arc(eyeOff - 2 * scale, faceY - 2 * scale, eyeSz * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  // --- HAT/ACCESSORY ---
  if (charConfig.accessory === 'crown') {
    ctx.fillStyle = '#FBBF24';
    ctx.strokeStyle = OUTLINE_COLOR;
    ctx.lineWidth = 2;
    ctx.beginPath();
    const hatY = -2 * scale;
    const hatW = HEAD_SZ * 0.8;
    const hatH = HEAD_SZ * 0.3;
    // Simple Crown Points
    ctx.moveTo(-hatW / 2, hatY);
    ctx.lineTo(-hatW / 2, hatY - hatH);
    ctx.lineTo(-hatW / 6, hatY - hatH * 0.5);
    ctx.lineTo(0, hatY - hatH);
    ctx.lineTo(hatW / 6, hatY - hatH * 0.5);
    ctx.lineTo(hatW / 2, hatY - hatH);
    ctx.lineTo(hatW / 2, hatY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore(); // End Head
  ctx.restore(); // Final
};

const CharacterPreview: React.FC<{ charId: string }> = ({ charId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const charConfig = AVAILABLE_CHARACTERS.find(c => c.id === charId) || AVAILABLE_CHARACTERS[0];

      // Draw centered character
      drawLlama(
        ctx,
        charConfig,
        canvas.width / 2,
        canvas.height * 0.9, // Lower position
        1.6, // Reduced scale (was 2.5) to fit full character including ears
        false, // isJumping
        0, // tilt
        tick,
        false, // isIdle - false to animate running!
        true, // faceFront
        1.0
      );

      tick += 0.2;
      animationRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [charId]);

  return <canvas ref={canvasRef} width={300} height={300} className="w-full h-full object-contain" />;
};

interface LlamaRunGameProps {
  onClose?: () => void;
}

const LlamaRunGame: React.FC<LlamaRunGameProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [difficulty, setDifficulty] = useState<Difficulty>('NORMAL');
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [selectedCharId, setSelectedCharId] = useState('red');
  const [restartKey, setRestartKey] = useState(0);
  const internalGameStateRef = useRef<'START' | 'PLAYING' | 'GAMEOVER'>('START');

  // Sync Ref with State
  useEffect(() => {
    internalGameStateRef.current = gameState;
  }, [gameState]);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const isMounted = useRef(true);

  // Player power-up states for UI
  const [playerShield, setPlayerShield] = useState(false);
  const [playerMagnetTimer, setPlayerMagnetTimer] = useState(0);
  const [playerBoostTimer, setPlayerBoostTimer] = useState(0);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  // Music Engine State
  const musicNextNoteTime = useRef(0);
  const musicNoteIndex = useRef(0);
  const musicAnimationId = useRef<number>();

  const playSound = (type: 'jump' | 'coin' | 'crash' | 'powerup' | 'shield_break' | 'laser') => {
    if (isMuted || !isMounted.current) return;
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) audioCtxRef.current = new AudioContext();
      } catch (e) { return; }
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume().catch(() => { });

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;

      if (type === 'jump') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(300, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.1);
        osc.start(now); osc.stop(now + 0.1);
      } else if (type === 'coin') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.setValueAtTime(1800, now + 0.05);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.1);
        osc.start(now); osc.stop(now + 0.1);
      } else if (type === 'crash') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now); osc.stop(now + 0.3);
      } else if (type === 'powerup') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.linearRampToValueAtTime(600, now + 0.1);
        osc.frequency.linearRampToValueAtTime(1000, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.3);
        osc.start(now); osc.stop(now + 0.3);
      } else if (type === 'shield_break') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.1);
        osc.start(now); osc.stop(now + 0.1);
      }
    } catch (e) { }
  };

  // BACKGROUND MUSIC
  useEffect(() => {
    if (!isMusicEnabled || isMuted || gameState !== 'PLAYING') {
      if (musicAnimationId.current) {
        cancelAnimationFrame(musicAnimationId.current);
        musicAnimationId.current = undefined;
      }
      return;
    }

    const scheduleMusic = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        try {
          const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContext) audioCtxRef.current = new AudioContext();
        } catch (e) { return; }
      }
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume().catch(() => { });

      const lookahead = 0.1; // seconds
      const tempo = 120;
      const secondsPerBeat = 60.0 / tempo;
      const noteLength = 0.25; // 16th notes roughly

      // Simple Retro Melody + Bass
      // Melody: E5, G5, A5, B5 ...
      const melody = [
        659.25, 0, 783.99, 0, 880.00, 0, 987.77, 0,
        659.25, 0, 587.33, 0, 523.25, 0, 493.88, 0,
        440.00, 0, 523.25, 0, 659.25, 0, 783.99, 0,
        880.00, 0, 987.77, 0, 1046.50, 0, 1174.66, 0
      ];

      const bass = [
        164.81, 164.81, 164.81, 164.81, 164.81, 164.81, 164.81, 164.81,
        146.83, 146.83, 146.83, 146.83, 130.81, 130.81, 130.81, 130.81,
        110.00, 110.00, 130.81, 130.81, 164.81, 164.81, 196.00, 196.00,
        220.00, 220.00, 246.94, 246.94, 261.63, 261.63, 293.66, 293.66
      ];

      // Scheduler
      while (musicNextNoteTime.current < ctx.currentTime + lookahead) {
        const i = musicNoteIndex.current % 32;
        const time = musicNextNoteTime.current;

        // Play Melody
        if (melody[i] > 0) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.value = melody[i];
          osc.connect(gain);
          gain.connect(ctx.destination);
          gain.gain.setValueAtTime(0.03, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + secondsPerBeat * 0.5);
          osc.start(time);
          osc.stop(time + secondsPerBeat * 0.5);
        }

        // Play Bass
        if (bass[i] > 0) {
          const oscB = ctx.createOscillator();
          const gainB = ctx.createGain();
          oscB.type = 'triangle';
          oscB.frequency.value = bass[i];
          oscB.connect(gainB);
          gainB.connect(ctx.destination);
          gainB.gain.setValueAtTime(0.05, time);
          gainB.gain.linearRampToValueAtTime(0.01, time + secondsPerBeat);
          oscB.start(time);
          oscB.stop(time + secondsPerBeat);
        }

        musicNextNoteTime.current += secondsPerBeat * 0.5; // 8th notes speed
        musicNoteIndex.current++;
      }

      musicAnimationId.current = requestAnimationFrame(scheduleMusic);
    };

    // Initialize time if falling behind
    if (audioCtxRef.current) {
      musicNextNoteTime.current = Math.max(audioCtxRef.current.currentTime + 0.1, musicNextNoteTime.current);
    }
    musicAnimationId.current = requestAnimationFrame(scheduleMusic);

    return () => {
      if (musicAnimationId.current) cancelAnimationFrame(musicAnimationId.current);
    };
  }, [isMusicEnabled, isMuted, gameState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;


    const fillRoundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
      if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(w) || !Number.isFinite(h)) return;
      if (w < 0) { x += w; w = Math.abs(w); }
      if (h < 0) { y += h; h = Math.abs(h); }
      if (w === 0 || h === 0) return;
      r = Math.max(0, r);
      if (r < 0.1) { ctx.fillRect(x, y, w, h); return; }
      if (w < 2 * r) r = w / 2;
      if (h < 2 * r) r = h / 2;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
      ctx.fill();
    };

    const LANE_WIDTH_WORLD = 200;
    // Responsive Canvas Handling
    let HORIZON_Y = 150;
    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      HORIZON_Y = canvas.height * 0.35; // Dynamic horizon based on height
    };

    // Initial resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const CAM_HEIGHT = 200;
    const Z_NEAR = 100;
    const Z_FAR = 2000;

    let animationFrameId: number;
    let gameSpeed = DIFFICULTY_CONFIG[difficulty].startSpeed;
    let worldOffset = 0;
    let scoreCount = 0;
    let particles: Particle[] = [];
    let globalTick = 0;
    let shakeTimer = 0;
    let flashTimer = 0;
    // Removed local internalGameState to use Ref instead
    let weather: 'SUNNY' | 'RAINY' = 'SUNNY';
    let weatherTimer = 0;
    let comboCounter = 0;
    let comboTimer = 0;

    const numClouds = Math.max(6, Math.ceil(canvas.width / 200));
    const clouds = Array.from({ length: numClouds }).map((_, i) => ({
      x: Math.random() * canvas.width, y: Math.random() * (HORIZON_Y * 0.7), scale: 0.5 + Math.random() * 0.5, speed: 0.2 + Math.random() * 0.3
    }));

    const mtnWidth = 300;
    const numMtns = Math.ceil(canvas.width / mtnWidth) + 1;
    const mountains = Array.from({ length: numMtns }).map((_, i) => ({
      x: i * mtnWidth - 100, height: HORIZON_Y * (0.4 + Math.random() * 0.4), color: `hsl(${210 + Math.random() * 20}, 40%, ${30 + Math.random() * 20}%)`
    }));

    const player = {
      lane: 0, currentX: 0, y: 0, vy: 0,
      isJumping: false, width: 60, height: 90, tilt: 0,
      landingFactor: 0, shield: false, magnetTimer: 0, boostTimer: 0,
      blinkTimer: 0, isBlinking: false
    };

    interface GameObject { type: any; lane: number; z: number; active: boolean; id: number; xOffset?: number; movingRight?: boolean; popupFactor?: number; laserState?: boolean; laserTimer?: number; jumped?: boolean; }
    interface SceneryObject { type: any; x: number; z: number; scale: number; id: number; color: string; rotation?: number; }
    interface Particle { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number; type: any; rotation: number; rotSpeed: number; }

    let objects: GameObject[] = [];
    let scenery: SceneryObject[] = [];
    let nextSpawnZ = 500;

    const project = (x: number, y: number, z: number) => {
      const depth = Math.max(0.1, Z_NEAR + z);
      const scale = Z_NEAR / depth;
      const sx = canvas.width / 2 + x * scale;
      const sy = HORIZON_Y + (y + CAM_HEIGHT) * scale;
      return { x: sx, y: sy, scale };
    };

    const spawnObject = () => {
      const config = DIFFICULTY_CONFIG[difficulty];
      const spawnZ = worldOffset + Z_FAR;
      const patternRand = Math.random();

      // PROGRESSIVE DIFFICULTY: Adjust spawn rates based on score
      const scoreMilestone = Math.floor(scoreCount / 1000);
      const powerupChance = Math.max(0.05, 0.1 - (scoreMilestone * 0.01)); // Fewer power-ups as score increases
      const advancedPatternChance = Math.min(0.4, 0.15 + (scoreMilestone * 0.05)); // More advanced patterns

      if (Math.random() < powerupChance) {
        const type = Math.random() < 0.33 ? 'shield' : (Math.random() < 0.5 ? 'magnet' : 'boost');
        const lane = Math.floor(Math.random() * 3) - 1;
        objects.push({ type, lane, z: spawnZ, active: true, id: Date.now() });
        nextSpawnZ = spawnZ + 400 * config.gapMod;
        return;
      }

      // PROGRESSIVE DIFFICULTY: Tighter gaps as score increases
      const gapReduction = Math.min(0.3, scoreMilestone * 0.03); // Up to 30% tighter gaps
      const speedGap = (gameSpeed * 15) * config.gapMod * (1 - gapReduction);
      const baseGap = 600 * config.gapMod * (1 - gapReduction);
      const isAdvanced = gameSpeed > 15 || difficulty === 'HARD' || scoreMilestone > 2;

      if (isAdvanced && patternRand < advancedPatternChance) {
        // Advanced pattern: barriers blocking 2 lanes
        const safeLane = Math.floor(Math.random() * 3) - 1;
        [-1, 0, 1].forEach(lane => {
          if (lane !== safeLane) {
            objects.push({ type: 'barrier', lane, z: spawnZ, active: true, id: Date.now() + lane });
          }
        });
        nextSpawnZ = spawnZ + baseGap + speedGap;
      } else if (patternRand < 0.65) {
        // Star collection pattern
        const lane = Math.floor(Math.random() * 3) - 1;
        const count = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < count; i++) {
          objects.push({ type: 'star', lane, z: spawnZ + (i * 150), active: true, id: Date.now() + i });
        }
        nextSpawnZ = spawnZ + (count * 150) + baseGap * 0.8;
      } else {
        // Single obstacle (rock or cactus)
        const obstacleType = Math.random() > 0.6 ? 'rock' : 'cactus';
        objects.push({
          type: obstacleType,
          lane: Math.floor(Math.random() * 3) - 1,
          z: spawnZ,
          active: true,
          id: Date.now()
        });
        nextSpawnZ = spawnZ + baseGap + speedGap;
      }
    };

    const spawnScenery = () => {
      const spawnZ = worldOffset + Z_FAR;
      if (Math.random() < 0.1) {
        const side = Math.random() > 0.5 ? 1 : -1;
        const dist = 350 + Math.random() * 500;
        const x = side * dist;
        const typeProb = Math.random();
        let type: 'tree' | 'bush' | 'rock_cluster' = 'bush';
        let scale = 1.0;
        if (typeProb < 0.4) { type = 'tree'; scale = 1.5 + Math.random() * 1.5; }
        else if (typeProb < 0.7) { type = 'rock_cluster'; scale = 0.5 + Math.random() * 0.5; }
        else { type = 'bush'; scale = 0.8 + Math.random() * 0.5; }
        const isRainy = weather === 'RAINY';
        let color = '#065F46';
        if (type === 'tree') color = isRainy ? '#064E3B' : '#047857';
        else if (type === 'rock_cluster') color = isRainy ? '#374151' : '#6B7280';
        else if (type === 'bush') color = isRainy ? '#047857' : '#10B981';
        scenery.push({ type, x, z: spawnZ, scale, id: Date.now() + Math.random(), color, rotation: Math.random() * 0.2 - 0.1 });
      }
      scenery = scenery.filter(s => s.z > worldOffset - 200);
    }

    const spawnParticles = (type: any, x: number, y: number, color: string, count: number = 8) => {
      if (type === 'shockwave') {
        particles.push({ x, y, vx: 0, vy: 0, life: 1.0, color, size: 10, type, rotation: 0, rotSpeed: 0 });
        return;
      }
      if (type === 'trail') {
        particles.push({ x, y, vx: 0, vy: 1, life: 0.8, color, size: 8, type, rotation: 0, rotSpeed: 0 });
        return;
      }
      if (type === 'glow') {
        particles.push({ x, y, vx: 0, vy: -0.5, life: 1.0, color, size: 20, type, rotation: 0, rotSpeed: 0 });
        return;
      }
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        let vx = Math.cos(angle) * speed;
        let vy = Math.sin(angle) * speed;
        let size = 3;
        if (type === 'dust') {
          vx = (Math.random() - 0.5) * 4;
          vy = -Math.random() * 2 - 1;
          size = 5 + Math.random() * 5;
        }
        else if (type === 'debris') {
          vy = -Math.random() * 5 - 2;
          size = 4 + Math.random() * 4;
        }
        else if (type === 'sparkle') {
          size = 2 + Math.random() * 3;
          vx *= 1.5;
          vy *= 1.5;
        }
        else if (type === 'star_trail') {
          vx = (Math.random() - 0.5) * 2;
          vy = Math.random() * 2;
          size = 3 + Math.random() * 2;
        }
        particles.push({
          x, y, vx, vy,
          life: 0.6 + Math.random() * 0.4,
          color, size, type,
          rotation: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.2
        });
      }
    };

    const drawBackground = () => {
      const isRainy = weather === 'RAINY';

      // CIELO MEJORADO con gradientes más ricos
      const gradient = ctx.createLinearGradient(0, 0, 0, HORIZON_Y);
      if (isRainy) {
        gradient.addColorStop(0, '#1F2937');
        gradient.addColorStop(0.5, '#374151');
        gradient.addColorStop(1, '#4B5563');
      } else {
        gradient.addColorStop(0, '#1E40AF'); // Azul profundo arriba
        gradient.addColorStop(0.3, '#3B82F6'); // Azul medio
        gradient.addColorStop(0.7, '#60A5FA'); // Azul claro
        gradient.addColorStop(1, '#93C5FD'); // Azul muy claro en horizonte
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, HORIZON_Y);

      // SOL MEJORADO con rayos animados
      if (!isRainy) {
        const sunX = canvas.width - 120;
        const sunY = 70;
        const sunPulse = Math.sin(globalTick * 0.02) * 3;

        // Rayos del sol
        ctx.save();
        ctx.translate(sunX, sunY);
        ctx.rotate(globalTick * 0.005);
        ctx.strokeStyle = 'rgba(255, 220, 100, 0.3)';
        ctx.lineWidth = 3;
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * 40, Math.sin(angle) * 40);
          ctx.lineTo(Math.cos(angle) * 70, Math.sin(angle) * 70);
          ctx.stroke();
        }
        ctx.restore();

        // Halo del sol
        const haloGradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 60 + sunPulse);
        haloGradient.addColorStop(0, 'rgba(255, 220, 100, 0.8)');
        haloGradient.addColorStop(0.5, 'rgba(255, 200, 80, 0.4)');
        haloGradient.addColorStop(1, 'rgba(255, 180, 60, 0)');
        ctx.fillStyle = haloGradient;
        ctx.fillRect(sunX - 80, sunY - 80, 160, 160);

        // Sol principal
        ctx.shadowBlur = 50;
        ctx.shadowColor = '#FFD700';
        ctx.fillStyle = '#FFC65C';
        ctx.beginPath();
        ctx.arc(sunX, sunY, 35 + sunPulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // NUBES VOLUMÉTRICAS MEJORADAS
      ctx.fillStyle = isRainy ? 'rgba(75, 85, 99, 0.8)' : 'rgba(255, 255, 255, 0.85)';
      clouds.forEach(cloud => {
        const rx = (cloud.x - worldOffset * 0.1 * cloud.speed) % (canvas.width + 150);
        const drawX = rx < -150 ? rx + canvas.width + 150 : rx;

        // Sombra de la nube
        ctx.save();
        ctx.fillStyle = isRainy ? 'rgba(31, 41, 55, 0.4)' : 'rgba(200, 200, 200, 0.3)';
        ctx.beginPath();
        ctx.arc(drawX, cloud.y + 5, 22 * cloud.scale, 0, Math.PI * 2);
        ctx.arc(drawX + 18 * cloud.scale, cloud.y - 5 * cloud.scale, 28 * cloud.scale, 0, Math.PI * 2);
        ctx.arc(drawX + 35 * cloud.scale, cloud.y + 5, 22 * cloud.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Nube principal con más detalle
        ctx.fillStyle = isRainy ? 'rgba(75, 85, 99, 0.8)' : 'rgba(255, 255, 255, 0.85)';
        ctx.beginPath();
        ctx.arc(drawX, cloud.y, 20 * cloud.scale, 0, Math.PI * 2);
        ctx.arc(drawX + 15 * cloud.scale, cloud.y - 10 * cloud.scale, 25 * cloud.scale, 0, Math.PI * 2);
        ctx.arc(drawX + 30 * cloud.scale, cloud.y, 20 * cloud.scale, 0, Math.PI * 2);
        ctx.arc(drawX + 10 * cloud.scale, cloud.y + 5 * cloud.scale, 18 * cloud.scale, 0, Math.PI * 2);
        ctx.fill();

        // Brillo en las nubes (solo si es soleado)
        if (!isRainy) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.beginPath();
          ctx.arc(drawX + 15 * cloud.scale, cloud.y - 12 * cloud.scale, 15 * cloud.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // MONTAÑAS CON MÚLTIPLES CAPAS Y PROFUNDIDAD
      mountains.forEach((mtn, idx) => {
        const parallaxX = (mtn.x - worldOffset * 0.05) % (canvas.width + 250);
        const drawX = parallaxX < -250 ? parallaxX + canvas.width + 250 : parallaxX;

        // Capa de montañas lejanas (más oscuras y azuladas)
        if (idx % 2 === 0) {
          ctx.fillStyle = isRainy ? '#111827' : '#1E3A8A';
          ctx.globalAlpha = 0.4;
          ctx.beginPath();
          ctx.moveTo(drawX - 50, HORIZON_Y);
          ctx.lineTo(drawX + 75, HORIZON_Y - mtn.height * 0.7);
          ctx.lineTo(drawX + 200, HORIZON_Y);
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Montaña principal con gradiente
        const mtnGradient = ctx.createLinearGradient(drawX, HORIZON_Y - mtn.height, drawX + 100, HORIZON_Y);
        if (isRainy) {
          mtnGradient.addColorStop(0, '#374151');
          mtnGradient.addColorStop(1, '#1F2937');
        } else {
          mtnGradient.addColorStop(0, '#2563EB');
          mtnGradient.addColorStop(0.5, '#1E40AF');
          mtnGradient.addColorStop(1, '#1E3A8A');
        }
        ctx.fillStyle = mtnGradient;
        ctx.beginPath();
        ctx.moveTo(drawX, HORIZON_Y);
        ctx.lineTo(drawX + 100, HORIZON_Y - mtn.height);
        ctx.lineTo(drawX + 200, HORIZON_Y);
        ctx.fill();

        // Nieve en los picos (solo si no llueve)
        if (!isRainy && mtn.height > 80) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.beginPath();
          ctx.moveTo(drawX + 85, HORIZON_Y - mtn.height + 15);
          ctx.lineTo(drawX + 100, HORIZON_Y - mtn.height);
          ctx.lineTo(drawX + 115, HORIZON_Y - mtn.height + 15);
          ctx.fill();
        }

        // Sombra en el lado derecho de la montaña
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.moveTo(drawX + 100, HORIZON_Y - mtn.height);
        ctx.lineTo(drawX + 200, HORIZON_Y);
        ctx.lineTo(drawX + 100, HORIZON_Y);
        ctx.fill();
      });

      // Neblina en el horizonte
      const mistGradient = ctx.createLinearGradient(0, HORIZON_Y - 50, 0, HORIZON_Y);
      mistGradient.addColorStop(0, 'rgba(147, 197, 253, 0)');
      mistGradient.addColorStop(1, isRainy ? 'rgba(75, 85, 99, 0.5)' : 'rgba(147, 197, 253, 0.3)');
      ctx.fillStyle = mistGradient;
      ctx.fillRect(0, HORIZON_Y - 50, canvas.width, 50);
    };

    const drawRoad = () => {
      const isRainy = weather === 'RAINY';

      // CÉSPED Y TERRENO LATERAL MEJORADO
      const groundGradient = ctx.createLinearGradient(0, HORIZON_Y, 0, canvas.height);
      if (isRainy) {
        groundGradient.addColorStop(0, '#064E3B');
        groundGradient.addColorStop(0.5, '#065F46');
        groundGradient.addColorStop(1, '#047857');
      } else {
        groundGradient.addColorStop(0, '#10B981');
        groundGradient.addColorStop(0.3, '#34D399');
        groundGradient.addColorStop(0.7, '#6EE7B7');
        groundGradient.addColorStop(1, '#A7F3D0');
      }
      ctx.fillStyle = groundGradient;
      ctx.fillRect(0, HORIZON_Y, canvas.width, canvas.height - HORIZON_Y);

      // Textura de césped (líneas aleatorias)
      ctx.strokeStyle = isRainy ? 'rgba(4, 120, 87, 0.3)' : 'rgba(16, 185, 129, 0.4)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = HORIZON_Y + Math.random() * (canvas.height - HORIZON_Y);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.random() * 10 - 5, y + Math.random() * 5);
        ctx.stroke();
      }

      // CARRETERA PRINCIPAL CON TEXTURA
      const roadHalfWidth = 300;
      const pTL = project(-roadHalfWidth, 0, Z_FAR);
      const pTR = project(roadHalfWidth, 0, Z_FAR);
      const pBR = project(roadHalfWidth, 0, 0);
      const pBL = project(-roadHalfWidth, 0, 0);

      // Asfalto con gradiente y textura
      const roadGradient = ctx.createLinearGradient(0, HORIZON_Y, 0, canvas.height);
      if (isRainy) {
        roadGradient.addColorStop(0, '#0F172A');
        roadGradient.addColorStop(0.5, '#1E293B');
        roadGradient.addColorStop(1, '#334155');
      } else {
        roadGradient.addColorStop(0, '#1F2937');
        roadGradient.addColorStop(0.5, '#374151');
        roadGradient.addColorStop(1, '#4B5563');
      }
      ctx.fillStyle = roadGradient;
      ctx.beginPath();
      ctx.moveTo(pTL.x, pTL.y);
      ctx.lineTo(pTR.x, pTR.y);
      ctx.lineTo(pBR.x, pBR.y);
      ctx.lineTo(pBL.x, pBL.y);
      ctx.fill();

      // Textura de asfalto (puntos aleatorios para simular grava)
      ctx.fillStyle = isRainy ? 'rgba(71, 85, 105, 0.3)' : 'rgba(55, 65, 81, 0.4)';
      for (let i = 0; i < 100; i++) {
        const randomZ = Math.random() * Z_FAR;
        const randomX = (Math.random() - 0.5) * roadHalfWidth * 2;
        const p = project(randomX, 0, randomZ);
        if (p.y > HORIZON_Y) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1 * p.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // BORDES DE LA CARRETERA (líneas blancas laterales)
      ctx.strokeStyle = isRainy ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(pTL.x, pTL.y);
      ctx.lineTo(pBL.x, pBL.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(pTR.x, pTR.y);
      ctx.lineTo(pBR.x, pBR.y);
      ctx.stroke();

      // LÍNEAS DE CARRIL (líneas discontinuas centrales)
      const segmentLength = 200;
      const dashLength = 100;
      const startZ = Math.floor(worldOffset / segmentLength) * segmentLength;

      for (let z = startZ; z < worldOffset + Z_FAR; z += segmentLength) {
        const relativeZ = z - worldOffset;
        if (relativeZ < -segmentLength) continue;

        const p1Start = project(-100, 0, relativeZ);
        const p1End = project(-100, 0, relativeZ + dashLength);
        const p2Start = project(100, 0, relativeZ);
        const p2End = project(100, 0, relativeZ + dashLength);

        if (p1Start.y > HORIZON_Y && relativeZ + dashLength > 0) {
          // Líneas amarillas con brillo
          ctx.strokeStyle = isRainy ? 'rgba(250, 204, 21, 0.6)' : 'rgba(250, 204, 21, 0.9)';
          ctx.lineWidth = 5 * p1Start.scale;
          ctx.lineCap = 'round';

          // Sombra de las líneas
          ctx.shadowBlur = 5;
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';

          ctx.beginPath();
          ctx.moveTo(p1Start.x, p1Start.y);
          ctx.lineTo(p1End.x, p1End.y);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(p2Start.x, p2Start.y);
          ctx.lineTo(p2End.x, p2End.y);
          ctx.stroke();

          ctx.shadowBlur = 0;
        }
      }

      // Efecto de lluvia en la carretera
      if (isRainy) {
        ctx.fillStyle = 'rgba(96, 165, 250, 0.1)';
        for (let i = 0; i < 30; i++) {
          const randomZ = Math.random() * Z_FAR;
          const randomX = (Math.random() - 0.5) * roadHalfWidth * 2;
          const p = project(randomX, 0, randomZ);
          if (p.y > HORIZON_Y) {
            ctx.beginPath();
            ctx.ellipse(p.x, p.y, 15 * p.scale, 8 * p.scale, 0, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    // Fix: Define drawScenery to resolve compilation error
    const drawScenery = () => {
      const sortedScenery = [...scenery].filter(s => s.z > worldOffset - 200 && s.z < worldOffset + Z_FAR).sort((a, b) => b.z - a.z);
      sortedScenery.forEach(s => {
        const relZ = s.z - worldOffset;
        const p = project(s.x, 0, relZ);
        if (p.y < HORIZON_Y || p.scale <= 0) return;

        ctx.save();
        ctx.translate(p.x, p.y);
        const sScale = p.scale * s.scale;
        ctx.scale(sScale, sScale);
        if (s.rotation) ctx.rotate(s.rotation);

        // ÁRBOLES MEJORADOS con más detalle
        if (s.type === 'tree') {
          // Sombra del árbol
          ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
          ctx.beginPath();
          ctx.ellipse(0, 5, 50, 15, 0, 0, Math.PI * 2);
          ctx.fill();

          // Tronco con textura
          const trunkGradient = ctx.createLinearGradient(-10, -20, 10, 0);
          trunkGradient.addColorStop(0, '#3E2723');
          trunkGradient.addColorStop(0.5, '#4B2C20');
          trunkGradient.addColorStop(1, '#5D4037');
          ctx.fillStyle = trunkGradient;
          ctx.fillRect(-12, -25, 24, 25);

          // Líneas de corteza
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
          ctx.lineWidth = 1;
          for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(-8, -20 + i * 7);
            ctx.lineTo(-5, -18 + i * 7);
            ctx.stroke();
          }

          // Copa del árbol con múltiples capas
          const foliageGradient = ctx.createRadialGradient(0, -80, 10, 0, -80, 60);
          foliageGradient.addColorStop(0, '#4ADE80');
          foliageGradient.addColorStop(0.7, s.color);
          foliageGradient.addColorStop(1, '#047857');
          ctx.fillStyle = foliageGradient;

          // Capa inferior
          ctx.beginPath();
          ctx.moveTo(0, -40);
          ctx.lineTo(50, -25);
          ctx.lineTo(-50, -25);
          ctx.closePath();
          ctx.fill();

          // Capa media
          ctx.beginPath();
          ctx.moveTo(0, -70);
          ctx.lineTo(45, -45);
          ctx.lineTo(-45, -45);
          ctx.closePath();
          ctx.fill();

          // Capa superior (punta)
          ctx.beginPath();
          ctx.moveTo(0, -110);
          ctx.lineTo(40, -70);
          ctx.lineTo(-40, -70);
          ctx.closePath();
          ctx.fill();

          // Detalles de hojas (puntos brillantes)
          ctx.fillStyle = 'rgba(74, 222, 128, 0.6)';
          for (let i = 0; i < 5; i++) {
            const leafX = (Math.random() - 0.5) * 60;
            const leafY = -40 - Math.random() * 60;
            ctx.beginPath();
            ctx.arc(leafX, leafY, 3, 0, Math.PI * 2);
            ctx.fill();
          }

        } else if (s.type === 'bush') {
          // Sombra del arbusto
          ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
          ctx.beginPath();
          ctx.ellipse(0, 5, 35, 10, 0, 0, Math.PI * 2);
          ctx.fill();

          // Arbusto volumétrico con gradiente
          const bushGradient = ctx.createRadialGradient(0, -25, 5, 0, -25, 35);
          bushGradient.addColorStop(0, '#6EE7B7');
          bushGradient.addColorStop(0.6, s.color);
          bushGradient.addColorStop(1, '#047857');
          ctx.fillStyle = bushGradient;

          // Múltiples círculos para volumen
          ctx.beginPath();
          ctx.arc(-18, -18, 22, 0, Math.PI * 2);
          ctx.arc(18, -18, 22, 0, Math.PI * 2);
          ctx.arc(0, -32, 26, 0, Math.PI * 2);
          ctx.arc(-8, -22, 20, 0, Math.PI * 2);
          ctx.arc(8, -22, 20, 0, Math.PI * 2);
          ctx.fill();

          // Flores pequeñas en el arbusto
          const flowerColors = ['#FBBF24', '#F87171', '#A78BFA', '#FFF'];
          for (let i = 0; i < 4; i++) {
            ctx.fillStyle = flowerColors[i % flowerColors.length];
            const flowerX = (Math.random() - 0.5) * 30;
            const flowerY = -15 - Math.random() * 25;
            ctx.beginPath();
            ctx.arc(flowerX, flowerY, 2, 0, Math.PI * 2);
            ctx.fill();
          }

        } else if (s.type === 'rock_cluster') {
          // Sombra de las rocas
          ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
          ctx.beginPath();
          ctx.ellipse(0, 5, 40, 12, 0, 0, Math.PI * 2);
          ctx.fill();

          // Rocas con gradiente y textura
          const rockGradient = ctx.createLinearGradient(-30, -30, 40, 0);
          rockGradient.addColorStop(0, '#9CA3AF');
          rockGradient.addColorStop(0.5, s.color);
          rockGradient.addColorStop(1, '#374151');
          ctx.fillStyle = rockGradient;

          // Roca principal (irregular)
          ctx.beginPath();
          ctx.moveTo(-35, 0);
          ctx.lineTo(-25, -35);
          ctx.lineTo(0, -38);
          ctx.lineTo(25, -30);
          ctx.lineTo(45, -5);
          ctx.lineTo(30, 0);
          ctx.closePath();
          ctx.fill();

          // Grietas en la roca
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-10, -25);
          ctx.lineTo(-5, -10);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(10, -20);
          ctx.lineTo(15, -5);
          ctx.stroke();

          // Roca secundaria más pequeña
          ctx.fillStyle = '#4B5563';
          ctx.beginPath();
          ctx.moveTo(-45, 0);
          ctx.lineTo(-40, -15);
          ctx.lineTo(-25, -12);
          ctx.lineTo(-30, 0);
          ctx.closePath();
          ctx.fill();

          // Musgo en las rocas
          ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
          ctx.beginPath();
          ctx.arc(-15, -5, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(20, -8, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });
    };

    // Fix: Implement drawObjects to render game obstacles and collectibles
    const drawObjects = () => {
      const sortedObjects = [...objects].filter(obj => obj.active && obj.z > worldOffset - 100 && obj.z < worldOffset + Z_FAR).sort((a, b) => b.z - a.z);
      sortedObjects.forEach(obj => {
        const relZ = obj.z - worldOffset;
        const xPos = obj.lane * LANE_WIDTH_WORLD + (obj.xOffset || 0);
        const p = project(xPos, 0, relZ);
        if (p.y < HORIZON_Y || p.scale <= 0) return;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.scale(p.scale, p.scale);

        if (obj.type === 'rock') {
          ctx.fillStyle = '#6B7280';
          ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(-20, -50); ctx.lineTo(20, -45); ctx.lineTo(40, 0); ctx.closePath(); ctx.fill();
        } else if (obj.type === 'cactus') {
          ctx.fillStyle = '#059669';
          ctx.fillRect(-10, -60, 20, 60);
          ctx.fillRect(-25, -45, 15, 10); ctx.fillRect(-25, -45, 5, -20);
          ctx.fillRect(10, -35, 15, 10); ctx.fillRect(20, -35, 5, -20);
        } else if (obj.type === 'star') {
          const r = 25; ctx.fillStyle = '#FBBF24';
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * r, -50 - Math.sin((18 + i * 72) * Math.PI / 180) * r);
            ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * r / 2, -50 - Math.sin((54 + i * 72) * Math.PI / 180) * r / 2);
          }
          ctx.closePath(); ctx.fill();
        } else if (obj.type === 'barrier') {
          ctx.fillStyle = '#EF4444';
          ctx.fillRect(-80, -100, 160, 20);
          ctx.fillStyle = '#1F2937';
          ctx.fillRect(-70, -80, 10, 80); ctx.fillRect(60, -80, 10, 80);
        }
        ctx.restore();

        // Power-ups rendering
        if (obj.type === 'shield' || obj.type === 'magnet' || obj.type === 'boost') {
          const pulse = Math.sin(globalTick * 0.3) * 0.2 + 1;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.scale(p.scale * pulse, p.scale * pulse);

          if (obj.type === 'shield') {
            ctx.fillStyle = '#3B82F6';
            ctx.strokeStyle = '#60A5FA';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(0, -40, 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = '#FFF';
            ctx.font = 'bold 30px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('🛡️', 0, -30);
          } else if (obj.type === 'magnet') {
            ctx.fillStyle = '#EF4444';
            ctx.strokeStyle = '#F87171';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(0, -40, 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = '#FFF';
            ctx.font = 'bold 30px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('🧲', 0, -30);
          } else if (obj.type === 'boost') {
            ctx.fillStyle = '#FBBF24';
            ctx.strokeStyle = '#FCD34D';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(0, -40, 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = '#FFF';
            ctx.font = 'bold 30px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('⚡', 0, -30);
          }
          ctx.restore();
        }

        // Enhanced Collision Detection with Jump Mechanics
        if (internalGameStateRef.current === 'PLAYING') {
          const dx = Math.abs(player.currentX - xPos);
          const dz = Math.abs(20 - relZ);

          // CORREGIDO: Rangos separados para diferentes tipos de objetos
          const magnetRange = player.magnetTimer > 0 ? 300 : 70; // Para estrellas y power-ups
          const collisionRange = 50; // NUEVO: Rango físico para obstáculos (más pequeño y preciso)

          // NUEVO: Atracción magnética visual de estrellas
          if (obj.type === 'star' && player.magnetTimer > 0 && dz < 100 && dx < magnetRange) {
            // Calcular dirección hacia el jugador
            const targetX = player.currentX;
            const attractionSpeed = 8; // Velocidad de atracción

            // Mover la estrella hacia el jugador en el eje X
            if (xPos < targetX) {
              obj.xOffset = (obj.xOffset || 0) + attractionSpeed;
            } else if (xPos > targetX) {
              obj.xOffset = (obj.xOffset || 0) - attractionSpeed;
            }

            // Partículas de atracción magnética
            if (globalTick % 5 === 0) {
              spawnParticles('sparkle', p.x, p.y - 30, '#EF4444', 2);
            }
          }

          // COLISIÓN CON ESTRELLAS Y POWER-UPS (usa magnetRange)
          if (obj.type === 'star' || obj.type === 'shield' || obj.type === 'magnet' || obj.type === 'boost') {
            if (dz < 40 && dx < magnetRange) {
              if (obj.type === 'star') {
                obj.active = false;
                comboCounter++;
                comboTimer = 60; // Reset combo timer

                const comboBonus = player.magnetTimer > 0 ? 2.0 : 1; // MEJORADO: Bonus aumentado de 1.5 a 2.0
                const comboMultiplier = 1 + (comboCounter * 0.2); // 20% bonus per combo
                const points = 100 * (DIFFICULTY_CONFIG[difficulty].scoreMult) * comboBonus * comboMultiplier;

                scoreCount += points;
                setScore(Math.floor(scoreCount));
                setCombo(comboCounter);
                if (comboCounter > maxCombo) setMaxCombo(comboCounter);

                playSound('coin');
                spawnParticles('sparkle', p.x, p.y - 30, '#FBBF24', 12);
                spawnParticles('star_trail', p.x, p.y - 30, '#FCD34D', 6);

                // Glow effect for combos
                if (comboCounter > 2) {
                  spawnParticles('glow', p.x, p.y - 30, '#FBBF24', 1);
                }

                // NUEVO: Efecto extra cuando se recoge con imán
                if (player.magnetTimer > 0) {
                  spawnParticles('sparkle', p.x, p.y - 30, '#EF4444', 8);
                }
              } else if (obj.type === 'shield') {
                obj.active = false;
                player.shield = true;
                playSound('powerup');
                spawnParticles('sparkle', p.x, p.y - 30, '#3B82F6', 15);
                spawnParticles('glow', p.x, p.y - 30, '#60A5FA', 1);
              } else if (obj.type === 'magnet') {
                obj.active = false;
                player.magnetTimer = 480; // MEJORADO: 8 segundos at 60fps (antes 300 = 5 segundos)
                playSound('powerup');
                spawnParticles('sparkle', p.x, p.y - 30, '#EF4444', 15);
                spawnParticles('glow', p.x, p.y - 30, '#F87171', 1);
              } else if (obj.type === 'boost') {
                obj.active = false;
                player.boostTimer = 200; // ~3.3 seconds at 60fps
                playSound('powerup');
                spawnParticles('sparkle', p.x, p.y - 30, '#FBBF24', 15);
                spawnParticles('glow', p.x, p.y - 30, '#FCD34D', 1);
              }
            }
          }

          // COLISIÓN CON OBSTÁCULOS (usa collisionRange más pequeño y preciso)
          if (obj.type === 'rock' || obj.type === 'cactus' || obj.type === 'barrier') {
            // CORREGIDO: Usar collisionRange en lugar de magnetRange para obstáculos
            if (dz < 30 && dx < collisionRange) {
              // IMPROVED: Check if player is jumping high enough to clear the obstacle
              const obstacleHeight = obj.type === 'barrier' ? 100 : 60; // Barriers are taller
              const isJumpingOver = player.isJumping && player.y > obstacleHeight;

              if (isJumpingOver) {
                // Successfully jumped over the obstacle!
                if (!obj.jumped) {
                  obj.jumped = true;
                  const jumpBonus = 50 * DIFFICULTY_CONFIG[difficulty].scoreMult;
                  scoreCount += jumpBonus;
                  setScore(Math.floor(scoreCount));
                  playSound('coin');
                  spawnParticles('sparkle', p.x, p.y - 30, '#10B981', 8);

                  // Visual feedback for successful jump
                  spawnParticles('glow', p.x, p.y - 30, '#34D399', 1);
                }
              } else {
                // Collision with obstacle

                // BOOST INVINCIBILITY: Destroy obstacle if boosting
                if (player.boostTimer > 0) {
                  obj.active = false;
                  playSound('crash');
                  spawnParticles('debris', p.x, p.y, '#FBBF24', 20); // Gold debris
                  spawnParticles('shockwave', p.x, p.y, '#FCD34D', 1);
                  shakeTimer = 5;
                  // Bonus for destruction?
                  scoreCount += 50;
                } else if (player.shield) {
                  player.shield = false;
                  obj.active = false;
                  playSound('shield_break');
                  spawnParticles('debris', p.x, p.y, '#3B82F6', 20);
                  spawnParticles('shockwave', p.x, p.y, '#60A5FA', 1);
                  shakeTimer = 10;

                  // Keep combo on shield break
                } else {
                  internalGameStateRef.current = 'GAMEOVER';
                  setGameState('GAMEOVER');
                  playSound('crash');
                  shakeTimer = 20;
                  flashTimer = 5;
                  spawnParticles('debris', p.x, p.y, '#EF4444', 30);
                  spawnParticles('shockwave', p.x, p.y, '#DC2626', 1);
                  comboCounter = 0; // Reset combo on crash
                  setCombo(0);
                }
              }
            }
          }
        }
      });
    };



    const update = () => {
      try {
        const config = DIFFICULTY_CONFIG[difficulty];
        if (internalGameStateRef.current === 'PLAYING') {
          weatherTimer++;
          if (weatherTimer > 1000) { weather = weather === 'SUNNY' ? 'RAINY' : 'SUNNY'; weatherTimer = 0; }
          const speedMultiplier = player.boostTimer > 0 ? 1.5 : 1.0;
          const currentSpeed = gameSpeed * speedMultiplier;
          globalTick += currentSpeed * 0.02; worldOffset += currentSpeed;

          // Increment score based on distance
          scoreCount += currentSpeed * 0.01 * config.scoreMult;
          setScore(Math.floor(scoreCount));

          // PROGRESSIVE DIFFICULTY: Increase speed based on score milestones
          const scoreMilestone = Math.floor(scoreCount / 1000); // Every 1000 points
          const progressiveSpeedBoost = scoreMilestone * 0.5; // +0.5 speed per milestone
          const targetSpeed = Math.min(
            config.startSpeed + progressiveSpeedBoost,
            config.maxSpeed
          );

          if (gameSpeed < targetSpeed) {
            gameSpeed += config.acceleration * 1.5; // Faster acceleration
          }
          if (player.magnetTimer > 0) {
            player.magnetTimer--;
            setPlayerMagnetTimer(player.magnetTimer);
          }
          if (player.boostTimer > 0) {
            player.boostTimer--;
            setPlayerBoostTimer(player.boostTimer);
          }
          setPlayerShield(player.shield);

          // Combo timer management
          if (comboTimer > 0) {
            comboTimer--;
          } else if (comboCounter > 0) {
            comboCounter = 0;
            setCombo(0);
          }

          player.blinkTimer++;
          if (player.isBlinking) { if (player.blinkTimer > 5) { player.isBlinking = false; player.blinkTimer = 0; } }
          else { if (player.blinkTimer > 120 + Math.random() * 200) { player.isBlinking = true; player.blinkTimer = 0; } }

          if (nextSpawnZ < worldOffset + Z_FAR) spawnObject();
          spawnScenery();

          const targetX = player.lane * LANE_WIDTH_WORLD;
          player.currentX += (targetX - player.currentX) * 0.15;
          player.tilt += (((targetX - player.currentX) / LANE_WIDTH_WORLD) * 0.5 - player.tilt) * 0.1;

          if (player.isJumping) {
            player.y += player.vy; player.vy -= 1.8;
            if (player.y <= 0) {
              player.y = 0; player.isJumping = false; player.vy = 0; player.landingFactor = 1.0;
              const p = project(player.currentX, 0, 20); spawnParticles('dust', p.x, p.y, '#E5E7EB', 10);
            }
          } else {
            if (player.landingFactor > 0) player.landingFactor -= 0.08;
          }
        } else if (internalGameStateRef.current === 'START') globalTick += 0.1;

        // Draw game layers in order: Background -> Road -> Scenery -> Objects
        drawBackground();

        // EFECTOS DE CLIMA DINÁMICOS
        const drawWeatherEffects = () => {
          const isRainy = weather === 'RAINY';

          if (isRainy) {
            // LLUVIA MEJORADA
            ctx.strokeStyle = 'rgba(147, 197, 253, 0.6)';
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';

            for (let i = 0; i < 100; i++) {
              const x = (Math.random() * canvas.width + worldOffset * 2) % canvas.width;
              const y = (Math.random() * canvas.height + globalTick * 15) % canvas.height;
              const length = 15 + Math.random() * 10;

              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(x - 3, y + length);
              ctx.stroke();
            }

            // Gotas de lluvia en el suelo (salpicaduras)
            if (globalTick % 3 === 0) {
              for (let i = 0; i < 5; i++) {
                const x = Math.random() * canvas.width;
                const y = HORIZON_Y + Math.random() * (canvas.height - HORIZON_Y);

                ctx.fillStyle = 'rgba(147, 197, 253, 0.4)';
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fill();

                // Anillos de salpicadura
                ctx.strokeStyle = 'rgba(147, 197, 253, 0.3)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(x, y, 4 + (globalTick % 10), 0, Math.PI * 2);
                ctx.stroke();
              }
            }

            // Relámpagos ocasionales
            if (Math.random() < 0.001) {
              flashTimer = 3;
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
              ctx.lineWidth = 3;
              ctx.shadowBlur = 20;
              ctx.shadowColor = '#FFF';

              const startX = Math.random() * canvas.width;
              let currentX = startX;
              let currentY = 0;

              ctx.beginPath();
              ctx.moveTo(currentX, currentY);

              for (let i = 0; i < 5; i++) {
                currentX += (Math.random() - 0.5) * 50;
                currentY += 30;
                ctx.lineTo(currentX, currentY);
              }
              ctx.stroke();
              ctx.shadowBlur = 0;
            }

            // Neblina de lluvia
            ctx.fillStyle = 'rgba(71, 85, 105, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

          } else {
            // PARTÍCULAS DE POLVO EN CLIMA SOLEADO
            if (globalTick % 5 === 0) {
              ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
              for (let i = 0; i < 3; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * HORIZON_Y;
                ctx.beginPath();
                ctx.arc(x, y, 1, 0, Math.PI * 2);
                ctx.fill();
              }
            }

            // Calor en el horizonte (ondas de calor)
            if (globalTick % 20 === 0) {
              const heatWave = ctx.createLinearGradient(0, HORIZON_Y - 20, 0, HORIZON_Y + 20);
              heatWave.addColorStop(0, 'rgba(255, 200, 100, 0)');
              heatWave.addColorStop(0.5, 'rgba(255, 200, 100, 0.1)');
              heatWave.addColorStop(1, 'rgba(255, 200, 100, 0)');
              ctx.fillStyle = heatWave;
              ctx.fillRect(0, HORIZON_Y - 20, canvas.width, 40);
            }
          }
        };

        drawWeatherEffects();
        drawRoad();
        drawScenery();
        drawObjects();

        const proj = project(player.currentX, -player.y, 20);


        // Draw shield effect
        if (player.shield) {
          ctx.save();
          ctx.globalAlpha = 0.3 + Math.sin(globalTick * 0.2) * 0.2;
          ctx.strokeStyle = '#3B82F6';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y - player.height / 2, 60, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // NUEVO: Efecto visual del campo magnético
        if (player.magnetTimer > 0) {
          ctx.save();

          // Ondas magnéticas pulsantes
          const magnetPulse = Math.sin(globalTick * 0.15);
          const baseRadius = 80;

          // Onda exterior (roja)
          ctx.globalAlpha = 0.2 + magnetPulse * 0.1;
          ctx.strokeStyle = '#EF4444';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y - player.height / 2, baseRadius + magnetPulse * 15, 0, Math.PI * 2);
          ctx.stroke();

          // Onda media (rosa)
          ctx.globalAlpha = 0.25 + magnetPulse * 0.15;
          ctx.strokeStyle = '#F87171';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y - player.height / 2, baseRadius * 0.7 + magnetPulse * 10, 0, Math.PI * 2);
          ctx.stroke();

          // Onda interior (roja brillante)
          ctx.globalAlpha = 0.3 + magnetPulse * 0.2;
          ctx.strokeStyle = '#DC2626';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y - player.height / 2, baseRadius * 0.4 + magnetPulse * 5, 0, Math.PI * 2);
          ctx.stroke();

          // Partículas magnéticas orbitando
          const numParticles = 8;
          for (let i = 0; i < numParticles; i++) {
            const angle = (globalTick * 0.05 + (i * Math.PI * 2 / numParticles));
            const orbitRadius = baseRadius + Math.sin(globalTick * 0.1 + i) * 10;
            const px = proj.x + Math.cos(angle) * orbitRadius;
            const py = (proj.y - player.height / 2) + Math.sin(angle) * orbitRadius;

            ctx.fillStyle = '#EF4444';
            ctx.globalAlpha = 0.6 + Math.sin(globalTick * 0.2 + i) * 0.3;
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();

            // Estela de partículas
            ctx.fillStyle = '#F87171';
            ctx.globalAlpha = 0.3;
            ctx.beginPath();
            ctx.arc(px - Math.cos(angle) * 5, py - Math.sin(angle) * 5, 2, 0, Math.PI * 2);
            ctx.fill();
          }

          // Símbolo de imán en el centro
          ctx.globalAlpha = 0.4 + magnetPulse * 0.2;
          ctx.fillStyle = '#EF4444';
          ctx.font = 'bold 24px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('🧲', proj.x, proj.y - player.height / 2);

          ctx.restore();
        }

        // Draw character
        const charConfig = AVAILABLE_CHARACTERS.find(c => c.id === selectedCharId) || AVAILABLE_CHARACTERS[0];
        if (internalGameStateRef.current === 'START') {
          // Draw Large Front-View Character for Menu
          // Move to Right Side so it's not covered by the Modal
          const startX = canvas.width * 0.85;
          const startY = canvas.height * 0.9;
          const startScale = 2.2;

          // Also draw a "platform" or shadow for it? Shadow is built-in.

          // Rotate slightly for better 3D look? No, Front view requested.
          drawLlama(ctx, charConfig, startX, startY, startScale, false, -0.3, globalTick, true, true, 1);
        } else {
          // Gameplay: Rear View
          drawLlama(ctx, charConfig, proj.x, proj.y, proj.scale, player.isJumping, player.tilt, globalTick, internalGameStateRef.current !== 'PLAYING', false, 1);
        }

        // Enhanced particle rendering with glow effects
        particles.forEach((p, i) => {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.02;
          p.rotation += p.rotSpeed;
          if (p.type === 'debris' || p.type === 'dust') p.vy += 0.3;
          if (p.type === 'trail') p.vy += 0.1;

          if (p.life > 0) {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);

            if (p.type === 'shockwave') {
              p.size += 5;
              ctx.strokeStyle = p.color;
              ctx.lineWidth = 3 * p.life;
              ctx.globalAlpha = p.life;
              ctx.beginPath();
              ctx.arc(0, 0, p.size, 0, Math.PI * 2);
              ctx.stroke();
            } else if (p.type === 'glow') {
              const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
              gradient.addColorStop(0, p.color);
              gradient.addColorStop(0.5, p.color + '80');
              gradient.addColorStop(1, p.color + '00');
              ctx.fillStyle = gradient;
              ctx.globalAlpha = p.life * 0.6;
              ctx.beginPath();
              ctx.arc(0, 0, p.size, 0, Math.PI * 2);
              ctx.fill();
            } else if (p.type === 'trail') {
              ctx.fillStyle = p.color;
              ctx.globalAlpha = p.life * 0.5;
              ctx.beginPath();
              ctx.ellipse(0, 0, p.size, p.size * 2, 0, 0, Math.PI * 2);
              ctx.fill();
            } else if (p.type === 'sparkle') {
              // Star-shaped sparkles
              ctx.fillStyle = p.color;
              ctx.globalAlpha = p.life;
              const s = p.size * p.life;
              ctx.shadowBlur = 10;
              ctx.shadowColor = p.color;
              ctx.beginPath();
              for (let i = 0; i < 4; i++) {
                const angle = (i * Math.PI / 2) + p.rotation;
                ctx.lineTo(Math.cos(angle) * s, Math.sin(angle) * s);
                ctx.lineTo(Math.cos(angle + Math.PI / 4) * s * 0.3, Math.sin(angle + Math.PI / 4) * s * 0.3);
              }
              ctx.closePath();
              ctx.fill();
              ctx.shadowBlur = 0;
            } else {
              const s = p.size * p.life;
              ctx.fillStyle = p.color;
              ctx.globalAlpha = p.life;
              ctx.fillRect(-s / 2, -s / 2, s, s);
            }
            ctx.restore();
          } else particles.splice(i, 1);
        });

        // Add speed trails for boost mode
        if (player.boostTimer > 0 && internalGameStateRef.current === 'PLAYING') {
          if (globalTick % 3 === 0) {
            spawnParticles('trail', proj.x + (Math.random() - 0.5) * 30, proj.y - 40, '#FCD34D', 1);
          }
        }


        if (flashTimer > 0) { ctx.fillStyle = `rgba(255, 255, 255, ${flashTimer / 5})`; ctx.fillRect(0, 0, canvas.width, canvas.height); flashTimer--; }
        if (shakeTimer > 0) shakeTimer--;
      } catch (e) { }
      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        if (internalGameStateRef.current === 'START') {
          setGameState('PLAYING');
          internalGameStateRef.current = 'PLAYING';
          return;
        } else if (internalGameStateRef.current === 'GAMEOVER') {
          setRestartKey(prev => prev + 1);
          setGameState('PLAYING');
          internalGameStateRef.current = 'PLAYING';
          setScore(0);
          setCombo(0);
          setPlayerShield(false);
          setPlayerMagnetTimer(0);
          setPlayerBoostTimer(0);
          playSound('coin');
          return;
        }
      }

      if (internalGameStateRef.current !== 'PLAYING') return;
      if (e.code === 'ArrowLeft' || e.key === 'a') { if (player.lane > -1) player.lane--; }
      else if (e.code === 'ArrowRight' || e.key === 'd') { if (player.lane < 1) player.lane++; }
      else if ((e.code === 'Space' || e.code === 'ArrowUp') && !player.isJumping) {
        player.vy = 28; player.isJumping = true; playSound('jump');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Touch controls for mobile
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      // Prevent resizing or scrolling
      if (e.target === canvas) e.preventDefault();

      if (internalGameStateRef.current === 'START' || internalGameStateRef.current === 'GAMEOVER') {
        // Let click handlers work for UI
        return;
      }

      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (internalGameStateRef.current !== 'PLAYING') return;
      if (e.target === canvas) e.preventDefault();

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      const minSwipeDist = 30; // pixels

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal Swipe
        if (Math.abs(deltaX) > minSwipeDist) {
          if (deltaX > 0) {
            // Swipe Right
            if (player.lane < 1) player.lane++;
          } else {
            // Swipe Left
            if (player.lane > -1) player.lane--;
          }
        }
      } else {
        // Vertical Swipe
        if (Math.abs(deltaY) > minSwipeDist) {
          if (deltaY < 0 && !player.isJumping) {
            // Swipe Up
            player.vy = 28; player.isJumping = true; playSound('jump');
          }
        } else {
          // It was a tap (not a swipe)
          const rect = canvas.getBoundingClientRect();
          const x = touchStartX - rect.left;
          const y = touchStartY - rect.top;

          if (y < rect.height / 2 && !player.isJumping) {
            player.vy = 28; player.isJumping = true; playSound('jump');
          } else if (x < rect.width / 2) {
            if (player.lane > -1) player.lane--;
          } else {
            if (player.lane < 1) player.lane++;
          }
        }
      }
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
    window.addEventListener('resize', resizeCanvas); // Verify listener is added

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [difficulty, isMuted, selectedCharId, restartKey]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  return (
    <div className="fixed inset-0 z-[100] bg-gray-900 flex flex-col font-display select-none overflow-hidden">

      {/* Game Header Bar */}
      <div className="bg-brand-cream border-b-4 border-gray-900 px-4 py-3 flex justify-between items-center z-50 shadow-md flex-shrink-0 h-16 md:h-20">
        <button
          onClick={() => onClose?.()}
          className="bg-white p-2 md:p-3 rounded-full border-2 border-gray-900 hover:bg-brand-pink hover:text-white transition-colors cursor-pointer active:scale-95"
          title="Exit Game"
        >
          <X size={20} className="md:w-6 md:h-6" />
        </button>

        <div className="flex flex-col items-center">
          <h1 className="text-xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter">LLAMA RUN 3D</h1>
          <span className={`text-[10px] md:text-xs font-bold ${DIFFICULTY_CONFIG[difficulty].text} tracking-widest uppercase`}> {difficulty} MODE </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsMusicEnabled(!isMusicEnabled)}
            className={`bg-white p-2 md:p-3 rounded-full border-2 border-gray-900 hover:bg-brand-purple hover:text-white transition-colors active:scale-95 ${!isMusicEnabled ? 'opacity-70 grayscale' : ''}`}
            title="Music"
          >
            <Music size={20} className="md:w-6 md:h-6" />
          </button>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="bg-white p-2 md:p-3 rounded-full border-2 border-gray-900 hover:bg-brand-blue hover:text-white transition-colors active:scale-95"
            title="Sound Effects"
          >
            {isMuted ? <VolumeX size={20} className="md:w-6 md:h-6" /> : <Volume2 size={20} className="md:w-6 md:h-6" />}
          </button>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="relative flex-1 bg-brand-blue overflow-hidden w-full h-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full block touch-none object-cover"
          style={{ touchAction: 'none' }}
        />

        {/* Start Screen Overlay */}
        {gameState === 'START' && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/95 backdrop-blur-md overflow-y-auto">
            <div className="w-full max-w-5xl my-auto animate-in zoom-in-95 duration-300">
              {/* Main Menu Card */}
              <div className="relative bg-gray-900/60 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl p-6 md:p-10 overflow-hidden">

                {/* Animated Background Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

                {/* Header */}
                <div className="relative z-10 text-center mb-8 md:mb-10">
                  <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-blue to-brand-purple drop-shadow-sm uppercase tracking-tighter mb-2 italic transform -skew-x-6">
                    Ready?
                  </h2>
                  <p className="text-gray-400 font-medium tracking-wide text-sm md:text-base uppercase flex items-center justify-center gap-2">
                    <span className="w-8 h-[1px] bg-gray-700"></span>
                    Choose your runner
                    <span className="w-8 h-[1px] bg-gray-700"></span>
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 relative z-10">

                  {/* LEFT: Character Preview Panel */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/5 to-brand-purple/5 rounded-3xl transform rotate-1 scale-95 blur-sm transition-all group-hover:blur-md group-hover:scale-100 duration-500"></div>
                    <div className="relative bg-gray-800/40 border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center">

                      {/* Spotlight Effect */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-blue/20 blur-[60px] rounded-full"></div>

                      {/* Character Render Container */}
                      <div className="relative w-48 h-48 mb-6 transition-transform duration-500 hover:scale-110">
                        <CharacterPreview charId={selectedCharId} />
                      </div>

                      {/* Character Info */}
                      <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-4 drop-shadow-md">
                        {AVAILABLE_CHARACTERS.find(c => c.id === selectedCharId)?.name}
                      </h3>
                    </div>
                  </div>

                  {/* RIGHT: Selection Controls */}
                  <div className="flex flex-col justify-between gap-6">

                    {/* Character Selector */}
                    <div className="bg-gray-800/20 rounded-2xl p-6 border border-white/5">
                      <div className="flex justify-between items-end mb-4">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Character</span>
                        <span className="text-xs font-bold text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded flex items-center gap-1">
                          <Star size={10} className="fill-brand-blue" />
                          {AVAILABLE_CHARACTERS.length} Unlocked
                        </span>
                      </div>

                      <div className="grid grid-cols-5 gap-3">
                        {AVAILABLE_CHARACTERS.map((char) => (
                          <button
                            key={char.id}
                            onClick={() => setSelectedCharId(char.id)}
                            className={`
                                    relative aspect-square rounded-xl flex items-center justify-center transition-all duration-300 group touch-manipulation
                                    ${selectedCharId === char.id
                                ? 'bg-gradient-to-br from-gray-700 to-gray-800 ring-2 ring-brand-blue ring-offset-2 ring-offset-gray-900 shadow-[0_0_20px_rgba(59,130,246,0.3)] z-10 scale-105'
                                : 'bg-gray-800/50 hover:bg-gray-700 border border-white/5 hover:border-white/10'
                              }
                                 `}
                          >
                            <div
                              className="w-8 h-8 rounded-full shadow-inner opacity-80 group-hover:opacity-100 transition-opacity"
                              style={{ backgroundColor: char.color }}
                            ></div>
                            {selectedCharId === char.id && (
                              <div className="absolute -top-2 -right-2 bg-brand-blue text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-gray-900">
                                ✓
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Difficulty Selector */}
                    <div className="bg-gray-800/20 rounded-2xl p-6 border border-white/5">
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Difficulty Level</span>
                      <div className="grid grid-cols-3 gap-3">
                        {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((mode) => (
                          <button
                            key={mode}
                            onClick={() => setDifficulty(mode)}
                            className={`
                                    py-3 rounded-xl font-black text-sm uppercase transition-all duration-200 border-2 touch-manipulation
                                    ${difficulty === mode
                                ? `border-${DIFFICULTY_CONFIG[mode].color} bg-${DIFFICULTY_CONFIG[mode].color}/10 text-white shadow-[0_0_15px_rgba(var(--color-${DIFFICULTY_CONFIG[mode].color}),0.3)]`
                                : 'border-transparent bg-gray-800/50 text-gray-500 hover:bg-gray-700 hover:text-gray-300'
                              }
                                    ${mode === 'EASY' && difficulty === mode ? 'border-brand-green text-brand-green bg-brand-green/10' : ''}
                                    ${mode === 'NORMAL' && difficulty === mode ? 'border-brand-blue text-brand-blue bg-brand-blue/10' : ''}
                                    ${mode === 'HARD' && difficulty === mode ? 'border-brand-pink text-brand-pink bg-brand-pink/10' : ''}
                                 `}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Main Action Button */}
                    <button
                      onClick={() => { playSound('coin'); setGameState('PLAYING'); }}
                      className="relative w-full group overflow-hidden rounded-2xl touch-manipulation active:scale-95 transition-transform"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-pink transition-transform duration-300 group-hover:scale-105"></div>
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>

                      <div className="relative py-5 flex items-center justify-center gap-3">
                        <span className="text-2xl font-black text-white italic tracking-tighter uppercase drop-shadow-md">Start Run</span>
                        <ArrowRight size={24} className="text-white group-hover:translate-x-1 transition-transform" />
                      </div>

                      {/* Shiny overlay */}
                      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                    </button>

                  </div>

                </div>

                {/* Footer / Best Score */}
                {highScore > 0 && (
                  <div className="mt-8 flex justify-center">
                    <div className="bg-black/30 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 flex items-center gap-3">
                      <Trophy size={16} className="text-brand-yellow" />
                      <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        Personal Best: <span className="text-brand-yellow text-lg ml-1">{Math.floor(highScore)}</span>
                      </span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

        {gameState === 'PLAYING' && (
          <>
            <div className="absolute top-6 right-6 flex flex-col items-end pointer-events-none select-none z-10">
              <span className="text-4xl md:text-6xl font-black text-white drop-shadow-[4px_4px_0_#000] stroke-black"> {Math.floor(score)} </span>
              {combo > 1 && (
                <div className="mt-2 bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-full border-2 border-white shadow-lg animate-bounce">
                  <div className="flex items-center gap-2">
                    <Flame size={20} className="text-white" />
                    <span className="text-xl font-black text-white">COMBO x{combo}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute top-6 left-6 flex gap-3 pointer-events-none z-10">
              {/* Shield indicator */}
              {playerShield && (
                <div className="bg-blue-500 p-2 md:p-3 rounded-full border-3 border-white shadow-xl animate-pulse">
                  <ShieldIcon size={24} className="text-white md:w-8 md:h-8" />
                </div>
              )}
              {/* Magnet indicator */}
              {playerMagnetTimer > 0 && (
                <div className="bg-red-500 p-2 md:p-3 rounded-full border-3 border-white shadow-xl relative">
                  <MagnetIcon size={24} className="text-white md:w-8 md:h-8" />
                  <div className="absolute -bottom-1 -right-1 bg-white text-red-500 text-xs md:text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center border border-red-500">
                    {Math.ceil(playerMagnetTimer / 60)}
                  </div>
                </div>
              )}
              {/* Boost indicator */}
              {playerBoostTimer > 0 && (
                <div className="bg-yellow-500 p-2 md:p-3 rounded-full border-3 border-white shadow-xl relative">
                  <Zap size={24} className="text-white md:w-8 md:h-8" />
                  <div className="absolute -bottom-1 -right-1 bg-white text-yellow-500 text-xs md:text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center border border-yellow-500">
                    {Math.ceil(playerBoostTimer / 60)}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Controls Hint (Optional) */}
            <div className="absolute bottom-8 left-0 w-full text-center pointer-events-none opacity-80 text-white font-bold text-sm md:hidden px-4">
              <span className="bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm shadow-lg">Swipe to Move • Tap/Swipe Up to Jump</span>
            </div>
          </>
        )}

        {gameState === 'GAMEOVER' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center backdrop-blur-md z-30 p-4">
            <div className="bg-white w-full max-w-sm p-8 rounded-[2.5rem] border-4 border-gray-900 shadow-[10px_10px_0px_0px_#FF6B6B] animate-in zoom-in duration-300">
              <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter">GAME OVER</h2>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-brand-blue/10 p-4 rounded-2xl border-2 border-brand-blue/20">
                  <span className="block text-xs font-bold text-brand-blue uppercase tracking-widest mb-1">Score</span>
                  <span className="block text-4xl font-black text-brand-blue">{Math.floor(score)}</span>
                </div>
                <div className="bg-brand-yellow/10 p-4 rounded-2xl border-2 border-brand-yellow/20">
                  <span className="block text-xs font-bold text-yellow-600 uppercase tracking-widest mb-1">Best</span>
                  <div className="flex items-center gap-2 justify-center">
                    <Trophy size={20} className="text-yellow-500 fill-yellow-500" />
                    <span className="block text-4xl font-black text-yellow-500">{highScore}</span>
                  </div>
                </div>

                {maxCombo > 1 && (
                  <div className="col-span-2 bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-2xl border-2 border-orange-200">
                    <span className="block text-xs font-bold text-orange-600 uppercase tracking-widest mb-1">Max Combo</span>
                    <div className="flex items-center gap-2 justify-center">
                      <Flame size={20} className="text-orange-500" />
                      <span className="block text-4xl font-black text-orange-500">x{maxCombo}</span>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setRestartKey(prev => prev + 1);
                  setGameState('PLAYING');
                  internalGameStateRef.current = 'PLAYING';
                  setScore(0);
                  setCombo(0);
                  setPlayerShield(false);
                  setPlayerMagnetTimer(0);
                  setPlayerBoostTimer(0);
                }}
                className="relative overflow-hidden bg-[#22c55e] text-white w-full py-6 rounded-2xl border-4 border-gray-900 shadow-[8px_8px_0px_0px_#000] hover:bg-[#16a34a] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#000] active:translate-y-1 active:shadow-[4px_4px_0px_0px_#000] transition-all duration-200 flex flex-col items-center justify-center group"
              >
                {/* Decorative Shine */}
                <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-700 ease-in-out"></div>

                <div className="flex items-center justify-center gap-3 relative z-10">
                  <RotateCcw size={32} strokeWidth={3} className="text-white group-hover:rotate-180 transition-transform duration-500" />
                  <span className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase drop-shadow-md">TRY AGAIN</span>
                </div>
                <span className="text-[10px] font-bold text-green-100 uppercase tracking-widest mt-1 group-hover:text-white transition-colors">Press Space to Restart</span>
              </button>

              <button
                onClick={() => {
                  setGameState('START');
                  internalGameStateRef.current = 'START';
                }}
                className="mt-4 text-gray-500 font-bold hover:text-gray-900 transition-colors text-sm uppercase tracking-widest"
              >
                Back to Menu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LlamaRunGame;
