import * as THREE from "three";

// ── Shared GLSL shaders ───────────────────────────────────────────────────────

export const GLOBE_VERT = /* glsl */`
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

export const GLOBE_FRAG = /* glsl */`
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

export const ATM_VERT = /* glsl */`
precision highp float;
varying vec3 vWorldNormal;
varying vec3 vWorldPos;

void main() {
  vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
  vWorldPos    = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const ATM_FRAG = /* glsl */`
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

// ── Utility ───────────────────────────────────────────────────────────────────

// ── Precise Canada outline via world-atlas TopoJSON ───────────────────────────

// Module-level cache so multiple globe instances share one fetch
let _canadaRingsPromise: Promise<[number, number][][]> | null = null;

function _decodeCanada(topo: {
  transform: { scale: [number, number]; translate: [number, number] };
  arcs: number[][][];
  objects: { countries: { geometries: { id: string | number; type: string; arcs: number[][][] | number[][] }[] } };
}): [number, number][][] {
  const { scale, translate } = topo.transform;

  // Delta-decode quantized arc coordinates → [lon, lat]
  const arcs: [number, number][][] = topo.arcs.map((arc) => {
    let x = 0, y = 0;
    return arc.map(([dx, dy]) => {
      x += dx; y += dy;
      return [x * scale[0] + translate[0], y * scale[1] + translate[1]] as [number, number];
    });
  });

  // ISO 3166-1 numeric for Canada = 124
  const canada = topo.objects.countries.geometries.find(
    (g) => String(g.id) === "124"
  );
  if (!canada) return [];

  const buildRing = (refs: number[]): [number, number][] => {
    const ring: [number, number][] = [];
    for (const ref of refs) {
      const pts = ref >= 0 ? arcs[ref] : [...arcs[~ref]].reverse();
      ring.push(...pts);
    }
    return ring;
  };

  const rings: [number, number][][] = [];
  if (canada.type === "Polygon") {
    (canada.arcs as number[][]).forEach((refs) => rings.push(buildRing(refs)));
  } else if (canada.type === "MultiPolygon") {
    (canada.arcs as number[][][]).forEach((poly) =>
      poly.forEach((refs) => rings.push(buildRing(refs)))
    );
  }
  return rings;
}

export function getCanadaOutlineRings(): Promise<[number, number][][]> {
  if (!_canadaRingsPromise) {
    _canadaRingsPromise = fetch(
      "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
    )
      .then((r) => r.json())
      .then(_decodeCanada)
      .catch(() => [] as [number, number][][]);
  }
  return _canadaRingsPromise;
}

export function latLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi   = (90 - lat)  * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  );
}
