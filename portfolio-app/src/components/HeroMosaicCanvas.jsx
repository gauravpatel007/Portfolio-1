import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const VERTEX_SHADER = `#version 300 es
precision highp float;

in vec2 aHome;   // 0..1 inside the anchor rect
in vec3 aAir;    // x,y 0..1 over the canvas, z = depth (0 near, 1 far)
in vec4 aInfo;   // brightness, delay, duration, phase
in vec3 aCell;   // atlas window origin (uv), kind (0 tile, 1 dust)

uniform vec2 uRes;       // canvas, CSS px
uniform vec4 uRect;      // anchor x, y, w, h in canvas CSS px
uniform float uCell;     // tile pitch, CSS px
uniform float uDpr;
uniform float uTime;     // seconds, always running
uniform float uReveal;   // seconds since play
uniform float uScatter;  // 0 = face, 1 = blown back into the air
uniform vec2 uMouse;     // CSS px, far away when absent

out vec2 vCell;
out float vBright;
out float vLand;
out float vAlpha;
out float vPhase;

float inOut(float t) { 
  return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0; 
}

void main() {
  float bright = aInfo.x;
  float delay  = aInfo.y;
  float dur    = aInfo.z;
  float phase  = aInfo.w;
  float depth  = aAir.z;
  bool dust    = aCell.z > 0.5;

  // Air position: a slow float, nearer specks drift further
  vec2 drift = vec2(sin(uTime * 0.31 + phase * 6.283), cos(uTime * 0.23 + phase * 9.1))
             * (6.0 + 22.0 * (1.0 - depth));
  vec2 air  = aAir.xy * uRes + drift;
  vec2 home = uRect.xy + aHome * uRect.zw;

  // Reveal: fade in as a speck (staggered), then fly home
  float appear = smoothstep(0.0, 0.8, uReveal - delay * 0.35);
  float fly    = dust ? 0.0 : clamp((uReveal - delay) / dur, 0.0, 1.0);
  float e      = inOut(fly);

  // Scroll: tiles leave in a ragged order rather than all at once
  float q = clamp(uScatter * 1.7 - phase * 0.7, 0.0, 1.0);
  q = q * q;

  float k = e * (1.0 - q);              // 1 = sitting in the face
  vec2 pos = mix(air, home, k);

  // A curved path reads as gathered, a straight one as tweened
  vec2 d = home - air;
  pos += vec2(-d.y, d.x) * 0.18 * sin(3.14159 * k) * (phase - 0.5);

  // The pointer parts the tiles it passes over
  vec2 m = pos - uMouse;
  float ml = length(m);
  pos += (ml > 0.001 ? m / ml : vec2(0.0)) * smoothstep(110.0, 0.0, ml) * 16.0 * k;

  float land  = smoothstep(0.55, 1.0, k);
  float speck = mix(2.2, 0.9, depth);
  float tile  = uCell * (0.25 + 0.7 * bright);
  float size  = mix(speck, tile, land);

  float dustA = dust ? mix(0.55, 0.22, smoothstep(2.0, 4.0, uReveal)) : 1.0;
  vAlpha  = appear * mix(0.25 + 0.55 * (1.0 - depth), 1.0, land) * dustA;
  vBright = bright;
  vLand   = land;
  vCell   = aCell.xy;
  vPhase  = phase;

  vec2 clip = pos / uRes * 2.0 - 1.0;
  gl_Position  = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = max(size * uDpr, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform sampler2D uAtlas;
uniform vec2 uWin;     // window size in atlas uv
uniform float uTime;

in vec2 vCell;
in float vBright;
in float vLand;
in float vAlpha;
in float vPhase;
out vec4 outColor;

void main() {
  vec3 c = texture(uAtlas, vCell + gl_PointCoord * uWin).rgb;
  float peak = max(max(c.r, c.g), max(c.b, 0.06));
  vec3 hue = c / peak;
  vec3 tile = mix(hue, min(c * 1.8, 1.0), 0.35);
  tile = mix(tile, vec3(1.0), 0.15);
  float twinkle = 0.9 + 0.1 * sin(uTime * 1.6 + vPhase * 47.0);
  tile *= (0.1 + 0.95 * vBright) * twinkle;

  vec3 speck = vec3(0.9, 0.92, 1.0);
  vec3 rgb = mix(speck, tile, vLand);
  outColor = vec4(rgb * vAlpha, vAlpha);
}
`;

