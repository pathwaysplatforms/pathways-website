"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer";

// ─── GLSL Shaders ─────────────────────────────────────────────────────────────

const GLOBE_VERT = /* glsl */`
precision highp float;

uniform float uTime;
uniform float uPulse;

varying float vElevation;
varying vec3  vNormal;

float hash(float n) { return fract(sin(n) * 43758.5453); }
float noise3(vec3 x) {
  vec3 i = floor(x), f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  float n = i.x + i.y * 57.0 + 113.0 * i.z;
  return mix(
    mix(mix(hash(n),       hash(n+1.0),   f.x), mix(hash(n+57.0),  hash(n+58.0),  f.x), f.y),
    mix(mix(hash(n+113.0), hash(n+114.0), f.x), mix(hash(n+170.0), hash(n+171.0), f.x), f.y),
    f.z);
}
float fbm(vec3 p) {
  return 0.500 * noise3(p)
       + 0.250 * noise3(p * 2.1)
       + 0.125 * noise3(p * 4.2);
}

void main() {
  float n    = fbm(position * 2.5 + uTime * 0.04);
  float disp = (n - 0.5) * 0.06 * uPulse;
  vElevation = disp;
  vNormal    = normal;

  vec3 sPos = position + normal * disp;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(sPos, 1.0);
}
`;

const GLOBE_FRAG = /* glsl */`
precision highp float;

uniform vec3  uColorLow;
uniform vec3  uColorMid;
uniform vec3  uColorHigh;

varying float vElevation;
varying vec3  vNormal;

void main() {
  float e   = clamp(vElevation * 14.0 + 0.5, 0.0, 1.0);
  vec3  col = e < 0.5
    ? mix(uColorLow,  uColorMid,  e * 2.0)
    : mix(uColorMid,  uColorHigh, (e - 0.5) * 2.0);

  vec3  L    = normalize(vec3(1.5, 2.0, 1.5));
  float diff = max(dot(normalize(vNormal), L), 0.0) * 0.55 + 0.45;
  col *= diff;
  gl_FragColor = vec4(col, 1.0);
}
`;

const ATM_VERT = /* glsl */`
precision highp float;
varying vec3 vWorldNormal;
varying vec3 vWorldPos;

void main() {
  vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
  vWorldPos    = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const ATM_FRAG = /* glsl */`
precision highp float;
uniform vec3  uColor;
uniform float uIntensity;

varying vec3 vWorldNormal;
varying vec3 vWorldPos;

