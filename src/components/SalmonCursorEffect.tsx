import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vr: number;
  life: number;
  maxLife: number;
  size: number;
}

const EMOJI = "🐟";
const GRAVITY = 0.35;
const DRAG = 0.995;
const MAX_PARTICLES = 150;

export function SalmonCursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    let particles: Particle[] = [];
    let lastSpawn = 0;
    let lastMouse: { x: number; y: number } | null = null;

    function spawnTrail(x: number, y: number, dx: number, dy: number) {
      particles.push({
        x,
        y,
        vx: dx * 0.15 + (Math.random() - 0.5) * 1.5,
        vy: dy * 0.15 + (Math.random() - 0.5) * 1.5 - 1,
        rotation: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.2,
        life: 0,
        maxLife: 60 + Math.random() * 30,
        size: 14 + Math.random() * 10,
      });
    }

    function spawnExplosion(x: number, y: number) {
      const count = 24;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
        const speed = 3 + Math.random() * 6;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rotation: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.4,
          life: 0,
          maxLife: 50 + Math.random() * 30,
          size: 16 + Math.random() * 14,
        });
      }
    }

    function handleMouseMove(e: MouseEvent) {
      const now = performance.now();
      const dx = lastMouse ? e.clientX - lastMouse.x : 0;
      const dy = lastMouse ? e.clientY - lastMouse.y : 0;
      lastMouse = { x: e.clientX, y: e.clientY };

      if (now - lastSpawn < 45 || particles.length > MAX_PARTICLES) return;
      lastSpawn = now;
      spawnTrail(e.clientX, e.clientY, dx, dy);
    }

    function handleClick(e: MouseEvent) {
      spawnExplosion(e.clientX, e.clientY);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    let rafId: number;
    function tick() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy += GRAVITY;
        p.vx *= DRAG;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vr;
        p.life += 1;

        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio >= 1 || p.y > canvas!.height + 60) {
          particles.splice(i, 1);
          continue;
        }

        const opacity = lifeRatio > 0.75 ? 1 - (lifeRatio - 0.75) / 0.25 : 1;

        ctx!.save();
        ctx!.globalAlpha = Math.max(opacity, 0);
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.rotation);
        ctx!.font = `${p.size}px serif`;
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillText(EMOJI, 0, 0);
        ctx!.restore();
      }

      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[100]"
      aria-hidden="true"
    />
  );
}