const UI_DUST_RATIO = 0.07;
const ATLAS_W = 1024;
const ATLAS_H = 640;
const TILE_PIXELS = 56;
const THUMB_CROPS = [
  [0.26, 0.17, 0.48, 0.37],
  [0.53, 0.08, 0.15, 0.55],
  [0.4, 0.14, 0.16, 0.72],
  [0.2, 0.22, 0.4, 0.4]
];

function calcCellPitch(width) {
  return Math.min(6, Math.max(3.5, width / 200));
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const err = gl.getShaderInfoLog(shader) || 'Shader compilation failed';
    gl.deleteShader(shader);
    throw new Error(err);
  }
  return shader;
}

function createAtlasCanvas(images) {
  const canvas = document.createElement('canvas');
  canvas.width = ATLAS_W;
  canvas.height = ATLAS_H;
  const ctx = canvas.getContext('2d');
  const halfW = ATLAS_W / 2;
  const halfH = ATLAS_H / 2;

  images.slice(0, 4).forEach((img, idx) => {
    const [cx, cy, cw, ch] = THUMB_CROPS[idx] || [0, 0, 1, 1];
    const nw = img.naturalWidth || 1;
    const nh = img.naturalHeight || 1;
    ctx.drawImage(
      img,
      cx * nw,
      cy * nh,
      cw * nw,
      ch * nh,
      (idx % 2) * halfW,
      Math.floor(idx / 2) * halfH,
      halfW,
      halfH
    );
  });
  return canvas;
}

function smoothstepInterp(minVal, maxVal, val) {
  const r = Math.min(1, Math.max(0, (val - minVal) / (maxVal - minVal)));
  return r * r * (3 - 2 * r);
}

function generatePointCloud(portraitImg, targetWidth, visibleRatio) {
  const cellPitch = calcCellPitch(targetWidth);
  const cols = Math.max(20, Math.round(targetWidth / cellPitch));
  const rows = Math.round(cols * portraitImg.naturalHeight / portraitImg.naturalWidth);

  const sampleCanvas = document.createElement('canvas');
  sampleCanvas.width = cols;
  sampleCanvas.height = rows;
  const sCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });
  sCtx.imageSmoothingQuality = 'high';
  sCtx.drawImage(portraitImg, 0, 0, cols, rows);

  const imgData = sCtx.getImageData(0, 0, cols, rows).data;
  const home = [];
  const air = [];
  const info = [];
  const cellAttr = [];
  const tileRatioW = TILE_PIXELS / ATLAS_W;
  const tileRatioH = TILE_PIXELS / ATLAS_H;
  let maxSettleTime = 0;

  const pushParticle = (hx, hy, brightVal, isDust) => {
    home.push(hx, hy);
    air.push(Math.random() * 1.2 - 0.1, Math.random() * 1.2 - 0.1, Math.random());
    const delay = 0.35 + Math.random() * 1 + hy * 0.45;
    const duration = 1.35 + Math.random() * 0.55;
    if (!isDust) {
      maxSettleTime = Math.max(maxSettleTime, delay + duration);
    }
    info.push(brightVal, delay, duration, Math.random());
    cellAttr.push(Math.random() * (1 - tileRatioW), Math.random() * (1 - tileRatioH), isDust ? 1.0 : 0.0);
  };

  const lumaArray = new Float32Array(cols * rows);
  for (let i = 0; i < cols * rows; i++) {
    const p = i * 4;
    lumaArray[i] = ((0.2126 * imgData[p] + 0.7152 * imgData[p + 1] + 0.0722 * imgData[p + 2]) / 255) * (imgData[p + 3] / 255);
  }

  const validLuma = Array.from(lumaArray).filter((v) => v >= 0.035).sort((a, b) => a - b);
  const lowP = validLuma[Math.floor(validLuma.length * 0.02)] ?? 0;
  const highP = validLuma[Math.floor(validLuma.length * 0.97)] ?? 1;
  const maxRows = Math.min(rows, Math.ceil(rows * visibleRatio));

  for (let r = 0; r < maxRows; r++) {
    for (let c = 0; c < cols; c++) {
      const luma = lumaArray[r * cols + c];
      if (luma < 0.035 || (luma < 0.08 && Math.random() < 0.45)) continue;
      const norm = Math.min(1, Math.max(0, (luma - lowP) / (highP - lowP)));
      const adjusted = 0.2 * norm + 0.8 * smoothstepInterp(0.1, 0.55, norm);
      pushParticle((c + 0.5) / cols, (r + 0.5) / rows, adjusted, false);
    }
  }

  const particleCount = home.length / 2;
  const dustCount = Math.round(particleCount * UI_DUST_RATIO);
  for (let i = 0; i < dustCount; i++) {
    pushParticle(0.5, 0.5, 0.3, true);
  }

  return {
    settle: maxSettleTime,
    cell: cellPitch,
    count: home.length / 2,
    home: new Float32Array(home),
    air: new Float32Array(air),
    info: new Float32Array(info),
    cellAttr: new Float32Array(cellAttr)
  };
}

