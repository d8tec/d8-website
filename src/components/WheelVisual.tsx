"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Animation ────────────────────────────────────────────────────────────────
const DRAG_SCALE   = 0.008;
const SCROLL_SCALE = 0.0028; // rad per scroll pixel
const DAMPING      = 0.92;
const VEL_SMOOTH   = 0.25;
const IDLE_Y_AMP   = 0.15;   // ±8.6° oscillation on Y
const IDLE_Y_FREQ  = 0.35;
const IDLE_X_BASE  = -0.18;
const IDLE_X_AMP   = 0.04;

// ─── Pre-allocated (never re-created in the animation loop) ───────────────────
const _qY      = new THREE.Quaternion();
const _qX      = new THREE.Quaternion();
const _qScroll = new THREE.Quaternion();
const _qIdle   = new THREE.Quaternion();
const _euler   = new THREE.Euler();
const _aY      = new THREE.Vector3(0, 1, 0);
const _aX      = new THREE.Vector3(1, 0, 0);

// ─── Geometry constants ───────────────────────────────────────────────────────
// All values in Three.js units where 1.0 ≈ outer rim radius
const G = {
  // Rim barrel
  rimR:        0.94,
  rimTube:     0.082,
  // Tire bead seat ridge (inner ledge of rim)
  beadR:       0.887,
  beadTube:    0.013,
  // Disc boundary (spoke tip radius)
  discR:       0.86,
  // Y-spoke geometry
  forkR:       0.575,   // radius where trunk forks into two arms
  forkAngle:   0.30,    // half-angle of fork (rad ~17°)
  trunkW:      0.108,   // trunk bar width (tangential)
  trunkD:      0.082,   // trunk bar depth (axial)
  armW:        0.072,   // fork arm width
  armD:        0.065,   // fork arm depth
  // Carrier ring (visible multi-piece seam at fork radius)
  carrierTube: 0.020,
  // Hub assembly
  hubR:        0.245,
  hubDepth:    0.22,
  hubZ:        0.14,    // hub boss center Z
  flangeR:     0.455,   // hub flange outer radius (contains bolt circle)
  flangeH:     0.022,   // hub flange thickness
  // Hex bolt sockets (6-sided) on hub flange face
  boltR:       0.058,
  boltCircR:   0.375,
  boltH:       0.028,
  // Axle bore
  axleR:       0.080,
  axleDepth:   0.42,
};

const N_SPOKES = 5;
const N_BOLTS  = 5;

// ─── Helper: geometry segment between two 2D points ──────────────────────────
function seg(x1: number, y1: number, x2: number, y2: number) {
  return {
    cx:    (x1 + x2) / 2,
    cy:    (y1 + y2) / 2,
    len:   Math.hypot(x2 - x1, y2 - y1),
    angle: Math.atan2(y2 - y1, x2 - x1),
  };
}

