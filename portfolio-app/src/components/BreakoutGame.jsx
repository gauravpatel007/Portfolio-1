import React, { useRef, useEffect, useState } from 'react';

export default function BreakoutGame() {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'won' | 'over'
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  // Letter matrix for "HELLO WORLD"
  const letterMap = {
    H: [
      [1, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
      [1, 0, 1],
      [1, 0, 1],
    ],
    E: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 1, 0],
      [1, 0, 0],
      [1, 1, 1],
    ],
    L: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 1],
    ],
    O: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
    ],
    W: [
      [1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 0, 1, 0, 1],
    ],
    R: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 0],
      [1, 0, 1],
      [1, 0, 1],
    ],
    D: [
      [1, 1, 0],
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
      [1, 1, 0],
    ],
  };

  const initBricks = (canvasWidth, canvasHeight) => {
    const bricks = [];
    const word1 = ['H', 'E', 'L', 'L', 'O'];
    const word2 = ['W', 'O', 'R', 'L', 'D'];

    const renderWord = (word, startY) => {
      const brickSize = Math.max(6, Math.floor(canvasWidth / 55));
      const gap = 2;
      let totalWidth = 0;
      word.forEach((char) => {
        const matrix = letterMap[char] || [];
        totalWidth += (matrix[0]?.length || 3) * (brickSize + gap) + gap * 3;
      });

      let currentX = Math.floor((canvasWidth - totalWidth) / 2);

      word.forEach((char) => {
        const matrix = letterMap[char] || [];
        for (let r = 0; r < matrix.length; r++) {
          for (let c = 0; c < matrix[r].length; c++) {
            if (matrix[r][c] === 1) {
              bricks.push({
                x: currentX + c * (brickSize + gap),
                y: startY + r * (brickSize + gap),
                w: brickSize,
                h: brickSize,
                active: true,
              });
            }
          }
        }
        currentX += (matrix[0]?.length || 3) * (brickSize + gap) + gap * 3;
      });
    };

    renderWord(word1, Math.floor(canvasHeight * 0.15));
    renderWord(word2, Math.floor(canvasHeight * 0.35));
    return bricks;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    let bricks = initBricks(width, height);
    let paddleW = Math.min(100, width * 0.22);
    let paddleH = 12;
    let paddleX = (width - paddleW) / 2;
    let ballX = width / 2;
    let ballY = height * 0.75;
    let ballRadius = 6;
    const ballBaseSpeed = 4.2; // Tuned brisk and engaging speed
    let ballDx = 2.4;
    let ballDy = -3.4;
    let animId;
    let lastTime = performance.now();

    // Click-and-drag controller state
    let isDragging = false;
    let dragOffset = paddleW / 2;

    const isOverPaddle = (px, py) => {
      return (
        px >= paddleX - 15 &&
        px <= paddleX + paddleW + 15 &&
        py >= height - 38 &&
        py <= height
      );
    };

    const onPointerDown = (e) => {
      const r = canvas.getBoundingClientRect();
      const mouseX = e.clientX - r.left;
      const mouseY = e.clientY - r.top;

      if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;

      isDragging = true;
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch (_) {}

      // If clicked directly on or near the paddle, preserve offset so it does not jump
      if (isOverPaddle(mouseX, mouseY)) {
        dragOffset = mouseX - paddleX;
      } else {
        dragOffset = paddleW / 2;
        paddleX = Math.max(0, Math.min(width - paddleW, mouseX - dragOffset));
      }

      canvas.style.cursor = 'grabbing';
    };

    const onPointerMove = (e) => {
      const r = canvas.getBoundingClientRect();
      const mouseX = e.clientX - r.left;
      const mouseY = e.clientY - r.top;

      if (!isDragging) {
        // Only update cursor affordance without moving paddle
        if (isOverPaddle(mouseX, mouseY)) {
          canvas.style.cursor = 'grab';
        } else {
          canvas.style.cursor = 'default';
        }
        return;
      }

      paddleX = Math.max(0, Math.min(width - paddleW, mouseX - dragOffset));
      canvas.style.cursor = 'grabbing';
    };

    const onPointerUp = (e) => {
      if (isDragging) {
        isDragging = false;
        try {
          if (canvas.hasPointerCapture(e.pointerId)) {
            canvas.releasePointerCapture(e.pointerId);
          }
        } catch (_) {}
        const r = canvas.getBoundingClientRect();
        const mouseX = e.clientX - r.left;
        const mouseY = e.clientY - r.top;
        if (isOverPaddle(mouseX, mouseY)) {
          canvas.style.cursor = 'grab';
        } else {
          canvas.style.cursor = 'default';
        }
      }
    };

    const onPointerCancel = (e) => {
      isDragging = false;
      try {
        if (canvas.hasPointerCapture(e.pointerId)) {
          canvas.releasePointerCapture(e.pointerId);
        }
      } catch (_) {}
      canvas.style.cursor = 'default';
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerCancel);
    window.addEventListener('pointerup', onPointerUp);

    const gameLoop = (now) => {
      const currentTime = now || performance.now();
      // Normalize delta time to 60fps (16.667ms) to keep speed consistent across 60Hz/120Hz/144Hz monitors
      const dt = Math.min(Math.max((currentTime - lastTime) / 16.667, 0.4), 2.0);
      lastTime = currentTime;

      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      // Draw bricks
      let remaining = 0;
      bricks.forEach((b) => {
        if (b.active) {
          remaining++;
          ctx.fillStyle = '#e8e4dc';
          ctx.fillRect(b.x, b.y, b.w, b.h);
        }
      });

      if (remaining === 0 && gameState === 'playing') {
        setGameState('won');
        return;
      }

      // Draw paddle with responsive drag glow
      ctx.save();
      if (isDragging) {
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#34d399';
      } else {
        ctx.fillStyle = '#ffffff';
      }
      ctx.beginPath();
      ctx.roundRect(paddleX, height - 24, paddleW, paddleH, 6);
      ctx.fill();
      ctx.restore();

      // Draw ball
      ctx.save();
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 8;
      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (gameState === 'playing') {
        ballX += ballDx * dt;
        ballY += ballDy * dt;

        // Bounce walls
        if (ballX - ballRadius <= 0) {
          ballX = ballRadius;
          ballDx = Math.abs(ballDx);
        } else if (ballX + ballRadius >= width) {
          ballX = width - ballRadius;
          ballDx = -Math.abs(ballDx);
        }

        if (ballY - ballRadius <= 0) {
          ballY = ballRadius;
          ballDy = Math.abs(ballDy);
        }

        // Paddle collision (only when moving downwards)
        if (
          ballDy > 0 &&
          ballY + ballRadius >= height - 24 &&
          ballY - ballRadius <= height - 12 &&
          ballX >= paddleX &&
          ballX <= paddleX + paddleW
        ) {
          const hitPoint = Math.max(-1, Math.min(1, (ballX - (paddleX + paddleW / 2)) / (paddleW / 2)));
          const maxAngle = Math.PI / 3; // 60 degrees max
          const angle = hitPoint * maxAngle;
          ballDx = ballBaseSpeed * Math.sin(angle);
          ballDy = -ballBaseSpeed * Math.cos(angle);
          ballY = height - 24 - ballRadius;
        }

        // Brick collision
        bricks.forEach((b) => {
          if (b.active) {
            if (
              ballX + ballRadius >= b.x &&
              ballX - ballRadius <= b.x + b.w &&
              ballY + ballRadius >= b.y &&
              ballY - ballRadius <= b.y + b.h
            ) {
              b.active = false;
              ballDy = -ballDy;
              setScore((s) => s + 10);
            }
          }
        });

        // Bottom boundary (ball lost)
        if (ballY - ballRadius > height) {
          setLives((l) => {
            if (l <= 1) {
              setGameState('over');
              return 0;
            } else {
              ballX = width / 2;
              ballY = height * 0.75;
              ballDx = 2.4;
              ballDy = -3.4;
              return l - 1;
            }
          });
        }
      }

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerCancel);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [gameState]);

  const startGame = () => {
    setGameState('playing');
    setLives(3);
    setScore(0);
  };

  return (
    <section id="play" className="py-24 md:py-32 px-4 md:px-16 bg-[#050505] text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-xs font-mono tracking-widest text-gray-400 mb-6 uppercase">
          Break it if you can. It still ships.
          <span className="block text-[11px] text-emerald-400/80 mt-1 lowercase font-mono">
            click &amp; drag paddle to move
          </span>
        </p>

        <div className="relative aspect-[5/6] sm:aspect-[4/3] lg:aspect-[16/9] border border-white/10 rounded-2xl bg-black overflow-hidden shadow-2xl">
          <canvas ref={canvasRef} className="w-full h-full block touch-none select-none cursor-default" />

          {/* HUD Overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i < lives ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-white/15'
                }`}
              />
            ))}
            <span className="font-mono text-xs text-gray-400 ml-3">SCORE: {score}</span>
          </div>

          {/* Action Overlay */}
          {gameState !== 'playing' && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
              {gameState === 'won' && (
                <p className="text-2xl font-black text-emerald-400 uppercase tracking-widest">
                  YOU CLEARED THE CODE!
                </p>
              )}
              {gameState === 'over' && (
                <p className="text-2xl font-black text-gray-400 uppercase tracking-widest">
                  GAME OVER
                </p>
              )}
              <button
                type="button"
                onClick={startGame}
                className="px-8 py-3 rounded-full bg-[#e8e4dc] text-[#050505] font-black text-xs md:text-sm tracking-widest uppercase hover:bg-white transition-all shadow-[0_0_20px_rgba(232,228,220,0.3)] cursor-pointer"
              >
                {gameState === 'idle' ? 'PLAY' : 'PLAY AGAIN'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
