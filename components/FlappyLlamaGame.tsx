
import React, { useEffect, useRef, useState } from 'react';
import { X, Trophy, RotateCcw, Play, Volume2, VolumeX } from 'lucide-react';

// --- CONFIGURATION ---
// Procedural drawing used

interface FlappyLlamaGameProps {
  onClose?: () => void;
}

const FlappyLlamaGame: React.FC<FlappyLlamaGameProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [gameId, setGameId] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Persist AudioContext to avoid hitting browser limits
  const audioCtxRef = useRef<AudioContext | null>(null);
  // Mounted ref to safely handle audio cleanup
  const isMounted = useRef(true);

  useEffect(() => {
    console.log("FlappyLlamaGame Mounted");
    isMounted.current = true;
    return () => {
      console.log("FlappyLlamaGame Unmounted");
      isMounted.current = false;
    };
  }, []);

  // Sound Engine
  const playSound = (type: 'jump' | 'score' | 'hit') => {
    if (isMuted || !isMounted.current) return;

    // Initialize context if needed
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          audioCtxRef.current = new AudioContext();
        }
      } catch (e) {
        return;
      }
    }

    const ctx = audioCtxRef.current;
    if (!ctx) return;

    // Resume if suspended (browser policy)
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => { });
    }

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'jump') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.linearRampToValueAtTime(600, now + 0.1);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'score') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.setValueAtTime(1200, now + 0.08);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'hit') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {
      // Ignore audio errors
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas ref is null");
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("Canvas 2D context is null");
      return;
    }

    // Removed unused sprite loading code

    // Game Constants
    // Dynamic sizing based on canvas
    const getScale = () => Math.min(canvas.width / 320, canvas.height / 480);

    const PIPE_SPAWN_RATE = 100; // frames
    const PIPE_GAP = canvas.height * 0.25; // Dynamic gap based on height

    // Brand Colors for Pipes
    const PALETTE = ['#FF6B6B', '#4ECDC4', '#FF9F43', '#A78BFA'];

    // Variables
    let animationId: number;
    let frames = 0;
    // let startTime = 0; // Removed time tracking
    let localState: 'START' | 'PLAYING' | 'GAMEOVER' = 'START';
    let currentScore = 0; // Local tracking for loop

    // Entities
    const llama = {
      x: canvas.width * 0.2, // Left 20%
      y: canvas.height / 2,
      w: 40,
      h: 40,
      velocity: 0,
      rotation: 0,
      blinkTimer: 0,
      frameX: 0 // 0: Glide, 1: Flap, 2: Blink
    };

    let pipes: { x: number; y: number; w: number; h: number; color: string; passed: boolean }[] = [];

    // Background Clouds
    const clouds = Array.from({ length: 4 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * 250,
      speed: Math.random() * 0.5 + 0.2,
      scale: Math.random() * 0.5 + 0.5
    }));

    // Reset Function
    const reset = () => {
      llama.y = canvas.height / 2;
      llama.velocity = 0;
      llama.rotation = 0;
      pipes = [];
      setScore(0);
      currentScore = 0;
      frames = 0;
      localState = 'START';
      setGameState('START');
    };

    // Make reset available to effect dependency if needed, but better to handle simple restart logic
    // We can detecting gameState change to START as a trigger, effectively handled by the loop logic

    // START TRIGGER
    // If external state is set to START, we should reset local state?
    // The problem is the loop uses `localState`. 
    // We should sync localState with gameState when gameState changes?
    // Actually, let's keep it simple: the loop is the source of truth, but we need to reset when "Reintentar" is clicked.
    // "Reintentar" sets gameState to 'START'. 
    // We can add a watcher for gameState.

    // Input Handling
    const jump = () => {
      if (localState === 'PLAYING') {
        llama.velocity = -4.6; // JUMP constant
        playSound('jump');
      } else if (localState === 'START') {
        localState = 'PLAYING';
        setGameState('PLAYING');
        // startTime = Date.now(); // Start Timer
        llama.velocity = -4.6;
        playSound('jump');
      }
    };

    // --- MAIN LOOP ---
    const loop = () => {
      try {
        // Sync reset from UI
        // If UI says START but we are GAMEOVER, reset.
        // This is a bit hacky but works for the button click
        // We'll handle this purely by checking if we need to reset in the button click handling
        // by recreating the component? No.
        // Let's rely on internal state mostly.

        // 1. Update Physics
        if (localState === 'PLAYING') {
          // Time Tracking Removed

          llama.velocity += 0.25; // GRAVITY
          llama.y += llama.velocity;

          // Rotation
          if (llama.velocity < 0) llama.rotation = -25 * Math.PI / 180;
          else {
            llama.rotation += 2 * Math.PI / 180;
            if (llama.rotation > 90 * Math.PI / 180) llama.rotation = 90 * Math.PI / 180;
          }

          // Floor Collision
          if (llama.y + llama.h >= canvas.height - 20) {
            localState = 'GAMEOVER';
            setGameState('GAMEOVER');
            playSound('hit');
          }

          // Pipe Logic
          if (frames % PIPE_SPAWN_RATE === 0) {
            const minHeight = canvas.height * 0.1;
            const maxY = canvas.height - 20 - PIPE_GAP - minHeight;
            const topHeight = Math.floor(Math.random() * (maxY - minHeight + 1) + minHeight);
            const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];

            pipes.push({
              x: canvas.width,
              y: 0,
              w: 52,
              h: topHeight,
              color: color,
              passed: false
            });
            pipes.push({
              x: canvas.width,
              y: topHeight + PIPE_GAP,
              w: 52,
              h: canvas.height - 20 - (topHeight + PIPE_GAP),
              color: color,
              passed: false
            });
          }

          pipes.forEach(p => {
            p.x -= 2.5; // PIPE_SPEED

            // Collision AABB
            const hitX = llama.x + 5;
            const hitY = llama.y + 5;
            const hitW = llama.w - 10;
            const hitH = llama.h - 10;

            if (
              hitX < p.x + p.w &&
              hitX + hitW > p.x &&
              hitY < p.y + p.h &&
              hitY + hitH > p.y
            ) {
              localState = 'GAMEOVER';
              setGameState('GAMEOVER');
              playSound('hit');
            }

            // Pipe Counter
            if (p.y === 0 && p.x + p.w < llama.x && !p.passed) {
              p.passed = true;
              currentScore++;
              setScore(currentScore);
              playSound('score');
            }
          });

          // Cleanup pipes
          if (pipes.length && pipes[0].x < -60) {
            pipes.shift();
            pipes.shift();
          }

          frames++;
        } else if (localState === 'START') {
          // Hover animation
          llama.y = canvas.height / 2 + Math.sin(Date.now() / 300) * 8;
          llama.rotation = 0;
        }


        // --- RENDER ---

        // Background (Sky)
        ctx.fillStyle = '#5B8BDF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Clouds
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        clouds.forEach(c => {
          ctx.beginPath();
          ctx.arc(c.x, c.y, 20 * c.scale, 0, Math.PI * 2);
          ctx.arc(c.x + 15 * c.scale, c.y - 10 * c.scale, 25 * c.scale, 0, Math.PI * 2);
          ctx.arc(c.x + 30 * c.scale, c.y, 20 * c.scale, 0, Math.PI * 2);
          ctx.fill();
          if (localState === 'PLAYING') c.x -= c.speed;
          if (c.x < -50) c.x = canvas.width + 50;
        });

        // Pipes
        pipes.forEach(p => {
          ctx.fillStyle = p.color;
          // Pipe Body
          ctx.fillRect(p.x, p.y, p.w, p.h);
          // Pipe Cap / Outline
          ctx.lineWidth = 3;
          ctx.strokeStyle = '#111827';
          ctx.strokeRect(p.x, p.y, p.w, p.h);

          // Highlights
          ctx.fillStyle = 'rgba(255,255,255,0.3)';
          ctx.fillRect(p.x + 4, p.y, 8, p.h);

          // Cap visual
          const capH = 20;
          if (p.y === 0) { // Top Pipe
            ctx.strokeRect(p.x - 2, p.h - capH, p.w + 4, capH);
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x - 2, p.h - capH, p.w + 4, capH);
          } else { // Bottom Pipe
            ctx.strokeRect(p.x - 2, p.y, p.w + 4, capH);
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x - 2, p.y, p.w + 4, capH);
          }
        });

        // Ground
        const groundY = canvas.height - 20;
        ctx.fillStyle = '#FFC65C';
        ctx.fillRect(0, groundY, canvas.width, 20);
        ctx.strokeStyle = '#111827';
        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(canvas.width, groundY);
        ctx.stroke();

        // Moving Ground Lines
        if (localState !== 'GAMEOVER') {
          const offset = (Date.now() / 5) % 20;
          ctx.strokeStyle = '#F59E0B';
          ctx.lineWidth = 2;
          for (let i = -1; i < canvas.width / 20 + 1; i++) {
            ctx.beginPath();
            ctx.moveTo(i * 20 - offset, groundY);
            ctx.lineTo(i * 20 - 10 - offset, canvas.height);
            ctx.stroke();
          }
        }

        // Llama Sprite Animation Logic
        if (localState === 'PLAYING') {
          // No wing flap needed for head, but maybe tilt is handled by rotation
        } else {
          // Idle Blinking
          llama.blinkTimer++;
          if (llama.blinkTimer > 150) {
            llama.frameX = 2; // Blink
            if (llama.blinkTimer > 160) llama.blinkTimer = 0;
          } else {
            llama.frameX = 0;
          }
        }

        // --- DRAW HEAD (Procedural) ---
        const drawHead = () => {
          ctx.save();
          ctx.translate(llama.x + llama.w / 2, llama.y + llama.h / 2);
          ctx.rotate(llama.rotation);

          const scale = 1.0;
          const HEAD_SIZE = llama.w * 0.9;
          const OUTLINE_COLOR = '#111827';
          const BODY_COLOR = '#FFFFFF';

          // Helper for rounded rect
          const drawRoundedRect = (rx: number, ry: number, rWidth: number, rHeight: number, radius: number, fillColor: string, strokeColor?: string, strokeWidth: number = 2) => {
            ctx.fillStyle = fillColor;
            ctx.beginPath();
            ctx.moveTo(rx + radius, ry);
            ctx.lineTo(rx + rWidth - radius, ry);
            ctx.quadraticCurveTo(rx + rWidth, ry, rx + rWidth, ry + radius);
            ctx.lineTo(rx + rWidth, ry + rHeight - radius);
            ctx.quadraticCurveTo(rx + rWidth, ry + rHeight, rx + rWidth - radius, ry + rHeight);
            ctx.lineTo(rx + radius, ry + rHeight);
            ctx.quadraticCurveTo(rx, ry + rHeight, rx, ry + rHeight - radius);
            ctx.lineTo(rx, ry + radius);
            ctx.quadraticCurveTo(rx, ry, rx + radius, ry);
            ctx.closePath();
            ctx.fill();
            if (strokeColor) {
              ctx.strokeStyle = strokeColor;
              ctx.lineWidth = strokeWidth;
              ctx.stroke();
            }
          };

          // Ears
          const EAR_W = HEAD_SIZE * 0.3;
          const EAR_H = HEAD_SIZE * 0.45;
          const drawEar = (earX: number) => {
            ctx.fillStyle = BODY_COLOR;
            ctx.strokeStyle = OUTLINE_COLOR;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(earX, -HEAD_SIZE * 0.4);
            ctx.lineTo(earX - EAR_W * 0.5, -HEAD_SIZE * 0.4 - EAR_H);
            ctx.lineTo(earX + EAR_W * 0.5, -HEAD_SIZE * 0.4 - EAR_H);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Inner Ear
            ctx.fillStyle = 'rgba(255, 192, 203, 0.5)';
            ctx.beginPath();
            ctx.moveTo(earX, -HEAD_SIZE * 0.4 - EAR_H * 0.2);
            ctx.lineTo(earX - EAR_W * 0.25, -HEAD_SIZE * 0.4 - EAR_H * 0.7);
            ctx.lineTo(earX + EAR_W * 0.25, -HEAD_SIZE * 0.4 - EAR_H * 0.7);
            ctx.fill();
          };

          drawEar(-HEAD_SIZE * 0.25);
          drawEar(HEAD_SIZE * 0.25);

          // Main Head Box
          drawRoundedRect(-HEAD_SIZE / 2, -HEAD_SIZE / 2, HEAD_SIZE, HEAD_SIZE, HEAD_SIZE * 0.35, BODY_COLOR, OUTLINE_COLOR, 2);

          // Face Elements
          const eyeY = -HEAD_SIZE * 0.1;
          const eyeSize = HEAD_SIZE * 0.12;

          // Eyes
          if (llama.frameX === 2) { // Blink Frame
            ctx.strokeStyle = OUTLINE_COLOR;
            ctx.lineWidth = 2;
            ctx.beginPath(); // Left Eye Closed
            ctx.moveTo(-HEAD_SIZE * 0.25 - 5, eyeY);
            ctx.lineTo(-HEAD_SIZE * 0.25 + 5, eyeY);
            ctx.stroke();
            ctx.beginPath(); // Right Eye Closed
            ctx.moveTo(HEAD_SIZE * 0.25 - 5, eyeY);
            ctx.lineTo(HEAD_SIZE * 0.25 + 5, eyeY);
            ctx.stroke();
          } else {
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(-HEAD_SIZE * 0.25, eyeY, eyeSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(HEAD_SIZE * 0.25, eyeY, eyeSize, 0, Math.PI * 2);
            ctx.fill();

            // Eye Shine
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(-HEAD_SIZE * 0.25 - 2, eyeY - 2, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(HEAD_SIZE * 0.25 - 2, eyeY - 2, 2, 0, Math.PI * 2);
            ctx.fill();
          }

          // Snout
          const snoutY = HEAD_SIZE * 0.2;
          drawRoundedRect(-HEAD_SIZE * 0.2, snoutY, HEAD_SIZE * 0.4, HEAD_SIZE * 0.25, 4, '#FFFFFF', OUTLINE_COLOR, 1.5);

          // Nostrils
          ctx.fillStyle = OUTLINE_COLOR;
          ctx.beginPath();
          ctx.arc(-HEAD_SIZE * 0.08, snoutY + HEAD_SIZE * 0.1, 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(HEAD_SIZE * 0.08, snoutY + HEAD_SIZE * 0.1, 1.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        };

        drawHead();

      } catch (e) {
        // Safe catch for loop errors
      }

      animationId = window.requestAnimationFrame(loop);
    };

    loop();

    // Event Handlers
    const handleAction = (e?: Event) => {
      if (e) e.preventDefault();
      console.log("Action triggered", localState);
      if (localState === 'GAMEOVER') {
        setTimeout(() => reset(), 100);
      } else {
        jump();
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') handleAction();
    };

    canvas.addEventListener('mousedown', handleAction);
    canvas.addEventListener('touchstart', handleAction, { passive: false });
    window.addEventListener('keydown', handleKey);
    window.addEventListener('resize', () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    });

    return () => {
      window.cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousedown', handleAction);
      canvas.removeEventListener('touchstart', handleAction);
      window.removeEventListener('keydown', handleKey);

      // Cleanup AudioContext on unmount safely
      if (audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        if (ctx.state !== 'closed') {
          ctx.close().catch(() => { });
        }
        audioCtxRef.current = null;
      }
    };
  }, [isMuted, gameId]); // Re-bind if mute or gameId changes

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  return (
    <div className="min-h-screen bg-gray-900/95 flex items-center justify-center p-0 md:p-4 font-display select-none backdrop-blur-sm z-50 fixed inset-0 touch-none">

      {/* Device Frame (Full Screen) */}
      <div className="relative w-full h-full bg-brand-cream overflow-hidden touch-none select-none">

        {/* Header - Floating Top */}
        <div className="absolute top-0 left-0 w-full flex justify-between items-center p-4 z-20 pointer-events-none">
          <button
            onClick={onClose}
            className="pointer-events-auto bg-white p-3 rounded-full border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-brand-pink hover:text-white transition-all cursor-pointer active:scale-95 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1"
            aria-label="Cerrar juego"
          >
            <X size={24} />
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="pointer-events-auto bg-white p-3 rounded-full border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-brand-blue hover:text-white transition-all cursor-pointer active:scale-95 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>

        {/* Game Canvas Container */}
        <div className="absolute inset-0 bg-brand-blue w-full h-full">
          <canvas
            ref={canvasRef}
            width={typeof window !== 'undefined' ? window.innerWidth : 320}
            height={typeof window !== 'undefined' ? window.innerHeight : 480}
            className="w-full h-full block touch-none"
          />

          {/* Footer Branding - Floating Bottom */}
          <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none z-10 opacity-50">
            <div className="flex flex-col items-center">
              <h1 className="text-xl font-black text-white uppercase tracking-tighter drop-shadow-md">FLAPPY LLAMA</h1>
              <span className="text-[10px] font-bold text-white uppercase tracking-widest drop-shadow-md">FiveColors Games</span>
            </div>
          </div>

          {/* Score Overlay (In-game) */}
          {gameState === 'PLAYING' && (
            <div className="absolute top-24 left-0 w-full text-center pointer-events-none z-10">
              <span className="text-8xl font-black text-white drop-shadow-[0_6px_0_rgba(0,0,0,0.5)] stroke-black" style={{ WebkitTextStroke: '4px black' }}>
                {score}
              </span>
            </div>
          )}

          {/* Start Screen */}
          {gameState === 'START' && (
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center pointer-events-none z-10">
              <div className="bg-white px-12 py-8 rounded-[2rem] border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse-soft mx-4 transform scale-110">
                <div className="mb-4">
                  <Play size={64} className="mx-auto text-brand-green fill-brand-green" />
                </div>
                <h2 className="text-4xl font-black text-gray-900 mb-2">¡A VOLAR!</h2>
                <p className="text-gray-500 font-bold text-lg uppercase tracking-wide">Toca para empezar</p>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === 'GAMEOVER' && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center backdrop-blur-md z-30">
              <div className="bg-white w-full max-w-md p-8 rounded-[2.5rem] border-4 border-gray-900 shadow-[12px_12px_0px_0px_#FF6B6B] animate-fade-in-scale mx-4">
                <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">GAME OVER</h2>

                <div className="flex justify-between gap-6 mb-8 bg-gray-50 p-6 rounded-2xl border-2 border-gray-100">
                  <div className="text-center w-1/2">
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Puntuación</span>
                    <span className="block text-5xl font-black text-brand-blue">{score}</span>
                  </div>
                  <div className="w-px bg-gray-200"></div>
                  <div className="text-center w-1/2">
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Mejor</span>
                    <div className="flex items-center gap-2 justify-center">
                      <Trophy size={20} className="text-brand-yellow fill-brand-yellow" />
                      <span className="block text-5xl font-black text-brand-yellow">{highScore}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div
                    onClick={() => {
                      setGameId(prev => prev + 1);
                      setGameState('START');
                    }}
                    className="relative overflow-hidden bg-gradient-to-br from-brand-green to-emerald-600 text-white py-4 px-8 rounded-2xl font-black text-xl border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 pointer-events-auto cursor-pointer w-full group select-none touch-manipulation"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></div>
                    <RotateCcw size={24} className="relative z-10 group-hover:rotate-180 transition-transform duration-700" />
                    <span className="relative z-10">JUGAR DE NUEVO</span>
                  </div>

                  <div
                    onClick={onClose}
                    className="bg-white text-gray-900 py-4 px-8 rounded-2xl font-black text-xl border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:bg-gray-50 hover:translate-y-1 hover:shadow-none active:scale-95 transition-all flex items-center justify-center gap-3 pointer-events-auto cursor-pointer w-full select-none touch-manipulation"
                  >
                    <X size={24} /> SALIR AL MENÚ
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlappyLlamaGame;