// ─── Scene (runs inside Canvas) ───────────────────────────────────────────────
function WheelScene() {
  const groupRef = useRef<THREE.Group>(null);
  // Initial pose: slight X tilt reveals hub depth on first render
  const quat     = useRef(new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.18, 0, 0)));
  const vel      = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const elapsed  = useRef(0);

  const { gl } = useThree();

  // ── Pointer / drag controls ────────────────────────────────────────────────
  useEffect(() => {
    const el = gl.domElement;
    el.style.cursor = "grab";

    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const rx = e.movementY * DRAG_SCALE;
      const ry = e.movementX * DRAG_SCALE;
      _qY.setFromAxisAngle(_aY, ry);
      _qX.setFromAxisAngle(_aX, rx);
      quat.current.premultiply(_qY).premultiply(_qX);
      vel.current.x = vel.current.x * (1 - VEL_SMOOTH) + rx * VEL_SMOOTH;
      vel.current.y = vel.current.y * (1 - VEL_SMOOTH) + ry * VEL_SMOOTH;
    };
    const onUp = (e: PointerEvent) => {
      dragging.current = false;
      try { el.releasePointerCapture(e.pointerId); } catch { /* noop */ }
      el.style.cursor = "grab";
    };

    el.addEventListener("pointerdown",   onDown);
    el.addEventListener("pointermove",   onMove);
    el.addEventListener("pointerup",     onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown",   onDown);
      el.removeEventListener("pointermove",   onMove);
      el.removeEventListener("pointerup",     onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [gl]);

  // ── Scroll: rolls wheel forward/back, additive on top of drag ─────────────
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const rx = e.deltaY * SCROLL_SCALE;
      _qScroll.setFromAxisAngle(_aX, rx);
      quat.current.premultiply(_qScroll);
      // Seed inertia so it decelerates naturally after scroll stops
      vel.current.x = vel.current.x * 0.5 + rx * 0.5;
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // ── Animation loop ─────────────────────────────────────────────────────────
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    elapsed.current += delta;

    if (!dragging.current) {
      const speed = Math.hypot(vel.current.x, vel.current.y);

      if (speed > 4e-4) {
        // Inertia — apply velocity and decay per frame (normalized to 60fps)
        _qY.setFromAxisAngle(_aY, vel.current.y);
        _qX.setFromAxisAngle(_aX, vel.current.x);
        quat.current.premultiply(_qY).premultiply(_qX);
        const d = Math.pow(DAMPING, delta * 60);
        vel.current.x *= d;
        vel.current.y *= d;
      } else {
        // Idle — slerp toward gentle sine oscillation target
        vel.current.x = 0;
        vel.current.y = 0;
        const t = elapsed.current;
        _euler.set(
          IDLE_X_BASE + Math.cos(t * IDLE_Y_FREQ * 0.63) * IDLE_X_AMP,
          Math.sin(t * IDLE_Y_FREQ) * IDLE_Y_AMP,
          0,
        );
        _qIdle.setFromEuler(_euler);
        quat.current.slerp(_qIdle, Math.min(delta * 1.5, 1));
      }
    }

    groupRef.current.quaternion.copy(quat.current);
  });

  return (
    <>
      {/* Ambient fill — base tone so nothing is pure black */}
      <ambientLight color="#aa55dd" intensity={0.55} />
      {/* Key light — upper-left-front, bright cool-white; creates primary highlights */}
      <directionalLight position={[-3, 5, 4]} color="#f0e8ff" intensity={6.5} />
      {/* Fill — right side, softer purple; lifts shadow face */}
      <directionalLight position={[4, 0, 3]}  color="#cc99ff" intensity={2.4} />
      {/* Low fill — prevents bottom from going flat */}
      <directionalLight position={[0, -3, 3]} color="#ffffff" intensity={0.60} />
      {/* Camera-axis fill — ensures hub face and other Z-forward surfaces are always readable */}
      <directionalLight position={[0, 0.5, 8]} color="#ffffff" intensity={0.45} />
      {/* Rim light — purple from behind; edge separation on backface */}
      <pointLight position={[0, 0, -6]} color="#8833ee" intensity={5.5} />

      <group ref={groupRef}>
        <WheelMesh />
      </group>
    </>
  );
}

