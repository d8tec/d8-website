"use client";

import { useEffect, useRef } from "react";

const CELL = 24;
const TARGET = 8;
const TRAIL_MIN = 12;
const TRAIL_MAX = 16;
const TURN_PROB = 0.35;
const DR = 123, DG = 111, DB = 232; // #7B6FE8

interface Dot {
  hist: [number, number][];
  nx: number; ny: number;
  dx: number; dy: number;
  t: number;
  tLen: number;
  speed: number;
}

// Undirected key — vertical and horizontal handled separately so
// the normalization is unambiguous regardless of travel direction.
function segKey(c1: number, r1: number, c2: number, r2: number): string {
  if (c1 === c2) {
    // vertical segment — normalise by row
    return `${c1},${Math.min(r1, r2)}|${c1},${Math.max(r1, r2)}`;
  }
  // horizontal segment — normalise by column (r1 === r2 guaranteed)
  return `${Math.min(c1, c2)},${r1}|${Math.max(c1, c2)},${r1}`;
}

export function FooterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, cols = 0, rows = 0;
    let dots: Dot[] = [];
    let last = 0, raf = 0, resizeTmr = 0;

    const occupied = new Set<string>();

    function releaseDot(d: Dot) {
      const h = d.hist;
      for (let i = 1; i < h.length; i++) {
        occupied.delete(segKey(h[i - 1][0], h[i - 1][1], h[i][0], h[i][1]));
      }
      // Release the reserved-but-not-yet-committed next segment.
      // When called right after a commit d.nx/ny === hist[last], so the
      // segKey degenerates to a self-loop that was never inserted — no-op.
      if (h.length > 0) {
        const [lx, ly] = h[h.length - 1];
        occupied.delete(segKey(lx, ly, d.nx, d.ny));
      }
    }

    function spawnDot(): Dot | null {
      for (let attempt = 0; attempt < 20; attempt++) {
        const edge = (Math.random() * 4) | 0;
        let cx = 0, cy = 0, dx = 0, dy = 0;
        switch (edge) {
          case 0: cx = (Math.random() * cols) | 0; cy = 0;        dx = 0;  dy = 1;  break;
          case 1: cx = cols - 1; cy = (Math.random() * rows) | 0; dx = -1; dy = 0;  break;
          case 2: cx = (Math.random() * cols) | 0; cy = rows - 1; dx = 0;  dy = -1; break;
          default: cx = 0;       cy = (Math.random() * rows) | 0; dx = 1;  dy = 0;  break;
        }
        const nx = cx + dx, ny = cy + dy;
        const key = segKey(cx, cy, nx, ny);
        if (!occupied.has(key)) {
          occupied.add(key);
          return {
            hist: [[cx, cy]],
            nx, ny, dx, dy,
            t: Math.random(),
            tLen: TRAIL_MIN + ((Math.random() * (TRAIL_MAX - TRAIL_MIN + 1)) | 0),
            speed: 3 + Math.random() * 3,
          };
        }
      }
      return null;
    }

    function resize() {
      if (!cv) return;
      const dpr = window.devicePixelRatio || 1;
      W = cv.offsetWidth;
      H = cv.offsetHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(W / CELL);
      rows = Math.ceil(H / CELL);
    }

    function onResize() {
      clearTimeout(resizeTmr);
      resizeTmr = window.setTimeout(resize, 150);
    }

    resize();
    for (let i = 0; i < TARGET; i++) {
      const d = spawnDot();
      if (d) dots.push(d);
    }

    function drawDot(d: Dot) {
      const h = d.hist, n = h.length;
      const [cx, cy] = h[n - 1];
      const px = (cx + d.dx * d.t) * CELL;
      const py = (cy + d.dy * d.t) * CELL;

      // 1. Glow drawn first so trail segments render on top of its soft edge
      const grd = ctx.createRadialGradient(px, py, 0, px, py, 8);
      grd.addColorStop(0, `rgba(${DR},${DG},${DB},0.35)`);
      grd.addColorStop(1, `rgba(${DR},${DG},${DB},0)`);
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2); ctx.fill();

      // 2. Trail — committed segments + live partial leg this frame.
      //    The partial leg (last committed node → current pixel) grows with
      //    d.t so the trail is always continuous behind the dot; no cell-snap.
      ctx.lineCap = "butt";
      ctx.lineWidth = 1.5;
      for (let i = 1; i < n; i++) {
        const age = n - i; // 1 = head segment, increases toward tail
        const alpha = Math.max(0, 0.5 * (1 - (age - 1) / d.tLen));
        ctx.strokeStyle = `rgba(${DR},${DG},${DB},${alpha})`;
        ctx.beginPath();
        ctx.moveTo(h[i - 1][0] * CELL, h[i - 1][1] * CELL);
        ctx.lineTo(h[i][0] * CELL, h[i][1] * CELL);
        ctx.stroke();
      }
      // In-progress partial leg at full head alpha (0.5)
      ctx.strokeStyle = `rgba(${DR},${DG},${DB},0.5)`;
      ctx.beginPath();
      ctx.moveTo(h[n - 1][0] * CELL, h[n - 1][1] * CELL);
      ctx.lineTo(px, py);
      ctx.stroke();

      // 3. Core dot on top of everything
      ctx.fillStyle = `rgba(${DR},${DG},${DB},1)`;
      ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();
    }

    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      ctx.clearRect(0, 0, W, H);

      dots = dots.filter(d => {
        d.t += dt * d.speed;

        while (d.t >= 1) {
          d.t -= 1;

          // Commit: move next cell into history
          d.hist.push([d.nx, d.ny]);

          // Release the oldest segment exactly when its alpha reaches 0.
          // alpha = 0 when age = tLen+1, i.e. when hist.length = tLen+2.
          if (d.hist.length > d.tLen + 1) {
            const h = d.hist;
            occupied.delete(segKey(h[0][0], h[0][1], h[1][0], h[1][1]));
            d.hist.shift();
          }

          const [cx, cy] = d.hist[d.hist.length - 1];

          if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) {
            releaseDot(d);
            return false;
          }

          // Build candidates with TURN_PROB bias, plus backward as final fallback.
          // Trying all 4 directions means the dot only dies when every neighbour
          // is occupied, not just when the preferred direction is blocked.
          const perps: [number, number][] = d.dx !== 0
            ? [[0, 1], [0, -1]]
            : [[1, 0], [-1, 0]];
          if (Math.random() < 0.5) perps.reverse();

          const candidates: [number, number][] = Math.random() < TURN_PROB
            ? [...perps, [d.dx, d.dy], [-d.dx, -d.dy]]
            : [[d.dx, d.dy], ...perps, [-d.dx, -d.dy]];

          let moved = false;
          for (const [ndx, ndy] of candidates) {
            const nnx = cx + ndx, nny = cy + ndy;
            const key = segKey(cx, cy, nnx, nny);
            if (!occupied.has(key)) {
              occupied.add(key);
              d.dx = ndx; d.dy = ndy;
              d.nx = nnx; d.ny = nny;
              moved = true;
              break;
            }
          }

          if (!moved) {
            releaseDot(d);
            return false;
          }
        }

        drawDot(d);
        return true;
      });

      while (dots.length < TARGET) {
        const d = spawnDot();
        if (!d) break;
        dots.push(d);
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTmr);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
