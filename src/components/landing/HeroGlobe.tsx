"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// ─── Constants ────────────────────────────────────────────────────────────────

interface City {
  name:      string;
  lat:       number;
  lon:       number;
  canadian?: boolean;
}

const CITIES: City[] = [
  { name: "Toronto",     lat:  43.65, lon:  -79.38, canadian: true },
  { name: "Vancouver",   lat:  49.28, lon: -123.12, canadian: true },
  { name: "Montréal",    lat:  45.50, lon:  -73.57, canadian: true },
  { name: "Calgary",     lat:  51.04, lon: -114.07, canadian: true },
  { name: "Ottawa",      lat:  45.42, lon:  -75.69, canadian: true },
  { name: "Edmonton",    lat:  53.55, lon: -113.49, canadian: true },
  { name: "Québec City", lat:  46.81, lon:  -71.21, canadian: true },
  { name: "Halifax",     lat:  44.65, lon:  -63.57, canadian: true },
  { name: "London",      lat:  51.51, lon:   -0.13 },
  { name: "Dubai",       lat:  25.20, lon:   55.27 },
  { name: "Mumbai",      lat:  19.08, lon:   72.88 },
  { name: "Manila",      lat:  14.60, lon:  120.98 },
  { name: "Lagos",       lat:   6.52, lon:    3.38 },
  { name: "São Paulo",   lat: -23.55, lon:  -46.63 },
  { name: "Sydney",      lat: -33.87, lon:  151.21 },
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
  dot:        THREE.Mesh;
  ring:       THREE.Mesh;
  ringMat:    THREE.MeshBasicMaterial;
  phase:      number;
  isCanadian: boolean;
}

interface GLState {
  renderer:   THREE.WebGLRenderer;
  scene:      THREE.Scene;
  camera:     THREE.PerspectiveCamera;
  clock:      THREE.Clock;
  globeGroup: THREE.Group;
  rings:      RingState[];
  markers:    MarkerState[];
  autoRotY:   number;
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
    camera.position.set(isMobile ? 0 : -0.3, 0, 2.8);
    camera.lookAt(0, 0, 0);

    // ── Renderer ─────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    Object.assign(renderer.domElement.style, { position: "absolute", inset: "0", display: "block" });
    mountRef.current.appendChild(renderer.domElement);

    // ── Globe group ──────────────────────────────────────────────────
    const globeGroup = new THREE.Group();
    if (!isMobile) globeGroup.position.x = 0.85;
    // R=0.3 puts lon≈-107° (central-western Canada) front-and-centre
    globeGroup.rotation.y = 0.3;
    scene.add(globeGroup);

    // ── Glow halo behind the globe (desktop only) ─────────────────────
    // A sprite always faces the camera, giving a clean radial glow.
    let glowTex: THREE.CanvasTexture | null = null;
    let glowMat: THREE.SpriteMaterial   | null = null;
    if (!isMobile) {
      const gc2  = document.createElement("canvas");
      gc2.width  = gc2.height = 256;
      const gctx = gc2.getContext("2d")!;
      const gr   = gctx.createRadialGradient(128, 128, 8, 128, 128, 128);
      gr.addColorStop(0.0, "rgba(255, 255, 255, 0.32)");
      gr.addColorStop(0.35, "rgba(220, 240, 235, 0.12)");
      gr.addColorStop(1.0, "rgba(0, 0, 0, 0)");
      gctx.fillStyle = gr;
      gctx.fillRect(0, 0, 256, 256);
      glowTex = new THREE.CanvasTexture(gc2);
      glowMat = new THREE.SpriteMaterial({
        map:         glowTex,
        blending:    THREE.AdditiveBlending,
        transparent: true,
        depthWrite:  false,
      });
      const glowSprite = new THREE.Sprite(glowMat);
      glowSprite.scale.setScalar(5.0);
      glowSprite.position.set(0.85, 0, 0); // world position matches globeGroup
      scene.add(glowSprite);
    }

    // ── Load NASA textures ────────────────────────────────────────────
    const loader  = new THREE.TextureLoader();
    const dayTex  = loader.load("https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg");
    const bumpTex = loader.load("https://raw.githubusercontent.com/turban/webgl-earth/master/images/elev_bump_4k.jpg");
    const specTex = loader.load("https://raw.githubusercontent.com/turban/webgl-earth/master/images/water_4k.png");