// ─── 3D wheel geometry ────────────────────────────────────────────────────────
function WheelMesh() {
  // Materials — created once, disposed on unmount
  const mMain = useMemo(() =>
    new THREE.MeshStandardMaterial({
      color: "#2e0b62", metalness: 0.60, roughness: 0.24,
      emissive: "#0c0022", emissiveIntensity: 0.10,
    }), []);
  const mRim = useMemo(() =>
    new THREE.MeshStandardMaterial({
      color: "#3d1072", metalness: 0.76, roughness: 0.12,
      emissive: "#070016", emissiveIntensity: 0.06,
    }), []);
  const mHub = useMemo(() =>
    new THREE.MeshStandardMaterial({
      color: "#4a1898", metalness: 0.80, roughness: 0.10,
      emissive: "#0e0028", emissiveIntensity: 0.14,
    }), []);
  const mBack = useMemo(() =>
    new THREE.MeshStandardMaterial({ color: "#0b0222", metalness: 0.38, roughness: 0.68 }), []);
  const mHole = useMemo(() =>
    new THREE.MeshStandardMaterial({ color: "#02000c", metalness: 0.32, roughness: 0.72 }), []);

  useEffect(() => () => {
    mMain.dispose(); mRim.dispose(); mHub.dispose(); mBack.dispose(); mHole.dispose();
  }, [mMain, mRim, mHub, mBack, mHole]);

  // Derived Z positions
  const hubFront  = G.hubZ + G.hubDepth / 2;           // 0.25 — front face of hub cylinder
  const flangeTop = hubFront + G.flangeH;               // 0.272 — front face of flange
  const boltZ     = flangeTop - G.boltH / 2;           // bolt socket center (recessed from flange face)

  // Y-spoke geometry — 5 spokes each with trunk + two forked arms
  const spokes = useMemo(() =>
    Array.from({ length: N_SPOKES }, (_, i) => {
      const a  = (i * Math.PI * 2) / N_SPOKES;
      const hx = Math.cos(a) * G.hubR;
      const hy = Math.sin(a) * G.hubR;
      const fx = Math.cos(a) * G.forkR;
      const fy = Math.sin(a) * G.forkR;
      const lx = Math.cos(a + G.forkAngle) * G.discR;
      const ly = Math.sin(a + G.forkAngle) * G.discR;
      const rx = Math.cos(a - G.forkAngle) * G.discR;
      const ry = Math.sin(a - G.forkAngle) * G.discR;
      return {
        trunk:    seg(hx, hy, fx, fy),
        leftArm:  seg(fx, fy, lx, ly),
        rightArm: seg(fx, fy, rx, ry),
      };
    }), []);

  // Bolt positions — slightly rotated so one doesn't land on a spoke axis
  const bolts = useMemo(() =>
    Array.from({ length: N_BOLTS }, (_, i) => {
      const a = (i * Math.PI * 2) / N_BOLTS + Math.PI / 10;
      return { cx: Math.cos(a) * G.boltCircR, cy: Math.sin(a) * G.boltCircR, rz: a };
    }), []);

  return (
    <>
      {/* ── Outer rim barrel — torus in XY plane; shows cross-section depth as wheel tilts ── */}
      <mesh material={mMain}>
        <torusGeometry args={[G.rimR, G.rimTube, 16, 90]} />
      </mesh>

      {/* ── Bead seat ridge — narrow torus at inner rim edge suggesting tire mounting ── */}
      <mesh material={mRim} position={[0, 0, 0.024]}>
        <torusGeometry args={[G.beadR, G.beadTube, 10, 80]} />
      </mesh>

      {/* ── 5 Y-spokes — trunk from hub to fork, two arms from fork to rim ── */}
      {spokes.map(({ trunk, leftArm, rightArm }, i) => (
        <group key={i}>
          <mesh position={[trunk.cx, trunk.cy, 0.01]} rotation={[0, 0, trunk.angle]} material={mMain}>
            <boxGeometry args={[trunk.len, G.trunkW, G.trunkD]} />
          </mesh>
          <mesh position={[leftArm.cx, leftArm.cy, 0.01]} rotation={[0, 0, leftArm.angle]} material={mMain}>
            <boxGeometry args={[leftArm.len, G.armW, G.armD]} />
          </mesh>
          <mesh position={[rightArm.cx, rightArm.cy, 0.01]} rotation={[0, 0, rightArm.angle]} material={mMain}>
            <boxGeometry args={[rightArm.len, G.armW, G.armD]} />
          </mesh>
        </group>
      ))}

      {/* ── Carrier ring — visible seam ring at fork radius (multi-piece construction cue) ── */}
      <mesh material={mRim}>
        <torusGeometry args={[G.forkR, G.carrierTube, 12, 60]} />
      </mesh>

      {/* ── Back plate — dark recessed disc behind spokes (machined pocket floor) ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.04]} material={mBack}>
        <cylinderGeometry args={[G.discR - 0.01, G.discR - 0.01, 0.025, 72]} />
      </mesh>

      {/* ── Hub boss — thick cylinder protruding forward ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, G.hubZ]} material={mHub}>
        <cylinderGeometry args={[G.hubR, G.hubR, G.hubDepth, 40]} />
      </mesh>

      {/* ── Hub flange — tapered disc from hub boss to bolt circle ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, hubFront + G.flangeH / 2]} material={mHub}>
        <cylinderGeometry args={[G.flangeR, G.hubR, G.flangeH, 48]} />
      </mesh>

      {/* ── Flange chamfer ring — crisp stepped edge at flange perimeter ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, flangeTop + 0.005]} material={mHub}>
        <cylinderGeometry args={[G.flangeR + 0.009, G.flangeR, 0.009, 48]} />
      </mesh>

      {/* ── 5 hex bolt sockets — 6-sided recesses in hub flange face ── */}
      {bolts.map(({ cx, cy, rz }, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, rz]} position={[cx, cy, boltZ]} material={mHole}>
          <cylinderGeometry args={[G.boltR, G.boltR * 0.80, G.boltH, 6]} />
        </mesh>
      ))}

      {/* ── Axle bore — dark cylinder through center ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]} material={mHole}>
        <cylinderGeometry args={[G.axleR, G.axleR, G.axleDepth, 26]} />
      </mesh>
    </>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function WheelVisual() {
  // Guard against SSR — Canvas needs the browser's WebGL context
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="w-full h-full" />;

  return (
    <div className="w-full h-full">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4.8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <WheelScene />
      </Canvas>
    </div>
  );
}
