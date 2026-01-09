import { useEffect, useRef, useState } from 'react';
import { EffectComposer, RenderPass, EffectPass, BloomEffect, ChromaticAberrationEffect } from 'postprocessing';
import * as THREE from 'three';
import './GridScan.css';

const vert = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const frag = `
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec2 uSkew;
uniform float uTilt;
uniform float uYaw;
uniform float uLineThickness;
uniform vec3 uLinesColor;
uniform vec3 uScanColor;
uniform float uGridScale;
uniform float uLineStyle;
uniform float uLineJitter;
uniform float uScanOpacity;
uniform float uScanDirection;
uniform float uNoise;
uniform float uBloomOpacity;
uniform float uScanGlow;
uniform float uScanSoftness;
uniform float uPhaseTaper;
uniform float uScanDuration;
uniform float uScanDelay;
varying vec2 vUv;

uniform float uScanStarts[8];
uniform float uScanCount;

const int MAX_SCANS = 8;

float smoother01(float a, float b, float x){
  float t = clamp((x - a) / max(1e-5, (b - a)), 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 p = (2.0 * fragCoord - iResolution.xy) / iResolution.y;

    vec3 ro = vec3(0.0);
    vec3 rd = normalize(vec3(p, 2.0));

    float cR = cos(uTilt), sR = sin(uTilt);
    rd.xy = mat2(cR, -sR, sR, cR) * rd.xy;

    float cY = cos(uYaw), sY = sin(uYaw);
    rd.xz = mat2(cY, -sY, sY, cY) * rd.xz;

    vec2 skew = clamp(uSkew, vec2(-0.7), vec2(0.7));
    rd.xy += skew * rd.z;

    vec3 color = vec3(0.0);
  float minT = 1e20;
  float gridScale = max(1e-5, uGridScale);
    float fadeStrength = 2.0;
    vec2 gridUV = vec2(0.0);

  float hitIsY = 1.0;
    for (int i = 0; i < 4; i++)
    {
        float isY = float(i < 2);
        float pos = mix(-0.2, 0.2, float(i)) * isY + mix(-0.5, 0.5, float(i - 2)) * (1.0 - isY);
        float num = pos - (isY * ro.y + (1.0 - isY) * ro.x);
        float den = isY * rd.y + (1.0 - isY) * rd.x;
        float t = num / den;
        vec3 h = ro + rd * t;

        float depthBoost = smoothstep(0.0, 3.0, h.z);
        h.xy += skew * 0.15 * depthBoost;

    bool use = t > 0.0 && t < minT;
    gridUV = use ? mix(h.zy, h.xz, isY) / gridScale : gridUV;
    minT = use ? t : minT;
    hitIsY = use ? isY : hitIsY;
    }

    vec3 hit = ro + rd * minT;
    float dist = length(hit - ro);

  float jitterAmt = clamp(uLineJitter, 0.0, 1.0);
  if (jitterAmt > 0.0) {
    vec2 j = vec2(
      sin(gridUV.y * 2.7 + iTime * 1.8),
      cos(gridUV.x * 2.3 - iTime * 1.6)
    ) * (0.15 * jitterAmt);
    gridUV += j;
  }
  float fx = fract(gridUV.x);
  float fy = fract(gridUV.y);
  float ax = min(fx, 1.0 - fx);
  float ay = min(fy, 1.0 - fy);
  float wx = fwidth(gridUV.x);
  float wy = fwidth(gridUV.y);
  float halfPx = max(0.0, uLineThickness) * 0.5;

  float tx = halfPx * wx;
  float ty = halfPx * wy;

  float aax = wx;
  float aay = wy;

  float lineX = 1.0 - smoothstep(tx, tx + aax, ax);
  float lineY = 1.0 - smoothstep(ty, ty + aay, ay);
  if (uLineStyle > 0.5) {
    float dashRepeat = 4.0;
    float dashDuty = 0.5;
    float vy = fract(gridUV.y * dashRepeat);
    float vx = fract(gridUV.x * dashRepeat);
    float dashMaskY = step(vy, dashDuty);
    float dashMaskX = step(vx, dashDuty);
    if (uLineStyle < 1.5) {
      lineX *= dashMaskY;
      lineY *= dashMaskX;
    } else {
      float dotRepeat = 6.0;
      float dotWidth = 0.18;
      float cy = abs(fract(gridUV.y * dotRepeat) - 0.5);
      float cx = abs(fract(gridUV.x * dotRepeat) - 0.5);
      float dotMaskY = 1.0 - smoothstep(dotWidth, dotWidth + fwidth(gridUV.y * dotRepeat), cy);
      float dotMaskX = 1.0 - smoothstep(dotWidth, dotWidth + fwidth(gridUV.x * dotRepeat), cx);
      lineX *= dotMaskY;
      lineY *= dotMaskX;
    }
  }
  float primaryMask = max(lineX, lineY);

  vec2 gridUV2 = (hitIsY > 0.5 ? hit.xz : hit.zy) / gridScale;
  if (jitterAmt > 0.0) {
    vec2 j2 = vec2(
      cos(gridUV2.y * 2.1 - iTime * 1.4),
      sin(gridUV2.x * 2.5 + iTime * 1.7)
    ) * (0.15 * jitterAmt);
    gridUV2 += j2;
  }
  float fx2 = fract(gridUV2.x);
  float fy2 = fract(gridUV2.y);
  float ax2 = min(fx2, 1.0 - fx2);
  float ay2 = min(fy2, 1.0 - fy2);
  float wx2 = fwidth(gridUV2.x);
  float wy2 = fwidth(gridUV2.y);
  float tx2 = halfPx * wx2;
  float ty2 = halfPx * wy2;
  float aax2 = wx2;
  float aay2 = wy2;
  float lineX2 = 1.0 - smoothstep(tx2, tx2 + aax2, ax2);
  float lineY2 = 1.0 - smoothstep(ty2, ty2 + aay2, ay2);
  if (uLineStyle > 0.5) {
    float dashRepeat2 = 4.0;
    float dashDuty2 = 0.5;
    float vy2m = fract(gridUV2.y * dashRepeat2);
    float vx2m = fract(gridUV2.x * dashRepeat2);
    float dashMaskY2 = step(vy2m, dashDuty2);
    float dashMaskX2 = step(vx2m, dashDuty2);
    if (uLineStyle < 1.5) {
      lineX2 *= dashMaskY2;
      lineY2 *= dashMaskX2;
    } else {
      float dotRepeat2 = 6.0;
      float dotWidth2 = 0.18;
      float cy2 = abs(fract(gridUV2.y * dotRepeat2) - 0.5);
      float cx2 = abs(fract(gridUV2.x * dotRepeat2) - 0.5);
      float dotMaskY2 = 1.0 - smoothstep(dotWidth2, dotWidth2 + fwidth(gridUV2.y * dotRepeat2), cy2);
      float dotMaskX2 = 1.0 - smoothstep(dotWidth2, dotWidth2 + fwidth(gridUV2.x * dotRepeat2), cx2);
      lineX2 *= dotMaskY2;
      lineY2 *= dotMaskX2;
    }
  }
    float altMask = max(lineX2, lineY2);

    float edgeDistX = min(abs(hit.x - (-0.5)), abs(hit.x - 0.5));
    float edgeDistY = min(abs(hit.y - (-0.2)), abs(hit.y - 0.2));
    float edgeDist = mix(edgeDistY, edgeDistX, hitIsY);
    float edgeGate = 1.0 - smoothstep(gridScale * 0.5, gridScale * 2.0, edgeDist);
    altMask *= edgeGate;

  float lineMask = max(primaryMask, altMask);

    float fade = exp(-dist * fadeStrength);

    float dur = max(0.05, uScanDuration);
    float del = max(0.0, uScanDelay);
    float scanZMax = 2.0;
    float widthScale = max(0.1, uScanGlow);
    float sigma = max(0.001, 0.18 * widthScale * uScanSoftness);
    float sigmaA = sigma * 2.0;

    float combinedPulse = 0.0;
    float combinedAura = 0.0;

    float cycle = dur + del;
    float tCycle = mod(iTime, cycle);
    float scanPhase = clamp((tCycle - del) / dur, 0.0, 1.0);
    float phase = scanPhase;
    if (uScanDirection > 0.5 && uScanDirection < 1.5) {
      phase = 1.0 - phase;
    } else if (uScanDirection > 1.5) {
      float t2 = mod(max(0.0, iTime - del), 2.0 * dur);
      phase = (t2 < dur) ? (t2 / dur) : (1.0 - (t2 - dur) / dur);
    }
    float scanZ = phase * scanZMax;
    float dz = abs(hit.z - scanZ);
    float lineBand = exp(-0.5 * (dz * dz) / (sigma * sigma));
    float taper = clamp(uPhaseTaper, 0.0, 0.49);
    float headW = taper;
    float tailW = taper;
    float headFade = smoother01(0.0, headW, phase);
    float tailFade = 1.0 - smoother01(1.0 - tailW, 1.0, phase);
    float phaseWindow = headFade * tailFade;
    float pulseBase = lineBand * phaseWindow;
    combinedPulse += pulseBase * clamp(uScanOpacity, 0.0, 1.0);
    float auraBand = exp(-0.5 * (dz * dz) / (sigmaA * sigmaA));
    combinedAura += (auraBand * 0.25) * phaseWindow * clamp(uScanOpacity, 0.0, 1.0);

    for (int i = 0; i < MAX_SCANS; i++) {
      if (float(i) >= uScanCount) break;
      float tActiveI = iTime - uScanStarts[i];
      float phaseI = clamp(tActiveI / dur, 0.0, 1.0);
      if (uScanDirection > 0.5 && uScanDirection < 1.5) {
        phaseI = 1.0 - phaseI;
      } else if (uScanDirection > 1.5) {
        phaseI = (phaseI < 0.5) ? (phaseI * 2.0) : (1.0 - (phaseI - 0.5) * 2.0);
      }
      float scanZI = phaseI * scanZMax;
      float dzI = abs(hit.z - scanZI);
      float lineBandI = exp(-0.5 * (dzI * dzI) / (sigma * sigma));
      float headFadeI = smoother01(0.0, headW, phaseI);
      float tailFadeI = 1.0 - smoother01(1.0 - tailW, 1.0, phaseI);
      float phaseWindowI = headFadeI * tailFadeI;
      combinedPulse += lineBandI * phaseWindowI * clamp(uScanOpacity, 0.0, 1.0);
      float auraBandI = exp(-0.5 * (dzI * dzI) / (sigmaA * sigmaA));
      combinedAura += (auraBandI * 0.25) * phaseWindowI * clamp(uScanOpacity, 0.0, 1.0);
    }

  float lineVis = lineMask;
  vec3 gridCol = uLinesColor * lineVis * fade;
  vec3 scanCol = uScanColor * combinedPulse;
  vec3 scanAura = uScanColor * combinedAura;

    color = gridCol + scanCol + scanAura;

  float n = fract(sin(dot(gl_FragCoord.xy + vec2(iTime * 123.4), vec2(12.9898,78.233))) * 43758.5453123);
  color += (n - 0.5) * uNoise;
  color = clamp(color, 0.0, 1.0);
  float alpha = clamp(max(lineVis, combinedPulse), 0.0, 1.0);
  float gx = 1.0 - smoothstep(tx * 2.0, tx * 2.0 + aax * 2.0, ax);
  float gy = 1.0 - smoothstep(ty * 2.0, ty * 2.0 + aay * 2.0, ay);
  float halo = max(gx, gy) * fade;
  alpha = max(alpha, halo * clamp(uBloomOpacity, 0.0, 1.0));
  fragColor = vec4(color, alpha);
}

void main(){
  vec4 c;
  mainImage(c, vUv * iResolution.xy);
  gl_FragColor = c;
}
`;