export default function HeroMosaicCanvas({
  src = '/assets/hero_center.png',
  thumbs = [
    '/assets/habitflow.jpg',
    '/assets/ecommerce.jpg',
    '/assets/mindpixel.jpg',
    '/assets/expense.jpg'
  ],
  anchorRef,
  play = true,
  label = 'Interactive portrait photomosaic',
  className = ''
}) {
  const canvasRef = useRef(null);
  const playTimeRef = useRef(null);

  useEffect(() => {
    if (play && playTimeRef.current === null) {
      const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      playTimeRef.current = performance.now() / 1000 - (reducedMotion ? 100 : 0);
    }
  }, [play]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const anchor = anchorRef?.current;
    if (!canvas || !anchor) return;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false
    });

    const fallbackToStatic = () => {
      anchor.style.visibility = 'visible';
      canvas.style.display = 'none';
    };

    if (!gl) {
      return fallbackToStatic();
    }

    let isDisposed = false;
    let isTickerActive = false;
    let isIntersecting = true;
    let totalParticles = 0;
    let cellPitch = 6;
    let maxSettleTime = 0;
    let cachedWidth = -1;
    let loadedPortrait = null;
    const startTime = performance.now() / 1000;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

    let program;
    try {
      program = gl.createProgram();
      gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
      gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || 'Program link error');
      }
    } catch (e) {
      console.warn('WebGL Shader build error, falling back to static image:', e);
      return fallbackToStatic();
    }

    gl.useProgram(program);

    const getLoc = (name) => gl.getUniformLocation(program, name);
    const uniforms = {
      res: getLoc('uRes'),
      rect: getLoc('uRect'),
      cell: getLoc('uCell'),
      dpr: getLoc('uDpr'),
      time: getLoc('uTime'),
      reveal: getLoc('uReveal'),
      scatter: getLoc('uScatter'),
      mouse: getLoc('uMouse'),
      atlas: getLoc('uAtlas'),
      win: getLoc('uWin')
    };

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const attribBuffers = ['aHome', 'aAir', 'aInfo', 'aCell'].map((attrName, idx) => {
      const buf = gl.createBuffer();
      const loc = gl.getAttribLocation(program, attrName);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, [2, 3, 4, 3][idx], gl.FLOAT, false, 0, 0);
      return buf;
    });

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.uniform2f(uniforms.win, TILE_PIXELS / ATLAS_W, TILE_PIXELS / ATLAS_H);

    const rebuildBuffers = () => {
      const anchorRect = anchor.getBoundingClientRect();
      const w = anchorRect.width;
      if (!loadedPortrait || w < 10 || Math.abs(w - cachedWidth) < 1) return;
      cachedWidth = w;

      const canvasRect = canvas.getBoundingClientRect();
      const visibleRatio = Math.max(0, Math.min(1, (canvasRect.bottom - anchorRect.top) / anchorRect.height));
      const pc = generatePointCloud(loadedPortrait, w, visibleRatio);

      totalParticles = pc.count;
      cellPitch = pc.cell;
      maxSettleTime = pc.settle;

      [pc.home, pc.air, pc.info, pc.cellAttr].forEach((dataArray, idx) => {
        gl.bindBuffer(gl.ARRAY_BUFFER, attribBuffers[idx]);
        gl.bufferData(gl.ARRAY_BUFFER, dataArray, gl.STATIC_DRAW);
      });
    };

    const mousePos = { x: -9999, y: -9999, targetX: -9999, targetY: -9999 };
    const onPointerMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mousePos.targetX = e.clientX - r.left;
      mousePos.targetY = e.clientY - r.top;
      if (mousePos.x < -999) {
        mousePos.x = mousePos.targetX;
        mousePos.y = mousePos.targetY;
      }
    };
    const onPointerLeave = () => {
      mousePos.targetX = mousePos.targetY = -9999;
      mousePos.x = mousePos.y = -9999;
    };

    const renderFrame = () => {
      if (!totalParticles || playTimeRef.current === null) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const canvasRect = canvas.getBoundingClientRect();
      const pxWidth = Math.round(canvasRect.width * dpr);
      const pxHeight = Math.round(canvasRect.height * dpr);

      if (canvas.width !== pxWidth || canvas.height !== pxHeight) {
        canvas.width = pxWidth;
        canvas.height = pxHeight;
      }

      rebuildBuffers();

      const anchorRect = anchor.getBoundingClientRect();
      const now = performance.now() / 1000;
      const scrollScatter = reducedMotion
        ? 0
        : Math.min(1, Math.max(0, -canvasRect.top / (canvasRect.height * 0.7)));

      mousePos.x += (mousePos.targetX - mousePos.x) * 0.18;
      mousePos.y += (mousePos.targetY - mousePos.y) * 0.18;

      gl.viewport(0, 0, pxWidth, pxHeight);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(uniforms.res, canvasRect.width, canvasRect.height);
      gl.uniform4f(
        uniforms.rect,
        anchorRect.left - canvasRect.left,
        anchorRect.top - canvasRect.top,
        anchorRect.width,
        anchorRect.height
      );
      gl.uniform1f(uniforms.cell, cellPitch);
      gl.uniform1f(uniforms.dpr, dpr);
      gl.uniform1f(uniforms.time, now - startTime);
      gl.uniform1f(uniforms.reveal, now - playTimeRef.current);
      gl.uniform1f(uniforms.scatter, scrollScatter);
      gl.uniform2f(uniforms.mouse, mousePos.x, mousePos.y);

      gl.drawArrays(gl.POINTS, 0, totalParticles);
    };

    const setTickerState = (active) => {
      if (active !== isTickerActive) {
        isTickerActive = active;
        if (active) {
          gsap.ticker.add(renderFrame);
        } else {
          gsap.ticker.remove(renderFrame);
        }
      }
    };

    const handleVisibilityChange = () => {
      const isVisible = document.visibilityState === 'visible';
      setTickerState(isVisible && isIntersecting && totalParticles > 0);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      const isVisible = document.visibilityState === 'visible';
      setTickerState(isVisible && isIntersecting && totalParticles > 0);
    });
    observer.observe(canvas);

    Promise.all([loadImage(src), Promise.all(thumbs.map(loadImage))])
      .then(([portraitImg, thumbImages]) => {
        if (isDisposed) return;
        loadedPortrait = portraitImg;

        const texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          createAtlasCanvas(thumbImages)
        );
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.uniform1i(uniforms.atlas, 0);

        rebuildBuffers();
        setTickerState(isIntersecting && totalParticles > 0);
      })
      .catch((err) => {
        console.warn('Asset loading error for mosaic, using fallback:', err);
        fallbackToStatic();
      });

    if (hasFinePointer) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.addEventListener('pointerleave', onPointerLeave);
    }

    return () => {
      isDisposed = true;
      setTickerState(false);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      if (hasFinePointer) {
        window.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerleave', onPointerLeave);
      }
      attribBuffers.forEach((buf) => gl.deleteBuffer(buf));
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
    };
  }, [src, thumbs, anchorRef]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      className={`absolute inset-0 w-full h-full pointer-events-none z-10 ${className}`}
    />
  );
}
