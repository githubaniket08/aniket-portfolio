"use client";

import { useEffect, useRef } from "react";

export default function TechCoreVisual() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    // 3D Nodes on a sphere lattice
    const numNodes = 36;
    const nodes: { x: number; y: number; z: number }[] = [];
    const radius = Math.min(width, height) * 0.36;

    for (let i = 0; i < numNodes; i++) {
      const phi = Math.acos(-1 + (2 * i) / numNodes);
      const theta = Math.sqrt(numNodes * Math.PI) * phi;
      nodes.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
      });
    }

    let angleX = 0;
    let angleY = 0;
    let targetRotX = 0.003;
    let targetRotY = 0.005;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = 0.004 + nx * 0.008;
      targetRotX = 0.002 + ny * 0.006;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const loop = () => {
      angleX += targetRotX;
      angleY += targetRotY;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw subtle ambient glow in center
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius * 1.3);
      grad.addColorStop(0, "rgba(109, 40, 217, 0.16)");
      grad.addColorStop(0.5, "rgba(53, 21, 85, 0.06)");
      grad.addColorStop(1, "rgba(5, 3, 8, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Project 3D nodes
      const projected = nodes.map((node) => {
        // Rotate Y
        let x1 = node.x * Math.cos(angleY) - node.z * Math.sin(angleY);
        let z1 = node.z * Math.cos(angleY) + node.x * Math.sin(angleY);

        // Rotate X
        let y2 = node.y * Math.cos(angleX) - z1 * Math.sin(angleX);
        let z2 = z1 * Math.cos(angleX) + node.y * Math.sin(angleX);

        const fov = 450;
        const scale = fov / (fov + z2 + radius);
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;
        const alpha = Math.max(0.1, (z2 + radius) / (2 * radius));

        return { px, py, z: z2, alpha };
      });

      // Draw connections
      ctx.lineWidth = 0.75;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].px - projected[j].px;
          const dy = projected[i].py - projected[j].py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius * 0.65) {
            const lineAlpha = (1 - dist / (radius * 0.65)) * 0.18 * ((projected[i].alpha + projected[j].alpha) / 2);
            ctx.strokeStyle = `rgba(167, 139, 250, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].px, projected[i].py);
            ctx.lineTo(projected[j].px, projected[j].py);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.fillStyle = `rgba(196, 181, 253, ${p.alpha * 0.55})`;
        ctx.beginPath();
        ctx.arc(p.px, p.py, 1.8 * p.alpha, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden -z-10"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[800px] max-h-[800px] opacity-75"
      />
    </div>
  );
}