export const GridScanSimple = ({
  lineThickness = 1,
  linesColor = '#392e4e',
  scanColor = '#FF9FFC',
  scanOpacity = 0.4,
  gridScale = 0.1,
  lineStyle = 'solid',
  lineJitter = 0.1,
  scanDirection = 'pingpong',
  enablePost = true,
  bloomIntensity = 0,
  bloomThreshold = 0,
  bloomSmoothing = 0,
  chromaticAberration = 0.002,
  noiseIntensity = 0.01,
  scanGlow = 0.5,
  scanSoftness = 2,
  scanPhaseTaper = 0.9,
  scanDuration = 2.0,
  scanDelay = 2.0,
  scanOnClick = false,
  className,
  style
}) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const composerRef = useRef(null);
  const bloomRef = useRef(null);
  const chromaRef = useRef(null);
  const rafRef = useRef(null);

  const lookTarget = useRef(new THREE.Vector2(0, 0));
  const tiltTarget = useRef(0);
  const yawTarget = useRef(0);

  const lookCurrent = useRef(new THREE.Vector2(0, 0));
  const lookVel = useRef(new THREE.Vector2(0, 0));
  const tiltCurrent = useRef(0);
  const tiltVel = useRef(0);
  const yawCurrent = useRef(0);
  const yawVel = useRef(0);

  const MAX_SCANS = 8;
  const scanStarts = useRef(new Array(MAX_SCANS).fill(-9999));
  const scanCountRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geo = new THREE.PlaneGeometry(2, 2);
    const mat = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      uniforms: {
        iResolution: { value: new THREE.Vector3(width, height, 1) },
        iTime: { value: 0.0 },
        uSkew: { value: new THREE.Vector2(0, 0) },
        uTilt: { value: 0.0 },
        uYaw: { value: 0.0 },
        uLineThickness: { value: lineThickness },
        uLinesColor: { value: srgbColor(linesColor) },
        uScanColor: { value: srgbColor(scanColor) },
        uGridScale: { value: gridScale },
        uLineStyle: { value: lineStyle === 'dashed' ? 1.0 : lineStyle === 'dotted' ? 2.0 : 0.0 },
        uLineJitter: { value: lineJitter },
        uScanOpacity: { value: scanOpacity },
        uScanDirection: { value: scanDirection === 'forward' ? 0.0 : scanDirection === 'backward' ? 1.0 : 2.0 },
        uNoise: { value: noiseIntensity },
        uBloomOpacity: { value: bloomIntensity },
        uScanGlow: { value: scanGlow },
        uScanSoftness: { value: scanSoftness },
        uPhaseTaper: { value: scanPhaseTaper },
        uScanDuration: { value: scanDuration },
        uScanDelay: { value: scanDelay },
        uScanStarts: { value: scanStarts.current },
        uScanCount: { value: scanCountRef.current }
      }
    });
    materialRef.current = mat;

    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    let composer = null;
    let bloom = null;
    let chroma = null;

    if (enablePost) {
      composer = new EffectComposer(renderer);
      composerRef.current = composer;
      composer.addPass(new RenderPass(scene, camera));

      if (bloomIntensity > 0) {
        bloom = new BloomEffect({
          intensity: bloomIntensity,
          luminanceThreshold: bloomThreshold,
          luminanceSmoothing: bloomSmoothing
        });
        bloomRef.current = bloom;
        composer.addPass(new EffectPass(camera, bloom));
      }

      if (chromaticAberration > 0) {
        chroma = new ChromaticAberrationEffect();
        chroma.offset = new THREE.Vector2(chromaticAberration, chromaticAberration);
        chromaRef.current = chroma;
        composer.addPass(new EffectPass(camera, chroma));
      }
    }

    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      mat.uniforms.iTime.value = elapsed;

      const dt = Math.min(0.05, clock.getDelta());

      lookCurrent.current = smoothDampVec2(
        lookCurrent.current,
        lookTarget.current,
        lookVel.current,
        0.15,
        10,
        dt
      );
      tiltCurrent.current = smoothDampFloat(
        tiltCurrent.current,
        tiltTarget.current,
        { val: tiltVel.current },
        0.15,
        10,
        dt
      );
      tiltVel.current = { val: tiltVel.current }.val;

      yawCurrent.current = smoothDampFloat(
        yawCurrent.current,
        yawTarget.current,
        { val: yawVel.current },
        0.15,
        10,
        dt
      );
      yawVel.current = { val: yawVel.current }.val;

      mat.uniforms.uSkew.value.copy(lookCurrent.current);
      mat.uniforms.uTilt.value = tiltCurrent.current;
      mat.uniforms.uYaw.value = yawCurrent.current;

      if (composer) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Mouse tracking para efecto hover
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const w = rect.width;
      const h = rect.height;

      // Normalizar a rango [-1, 1]
      const nx = (x / w) * 2 - 1;
      const ny = -((y / h) * 2 - 1); // Invertir Y

      // Skew basado en posición del mouse (más sutil)
      const skewStrength = 0.25;
      lookTarget.current.set(nx * skewStrength, ny * skewStrength);

      // Tilt y Yaw para efecto 3D
      const tiltStrength = 0.15;
      const yawStrength = 0.2;
      tiltTarget.current = ny * tiltStrength;
      yawTarget.current = nx * yawStrength;
    };

    const handleMouseLeave = () => {
      // Volver a posición neutral
      lookTarget.current.set(0, 0);
      tiltTarget.current = 0;
      yawTarget.current = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      mat.uniforms.iResolution.value.set(w, h, 1);
      if (composer) composer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    if (scanOnClick) {
      const handleClick = () => {
        const idx = scanCountRef.current % MAX_SCANS;
        scanStarts.current[idx] = clock.getElapsedTime();
        scanCountRef.current = Math.min(scanCountRef.current + 1, MAX_SCANS);
        mat.uniforms.uScanCount.value = scanCountRef.current;
      };
      container.addEventListener('click', handleClick);
      return () => {
        cancelAnimationFrame(rafRef.current);
        window.removeEventListener('resize', handleResize);
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('click', handleClick);
        renderer.dispose();
        geo.dispose();
        mat.dispose();
        if (composer) composer.dispose();
      };
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      if (composer) composer.dispose();
    };
  }, [
    lineThickness,
    linesColor,
    scanColor,
    scanOpacity,
    gridScale,
    lineStyle,
    lineJitter,
    scanDirection,
    enablePost,
    bloomIntensity,
    bloomThreshold,
    bloomSmoothing,
    chromaticAberration,
    noiseIntensity,
    scanGlow,
    scanSoftness,
    scanPhaseTaper,
    scanDuration,
    scanDelay,
    scanOnClick
  ]);

  return (
    <div
      ref={containerRef}
      className={`gridscan ${className || ''}`}
      style={{ width: '100%', height: '100%', ...style }}
    />
  );
};

function srgbColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return new THREE.Vector3(r, g, b);
}

function smoothDampVec2(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
  const omega = 2.0 / smoothTime;
  const x = omega * deltaTime;
  const exp = 1.0 / (1.0 + x + 0.48 * x * x + 0.235 * x * x * x);

  let changeX = current.x - target.x;
  let changeY = current.y - target.y;

  const originalToX = target.x;
  const originalToY = target.y;

  const maxChange = maxSpeed * smoothTime;
  const maxChangeSq = maxChange * maxChange;
  const sqDist = changeX * changeX + changeY * changeY;
  if (sqDist > maxChangeSq) {
    const mag = Math.sqrt(sqDist);
    changeX = (changeX / mag) * maxChange;
    changeY = (changeY / mag) * maxChange;
  }

  const targetX = current.x - changeX;
  const targetY = current.y - changeY;

  const tempX = (currentVelocity.x + omega * changeX) * deltaTime;
  const tempY = (currentVelocity.y + omega * changeY) * deltaTime;

  currentVelocity.x = (currentVelocity.x - omega * tempX) * exp;
  currentVelocity.y = (currentVelocity.y - omega * tempY) * exp;

  let outputX = targetX + (changeX + tempX) * exp;
  let outputY = targetY + (changeY + tempY) * exp;

  const origMinusCurrentX = originalToX - current.x;
  const origMinusCurrentY = originalToY - current.y;
  const outMinusOrigX = outputX - originalToX;
  const outMinusOrigY = outputY - originalToY;

  if (origMinusCurrentX * outMinusOrigX + origMinusCurrentY * outMinusOrigY > 0) {
    outputX = originalToX;
    outputY = originalToY;
    currentVelocity.x = (outputX - originalToX) / deltaTime;
    currentVelocity.y = (outputY - originalToY) / deltaTime;
  }

  return new THREE.Vector2(outputX, outputY);
}

function smoothDampFloat(current, target, velRef, smoothTime, maxSpeed, deltaTime) {
  const omega = 2.0 / smoothTime;
  const x = omega * deltaTime;
  const exp = 1.0 / (1.0 + x + 0.48 * x * x + 0.235 * x * x * x);

  let change = current - target;
  const originalTo = target;

  const maxChange = maxSpeed * smoothTime;
  change = Math.max(-maxChange, Math.min(change, maxChange));
  const newTarget = current - change;

  const temp = (velRef.val + omega * change) * deltaTime;
  velRef.val = (velRef.val - omega * temp) * exp;

  let output = newTarget + (change + temp) * exp;

  if ((originalTo - current > 0) === (output > originalTo)) {
    output = originalTo;
    velRef.val = (output - originalTo) / deltaTime;
  }

  return output;
}
