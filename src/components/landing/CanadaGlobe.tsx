"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { latLonToVec3, getCanadaOutlineRings } from "@/lib/globe-utils";

const CANADA_MARKERS = [
  { name: "Toronto",   lat:  43.65, lon:  -79.38, phase: 0.0 },
  { name: "Vancouver", lat:  49.28, lon: -123.12, phase: 0.7 },
  { name: "Montréal",  lat:  45.50, lon:  -73.57, phase: 1.4 },
];


interface MarkerState {
  ring:    THREE.Mesh;
  ringMat: THREE.MeshBasicMaterial;
  phase:   number;
}

interface GLState {
  renderer:   THREE.WebGLRenderer;
  scene:      THREE.Scene;
  camera:     THREE.PerspectiveCamera;
  globeGroup: THREE.Group;
  markers:    MarkerState[];
  geos:       THREE.BufferGeometry[];
  mats:       THREE.Material[];
  textures:   THREE.Texture[];
  autoRotY:   number;
  rafId:      number;
}

const NASA_BASE = "https://raw.githubusercontent.com/turban/webgl-earth/master/images";

export default function CanadaGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);
  const glRef    = useRef<GLState | null>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let initialized = false;

    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting && !initialized) { initialized = true; init(); } },
      { threshold: 0.05 },
    );
    observer.observe(el);

    function init() {
      if (!mountRef.current) return;

      const reduced  = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.innerWidth < 768;
      const segs     = isMobile ? 32 : 56;
      const W = mountRef.current.clientWidth;
      const H = mountRef.current.clientHeight;

      // ── Scene ───────────────────────────────────────────────────────
      const scene = new THREE.Scene();

      // FOV 45 (vertical), z=2.8 — larger globe with enough top/bottom padding
      const camera = new THREE.PerspectiveCamera(45, W / H, 0.01, 100);
      if (isMobile) {
        camera.position.set(0, 0, 3.0);
      } else {
        camera.position.set(0, 0, 2.8);
      }
      camera.lookAt(0, 0, 0);

      // ── Renderer ─────────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      Object.assign(renderer.domElement.style, {
        position: "absolute", inset: "0", display: "block",
      });
      mountRef.current.appendChild(renderer.domElement);

      const globeGroup = new THREE.Group();
      // Shifted slightly left so left edge bleeds; more to the right than before
      globeGroup.position.x = isMobile ? 0 : -0.2;
      // Tilt northern hemisphere toward viewer to show Canada prominently
      globeGroup.rotation.x = 0.45;
      scene.add(globeGroup);

      // ── Lighting — bright daytime look ──────────────────────────────
      const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
      sunLight.position.set(5, 3, 5);
      scene.add(sunLight);
      // Higher ambient = natural daylight colours, lighter than hero globe
      scene.add(new THREE.AmbientLight(0xffffff, 0.65));

      // ── Textures ─────────────────────────────────────────────────────
      const loader = new THREE.TextureLoader();
      const dayTex  = loader.load(`${NASA_BASE}/2_no_clouds_4k.jpg`);
      const bumpTex = loader.load(`${NASA_BASE}/elev_bump_4k.jpg`);
      const specTex = loader.load(`${NASA_BASE}/water_4k.png`);

      const geos: THREE.BufferGeometry[] = [];
      const mats: THREE.Material[]       = [];
      const textures: THREE.Texture[]    = [dayTex, bumpTex, specTex];

      // ── Globe mesh ───────────────────────────────────────────────────
      const globeGeo = new THREE.SphereGeometry(1, segs, segs);
      const globeMat = new THREE.MeshPhongMaterial({
        map:         dayTex,
        bumpMap:     bumpTex,
        bumpScale:   0.05,
        specularMap: specTex,
        specular:    new THREE.Color(0x333333),
        shininess:   15,
        // No dark tint — pure white lets the daytime texture show naturally
        color:       new THREE.Color(0xffffff),
      });
      globeGroup.add(new THREE.Mesh(globeGeo, globeMat));
      geos.push(globeGeo);
      mats.push(globeMat);

      // ── Precise Canada border lines (async, from world-atlas TopoJSON) ──
      const outlineDisposables: Array<THREE.BufferGeometry | THREE.Material> = [];
      const outlineLines: THREE.Line[] = [];
      getCanadaOutlineRings().then((rings) => {
        if (!glRef.current) return;
        rings.forEach((ring) => {
          if (ring.length < 2) return;
          const pts = ring.map(([lon, lat]) => latLonToVec3(lat, lon, 1.003));
          const geo = new THREE.BufferGeometry().setFromPoints(pts);
          const mat = new THREE.LineBasicMaterial({
            color: 0x0D4A3A, transparent: true, opacity: 0.45, depthWrite: false,
          });
          const line = new THREE.Line(geo, mat);
          glRef.current!.globeGroup.add(line);
          outlineDisposables.push(geo, mat);
          outlineLines.push(line);
        });
      });

      // ── City pulse markers ───────────────────────────────────────────
      const markers: MarkerState[] = [];
      CANADA_MARKERS.forEach((city) => {
        const pos = latLonToVec3(city.lat, city.lon, 1.0);

        const dotGeo = new THREE.CircleGeometry(0.016, 8);
        const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff, depthWrite: false });
        const dot    = new THREE.Mesh(dotGeo, dotMat);
        dot.position.copy(pos);
        dot.lookAt(0, 0, 0);
        dot.translateZ(0.012);
        globeGroup.add(dot);
        geos.push(dotGeo);
        mats.push(dotMat);

        const ringGeo = new THREE.RingGeometry(0.022, 0.040, 16);
        const ringMat = new THREE.MeshBasicMaterial({
          color:       0xffffff,
          transparent: true, opacity: 0,
          side:        THREE.DoubleSide,
          depthWrite:  false,
          blending:    THREE.AdditiveBlending,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(pos);
        ring.lookAt(0, 0, 0);
        ring.translateZ(0.018);
        globeGroup.add(ring);
        geos.push(ringGeo);

        markers.push({ ring, ringMat, phase: city.phase });
      });

      // ── GL state ─────────────────────────────────────────────────────
      const state: GLState = {
        renderer, scene, camera, globeGroup,
        markers, geos, mats, textures,
        autoRotY: 0, rafId: 0,
      };
      glRef.current = state;

      // ── Animation ────────────────────────────────────────────────────
      const clock = new THREE.Clock();
      function frame() {
        state.rafId = requestAnimationFrame(frame);
        if (document.visibilityState === "hidden") return;

        const t = clock.getElapsedTime();

        if (!reduced) state.autoRotY += 0.0003;
        state.globeGroup.rotation.y = state.autoRotY;

        state.markers.forEach((m) => {
          const p = ((t * 0.5 + m.phase) % (Math.PI * 2)) / (Math.PI * 2);
          m.ring.scale.setScalar(1 + p * 1.6);
          m.ringMat.opacity = (1 - p) * 0.75;
        });

        state.renderer.render(state.scene, state.camera);
      }

      state.rafId = requestAnimationFrame(frame);

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

      (el as HTMLElement & { _globeCleanup?: () => void })._globeCleanup = () => {
        cancelAnimationFrame(state.rafId);
        window.removeEventListener("resize", onResize);
        state.geos.forEach((g) => g.dispose());
        state.mats.forEach((m) => m.dispose());
        state.textures.forEach((t) => t.dispose());
        outlineLines.forEach((line) => line.parent?.remove(line));
        outlineDisposables.forEach((d) => d.dispose());
        renderer.dispose();
        renderer.domElement.parentNode?.removeChild(renderer.domElement);
        glRef.current = null;
      };
    }

    return () => {
      observer.disconnect();
      const cleanup = (el as HTMLElement & { _globeCleanup?: () => void })._globeCleanup;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0"
      aria-hidden="true"
    />
  );
}