    // ── Globe mesh ────────────────────────────────────────────────────
    const globeGeo = new THREE.SphereGeometry(1, segs, segs);
    const globeMat = new THREE.MeshPhongMaterial({
      map:         dayTex,
      bumpMap:     bumpTex,
      bumpScale:   0.05,
      specularMap: specTex,
      specular:    new THREE.Color(0x333333),
      shininess:   15,
      color:       new THREE.Color(0x1a3a2a),
    });
    globeGroup.add(new THREE.Mesh(globeGeo, globeMat));

    // ── Lighting ─────────────────────────────────────────────────────
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.15));
    const fillLight = new THREE.PointLight(0x1a3a2a, 0.1);
    fillLight.position.set(-10, -5, -5);
    scene.add(fillLight);

    // ── Floating organic rings (desktop only) ─────────────────────────
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
      const pos        = latLonToVec3(city.lat, city.lon, 1.0);
      const isCanadian = city.canadian === true;

      const dotGeo = new THREE.CircleGeometry(0.016, 8);
      const dotMat = new THREE.MeshBasicMaterial({
        color:       0xffffff,
        transparent: true,
        opacity:     isCanadian ? 1.0 : 0.3,
        depthWrite:  false,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      dot.lookAt(0, 0, 0);
      dot.translateZ(0.015);
      globeGroup.add(dot);

      const ringGeo = new THREE.RingGeometry(0.020, 0.036, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color:       isCanadian ? 0xffffff : 0x888888,
        transparent: true,
        opacity:     0,
        side:        THREE.DoubleSide,
        depthWrite:  false,
        blending:    THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(0, 0, 0);
      ring.translateZ(0.020);
      globeGroup.add(ring);

      markers.push({ dot, ring, ringMat, phase: idx * 0.38, isCanadian });
    });

    // ── Store GL state ────────────────────────────────────────────────
    glRef.current = {
      renderer, scene, camera,
      clock: new THREE.Clock(),
      globeGroup,
      rings, markers,
      autoRotY: 0.3,
    };

    // ── Animation loop ────────────────────────────────────────────────
    function frame() {
      rafRef.current = requestAnimationFrame(frame);
      if (document.visibilityState === "hidden") return;

      const gl      = glRef.current!;
      const sp      = spRef.current;
      const t       = gl.clock.getElapsedTime();
      const easedSP = easeInOutCubic(sp);
      const zoomSP  = sp * (0.5 + sp * 0.5);

      if (!reduced) gl.autoRotY += 0.00025 * (1 - sp);
      gl.globeGroup.rotation.y = gl.autoRotY;
      gl.globeGroup.rotation.x = 0.45 + easedSP * 0.25;

      camera.position.set(
        isMobile ? 0 : -0.3,
        zoomSP * 0.15,
        2.8 - zoomSP * 1.8,
      );
      camera.lookAt(
        isMobile ? 0 : -0.15 * easedSP,
        0.3 * easedSP,
        0,
      );

      const ringFade = 1 - Math.min(1, sp / 0.3);
      gl.rings.forEach((r, ri) => {
        if (!reduced) r.group.rotation.y += r.speed;
        r.mat.opacity = ringFade * RING_DEFS[ri].opacity;
      });

      gl.markers.forEach((m) => {
        const p2             = ((t * 0.55 + m.phase) % (Math.PI * 2)) / (Math.PI * 2);
        const maxRingOpacity = m.isCanadian ? 0.8 : 0.24;
        m.ring.scale.setScalar(1 + p2 * 1.5);
        m.ringMat.opacity = (1 - p2) * maxRingOpacity;
      });

      gl.renderer.render(gl.scene, gl.camera);
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
    }
    window.addEventListener("resize", onResize);

    // ── Cleanup ───────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);

      globeGeo.dispose();
      globeMat.dispose();
      glowTex?.dispose();
      glowMat?.dispose();
      [dayTex, bumpTex, specTex].forEach((tx) => tx.dispose());

      rings.forEach((r) => {
        r.group.children.forEach((c) => (c as THREE.Line).geometry.dispose());
        r.mat.dispose();
      });

      markers.forEach((m) => {
        m.dot.geometry.dispose();
        (m.dot.material as THREE.Material).dispose();
        m.ring.geometry.dispose();
        m.ringMat.dispose();
      });

      renderer.dispose();
      renderer.domElement.parentNode?.removeChild(renderer.domElement);
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
