import { useEffect, useRef } from 'react';
import styles from './HeroBackdrop.module.css';

/*
 * Hero backgrounds: slow molten rose gold on the home page (matched to the logo ring),
 * and a still blue-black "dusk" with rose-gold folds on the inner pages.
 * One small WebGL fragment shader (no three.js). The copy side stays darker so text
 * keeps its contrast. Pauses off screen and in background tabs; one still frame for
 * reduced motion; the CSS glow underneath is the fallback without WebGL.
 */

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uPortrait;
// Palette and shape, set per tone
uniform vec3 uBase;   // the dark the surface sits in
uniform vec3 uCool;   // body colour in some folds
uniform vec3 uWarm;   // body colour in others
uniform vec3 uHigh;   // highlights
uniform float uScale; // smaller = broader, calmer folds
uniform float uCalm;  // how much colour survives behind the copy
uniform float uWarmth; // share of the folds in the warm colour

const vec3 SHINE = vec3(1.000, 0.880, 0.780);

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++){ v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

// Height of the molten surface: warped noise, drifting slowly
float surface(vec2 p, float t){
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(4.1, 2.3) - t));
  return fbm(p + 1.6 * q);
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = ((gl_FragCoord.xy - 0.5 * uRes) / uRes.y + uMouse * 0.07) * uScale;
  float t = uTime * 0.05;

  // Light the surface like polished metal
  vec2 e = vec2(0.012, 0.0);
  float hx = surface(p + e.xy, t) - surface(p - e.xy, t);
  float hy = surface(p + e.yx, t) - surface(p - e.yx, t);
  vec3 n = normalize(vec3(-hx, -hy, 0.05));
  vec3 L = normalize(vec3(-0.4, 0.5, 0.75));
  float diff = max(dot(n, L), 0.0);
  float spec = pow(max(dot(reflect(-L, n), vec3(0.0, 0.0, 1.0)), 0.0), 40.0);
  // fbm sits around 0.3-0.7, so shifting the threshold sets how much of the surface is warm
  float edge = 0.7 - 0.4 * uWarmth;
  vec3 body = mix(uCool, uWarm, smoothstep(edge - 0.08, edge + 0.08, fbm(p * 0.6 + 3.0)));
  vec3 col = uBase + body * pow(diff, 2.5) * 0.8 + uHigh * spec * 0.6 + SHINE * pow(spec, 3.0) * 0.35;

  // Keep the copy calm: the left half on wide screens, the lower half on phones
  float calm = mix(smoothstep(0.0, 0.7, uv.x), smoothstep(0.1, 0.8, uv.y), uPortrait);
  col = mix(uBase, col, mix(uCalm, 1.0, calm));

  // A touch of dither so the dark gradients never band
  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * (2.0 / 255.0);
  gl_FragColor = vec4(col, 1.0);
}`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (gl.getShaderParameter(s, gl.COMPILE_STATUS)) return s;
  gl.deleteShader(s);
  return null;
}

const TONES = {
  // Home: molten rose gold, matched to the logo ring
  gold: {
    base: [0.051, 0.051, 0.051],
    cool: [0.4, 0.255, 0.205],
    warm: [0.4, 0.255, 0.205],
    high: [0.87, 0.64, 0.54],
    scale: 1.1,
    calm: 0.25,
    warmth: 1,
  },
  // Inner pages: broad rose-gold folds in a warm dark, with a hint of slate blue
  dusk: {
    base: [0.058, 0.052, 0.058],
    cool: [0.2, 0.25, 0.36],
    warm: [0.66, 0.43, 0.36],
    high: [0.92, 0.7, 0.6],
    scale: 0.55,
    calm: 0.3,
    warmth: 0.8, // share of the folds that are rose gold; the rest are slate blue
  },
};

/**
 * tone: 'gold' (home) or 'dusk' (inner pages).
 * still: draw a single frame and stop; the inner pages keep the focus on their content.
 */
export default function HeroBackdrop({ tone = 'gold', still = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext('webgl', {
      antialias: false,
      depth: false,
      alpha: false,
      // Some capture paths (screenshots, recorders) show a blank canvas without this; cheap at half resolution
      preserveDrawingBuffer: true,
      powerPreference: 'low-power',
    });
    if (!gl) return undefined;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return undefined;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');
    const uPortrait = gl.getUniformLocation(prog, 'uPortrait');

    const t = TONES[tone] ?? TONES.gold;
    gl.uniform3fv(gl.getUniformLocation(prog, 'uBase'), t.base);
    gl.uniform3fv(gl.getUniformLocation(prog, 'uCool'), t.cool);
    gl.uniform3fv(gl.getUniformLocation(prog, 'uWarm'), t.warm);
    gl.uniform3fv(gl.getUniformLocation(prog, 'uHigh'), t.high);
    gl.uniform1f(gl.getUniformLocation(prog, 'uScale'), t.scale);
    gl.uniform1f(gl.getUniformLocation(prog, 'uCalm'), t.calm);
    gl.uniform1f(gl.getUniformLocation(prog, 'uWarmth'), t.warmth);

    const reduce = still || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // The surface is soft, so half resolution looks the same and costs a quarter
    const SCALE = 0.5;
    const start = performance.now();
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const draw = (now) => {
      mouse.x += (mouse.tx - mouse.x) * 0.03;
      mouse.y += (mouse.ty - mouse.y) * 0.03;
      gl.uniform1f(uTime, (now - start) / 1000 + 40);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(box.width * SCALE));
      canvas.height = Math.max(1, Math.round(box.height * SCALE));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uPortrait, box.height > box.width ? 1 : 0);
      draw(performance.now());
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (0.5 - e.clientY / window.innerHeight) * 2;
    };
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (finePointer && !reduce) window.addEventListener('pointermove', onMove, { passive: true });

    let raf = 0;
    let onScreen = true;
    const loop = (now) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (!raf && onScreen && !document.hidden && !reduce) raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    canvas.dataset.ready = 'true';

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) play();
      else pause();
    });
    io.observe(canvas);
    const onVisibility = () => (document.hidden ? pause() : play());
    document.addEventListener('visibilitychange', onVisibility);
    play();

    return () => {
      pause();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onMove);
      // Free the program but keep the context: a canvas reuses its context, so losing it
      // here would leave the canvas blank if the effect runs again (React StrictMode does)
      gl.deleteBuffer(buffer);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [tone, still]);

  return <canvas ref={canvasRef} className={styles.backdrop} aria-hidden="true" />;
}