void main() {
  vec3  V       = normalize(cameraPosition - vWorldPos);
  float fresnel = pow(1.0 - abs(dot(vWorldNormal, V)), 2.5);
  gl_FragColor  = vec4(uColor, fresnel * uIntensity);
}
`;

// ─── Constants ────────────────────────────────────────────────────────────────

interface City {
  name: string;
  lat:  number;
  lon:  number;
}

const CITIES: City[] = [
  { name: "Toronto",     lat:  43.65, lon:  -79.38 },
  { name: "Vancouver",   lat:  49.28, lon: -123.12 },
  { name: "Montréal",    lat:  45.50, lon:  -73.57 },
  { name: "London",      lat:  51.51, lon:   -0.13 },
  { name: "Dubai",       lat:  25.20, lon:   55.27 },
  { name: "Mumbai",      lat:  19.08, lon:   72.88 },
  { name: "Manila",      lat:  14.60, lon:  120.98 },
  { name: "Lagos",       lat:   6.52, lon:    3.38 },
  { name: "São Paulo",   lat: -23.55, lon:  -46.63 },
  { name: "Sydney",      lat: -33.87, lon:  151.21 },
  { name: "Calgary",     lat:  51.04, lon: -114.07 },
  { name: "Ottawa",      lat:  45.42, lon:  -75.69 },
  { name: "Edmonton",    lat:  53.55, lon: -113.49 },
  { name: "Québec City", lat:  46.81, lon:  -71.21 },
  { name: "Halifax",     lat:  44.65, lon:  -63.57 },
];

const RING_DEFS = [
  { dist: 1.16, rotX: 0.30, rotZ: 0.00, speed:  0.00028, noiseAmp: 0.10, opacity: 0.18 },
  { dist: 1.21, rotX: 0.85, rotZ: 0.50, speed: -0.00042, noiseAmp: 0.08, opacity: 0.15 },
  { dist: 1.26, rotX: 1.25, rotZ: 1.05, speed:  0.00020, noiseAmp: 0.12, opacity: 0.20 },
  { dist: 1.31, rotX: 0.55, rotZ: 1.55, speed: -0.00035, noiseAmp: 0.09, opacity: 0.14 },
  { dist: 1.36, rotX: 1.50, rotZ: 0.80, speed:  0.00050, noiseAmp: 0.07, opacity: 0.17 },
  { dist: 1.40, rotX: 0.20, rotZ: 1.20, speed: -0.00022, noiseAmp: 0.11, opacity: 0.13 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function latLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi   = (90 - lat)  * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  );
}

function makeOrganicRing(scale: number, noiseAmp: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const N = 90;
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * Math.PI * 2;
    const r = scale * (
      1
      + Math.sin(t * 3 + 0.5)  * noiseAmp
      + Math.cos(t * 5 + 1.2)  * noiseAmp * 0.45
      + Math.sin(t * 7 + 2.1)  * noiseAmp * 0.20
    );
    pts.push(new THREE.Vector3(Math.cos(t) * r, Math.sin(t) * r, 0));
  }
  return pts;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface RingState {
  group: THREE.Group;
  mat:   THREE.LineBasicMaterial;
  speed: number;
}

interface MarkerState {
  dot:     THREE.Mesh;
  ring:    THREE.Mesh;
  ringMat: THREE.MeshBasicMaterial;
  label:   CSS2DObject;
  labelEl: HTMLElement;
  phase:   number;
}

interface GLState {
  renderer:      THREE.WebGLRenderer;
  labelRenderer: CSS2DRenderer;
  scene:         THREE.Scene;
  camera:        THREE.PerspectiveCamera;
  clock:         THREE.Clock;
  globeGroup:    THREE.Group;
  globeMat:      THREE.ShaderMaterial;
  atmMat:        THREE.ShaderMaterial;
  rings:         RingState[];
  markers:       MarkerState[];
  autoRotY:      number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export interface HeroGlobeProps {
  scrollProgress: number;
}

export default function HeroGlobe({ scrollProgress }: HeroGlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const spRef    = useRef(0);
  const rafRef   = useRef<number>(0);
  const glRef    = useRef<GLState | null>(null);

  useEffect(() => { spRef.current = scrollProgress; }, [scrollProgress]);

  useEffect(() => {
    if (!mountRef.current) return;

    const reduced  = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const segs     = isMobile ? 32 : 64;
    const W        = mountRef.current.clientWidth;
    const H        = mountRef.current.clientHeight;

    // ── Scene ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060e0a);

    // ── Camera ───────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.01, 100);
    camera.position.set(isMobile ? 0 : -0.45, 0, 2.8);
    camera.lookAt(0, 0, 0);

    // ── Renderers ────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    Object.assign(renderer.domElement.style, { position: "absolute", inset: "0", display: "block" });
    mountRef.current.appendChild(renderer.domElement);

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(W, H);
    Object.assign(labelRenderer.domElement.style, {
      position: "absolute", top: "0", left: "0",
      pointerEvents: "none", overflow: "hidden",
    });
    mountRef.current.appendChild(labelRenderer.domElement);

    // ── Globe group ──────────────────────────────────────────────────
    const globeGroup = new THREE.Group();
    if (!isMobile) globeGroup.position.x = 0.45;
    scene.add(globeGroup);

    // ── Globe mesh ───────────────────────────────────────────────────
    const globeGeo = new THREE.SphereGeometry(1, segs, segs);
    const globeMat = new THREE.ShaderMaterial({
      vertexShader:   GLOBE_VERT,
      fragmentShader: GLOBE_FRAG,
      uniforms: {
        uTime:      { value: 0 },
        uPulse:     { value: 1 },
        uColorLow:  { value: new THREE.Color(0x0d4a3a) },
        uColorMid:  { value: new THREE.Color(0x1c3d32) },
        uColorHigh: { value: new THREE.Color(0x2a5c4e) },
      },
    });
    globeGroup.add(new THREE.Mesh(globeGeo, globeMat));

    // ── Atmosphere (fresnel glow) ────────────────────────────────────
    const atmGeo = new THREE.SphereGeometry(1.15, 32, 32);
    const atmMat = new THREE.ShaderMaterial({
      vertexShader:   ATM_VERT,
      fragmentShader: ATM_FRAG,
      uniforms: {
        uColor:     { value: new THREE.Color(0x0d4a3a) },
        uIntensity: { value: 0.9 },
      },
      transparent: true,
      blending:    THREE.AdditiveBlending,
      depthWrite:  false,
      side:        THREE.BackSide,
    });
    globeGroup.add(new THREE.Mesh(atmGeo, atmMat));

    // ── Floating organic rings (desktop only) ────────────────────────
    const rings: RingState[] = [];
    if (!isMobile) {
      RING_DEFS.forEach((def) => {
        const pts  = makeOrganicRing(def.dist, def.noiseAmp);
        const geo  = new THREE.BufferGeometry().setFromPoints(pts);
        const mat  = new THREE.LineBasicMaterial({
          color: 0x2a5c4e, transparent: true, opacity: def.opacity, depthWrite: false,
        });
        const line  = new THREE.Line(geo, mat);
        const group = new THREE.Group();
        group.rotation.x = def.rotX;
        group.rotation.z = def.rotZ;
        group.add(line);
        scene.add(group);
        rings.push({ group, mat, speed: def.speed });
      });
    }

    // ── City markers ─────────────────────────────────────────────────
    const markers: MarkerState[] = [];
    CITIES.forEach((city, idx) => {
      const pos = latLonToVec3(city.lat, city.lon, 1.0);

      const dotGeo = new THREE.CircleGeometry(0.016, 8);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xe8f0ee, depthWrite: false });
      const dot    = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      dot.lookAt(0, 0, 0);
      dot.translateZ(0.015);
      globeGroup.add(dot);

      const ringGeo = new THREE.RingGeometry(0.020, 0.036, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x2a5c4e, transparent: true, opacity: 0,
        side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(0, 0, 0);
      ring.translateZ(0.020);
      globeGroup.add(ring);

      const el = document.createElement("div");
      el.textContent = city.name;
      el.style.cssText = [
        "font-family:Inter,system-ui,sans-serif",
        "font-size:11px",
        "color:rgba(255,255,255,0.6)",
        "white-space:nowrap",
        "pointer-events:none",
        "letter-spacing:0.04em",
        "user-select:none",
        "text-shadow:0 1px 4px rgba(0,0,0,0.8)",
        "padding-left:9px",
        "opacity:0",
      ].join(";");
      el.dataset.idx = String(idx);
      const label = new CSS2DObject(el);
      label.position.copy(pos.clone().multiplyScalar(1.1));
      globeGroup.add(label);

      markers.push({ dot, ring, ringMat, label, labelEl: el, phase: idx * 0.38 });
    });

    // ── Store GL state ────────────────────────────────────────────────
    glRef.current = {
      renderer, labelRenderer, scene, camera,
      clock: new THREE.Clock(),
      globeGroup, globeMat, atmMat,
      rings, markers,
      autoRotY: 0,
    };

    // ── Animation loop ────────────────────────────────────────────────
    function frame() {
      rafRef.current = requestAnimationFrame(frame);
      if (document.visibilityState === "hidden") return;

      const gl      = glRef.current!;
      const sp      = spRef.current;
      const t       = gl.clock.getElapsedTime();
      const easedSP = easeInOutCubic(sp);

      // Globe surface noise pulse
      const pulse = reduced ? 1 : 0.7 + 0.3 * Math.sin((t / 8) * Math.PI * 2);
      gl.globeMat.uniforms.uTime.value  = reduced ? 0 : t;
      gl.globeMat.uniforms.uPulse.value = pulse;

      // zoomSP: starts at 50% speed immediately (no dead zone) and
      // accelerates to 1.5× by the end — responsive from first scroll tick,
      // still builds momentum. easedSP (cubic in-out) keeps tilt + pan smooth.
      const zoomSP = sp * (0.5 + sp * 0.5);

      // Y-rotation slows to a stop (linear with scroll feels most natural)
      if (!reduced) gl.autoRotY += 0.0008 * (1 - sp);
      gl.globeGroup.rotation.y = gl.autoRotY;

      // X-tilt: 0 → 0.25 rad
      gl.globeGroup.rotation.x = easedSP * 0.25;

      // Camera: X stays offset left (globe stays on right half); Z driven by
      // zoomSP for the accelerating feel; small Y lift follows the tilt.
      camera.position.set(
        isMobile ? 0 : -0.45,
        zoomSP * 0.15,                  // 0 → 0.15 upward
        2.8 - zoomSP * 1.8,            // Z: 2.8 → 1.0
      );

      // Look-at pans left+up on the smooth curve so the target location
      // arrives at screen center as the zoom accelerates into it.
      camera.lookAt(
        isMobile ? 0 : -0.15 * easedSP, // 0 → -0.15 (globe's left face)
        0.3 * easedSP,                   // 0 → 0.30  (northern hemisphere)
        0,
      );

      // Rings: fade out over sp 0.0 → 0.3
      const ringFade = 1 - Math.min(1, sp / 0.3);
      gl.rings.forEach((r, ri) => {
        if (!reduced) r.group.rotation.y += r.speed;
        r.mat.opacity = ringFade * RING_DEFS[ri].opacity;
      });

      // Atmosphere intensity constant
      gl.atmMat.uniforms.uIntensity.value = 0.9;

      // City marker pulse rings + label flutter
      gl.markers.forEach((m, mi) => {
        const pulse2 = ((t * 0.55 + m.phase) % (Math.PI * 2)) / (Math.PI * 2);
        m.ring.scale.setScalar(1 + pulse2 * 1.5);
        m.ringMat.opacity = (1 - pulse2) * 0.8;
        const flutter = reduced
          ? 0.6
          : 0.42 + 0.28 * Math.sin(t * 0.4 + mi * 1.3);
        m.labelEl.style.opacity = String(Math.max(0, flutter));
      });

      gl.renderer.render(gl.scene, gl.camera);
      gl.labelRenderer.render(gl.scene, gl.camera);
    }

    rafRef.current = requestAnimationFrame(frame);

    // ── Resize ────────────────────────────────────────────────────────
    function onResize() {
      if (!mountRef.current || !glRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      glRef.current.camera.aspect = w / h;
      glRef.current.camera.updateProjectionMatrix();
      glRef.current.renderer.setSize(w, h);
      glRef.current.labelRenderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    // ── Cleanup ───────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);

      globeGeo.dispose();
      globeMat.dispose();
      atmGeo.dispose();
      atmMat.dispose();

      rings.forEach((r) => {
        r.group.children.forEach((c) => {
          (c as THREE.Line).geometry.dispose();
          r.mat.dispose();
        });
      });

      markers.forEach((m) => {
        m.dot.geometry.dispose();
        (m.dot.material as THREE.Material).dispose();
        m.ring.geometry.dispose();
        m.ringMat.dispose();
      });

      renderer.dispose();
      renderer.domElement.parentNode?.removeChild(renderer.domElement);
      labelRenderer.domElement.parentNode?.removeChild(labelRenderer.domElement);
      glRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={mountRef}
      className="absolute inset-0"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    />
  );
}
