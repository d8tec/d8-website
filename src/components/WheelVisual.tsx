"use client";

import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// ─── Animation ────────────────────────────────────────────────────────────────
const DRAG_SCALE   = 0.008;
const SCROLL_SCALE = 0.0028;
const DAMPING      = 0.92;
const VEL_SMOOTH   = 0.25;
const IDLE_Y_AMP   = 0.28;
const IDLE_Y_FREQ  = 0.32;
const IDLE_X_BASE  = -0.20;
const IDLE_X_AMP   = 0.04;

// ─── Pre-allocated (never re-created in the animation loop) ───────────────────
const _qY      = new THREE.Quaternion();
const _qX      = new THREE.Quaternion();
const _qScroll = new THREE.Quaternion();
const _qIdle   = new THREE.Quaternion();
const _euler   = new THREE.Euler();
const _aY      = new THREE.Vector3(0, 1, 0);
const _aX      = new THREE.Vector3(1, 0, 0);

// ─── D8 materials (module-scope — single instance on page) ───────────────────
const mRoller = new THREE.MeshStandardMaterial({
  color: "#7b2fbe", metalness: 0.04, roughness: 0.74,
  emissive: "#1a0635", emissiveIntensity: 0.12,
});
const mCarrier = new THREE.MeshStandardMaterial({
  color: "#8c9198", metalness: 0.78, roughness: 0.20,
  emissive: "#08090d", emissiveIntensity: 0.04,
});
const mHub = new THREE.MeshStandardMaterial({
  color: "#6e7278", metalness: 0.84, roughness: 0.14,
  emissive: "#040507", emissiveIntensity: 0.04,
});
const mDark = new THREE.MeshStandardMaterial({
  color: "#050607", metalness: 0.28, roughness: 0.84,
});

// Initial model orientation tweak (Euler, radians).
// Adjust if the downloaded GLB comes in rotated wrong — many CAD exports are Z-up.
// Common fix for Z-up models: MODEL_ORIENT = [Math.PI / 2, 0, 0]
const MODEL_ORIENT: [number, number, number] = [0, 0, 0];

// ─── GLB model ────────────────────────────────────────────────────────────────
// Draco-compressed GLB at: public/models/2796N16_Omni-Directional_Wheel-draco.glb (673 KB, down from 15 MB)
// Draco decoder files at: public/draco/ (copied from three/examples/jsm/libs/draco)
//
// Recommended source (free, CC-Attribution):
//   https://sketchfab.com/3d-models/6-mecanum-wheel-5e0af4de7262476fb6f5475121680a97
//
// Material assignment uses mesh names. To inspect names for a new model, run this
// once in the browser console:
//   gltf.scene.traverse(c => c.name && console.log(c.name))
//
// Then adjust the name-matching patterns below to assign the right D8 materials.

function WheelModel() {
  const gltf = useLoader(GLTFLoader, "/models/2796N16_Omni-Directional_Wheel-draco.glb", (loader) => {
    const draco = new DRACOLoader();
    draco.setDecoderPath("/draco/");
    (loader as GLTFLoader).setDRACOLoader(draco);
  });

  const scene = useMemo(() => {
    const clone = gltf.scene.clone(true);

    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      if (child.name === "mesh_0_2") {
        child.material = mRoller;   // barrel bodies — D8 purple
      } else if (child.name === "mesh_0") {
        child.material = mDark;     // end cap collars — dark
      } else {
        child.material = mCarrier;  // carrier plates, brackets, hub
      }
      child.castShadow    = true;
      child.receiveShadow = true;
    });

    // Auto-scale so the largest dimension is ~1.8 units
    const box    = new THREE.Box3().setFromObject(clone);
    const size   = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const s = 1.8 / maxDim;
      clone.scale.setScalar(s);
      // Re-center after scale
      const center = new THREE.Box3().setFromObject(clone).getCenter(new THREE.Vector3());
      clone.position.sub(center);
    }

    clone.rotation.set(...MODEL_ORIENT);

    return clone;
  }, [gltf]);

  return <primitive object={scene} />;
}

// ─── Placeholder shown while the GLB loads ────────────────────────────────────
function WheelPlaceholder() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 1.2;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[0.85, 0.06, 12, 64]} />
      <meshStandardMaterial color="#7b2fbe" metalness={0.3} roughness={0.6} />
    </mesh>
  );
}

// ─── Scene (interaction logic lives here — unchanged from procedural version) ──
function WheelScene() {
  const groupRef = useRef<THREE.Group>(null);
  const quat     = useRef(new THREE.Quaternion().setFromEuler(new THREE.Euler(IDLE_X_BASE, 0.35, 0)));
  const vel      = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const elapsed  = useRef(0);
  const { gl }   = useThree();

  // ── Drag ──────────────────────────────────────────────────────────────────
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

  // ── Scroll ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const rx = e.deltaY * SCROLL_SCALE;
      _qScroll.setFromAxisAngle(_aX, rx);
      quat.current.premultiply(_qScroll);
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
        _qY.setFromAxisAngle(_aY, vel.current.y);
        _qX.setFromAxisAngle(_aX, vel.current.x);
        quat.current.premultiply(_qY).premultiply(_qX);
        const d = Math.pow(DAMPING, delta * 60);
        vel.current.x *= d;
        vel.current.y *= d;
      } else {
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
      {/* Ambient — base tone, slightly purple to unify the palette */}
      <ambientLight color="#8844cc" intensity={0.50} />
      {/* Key — upper-left cool-white; highlights metallic carrier plates */}
      <directionalLight position={[-3, 5, 4]}  color="#f0eaff" intensity={6.0} />
      {/* Fill — right side soft purple; lifts shadow face */}
      <directionalLight position={[4, 0, 3]}   color="#cc99ff" intensity={2.2} />
      {/* Low fill — prevents bottom going flat */}
      <directionalLight position={[0, -3, 3]}  color="#ffffff" intensity={0.55} />
      {/* Camera-axis fill — hub face always readable */}
      <directionalLight position={[0, 0.5, 8]} color="#ffffff" intensity={0.40} />
      {/* Purple rim from behind — separates back edge, glows on rollers */}
      <pointLight       position={[0, 0, -6]}  color="#9900ff" intensity={5.0} />
      {/* Warm accent from upper-right — catches roller barrel crests */}
      <pointLight       position={[3, 3, 5]}   color="#cc88ff" intensity={2.5} />

      <group ref={groupRef}>
        <Suspense fallback={<WheelPlaceholder />}>
          <WheelModel />
        </Suspense>
      </group>
    </>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function WheelVisual() {
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
